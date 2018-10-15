import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';



@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController, 
    private userservice:UserProvider , public alertCtrl : AlertController) {
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

  deleteAccount(){
    let alert = this.alertCtrl.create({
      title: 'Delete Account',
      message: 'Do you really want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel-button',
         
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //  this.userservice.deleteUser();
          }
        }
      ]
    });
    alert.present();


  }

    
   


}
