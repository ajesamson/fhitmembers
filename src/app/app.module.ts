import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';

import { MyApp } from './app.component';
import { CameraProvider } from '../providers/camera/camera';
import { MemberProvider } from '../providers/member/member';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { FilterComponent } from '../components/filter/filter';
import { PictureSourceComponent } from '../components/picture-source/picture-source';

@NgModule({
  declarations: [MyApp, FilterComponent, PictureSourceComponent],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
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
