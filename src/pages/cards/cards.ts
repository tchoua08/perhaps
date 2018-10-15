import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,Events } from 'ionic-angular';
import { CardProvider } from '../../providers/card/card';


@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
})
export class CardsPage {
  cards;
  constructor(public navCtrl: NavController, public navParams: NavParams,private cardservice:CardProvider,
    public modalCtrl:ModalController,public events: Events) {
    
    this.events.subscribe('card_delete',()=>{
      this.loadCards();
    })

    this.events.subscribe('newcard',()=>{
      console.log('edw')
      this.loadCards();
    })
    
    this.loadCards();
  }

  loadCards(){
    
    this.cardservice.getCards().then((res:any)=>{
      this.cards = res;
      
    })
  }

  addCard(){
    const modal = this.modalCtrl.create('CardModalPage');
    modal.present();
   }

   editCard(card){
    this.navCtrl.push('EditCardPage',{
      card:card
    });
   }
}
