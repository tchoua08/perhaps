import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,LoadingController} from 'ionic-angular';
import {usercreds} from '../../models/interfaces/usercreds'
import {AuthProvider} from '../../providers/auth/auth'
import firebase from 'firebase';
// import { Facebook } from '@ionic-native/facebook'
// import { Storage } from '@ionic/storage';

import { FacebookAuthProvider } from '@firebase/auth-types';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as usercreds;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authservice:AuthProvider,
  private toastCtrl: ToastController,public loadingCtrl: LoadingController,
   private userservice:UserProvider
    ) {
  }

  ionViewDidLoad() {

    this.credentials.email='';
    this.credentials.password='';
   
    // console.log('ionViewDidLoad LoginPage');
  }

  signin(){
    
    
    let loader = this.loadingCtrl.create({
      spinner:'dots',
     
    });

    loader.present();
   this.authservice.login(this.credentials).then((res:any) => {
      // this.storage.set('usercreds',this.credentials);
      this.navCtrl.setRoot('TabsPage');
    })
    .catch(err =>{
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3500,
        position: 'top'
      });
     toast.present();
    })

    loader.dismiss();
  
  }

  signup(){
    this.navCtrl.push('RegisterPage')
  }

  // facebookLogin(): Promise<any> {
  //   return this.facebook.login(['email'])
  //     .then( response => {
  //       const facebookCredential = firebase.auth.FacebookAuthProvider
  //         .credential(response.authResponse.accessToken);
  
  //       firebase.auth().signInWithCredential(facebookCredential)
  //         .then( success => { 
  //           console.log("Firebase success: " + JSON.stringify(success)); 
  //         });
  
  //     }).catch((error) => { console.log(error) });
  // }

  passwordreset(){
    this.userservice.passwordReset();
  }
 


}
