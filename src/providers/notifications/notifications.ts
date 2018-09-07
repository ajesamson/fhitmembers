import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';

import { AppConstants } from '../../app/app.constants';
import { Member } from '../../models/member/member.interface';

@Injectable()
export class NotificationsProvider {
  monthCelebrants: object;

  constructor(
    private localNotifications: LocalNotifications,
    private platform: Platform,
    private storage: NativeStorage
  ) {}

  /**
   * Clears all scheduled notifications
   */
  async clearAllNotificationList() {
    const plt = await this.platform.ready();
    if (plt) {
      await this.localNotifications.clearAll();
      await this.storage.remove(AppConstants.CELEBRANTS);
    }
  }

  /**
   * Schedules birthday for current month and log members id to localStorage
   *
   * @param members
   *
   * {
   *   celebrants: {
   *     0: ['_Inaiw32', '_Ijwi921'],
   *     1: ['_K823ew', '_O99232'],
   *   }
   *}
   */
  async scheduleBirthDayNotification(members: Member[]) {
    try {
      const notificationParamsList = await this.getBirthDayNotificationParams(
        members
      );
      if (notificationParamsList.length > 0) {
        this.localNotifications.schedule(notificationParamsList);
        await this.storage.setItem(AppConstants.CELEBRANTS, this.monthCelebrants);
      }
    } catch (e) {
      NotificationsProvider.handleError(e);
    }
  }

  /**
   * Collates members notification details for scheduling
   * and stores scheduled member ids to localStorage
   *
   * @param members
   */
  async getBirthDayNotificationParams(members: Member[]) {
    const month = new Date().getMonth();
    let notificationParamsList = [];

    await this.storage
      .getItem(AppConstants.CELEBRANTS)
      .then(scheduledCelebrants => {
        this.monthCelebrants = scheduledCelebrants || {};
        console.log('month celebrants => ' + this.monthCelebrants);

        members.forEach(member => {
          if (
            this.monthCelebrants[month] !== undefined &&
            this.monthCelebrants[month].indexOf(member.key) >= 0
          ) {
            return;
          }

          const scheduleParams = NotificationsProvider.composeBirthdayNotification(
            member
          );
          this.monthCelebrants[month]
            ? this.monthCelebrants[month].push(member.key)
            : (this.monthCelebrants[month] = [member.key]);
          notificationParamsList.push(scheduleParams);
        });
      });

    return notificationParamsList;
  }

  /**
   * Composes birthday notification details
   *
   * @param member
   * @returns {{title: string, text: string, trigger: {at: Date}, data: Member}}
   */
  static composeBirthdayNotification(member: Member) {
    const msg = `Today is ${member.firstName} ${member.lastName} birthday`;
    const birthDate = Date.parse(
      `${member.birthDate}, ` + new Date().getFullYear()
    );
    const scheduleTime = new Date(new Date(birthDate).setHours(7));

    return {
      title: 'Birthday Celebrant',
      text: msg,
      trigger: { at: scheduleTime },
      data: member
    };
  }

  static handleError(e) {
    console.log(JSON.stringify(e));
  }
}
