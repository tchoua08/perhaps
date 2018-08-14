import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';


import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path'
import { File } from '@ionic-native/file';


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
import { NetworkProvider } from '../providers/network/network'; //firebase setup


import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsHideOnSubPages:true,scrollPadding: false,
      scrollAssist: false}),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicStorageModule.forRoot(),
    AngularFireAuthModule,
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
    Network,
    NetworkProvider,
    LaunchNavigator

  ]
})
export class AppModule {}