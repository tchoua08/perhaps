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

  public searchFocus:boolean;
  public users:any =null;
  public me:any =null;
  public userFilter:any =null;
constructor(public navCtrl: NavController, public navParams: NavParams,public chatservice:ChatProvider,
  public alertCtrl:AlertController,public events:Events,public toastCtrl:ToastController,public zone:NgZone,
  public userservice:UserProvider ) {


  }


  ionViewDidEnter(){

    this.userservice.getAllUser().then((res: any) => {

      this.users = res;
      this.userFilter=this.users;

    })

    this.userservice.getUser().then((res: any) => {
      this.me = res;

    })



    }

    getItems(ev: any) {
      // set val to the value of the searchbar
      let val = ev.target.value;

      if (val && val.trim() != '') {
        this.userFilter=this.userFilter.filter((item:any) => {
          return ((item.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1));
        })


      }
    if (val===''){ this.userFilter =this.users;}

    }

    goChat(user:any){

      this.navCtrl.push('ChatPage',{user:user,me:this.me});
    }

    goForum(){
      this.navCtrl.push('ForumPage',{me:this.me});
    }


}
