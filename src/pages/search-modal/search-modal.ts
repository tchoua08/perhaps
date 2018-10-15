import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,Searchbar } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';




@IonicPage()
@Component({
  selector: 'page-search-modal',
  templateUrl: 'search-modal.html',
})
export class SearchModalPage {
  @ViewChild('search') search: Searchbar;
  query ;
  startAt ;
  endAt;
  events = null;
  spinner = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController, private eventservice:EventsProvider) {
  }

  // ionViewDidLoad() {
  //   this.search.setFocus();
  // }

  // ngAfterViewChecked() {
  //   this.search.setFocus();
  // }

  onInput($event){
    let q = $event.target.value
    console.log(q);
    this.startAt = q;
    this.spinner = false;
    this.endAt = q+"\uf8ff";
    if(q==undefined || q==''){this.events = []}else{
      this.spinner = true;
      this.eventservice.searchEvent(this.startAt,this.endAt).then((events)=>{
        
        this.events = events;
        this.spinner = false;
      });
      
    }
  }

  gotoEvent(id){
    this.navCtrl.push('EventPage',{
      id:id
    });
   
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }

}
