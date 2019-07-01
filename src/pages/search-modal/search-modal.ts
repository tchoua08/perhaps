import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,Searchbar } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { ConditionalExpr } from '@angular/compiler';




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
  searchDate = null ;
  when :string = "search";
  search_type;
  results = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController, private eventservice:EventsProvider) {
  }

  ionViewDidLoad() {
    this.eventservice.getTodayEvents().then((res)=>{
      this.events = res ;
      console.log(this.events);
    });

    this.search_type="byName";
  }

  // ngAfterViewChecked() {
  //   this.search.setFocus();
  // }

  onInput($event){
    let q = $event.target.value
    console.log(q);
    this.startAt = q;
    this.spinner = false;
    this.endAt = q+"\uf8ff";
    if(q==undefined || q==''){this.results = []}else{
      this.spinner = true;
      this.eventservice.searchEvent(this.startAt,this.endAt).then((events:any)=>{
        console.log(events);
        this.results = events;
        this.spinner = false;
      });
      
    }
  }

  onChange(){
    this.results = [];
  }

  gotoEvent(id){
    this.navCtrl.push('EventPage',{
      id:id
    });
   
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }

  searchEvent(){
    console.log(this.searchDate);
  }
}
