import { Component,NgZone } from '@angular/core';
import { IonicPage,AlertController, NavController,LoadingController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import 'firebase/auth';
import 'firebase/database';
import {EventsProvider} from '../../providers/events/events';
declare var google;

/**
 * Generated class for the InformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'information'})
@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage {
  public event = {
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location:'',
    description:'',
    title:'',
    city:'',
    phone:'',
    price:'',
    type:''
  }
  public myPhotosRef: any;
  public ref:any;
  public type:any;
  imageResponse = [];
  options: any;
  fireDataRef:any;
  datepicker:any;
  minYear: any = new Date().getFullYear();
  maxYear: any = new Date().getFullYear() + 6;

  autocompleteItems: any;
  autocomplete: any;
  autocompleteItemsDest: any;
  autocompleteDest: any;
  acService:any=null;
  email:string="";
  locationDest:string="";
  location:string="";
  lieu: string;
  next:number=1;
  vehicule:string="";
  cacher : boolean = true ;
  map:any;
  markers:any[]= [];

  service:any;
  geocoder:any;
  source:any;
  dateTime:any;
  dataCovoiturage:any;

  villeDest:string="";
  placedestination:string="";




  constructor(private zone: NgZone,private alertController:AlertController,public eventpro:EventsProvider,public loadingCtrl: LoadingController,public imagePicker:ImagePicker,public navCtrl: NavController, public navParams: NavParams) {


    this.type =this.navParams.get("type");
    this.event.type=this.type;
    this.fireDataRef = this.eventpro.getFiredataRef().push();
    this.ref =this.fireDataRef.key;

    this.geocoder = new google.maps.Geocoder;
    this.markers = [];





  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationPage');
  }

  ngOnInit() {

    this.acService =new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };

    this.autocompleteItemsDest = [];
    this.autocompleteDest = {
      query: ''
    };


  }


  updateSearchDestination() {

    this.cacher = false;
    if (this.autocompleteDest.query == '') {
      this.autocompleteItemsDest = [];
      return;
    }
    let self = this;
    let config = {
      componentRestrictions: {country: ["uk"]},
      input: this.autocompleteDest.query,
    }

    this.acService.getPlacePredictions(config,(predictions, status)=> {
      self.autocompleteItemsDest = [];
      this.zone.run(() => {
        predictions.forEach(function (prediction) {
          self.autocompleteItemsDest.push(prediction);
        });
      })
    });
  }

  selectSearchResultDestination(item){

    let that =this;
    that.placedestination =item.description;
    this.clearMarkers();
    this.autocompleteItemsDest = [];
    that.event.location=item.description;
    this.locationDest=item.description;
    this.autocompleteDest.query=item.description;


  }


  clearMarkers() {
    this.setMapOnAll(null);
  }

  setMapOnAll(map) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  getVille(location){

    let re = /,/gi;
    let objetmap:string[];
    this.lieu =location;
    this.lieu=this.lieu.toString();
    this.lieu =this.lieu.replace(re, "/");
    objetmap=this.lieu.split("/");
    return  objetmap[0];

  }

  getVilleMin(location){

    let re = /,/gi;
    let objetmap:string[];
    let ville:string="";
    this.lieu =location;
    this.lieu=this.lieu.toString();
    this.lieu =this.lieu.replace(re, "/");
    objetmap=this.lieu.split("/");
    if(objetmap.length ===2){

      ville =objetmap[0];


    }else if(objetmap.length ===1){

      ville=objetmap[0];



    }else if(objetmap.length===3){

      ville=objetmap[1];

    }else if(objetmap.length===4){

      ville=objetmap[2];

    }else if(objetmap.length===5){

      ville=objetmap[3];

    }else if(objetmap.length===6){

      ville=objetmap[4];

    }

    ville =ville.toLowerCase();
    ville= ville.replace(/ /g,"");
    ville =this.removeAccents(ville);
    return ville;


  }

  removeAccents(str) {
    let accents = 'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    let accentsOut = "AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    str = str.split('');
    str.forEach((letter, index) => {
      let i = accents.indexOf(letter);
      if (i != -1) {
        str[index] = accentsOut[i];
      }
    })
    return str.join('');
  }

  save(){

    let loader = this.loadingCtrl.create({

      content: "Thank you for waiting..",
      duration: 6000

      });
      loader.present();

      this.event.city=this.getVille(this.placedestination);

    this.eventpro.setEvents(this.event,this.ref).then(res=>{
      loader.dismiss();

      let alert = this.alertController.create({
        title:"Alert",
        message:"Successful recording",
        buttons: [

          {
            text: 'Ok',
            handler: () => {

                this.event.startDate= '';
                this.event.startTime= '';
                this.event.endDate= '';
                this.event.endTime= '';
                this.event.location='';
                this.event.description='';
                this.event.title='';
                this.event.phone='';
                this.autocompleteDest.query= '';
                this.event.price='';
                this.event.type='';
                this.event.city='';
                this.imageResponse =[];


            }
          }
        ]
      })
      alert.present();

    },err=>{
      alert(JSON.stringify(err));
      loader.dismiss();
    })
  }

  getPic() {
    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 3,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 200,

      //height: 200,

      // quality of resized image, defaults to 100
      quality: 95,

      // output type, defaults to FILE_URIs.
      // available options are
      // window.imagePicker.OutputType.FILE_URI (0) or
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };
    this.imageResponse = [];

      this.imagePicker.getPictures(this.options).then((results) => {
        for (var i = 0; i < results.length; i++) {

          this.imageResponse.push('data:image/jpeg;base64,' + results[i]);

        }
          if(this.imageResponse.length!=0){
             this.finish();
          }


      }, (err) => {
        alert(err);
      });



  }

  finish() {



        this.eventpro.createRequest(this.imageResponse,this.ref);
  }

}
