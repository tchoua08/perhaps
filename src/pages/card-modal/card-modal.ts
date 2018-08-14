import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CardProvider } from '../../providers/card/card';

@IonicPage()
@Component({
  selector: 'page-card-modal',
  templateUrl: 'card-modal.html',
})
export class CardModalPage {

  card= {
    number:null,
    type:null,
    expires:null,
    csc:null
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl: ViewController,
  private cardservice:CardProvider) {
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  onChangeNumber(data) : void {
    this.card.type = this.cardservice.GetCardType(this.card.number);
    
  }

  saveCard(){
    if(this.card.number != null && this.card.expires !=null){
      this.cardservice.saveCard(this.card).then((res:any)=>{
        console.log(res);
      });
    }    
     this.viewCtrl.dismiss();
  }
}