import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
// import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { FIREBASE_CONFIG } from './app.firebase.config';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth'

import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { CardProvider } from '../providers/card/card';
import { ChatProvider } from '../providers/chat/chat';
import { EventsProvider } from '../providers/events/events';
// import { NetworkProvider } from '../providers/network/network';
import { StorageProvider } from '../providers/storage/storage';


import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path'
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Facebook } from '@ionic-native/facebook'
import { PayPal} from '@ionic-native/paypal';
import { FCM } from '@ionic-native/fcm';
import { Crop } from '@ionic-native/crop';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { PinDialog } from '@ionic-native/pin-dialog';
import { ImagePicker } from '@ionic-native/image-picker';



@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsHideOnSubPages:true,scrollPadding: false,
      scrollAssist: false}),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider,
    ImghandlerProvider,
    FileChooser,
    CardProvider,
    FilePath,
    File,
    ChatProvider,
    EventsProvider,
    SocialSharing,
    LaunchNavigator,
    StorageProvider,
    PinDialog,
    Facebook,
    Crop,
    ImagePicker,
    PayPal,
    FCM

  ]
})
export class AppModule {}
