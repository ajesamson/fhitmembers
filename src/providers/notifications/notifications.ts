import { Injectable } from '@angular/core';
import {
  ILocalNotification,
  LocalNotifications
} from '@ionic-native/local-notifications';
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
  ) {}

  /**
   * Clears local storage of scheduled birthday notifications
   * @returns {Promise<void>}
   */
  async clearScheduledNotifications() {
    try {
      const plt = await this.platform.ready();
      if (plt) {
        const cancelAll = await this.localNotifications.cancelAll();
        console.log('Clear status => ', cancelAll);
        await this.listScheduledNotifications();
      }
    } catch (e) {
      this.handleError(e);
    }
  }

  /**
   * Logs scheduled notification ids to console
   * @returns {Promise<void>}
   */
  async listScheduledNotifications() {
    try {
      const plt = await this.platform.ready();
      if (plt) {
        const scheduledIds = await this.localNotifications.getScheduledIds();
        console.log('Scheduled => ', scheduledIds);
        const triggered = await this.localNotifications.getTriggeredIds();
        console.log('All triggered => ', triggered);
        const allNotification = await this.localNotifications.getAll();
        console.log('All Notification => ', allNotification);
      }
    } catch (e) {
      this.handleError(e);
    }
  }

  /**
   * Retrieves all local notification object
   */
  async getAllLocalNotification() {
    try {
      const plt = await this.platform.ready();
      if (plt) {
        return await this.localNotifications.getAll();
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
