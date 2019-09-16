import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,LoadingController} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user'





@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})


export class RegisterPage {

  newuser = {
    email: '',
    password:'',
    firstName:'',
    lastName:'',
    admin:0
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public userservice:UserProvider,public toastCtrl:ToastController,public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signup(){


    let loader = this.loadingCtrl.create({
      spinner:'dots',

    });
    loader.present();

    this.userservice.adduser(this.newuser).then((res:any)=>{
     this.navCtrl.setRoot('TabsPage')
    }).catch(err =>{
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3500,
        position: 'top'
      });
     toast.present();
    })

    loader.dismiss();

  }

  signin(){
    this.navCtrl.setRoot('LoginPage');
  }

}
