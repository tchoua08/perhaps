import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  goToAbout(){
    this.navCtrl.push('AboutPage');
  }

  editPassword(){
    console.log('edw');
    const modal = this.modalCtrl.create('UpdatePasswordModalPage');
    modal.present();
  }

  editEmail(){
    const modal = this.modalCtrl.create('UpdateEmailModalPage');
    modal.present();
  }

}
