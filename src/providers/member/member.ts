import { Injectable } from '@angular/core';
import { Member } from '../../models/member/member.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { AppConstants } from '../../app/app.constants';

@Injectable()
export class MemberProvider {
  private memberListRef = this.db.list<Member>('members', ref =>
    ref.orderByChild('lastName')
  );

  constructor(private db: AngularFireDatabase, private storage: Storage) {}

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
      const birthDate = moment(
        member.birthDate + ', ' + new Date().getFullYear()
      );
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
    await this.storage.ready();
    return await this.storage.set(
      AppConstants.MEMBERS_LIST,
      JSON.stringify(members)
    );
  }

  /**
   * Fetches all offline member data
   *
   * @returns {Promise<any>}
   */
  async getOfflineMembers() {
    await this.storage.ready();
    const membersList = await this.storage.get(AppConstants.MEMBERS_LIST);
    return JSON.parse(membersList);
  }
}
