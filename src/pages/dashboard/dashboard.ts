import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Events,AlertController  } from 'ionic-angular';
import {EventsProvider} from '../../providers/events/events'
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { usercreds } from '../../models/interfaces/usercreds';
import { ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:"dashboard"})
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  credentials = {} as usercreds;

  constructor( public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,public eventservice:EventsProvider,
  private authservice:AuthProvider,public events:Events,private storageservice:Storage,private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {

  }

 showEvents(type){

  this.navCtrl.push('EventListPage',{
    type: type
  });
 }

 showSearchPage(){
  const modal = this.modalCtrl.create('SearchModalPage');
  modal.present();
 }

 presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'You are currently offline',
    subTitle: 'Please connect to the Internet and try again',
    buttons: ['Ok']
  });
  alert.present();
}

createEvent(valeur:string){
  this.navCtrl.push('information',{
    type: valeur
  });
}
editEvent(valeur:string){
  this.navCtrl.push('editevent',{
    type: valeur
  });
}

presentActionSheet(valeur:string) {

  let actionSheet = this.actionSheetCtrl.create({
    title: "Event management",
    buttons: [
      {
        text: "Create event",
        handler: () => {
          this.createEvent(valeur);

        }
      },{
        text: "Edit event",
        handler: () => {

          this.editEvent(valeur);
        }
      },{
        text: "Cancel",
        role: 'cancel',
        handler: () => {

        }
      }
    ]
  });
  actionSheet.present();


}

}
