import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Member } from '../../../models/member/member.interface';
import * as lodash from 'lodash';

@IonicPage()
@Component({
  selector: 'page-birthday-notifications',
  templateUrl: './birthday-notifications.html'
})
export class BirthdayNotificationsPage {
  dayCelebrants: Member[];
  upcomingCelebrants: Member[];
  laterInMonthCelebrants: Member[];

  constructor(private navParams: NavParams) {
    const celebrantList = this.navParams.get('celebrantList');
    this.dayCelebrants = lodash.sortBy(celebrantList.dayCelebrants, [
      BirthdayNotificationsPage.getMemberByBirthDate
    ]);
    this.upcomingCelebrants = lodash.sortBy(celebrantList.upcomingCelebrants, [
      BirthdayNotificationsPage.getMemberByBirthDate
    ]);
    this.laterInMonthCelebrants = lodash.sortBy(
      celebrantList.laterInMonthCelebrants,
      [BirthdayNotificationsPage.getMemberByBirthDate]
    );
  }

  ionViewDidLoad() {}

  /**
   * Callback function for pre-processing sort by birth date
   *
   * @param o
   * @returns {[number]}
   */
  static getMemberByBirthDate(o) {
    return [new Date(o.birthDate + ', ' + new Date().getFullYear()).getTime()];
  }
}
