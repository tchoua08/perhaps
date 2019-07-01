import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})
export class ReviewsPage {


  evnts;
  empty = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventservice: EventsProvider,public loadingCtrl:LoadingController,
  public events:Events) {
    this.events.subscribe('newfollow',()=>{
      this.loadEvents();
    })
    this.loadEvents();

  }

  gotoEvent(id){
    this.navCtrl.push('EventPage',{
      id:id
    });
  }


  loadEvents(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    this.eventservice.getFollowingEvents().then((res:any)=>{
      this.evnts = res;
      console.log(this.evnts);
      
   }).catch(err=>{
     console.log(err);
   }); 

    loading.dismiss();
 }
   

 
  doRefresh(refresher) {
    
    this.loadEvents();    
   


    setTimeout(() => {
      refresher.complete();
      
    }, 1000);
  }

  unfollow(id,index,follows){
    console.log(follows);
    var temp = follows +=-1;
    this.eventservice.unfollow(id);
    this.eventservice.setFollowingCount(id,temp);
    this.evnts.splice(index,1);
  }



}
