const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.testkey)



exports.stripeCharge = functions.database
                                .ref('/Payments/{userId}/{paymentId}')
                                .onWrite(event => {

                    
    const payment = event.after.val();
    const userId = event.after.ref.parent.key;
    const paymentId = event.after.ref.key;   
    
    // console.log(payment);
    // console.log(userId);
    // console.log(paymentId);
    
    const charge = {payment,userId,paymentId};

    console.log(charge);
    
  

    if (!payment || payment.charge) return;                                
//   return admin.database()
//               .ref(`/users/${userId}`)
//               .once('value')
//               .then(snapshot => {
//                   return snapshot.val();
//                })
//                .then(customer => {

//                  const amount = payment.amount;
//                  const idempotency_key = paymentId;  // prevent duplicate charges
//                  const source = payment.token.id;
//                  const currency = 'usd';
//                  const charge = {amount, currency, source};


//                  return stripe.charges.create(charge, { idempotency_key });

//                })

//                .then(charge => {
//                    admin.database()
//                         .ref(`/payments/${userId}/${paymentId}/charge`)
//                         .set(charge)
//                   })


});