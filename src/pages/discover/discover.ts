import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Events,AlertController  } from 'ionic-angular';
import {EventsProvider} from '../../providers/events/events'
import {Network} from '@ionic-native/network'
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { usercreds } from '../../models/interfaces/usercreds';

/**
 * Generated class for the DiscoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
})
export class DiscoverPage {
  credentials = {} as usercreds;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,public eventservice:EventsProvider,
  private network:Network,private authservice:AuthProvider,public events:Events,private storageservice:Storage,private alertCtrl: AlertController) {
    this.storageservice.get('perhaps_credentials').then((data)=>{
       this.credentials.password = data.password;
       this.credentials.email = data.email;
       this.authservice.login(this.credentials).then(()=>{
       }).catch(err=>{
         this.presentAlert();
       })
    })
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

}