import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';
import * as _ from 'lodash';

import { AppConstants } from '../../app/app.constants';
import { Member } from '../../models/member/member.interface';

@Injectable()
export class NotificationsProvider {
  celebrants: string[];

  constructor(
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
      NotificationsProvider.handleError(e);
    }
  }

  /**
   * Re-schedules or schedule member notification after editing
   * @param member
   * @returns {Promise<void>}
   */
  async updateMemberNotification(member: Member) {
    try {
      const plt = await this.platform.ready();
      if (plt) {
        let celebrantList = await this.storage.getItem(AppConstants.CELEBRANTS);
        const memberNotificationIndex = _.indexOf(celebrantList, member.key);

        if (memberNotificationIndex >= 0) {
          celebrantList = _.pull(
            celebrantList,
            celebrantList[memberNotificationIndex]
          );
          await this.storage.setItem(AppConstants.CELEBRANTS, celebrantList);
        }

        this.scheduleBirthDayNotification([member]);
      }
    } catch (e) {
      NotificationsProvider.handleError(e);
    }
  }

  /**
   * Schedules birthday for current month and log members id to localStorage
   *
   * @param members
   *
   * {
   *   celebrants: [
   *     ['_K823ew', '_O99232'],
   *   ]
   *}
   */
  async scheduleBirthDayNotification(members: Member[]) {
    try {
      const plt = await this.platform.ready();
      if (plt) {
        const notificationParamsList = await this.getBirthDayNotificationParams(
          members
        );

        if (notificationParamsList.length > 0) {
          this.localNotifications.schedule(notificationParamsList);

          await this.storage.setItem(AppConstants.CELEBRANTS, this.celebrants);
        }
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
    let notificationParamsList = [];
    this.celebrants = [];

    try {
      this.celebrants = await this.storage.getItem(AppConstants.CELEBRANTS);
    } catch (e) {
      if (e.code !== 2) {
        // ITEM_NOT_FOUND
        NotificationsProvider.handleError(e);
      }
    }
    console.log(
      'Existing scheduled celebrants => ' + JSON.stringify(this.celebrants)
    );

    members.forEach(member => {
      if (_.indexOf(this.celebrants, member.key) >= 0) {
        return;
      }

      const scheduleParams = NotificationsProvider.composeBirthdayNotification(
        member,
        this.celebrants.length + 1
      );
      this.celebrants.push(member.key);
      notificationParamsList.push(scheduleParams);
    });

    return notificationParamsList;
  }

  /**
   * Composes birthday notification details
   *
   * @param member
   * @param id
   * @returns {{title: string, text: string, trigger: {at: Date}, data: Member}}
   */
  static composeBirthdayNotification(member: Member, id: number) {
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
      data: member,
      icon: member.avatar
    };
  }

  static handleError(e) {
    console.log(e);
  }
}
