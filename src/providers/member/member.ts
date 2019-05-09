import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { Platform } from 'ionic-angular';
import * as moment from 'moment';

import { Member } from '../../models/member/member.interface';
import { AppConstants } from '../../app/app.constants';

@Injectable()
export class MemberProvider {
  private memberListRef = this.db.list<Member>('members', ref =>
    ref.orderByChild('lastName')
  );

  constructor(
    private db: AngularFireDatabase,
    private storage: NativeStorage,
    private platform: Platform
  ) {}

  /**
   * Retrieves list of member details
   *
   * @returns {AngularFireList<Member>}
   */
  getMembers(memberStatus: string) {
    if (memberStatus === 'true' || memberStatus === 'false') {
      const status = memberStatus === 'true';
      return this.db.list<Member>('members', ref =>
        ref.orderByChild('status').equalTo(status)
      );
    }

    return this.memberListRef;
  }

  /**
   * Adds a new member data
   *
   * @param member
   * @returns {database.ThenableReference}
   */
  addMember(member: Member) {
    return this.memberListRef.push(member);
  }

  /**
   * Updates member profile
   *
   * @param member
   * @returns {Promise<void>}
   */
  updateMember(member: Member) {
    return this.memberListRef.update(member.key, member);
  }

  /**
   * Searches members list by firstName property
   *
   * @param query
   * @returns {AngularFireList<T>}
   */
  searchMember(query: string) {
    return this.db.list('members', ref =>
      ref.orderByChild('firstName').equalTo(query)
    );
  }

  /**
   * Retrieves the list of celebrants
   *
   * @param members
   * @returns {{dayCelebrants: Array, upcomingCelebrants: Array, laterInMonthCelebrants: Array}}
   */
  getBirthDayCelebrants(members: Member[]) {
    let dayCelebrants = [];
    let upcomingCelebrants = [];
    let laterInMonthCelebrants = [];

    members.forEach(member => {
      // TODO: Revamp date formatting to default YYYY-MM-DD
      const birthMonthDay = member.birthDate.split(' ');
      const birthDay =
        birthMonthDay[1].length === 1
          ? '0' + birthMonthDay[1]
          : birthMonthDay[1];
      const memberBirth =
        moment().year() +
        '-' +
        AppConstants.MONTHS[birthMonthDay[0]] +
        '-' +
        birthDay;
      const birthDate = moment(memberBirth);
      const now = moment();

      if (member.status === false || now.isAfter(birthDate, 'day')) {
        return;
      }

      if (
        birthDate.diff(now, 'days') === 0 &&
        birthDate.date() === now.date()
      ) {
        dayCelebrants.push(member);
        return;
      }

      if (birthDate.isBetween(now, moment().add(8, 'days'))) {
        upcomingCelebrants.push(member);
        return;
      }

      if (birthDate.month() === now.month()) {
        laterInMonthCelebrants.push(member);
      }

      return;
    });

    return {
      dayCelebrants: dayCelebrants,
      upcomingCelebrants: upcomingCelebrants,
      laterInMonthCelebrants: laterInMonthCelebrants
    };
  }

  /**
   * Stores member data offline
   *
   * @param members
   * @returns {Promise<any>}
   */
  async storeMemberOffline(members: Member[]) {
    // TODO: Change native storage to sqlite
    const plt = await this.platform.ready();
    if (plt) {
      return await this.storage.setItem(AppConstants.MEMBERS_LIST, members);
    }
  }

  /**
   * Fetches all offline member data
   *
   * @returns {Promise<any>}
   */
  async getOfflineMembers() {
    const plt = await this.platform.ready();
    if (plt) {
      return await this.storage.getItem(AppConstants.MEMBERS_LIST);
    }
  }

  /**
   * Filters member list by specified property, using a query string
   * @param members
   * @param filter
   * @returns {Member[]}
   */
  filterMemberList(
    members: Member[],
    filter: { filterBy: string; query: any }
  ) {
    return members.filter(member => {
      return member[filter.filterBy] === filter.query;
    });
  }

  /**
   * Filters member list by department
   * @param members
   * @param memberDepartment
   */
  filterByDepartment(members: Array<Member>, memberDepartment): Array<Member> {
    return members.filter(member => {
      return member.department.includes(memberDepartment);
    });
  }
}
