import { Component,ViewChild,NgZone, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Content } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat'
import { Events } from 'ionic-angular/util/events';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { UserProvider } from '../../providers/user/user'


@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  @ViewChild('content') content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  newmessage='';
  userdetails;
  messages=[];
  user;
  showEmojiPicker = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public chatservice:ChatProvider,
  public alertCtrl:AlertController,public events:Events,public toastCtrl:ToastController,public zone:NgZone,
  public userservice:UserProvider ) {
    this.userservice.getUser().then((res: any) => {
      this.user = res;
      
    })
    this.chatservice.getMessages();
    this.events.subscribe('newmessage', () => {
      this.messages = [];
      this.zone.run(() => {
        this.messages = this.chatservice.messages;
        
      })
      this.formatDate();
      this.scrollToBottom();
    })

  }

  sendMsg(){

    if (this.newmessage == '' || this.newmessage == null){
      return -1;
    }else{
      this.chatservice.addNewMessage(this.newmessage).then(() => {
        this.newmessage = '';
        this.content.scrollToBottom();
        
      })

    }
   
  }

  handleSelection(event) {
    this.newmessage = this.newmessage + " " + event.char;
  }



  
  
 
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  formatDate(){
    for(let i in this.messages){
      var date = new Date(this.messages[i].timestamp);
      this.messages[i].timestamp = date;
      
    }
  }
}