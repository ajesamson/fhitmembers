import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';
import { File } from '@ionic-native/file';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from '../config/firebase.credentials';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicImageLoader } from 'ionic-image-loader';
import { HttpModule } from '@angular/http';
import { DatePicker } from '@ionic-native/date-picker';

import { MyApp } from './app.component';
import { CameraProvider } from '../providers/camera/camera';
import { MemberProvider } from '../providers/member/member';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { FilterComponent } from '../components/filter/filter';
import { PictureSourceComponent } from '../components/picture-source/picture-source';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MemberImportProvider } from '../providers/member/member-import';
import { BirthdayNotificationProvider } from '../providers/birthday-notification/birthday-notification';

@NgModule({
  declarations: [MyApp, FilterComponent, PictureSourceComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpModule,
    IonicImageLoader.forRoot(),
    IonicModule.forRoot(MyApp)
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
    File,
    GooglePlus,
    NativeStorage,
    CameraProvider,
    MemberProvider,
    NotificationsProvider,
    MemberImportProvider,
    DatePicker,
    BirthdayNotificationProvider
  ]
})
export class AppModule {}
