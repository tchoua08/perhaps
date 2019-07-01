import { Component,ViewChild,ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams ,Content, ToastController} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import {EventsProvider} from '../../providers/events/events';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';





@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
  
})
export class EventPage {
  event = {
    title:'',
    description:'',
    following:null,
    startDate:'',
    ticket_price:'',
    address:'',
    endDate:'',
    image:null,
  }
  buttonColor = null;
  color = null;
  icolor = null;

  tickets=0;
  id = null;
  following=null;

  showMoreButton=false;
  showButtonTag ="Show More";
  show_more = true;
  description = '';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public ref: ChangeDetectorRef,private socialSharing: SocialSharing,
    public eventservice:EventsProvider,private launchNavigator:LaunchNavigator,public toastCtrl:ToastController) {
      this.id = this.navParams.get('id');
      this.eventservice.getEventById(this.id).then((res:any)=>{
        this.event.title = res.title;
        this.event.description = res.description;
      
        if(res.description.length > 200){
          this.showMoreButton = true; 
          this.description = res.description.slice(0,200);
        }
        this.description = res.description.slice(0,200);
        this.event.ticket_price = res.ticket_price;
        this.event.startDate = res.startDate;
        this.event.address = res.address + "," + res.city;
        this.event.following = res.following;
        this.event.endDate = res.endDate;
        this.event.image = res.image;
        this.event.following = res.following;
    })
    this.eventservice.checkIfFollow(this.id).then((res:any)=>{
       this.following = res;
       if(res == true){ this.buttonColor = '#1d334a',  this.color = '#FFFFFF'}else{ this.icolor='#1d334a'}
     })
  }

  ionViewDidLoad() {
  
  }

  addTicket(){
    this.tickets ++;
  }

  removeTicket(){
    if(this.tickets <= 0 ){
      return;
    }else{
      this.tickets --;
    }
    
  }

  follow(){
    /* Follow event */
    if(this.following == false){
      this.buttonColor = '#1d334a';
      this.color = "#FFFFFF"
      this.icolor = null;
      var  follows = this.event.following +=1
      this.eventservice.followEvent(this.id).then(()=>{
       
      }).catch((err)=>{
        alert(err);
      });  
      this.eventservice.setFollowingCount(this.id,follows);
      this.following = true;
    } else {


      var  follows = this.event.following +=-1
      this.eventservice.unfollow(this.id);
      this.eventservice.setFollowingCount(this.id,follows);
      this.buttonColor ='#FFFFFF';
      this.color  = null
      this.following = false;
      this.icolor ='#1d334a' 

    }
  
  }

  launchMaps(){
    this.launchNavigator.navigate(this.event.address).then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }
  

  bookTicket(){
    if(this.tickets <=0){
      let toast = this.toastCtrl.create({
        message: 'Please enter the amount of tickets you want to book',
        duration: 3000,
        position: 'top'
      });
     toast.present();
    }else{
      this.navCtrl.push('PaymentPage',{
        event:this.event,
        tickets:this.tickets
      })
    }
   
  }

  share(){
    this.socialSharing.share("Event");
  }

  back(){
    this.navCtrl.pop();
  }

  showMore(){
    if(this.show_more == true){
      this.description = this.event.description;
      this.showButtonTag = "Show Less";
      this.show_more = false;
    }else{
      this.description  = this.event.description.slice(0,200);
      this.showButtonTag = "Show More";
      this.show_more = true;
    }
  }


}

