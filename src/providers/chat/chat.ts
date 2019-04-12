import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Events } from 'ionic-angular';


@Injectable()
export class ChatProvider {
  // fireroom = firebase.database().ref('/rooms') 
  firemsg = firebase.database().ref('/messages')
  firerooms = firebase.database().ref('/rooms')
  messages=[];
  constructor(public events:Events) {
    
  }

  addNewMessage(msg){
    var promise = new Promise((resolve, reject) => {
      this.firemsg.child(firebase.auth().currentUser.uid).push().set({
        senderId: firebase.auth().currentUser.uid,
        senderName:firebase.auth().currentUser.displayName,
        message: msg,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
          resolve(true);
          this.firerooms.child(firebase.auth().currentUser.uid).update({
            modified:firebase.database.ServerValue.TIMESTAMP,
            readbyUser:true,
            readybyAdmin:false,
            lastmessage:msg,
            lastSender:firebase.auth().currentUser.displayName,
            clientName: firebase.auth().currentUser.displayName,
            clientId:firebase.auth().currentUser.uid
          })
          }).catch((err) => {
            alert(err);
        })
      
    })
    return promise;
  }

  getMessages(){
    let temp;
    this.firemsg.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      this.messages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
        this.messages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }
}

