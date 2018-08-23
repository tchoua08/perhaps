import { Component } from '@angular/core';
import { Platform ,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';

// import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;
  credentials =null;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
   public events: Events,private storage:Storage,public authservice :AuthProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      
      setTimeout(() => {
        this.storage.get('perhaps_credentials').then((val) => {
          console.log(val);
          if(val == null){
            this.rootPage = 'LoginPage';
          }else{
            this.rootPage = 'TabsPage';
          }
    
        })
      },150); 
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
}
