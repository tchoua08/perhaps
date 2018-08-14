import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase'
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/Users');
  constructor(public afireauth:AngularFireAuth,public toastCtrl:ToastController) {
   
  }

  adduser(newuser){
    var promise = new Promise((resolve,reject) =>{
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email,newuser.password).then(()=>{
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.firstName + newuser.LastName,
          photoURL:'http://www.freeiconspng.com/uploads/person-icon-8.png'
        }).then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid:this.afireauth.auth.currentUser.uid,
            firstName:newuser.firstName,
            lastName:newuser.lastName,
            photoURL:'http://www.freeiconspng.com/uploads/person-icon-8.png'
          }).then (() =>{
            resolve({succes:true});
          }).catch((err)=>{
              reject(err);
          })
       }) .catch((err)=>{
        reject(err);
       })
      }).catch((err)=>{
        reject(err);
      })    
    })

    return promise;
  }

  passwordReset(){
    let email = firebase.auth().currentUser.email;
    console.log('email');
    var promise = new Promise((resolve,reject) =>{
      firebase.auth().sendPasswordResetEmail(email).then(()=> {
        resolve({resolve:true})
        let toast = this.toastCtrl.create({
          message: 'An e-mail has been sent to your mailbox. Follow the instructios to recover your password.',
          duration: 3500,
          position: 'top'
        });
       toast.present();
      }).catch(err =>{
        let toast = this.toastCtrl.create({
          message: err,
          duration: 3500,
          position: 'top'
        });
       toast.present();
      })
    })
      return promise;
  }

    updateimage(imageurl) {
      var promise = new Promise((resolve, reject) => {
          this.afireauth.auth.currentUser.updateProfile({
              displayName: this.afireauth.auth.currentUser.displayName,
              photoURL: imageurl      
          }).then(() => {
            this.firedata.child(this.afireauth.auth.currentUser.uid).update({
           
              photoURL: imageurl,
             
              }).then(() => {
                  resolve({ success: true });
                  }).catch((err) => {
                      reject(err);
                  })
          }).catch((err) => {
                reject(err);
            })  
      })
      return promise;
  }

  getUser(){
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
        
      }).catch((err) => {
        reject(err);
        })
      })
      return promise;
  }



  updateDisplayName(firstName, lastname){
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
      displayName: firstName + " "+lastname,
      photoURL: this.afireauth.auth.currentUser.photoURL
    }).then(() => {
      this.firedata.child(firebase.auth().currentUser.uid).update({
        firstName:firstName,
        lastName: lastname,
        photoURL: this.afireauth.auth.currentUser.photoURL,
        uid: this.afireauth.auth.currentUser.uid
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
      }).catch((err) => {
        reject(err);
    })
    })
    return promise;
  }


  
}
