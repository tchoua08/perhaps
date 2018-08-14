import { Component,ElementRef,ViewChild ,Input} from '@angular/core';
import { IonicPage, NavController, NavParams,Content,ViewController } from 'ionic-angular';
import {EventsProvider} from '../../providers/events/events'



@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  @ViewChild(Content)

 

  content: Content;
  hide="true";
  type;
   
    
  
  evnts;
  empty=false;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public viewCtrl: ViewController,public eventservice:EventsProvider) {
    this.type = this.navParams.get('type');
    
    this.eventservice.getEventByType(this.type).then((res: any) => {
      if(res.length == 0){
        this.empty = true;    
      }
      this.evnts = res;       
     })

     
  }
     
  doRefresh(){
    
  }

  ionViewWillEnter() {

  }

  gotoEvent(id){
    this.navCtrl.push('EventPage',{
      id:id
    });
   
  }


}
