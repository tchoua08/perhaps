import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,Searchbar } from 'ionic-angular';


/**
 * Generated class for the SearchModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-modal',
  templateUrl: 'search-modal.html',
})
export class SearchModalPage {
  @ViewChild('search') search: Searchbar;
  query ;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController) {
  }

  // ionViewDidLoad() {
  //   this.search.setFocus();
  // }

  // ngAfterViewChecked() {
  //   this.search.setFocus();
  // }

  onInput($event){
    
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
