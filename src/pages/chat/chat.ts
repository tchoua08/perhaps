import { Component,ViewChild,NgZone } from '@angular/core';
import { IonicPage, NavController,NavParams,Content,AlertController,Platform} from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat'
import { Events } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  ref:any=null;
  name:any=null;
  newmessage='';
  messagesList:any=null;
  detailMessage:any = [];
  public username:string="";
  public uid:string="";
  public profilePicture:string="";
  public profilePictureme:string="";
  public ville:string="";
  public mename:string="";
  public meuid:string="";
  public me:any;
  public you:any;
  public data:any="";
  toggled: boolean = false;


  constructor(
    public nav: NavController,
    public alert: AlertController,
    public navParams: NavParams,
    private io:ChatProvider,
    public platform: Platform,
    public zone:NgZone,
    public events: Events
  ) {
    this.you =this.navParams.get("user");
    this.me =this.navParams.get("me");
    this.mename=this.me.firstName;
    this.meuid=this.me.uid;
    this.profilePictureme=this.me.photoURL;

    this.username =this.you.firstName;
    this.profilePicture =this.you.photoURL;
    this.uid =this.you.uid;
   this.ref = firebase.database().ref('chat');

  }


  handleSelection(event) {

    this.newmessage = this.newmessage + " " + event.char;
  }

  ionViewDidEnter(){

    this.io.getMessages(this.uid);



  }


  ionViewWillEnter() {

    this.events.subscribe('newmessage', () => {
      this.messagesList = [];
      this.zone.run(() => {

        this.messagesList = this.io.messages;
        console.log(this.messagesList);


      })

      this.scrollToBottom();
    })





  }
  send(){
    this.ref.push({
      name:this.mename,
      message: this.newmessage,
      sendTo:  this.uid,
      datemss:new Date().toLocaleString(),
      profilePicture:this.profilePictureme,
      uid: this.meuid,
      status:'pending'
    }).then(suc=>{

        this.newmessage ="";
        this.scrollToBottom();
    });

  }




  scrollToBottom() {
    setTimeout(() => {

      if (this.content._scroll) {
        this.content.scrollToBottom(0);
      }
    }, 400)
  }





}

