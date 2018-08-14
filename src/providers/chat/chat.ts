import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events } from 'ionic-angular';


@Injectable()
export class ChatProvider {
  // fireroom = firebase.database().ref('/rooms') 
  firemsg = firebase.database().ref('/messages')
  messages=[];
  constructor(public events:Events) {
    
  }

  addNewMessage(msg){
    var promise = new Promise((resolve, reject) => {
      this.firemsg.child(firebase.auth().currentUser.uid).push().set({
        sentby: firebase.auth().currentUser.uid,
        message: msg,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
          resolve(true);
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

