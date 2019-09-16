import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Events } from 'ionic-angular';



@Injectable()
export class ChatProvider {

  firechat = firebase.database().ref('/chat')
  fireforum = firebase.database().ref('/forum')
  messages=[];
  constructor(public events:Events) {

  }





  getMessages(youid:string){
    let temp;
    this.firechat.on('value', (snapshot) => {
      this.messages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {

        if((temp[tempkey].uid ===youid) && (temp[tempkey].sendTo===firebase.auth().currentUser.uid)){

          this.messages.push(temp[tempkey]);
        }
        if(temp[tempkey].sendTo ===youid){
          this.messages.push(temp[tempkey]);
        }



      }
      this.events.publish('newmessage');
    })
  }



  getMessagesForum(){
    let temp;
    this.fireforum.on('value', (snapshot) => {
      this.messages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {

          this.messages.push(temp[tempkey]);

      }
      this.events.publish('newmessageforum');
    })
  }


  getMessageList(meuid:string){

      this.firechat.orderByKey()
        .on('value', (snapshot:any) => {
          this.messages = [];
          snapshot.forEach( (childSnap:any) => {
            if (childSnap.val().sendTo===firebase.auth().currentUser.uid){
              this.messages.push({
                datemss:childSnap.val().datemss,
                message: childSnap.val().message,
                name:childSnap.val().name,
                profilePicture:childSnap.val().profilePicture,
                sendTo:childSnap.val().sendTo,
                status:childSnap.val().status,
                uid:childSnap.val().uid
              });

            }
            return false
          });
          this.events.publish('newmessage');

        });

  }

}

