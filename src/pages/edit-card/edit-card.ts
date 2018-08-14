import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardProvider } from '../../providers/card/card';

@IonicPage()
@Component({
  selector: 'page-edit-card',
  templateUrl: 'edit-card.html',
})
export class EditCardPage {
  card;
  constructor(public navCtrl: NavController, public navParams: NavParams, private cardservice:CardProvider) {
    this.card=this.navParams.get('card');
  
  }

  ionViewDidLoad() {
   
  }

  updateCard(){
    this.cardservice.updateCard(this.card);
  }

  deleteCard(){
    this.cardservice.deleteCard(this.card.id);
    this.navCtrl.pop();
  }

  onChangeNumber(data) : void {
    this.card.type = this.cardservice.GetCardType(this.card.number);
    
  }

}
