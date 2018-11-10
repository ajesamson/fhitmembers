import { Injectable } from '@angular/core';
import {
  ILocalNotification,
  LocalNotifications
} from '@ionic-native/local-notifications';
import { NativeStorage } from '@ionic-native/native-storage';
import {
  AlertController,
  LoadingController,
  Platform,
  ToastController
} from 'ionic-angular';

import { AppConstants } from '../../app/app.constants';

@Injectable()
export class NotificationsProvider {
  celebrants: string[];

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private localNotifications: LocalNotifications,
    private platform: Platform,
    private storage: NativeStorage
  ) {}

  /**
   * Clears local storage of scheduled birthday notifications
   * @returns {Promise<void>}
   */
  async clearScheduledNotifications() {
    try {
      const plt = await this.platform.ready();
      if (plt) {
        await this.localNotifications.clearAll();
        await this.storage.remove(AppConstants.CELEBRANTS);
      }
    } catch (e) {
      this.handleError(e);
    }
  }

  /**
   * Schedules local notification
   * @param notificationParamsList
   * @returns {Promise<void>}
   */
  async scheduleLocalNotification(
    notificationParamsList: ILocalNotification[]
  ) {
    try {
      const plt = await this.platform.ready();
      if (plt && notificationParamsList.length > 0) {
        this.localNotifications.schedule(notificationParamsList);
      }
    } catch (e) {
      this.handleError(e);
    }
  }

  handleError(e) {
    console.log(e);
    this.showToast(e);
  }

  /**
   * Shows loading spinner
   */
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present().catch(this.handleError);

    return loading;
  }

  /**
   * Shows notification to user
   *
   * @returns {Promise<void>}
   */
  async presentAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Dismiss']
    });

    await alert.present();
  }

  /**
   * Shows message in a toast
   * @param msg
   */
  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }
}
