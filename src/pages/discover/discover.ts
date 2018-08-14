import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {EventsProvider} from '../../providers/events/events'

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,public eventservice:EventsProvider) {
    
      
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

}