import { Component } from '@angular/core';
import { Platform ,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';
// import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage:Storage,
    private network:Network,public events: Events,private networkProvider:NetworkProvider) {
    platform.ready().then(() => {

      this.networkProvider.initializeNetworkEvents();

      // Offline event
   this.events.subscribe('network:offline', () => {
       alert('network:offline ==> '+this.network.type);    
   });

   // Online event
   this.events.subscribe('network:online', () => {
       alert('network:online ==> '+this.network.type);        
   });
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
