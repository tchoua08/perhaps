
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {usercreds} from '../../models/interfaces/usercreds'
import firebase from 'firebase/app'
import { ToastController } from 'ionic-angular';




@Injectable()
export class AuthProvider {

  constructor(public afireauth:AngularFireAuth,public toastCtrl:ToastController) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials){
    return this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  updatePassword(newPassword){
    let user = firebase.auth().currentUser;
    var promise = new Promise((resolve,reject) =>{
      user.updatePassword(newPassword).then(() => {
        let toast = this.toastCtrl.create({
        message: 'Your Password updated successfully',
        duration: 3500,
        position: 'botttom'
       });
     toast.present();
       resolve(true);
    }).catch(err =>{
    let toast = this.toastCtrl.create({
      message: err,
      duration: 3500,
      position: 'bottom'
    });
   toast.present();
  })
 
  })
  return promise;
}

updateEmail(newEmail){
  let user = firebase.auth().currentUser;
  var promise = new Promise((resolve,reject) =>{
    user.updateEmail(newEmail).then(() => {
      let toast = this.toastCtrl.create({
      message: 'Your Email updated successfully',
      duration: 3500,
      position: 'botttom'
     });
   toast.present();
     resolve(true);
  }).catch(err =>{
   
  let toast = this.toastCtrl.create({
    message: err,
    duration: 3500,
    position: 'bottom'
  });
 toast.present();
})

})
return promise;
}





 
}
