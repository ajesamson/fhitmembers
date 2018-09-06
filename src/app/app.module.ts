import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicImageLoader } from 'ionic-image-loader';

import { MyApp } from './app.component';
import { CameraProvider } from '../providers/camera/camera';
import { MemberProvider } from '../providers/member/member';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { FilterComponent } from '../components/filter/filter';
import { PictureSourceComponent } from '../components/picture-source/picture-source';
import {AngularFireStorageModule} from "angularfire2/storage";

@NgModule({
  declarations: [MyApp, FilterComponent, PictureSourceComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    IonicImageLoader.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, FilterComponent, PictureSourceComponent],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LocalNotifications,
    Network,
    Camera,
    NativeStorage,
    CameraProvider,
    MemberProvider,
    NotificationsProvider
  ]
})
export class AppModule {}
