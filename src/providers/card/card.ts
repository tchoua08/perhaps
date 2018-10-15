import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Events } from 'ionic-angular';

@Injectable()
export class CardProvider {
  firecards = firebase.database().ref('/Cards');
  constructor(public events:Events) {
   
  }

  getCards(){
    var promise = new Promise((resolve, reject) => {
        this.firecards.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
          let cardsdata = snapshot.val();
          let temparr = [];
          for (var key in cardsdata) {
            temparr.push(cardsdata[key]);
          }
          resolve(temparr);
        }).catch((err) => {
          reject(err);
        })
      })
      return promise;
  }

  saveCard(card){
    var ref = this.firecards.child(firebase.auth().currentUser.uid).push();
   
    var promise = new Promise((resolve, reject) => {
        ref.set({
         number:card.number,
         expires:card.expires,
         type:card.type,
         id:ref.key
        }).then(() => {
            this.events.publish("newcard")
            resolve(true);
            }).catch((err) => {
              reject(err);
              alert(err);
          })  
      })
      return promise;
    }

  getCardById(id){
    var promise = new Promise((resolve, reject) => {
        this.firecards.child(id).once('value', (snapshot) => {
          resolve(snapshot.val());
        }).catch((err) => {
          reject(err);
          })
        })
        return promise;
  }

  deleteCard(card_id){
    var promise = new Promise((resolve, reject) => {
    this.firecards.child(firebase.auth().currentUser.uid).child(card_id).remove().then(()=>{
        console.log('edw');
        this.events.publish('card_delete');  
    });
    

    })
    }

  updateCard(card){
      
    var promise = new Promise((resolve, reject) => {
        this.firecards.child(firebase.auth().currentUser.uid).child(card.id).update( {
            number:card.number,
            type:card.type,
            expires:card.expires  
        }).catch((err) => {
          reject(err);
          })
        })
        return promise;
  

  }

  GetCardType(number)
  {
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";

    // Mastercard 
    // Updated for Mastercard 2017 BINs expansion
     if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) 
        return "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "AMEX";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        return "Visa Electron";

    return "";
}

}
