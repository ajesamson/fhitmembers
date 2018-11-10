import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FabContainer,
  IonicPage,
  NavController,
  PopoverController
} from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Member } from '../../../models/member/member.interface';
import { MemberProvider } from '../../../providers/member/member';
import { FilterComponent } from '../../../components/filter/filter';
import { NotificationsProvider } from '../../../providers/notifications/notifications';
import { AppConstants } from '../../../app/app.constants';
import { BirthdayNotificationProvider } from '../../../providers/birthday-notification/birthday-notification';

interface Celebrant {
  dayCelebrants?: Member[];
  upcomingCelebrants?: Member[];
  laterInMonthCelebrants?: Member[];
}

@IonicPage()
@Component({
  selector: 'page-members-list',
  templateUrl: 'members-list.html'
})
export class MembersListPage {
  memberList: Member[];
  memberStatus: string;
  celebrantList: Celebrant;
  celebrantExist = false;

  constructor(
    private nav: NavController,
    private popoverCtrl: PopoverController,
    private network: Network,
    private notificationProvider: NotificationsProvider,
    private memberProvider: MemberProvider,
    private birthdayProvider: BirthdayNotificationProvider
  ) {}

  async ionViewDidLoad() {
    this.memberStatus = AppConstants.MEMBER_STATUS.all;
    await this.loadMemberData();
  }

  /**
   * Refreshes page content
   *
   * @param refresher
   *
   * @returns {Promise<void>}
   */
  async refreshPage(refresher) {
    await this.loadMemberData();
    refresher.complete();
  }

  /**
   * Loads member data depending on network status
   *
   * @returns {Promise<void>}
   */
  async loadMemberData() {
    if (this.network.type === 'none') {
      await this.getOfflineMemberList();

      return;
    }

    this.updateMemberList();
  }

  /**
   * Pops up a filter window for members filtering
   *
   * @param filterEvent
   */
  showFilter(filterEvent) {
    let filterPopover = this.popoverCtrl.create(FilterComponent, {
      memberStatus: this.memberStatus
    });
    filterPopover.present({
      ev: filterEvent
    });

    filterPopover.onDidDismiss(memberStatus => {
      if (this.memberStatus !== memberStatus && memberStatus !== null) {
        this.memberStatus = memberStatus;
        this.loadMemberData().catch(e => MembersListPage.handleError(e));
      }
    });
  }

  /**
   * Gives option of adding new member by import or manual input
   *
   * @param action
   * @param fab
   */
  newMember(action: string, fab: FabContainer) {
    if (action === AppConstants.NEW_MEMBER.add) {
      this.nav.push('AddMemberPage').catch(MembersListPage.handleError);
    } else {
      this.nav.push('ImportMemberPage').catch(MembersListPage.handleError);
    }

    fab.close();
  }

  /**
   * Loads all members or members by status
   */
  updateMemberList() {
    let celebrants: Member[] = [];
    let loading = this.notificationProvider.presentLoadingDefault();
    this.memberProvider
      .getMembers(this.memberStatus)
      .snapshotChanges()
      .subscribe(data => {
        loading.dismiss().catch(MembersListPage.handleError);
        this.memberList = data.map(ch => ({
          key: ch.payload.key,
          ...ch.payload.val()
        }));
        if (this.memberStatus === AppConstants.MEMBER_STATUS.all) {
          this.storeMemberListOffline();
          this.initCelebrantList(this.memberList);
          celebrants = [
            ...this.celebrantList.dayCelebrants,
            ...this.celebrantList.upcomingCelebrants
          ];
          this.birthdayProvider
            .addNotification(celebrants)
            .catch(e => MembersListPage.handleError(e));
        }
      });
  }

  /**
   * Retrieves offline member list and notify user of no internet connection
   *
   * @returns {Promise<void>}
   */
  async getOfflineMemberList() {
    try {
      const loader = this.notificationProvider.presentLoadingDefault();
      this.memberList = await this.memberProvider.getOfflineMembers();

      this.initCelebrantList(this.memberList);
      if (this.memberStatus !== AppConstants.MEMBER_STATUS.all) {
        this.memberList = this.memberProvider.filterMemberList(
          this.memberList,
          { filterBy: 'status', query: this.memberStatus === 'true' }
        );
      }
      loader.dismissAll();
      this.notificationProvider.showToast(
        AppConstants.LIMITED_INTERNET_CONNECTION
      );
    } catch (e) {
      MembersListPage.handleError(e);
    }
  }

  /**
   * Initializes the celebrants list
   * @param memberList
   */
  initCelebrantList(memberList: Member[]) {
    this.celebrantList = this.memberProvider.getBirthDayCelebrants(memberList);

    if (
      this.celebrantList.dayCelebrants.length > 0 ||
      this.celebrantList.upcomingCelebrants.length > 0 ||
      this.celebrantList.laterInMonthCelebrants.length > 0
    ) {
      this.celebrantExist = true;
    }
  }

  /**
   * Save or update offline member details
   */
  storeMemberListOffline() {
    this.memberProvider
      .storeMemberOffline(this.memberList)
      .catch(MembersListPage.handleError);
  }

  static handleError(e) {
    console.log(JSON.stringify(e));
  }
}
