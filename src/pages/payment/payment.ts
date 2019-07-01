import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import firebase from 'firebase/app';
import 'firebase/database';




@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  firedata = firebase.database().ref('/Payments');
  amount = 20;
  paymentMethod = 'paypal';
  event = null;
  tickets = null;
  total = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, private payPal:PayPal) {
    this.event = this.navParams.get('event');
    this.tickets = this.navParams.get('tickets');
    this.total = this.tickets * this.event.ticket_price;
  }

  ionViewDidLoad() {
   
  }


  payWith(type){
    this.paymentMethod = type;
  }

  checkout(){
    console.log(this.paymentMethod);
    if(this.paymentMethod == 'paypal'){
      this.payPal.init({
        PayPalEnvironmentProduction: '',
        PayPalEnvironmentSandbox: 'AYo_Rc5jNdBFG3PaIVAw491HrjoVD5gA-gGdENRYqE3njqu7qdWsyuAi_hjn1kK8diIG23i0mW8JD9Zs'
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal

          
        })).then(() => {
          let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
          this.payPal.renderSinglePaymentUI(payment).then((res) => {
              console.log('Success');
              console.log(res);
          }, () => {
            // Error or render dialog closed without being successful
            console.log('Error on rendering')
          });
        }, () => {
          console.log('Error in configuration')
        });
      }, () => {
        console.log('Error in initialization')
      });
     
    }else{

    }
  }


  // pay(){
  //   this.stripe.setPublishableKey('pk_test_YE1y4I4uPoRVkOKLPWThUOUS');

  //   let card = {
  //   number: '4242424242424242',
  //   expMonth: 12,
  //   expYear: 2020,
  //   cvc: '220'
  //   };

  //   // this.stripe.createCardToken(card)
  //   //   .then(token => console.log(token.id))
  //   //   .catch(error => console.log(error));
  //   // 

  //   this.stripe.createCardToken(card).then((token)=>{
  //     console.log(token.id);
  //     const payment = {token,amount:this.amount}
  //     this.firedata.child(firebase.auth().currentUser.uid).push(payment);
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  // }


}
