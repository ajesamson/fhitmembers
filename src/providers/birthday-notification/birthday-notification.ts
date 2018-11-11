import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { Member } from '../../models/member/member.interface';
import { AppConstants } from '../../app/app.constants';
import { NotificationsProvider } from '../notifications/notifications';

@Injectable()
export class BirthdayNotificationProvider {
  celebrants: string[];

  constructor(
    private notifications: NotificationsProvider,
    private platform: Platform,
    private storage: NativeStorage
  ) {}

  /**
   * Re-schedules or schedule member birthday notification after editing profile
   * @param member
   * @returns {Promise<void>}
   */
  async updateNotification(member: Member) {
    try {
      const plt = await this.platform.ready();
      if (plt) {
        const notificationParamsList = await this.getBirthDayNotificationParams(
          [member],
          true
        );
        await this.notifications.scheduleLocalNotification(
          notificationParamsList
        );
      }
    } catch (e) {
      this.handleError(e);
    }
  }

  /**
   * Adds birthday notification for members
   * @param members
   * @returns {Promise<void>}
   */
  async addNotification(members: Member[]) {
    try {
      const plt = await this.platform.ready();
      if (plt) {
        const notificationParamsList = await this.getBirthDayNotificationParams(
          members
        );

        if (notificationParamsList.length > 0) {
          await this.notifications.scheduleLocalNotification(
            notificationParamsList
          );

          await this.storage.setItem(AppConstants.CELEBRANTS, this.celebrants);
          console.log('stored celebrants => ', this.celebrants);
        }
      }
    } catch (e) {
      this.handleError(e);
    }
  }

  /**
   * Loads celebrants from Native storage
   * @returns {Promise<void>}
   */
  private async loadCelebrants() {
    try {
      this.celebrants = await this.storage.getItem(AppConstants.CELEBRANTS);
    } catch (e) {
      if (e.code !== 2) {
        // ITEM_NOT_FOUND
        this.handleError(e);
      }
    }
    console.log(
      'Existing scheduled celebrants => ' + JSON.stringify(this.celebrants)
    );
  }

  /**
   * Collates members notification details for scheduling
   * and stores scheduled member ids to localStorage
   * @param members
   * @param allowUpdate
   * @returns {Promise<Object[]>}
   */
  private async getBirthDayNotificationParams(
    members: Member[],
    allowUpdate: boolean = false
  ) {
    let iLocalNotification: object[] = [];
    let celebrantIndex: number;

    await this.loadCelebrants();
    members.forEach(member => {
      celebrantIndex = this.celebrants.indexOf(member.key);
      if (celebrantIndex >= 0 && !allowUpdate) {
        return;
      }

      const notificationId = celebrantIndex + 1 || this.celebrants.length + 1;
      const scheduleParams = BirthdayNotificationProvider.composeBirthdayNotification(
        member,
        notificationId
      );
      console.log(JSON.stringify(scheduleParams));
      this.celebrants.push(member.key);
      iLocalNotification.push(scheduleParams);
    });

    return iLocalNotification;
  }

  /**
   * Composes birthday notification details
   * @param member
   * @param id
   * @returns {{id: number, title: string, text: string, trigger: object, data: Member, icon: string}}
   */
  private static composeBirthdayNotification(member: Member, id: number) {
    const msg = `Today is ${member.firstName} ${member.lastName} birthday`;
    const birthDate = new Date(
      Date.parse(`${member.birthDate}, ` + new Date().getFullYear())
    );
    const scheduleTime = {
      month: birthDate.getMonth() + 1,
      day: birthDate.getDate(),
      hour: 8,
      minute: 0
    };

    return {
      id: id,
      title: 'Birthday Celebrant',
      text: msg,
      trigger: { count: 1, every: scheduleTime },
      data: member
    };
  }

  handleError(e) {
    console.log(e);
    this.notifications.showToast(e);
  }
}
