import { Component,ViewChild} from '@angular/core';
import { AlertController,LoadingController,ModalController,IonicPage, NavController, NavParams,Content,ViewController } from 'ionic-angular';
import {EventsProvider} from '../../providers/events/events';
/**
 * Generated class for the EditeventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'editevent'})
@Component({
  selector: 'page-editevent',
  templateUrl: 'editevent.html',
})
export class EditeventPage {
  @ViewChild(Content)



  content: Content;
  hide="true";
  type;



  evnts;
  empty=false;
  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public eventservice:EventsProvider) {
    this.type = this.navParams.get('type');
     console.log("valeur de this.type:"+this.type);
    this.eventservice.getEventByType(this.type).then((res: any) => {
      if(res.length == 0){
        this.empty = true;
      }
      this.evnts = res
     })


  }
  deleteEvent(id:any) {
    let alert = this.alertController.create({
      title: "Alert",
      message:"do you really want to delete this event?",
      buttons: [
        {
          text: "No",
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: "Yes",
          handler: () => {

            this.eventservice.deleteEventData(id);
          }
        }
      ]
    });
    alert.present();
  }


  updateEvent(id:any){

    this.navCtrl.push('updateevent',{
      id:id
    });

  }

  doRefresh(){

  }

  ionViewWillEnter() {

  }

  gotoEvent(id:any){
    this.navCtrl.push('EventPage',{
      id:id
    });

  }


}
