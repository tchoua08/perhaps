const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();
const stripefile = express();
const createAccount = express();
const striperefund = express();
const admin = require('firebase-admin');
const stripe = require("stripe")("sk_test_PD2JlrxQ8WY1bNUgHoctXBpK");
//const stripe = require("stripe")("sk_live_wC23JfHjUzyHo7YxVWWyWSUx");
const fs = require('fs');
const tmp = require('tmp');
admin.initializeApp(functions.config().firebase);
const {Storage} = require('@google-cloud/storage');
const bucket = admin.storage().bucket();
app.use(cors);
createAccount.use(cors);
stripefile.use(cors);
striperefund.use(cors);





exports.commandespassager =  functions.firestore.document('/commandes/{commandesId}').onCreate( (snap, context) =>{
 

  const original = snap.data();
 
  return makeCommande(original,snap)
   .then(console.log)
   .catch(console.error)

  
       		
});



 function makeCommande(original,snap){


	    var montant1 =original.prixTotal*100;
	    montant1=parseInt(montant1);

	    var valeur =original.nombreplacepassager*original.reservation;

	    var montant2 =original.prixTotal-valeur;

	   montant2 =montant2*100;
	   montant2=parseInt(montant2);
	    
        const currency = 'eur';
        return stripe.charges.create({
						amount:montant1,
						currency: currency,
						source: original.cardId,
						destination : {
    					  amount :montant2,
    					  account :original.accountId
						},
						 description: "Charge for commandeId: " +  snap.id
					},
					 {
                   idempotency_key: snap.id
          }).then(function(charge) {
              
              admin.firestore().collection('commandes').doc(snap.id).set({
					chargeId: charge.id
				},{merge: true});


          })

 
	   

}





createAccount.post('/createAccount', (req, res) => {
  const account = stripe.accounts.create({
    country: req.body.country,
    type: "custom",
    email: req.body.email,
    account_token: req.body.token_account

  }, function (err, account) {
    if (account) {
      const bank = stripe.accounts.createExternalAccount(
        account.id, {
          external_account: req.body.token_BankAccount
        },
        function (err, bank_account) {
          if (bank_account) {
            const data ={
            bank_account:bank_account,
            account:account
            
            }
            res.status(200).send(bank_account);
          } else {
            if (err) {
              res.status(200).send(err);
            }


          }
//          res.status(200).send(account);
        }
      );



    } else {
      if (err) {
        res.status(200).send(err);
      }

    }
  });



});

exports.urlcreatestripeaccount = functions.https.onRequest(createAccount);




	stripefile.post('/stripefile', (req, res) => {

       const filePath = '/users/'+req.body.userid+'/photocni/'+req.body.filename;

      


	    var tempFilePath = tmp.tmpNameSync();

	 return bucket.file(filePath).download({
		destination: tempFilePath
	}).then(() => {
		const docs = stripe.fileUploads.create(
		{
			purpose: 'identity_document',
			file: {
				data: fs.readFileSync(tempFilePath),
				name: 'identite.jpg',
				type: 'application/octet-stream'
			}
		}, function (err, docs) {
			if (docs) {
                console.log("valeur de docs:"+JSON.stringify(docs));
				res.status(200).send(docs);
				
			}

			if (err){
               console.log("valeur de err:"+JSON.stringify(err))
               //res.status(200).send(err);

			}

		})
    
    })
 });


exports.urlstripefile = functions.https.onRequest(stripefile);


// refund user

	striperefund.post('/striperefund', (req, res) => {
    
        const chargeId =req.body.chargeId;

        console.log("chargeId bon11:"+chargeId);

		return stripe.refunds.create({
			  charge:chargeId
			}, function (err, result) {

	          if (result) {

	             console.log("resultat:"+JSON.stringify(result));
	            res.status(200).send(result);

	          } 

	            if (err) {

	              console.log("erreur:"+JSON.stringify(err));
	              res.status(200).send(err);

	            }

            });



      });


exports.urlstriperefund= functions.https.onRequest(striperefund);

