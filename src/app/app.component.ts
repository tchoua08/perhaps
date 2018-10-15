import { Component } from '@angular/core';
import { Platform ,Events,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';
import { usercreds } from '../models/interfaces/usercreds';

// import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ="LoginPage" ;
  credentials = {} as usercreds;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
   public events: Events,private storage:Storage,public authservice :AuthProvider,public alertCtrl:AlertController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

       this.credentials.email='';
       this.credentials.password='';
      
      // setTimeout(() => {
      //   this.storage.get('perhaps_credentials').then((val) => {
          
      //     if(val == null){
      //       this.rootPage = 'LoginPage';
      //     }else{
      //       this.credentials.email = val.email;
      //       this.credentials.password = val.password;
      //       this.authservice.login(this.credentials).then((res:any)=>{
              
      //       }).catch(err=>{
      //         this.presentAlert();
             
      //       })
      //       this.rootPage = 'TabsPage';
      //     }
    
      //   })
      // },150); 
    });
  }

  checkAuth(){
    this.storage.get('perhaps_credentials').then((val) => {
      console.log(val);
      if(val == null){
        this.rootPage = 'LoginPage';
      }else{
        this.rootPage = 'TabsPage';
      }

    })
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'You are currently offline',
      subTitle: 'Please connect to the Internet and try again',
      buttons: ['Ok']
    });
    alert.present();
  }
}
