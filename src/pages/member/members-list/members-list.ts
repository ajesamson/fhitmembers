import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  AlertController,
  FabContainer,
  IonicPage,
  LoadingController,
  NavController,
  PopoverController
} from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Member } from '../../../models/member/member.interface';
import { MemberProvider } from '../../../providers/member/member';
import { FilterComponent } from '../../../components/filter/filter';
import { NotificationsProvider } from '../../../providers/notifications/notifications';
import { AppConstants } from '../../../app/app.constants';

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
    private loadingCtrl: LoadingController,
    private network: Network,
    private alertCtrl: AlertController,
    private notificationProvider: NotificationsProvider,
    private memberProvider: MemberProvider
  ) {}

  async ionViewDidLoad() {
    this.memberStatus = AppConstants.MEMBER_STATUS.all;
    await this.loadMemberData();
  }

  async refreshPage(refresher) {
    await this.loadMemberData();
    refresher.complete();
  }

  /**
   * Loads member data depending on network status
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
        this.updateMemberList();
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
    let loading = this.presentLoadingDefault();
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
          this.notificationProvider.scheduleBirthDayNotification(
            this.celebrantList.upcomingCelebrants
          ).catch(e => MembersListPage.handleError(e));
        }
      });
  }

  /**
   * Retrieves offline member list and notify user of no internet connection
   *
   * @returns {Promise<void>}
   */
  async getOfflineMemberList() {
    const loader = this.presentLoadingDefault();
    this.memberList = await this.memberProvider.getOfflineMembers();

    this.initCelebrantList(this.memberList);
    loader.dismissAll();
    await this.presentAlert();
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

  /**
   * Show loading spinner
   */
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present().catch(MembersListPage.handleError);

    return loading;
  }

  /**
   * Shows notification to user
   *
   * @returns {Promise<void>}
   */
  async presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'No Connection',
      subTitle: 'Please check your internet connection',
      buttons: ['Dismiss']
    });
    await alert.present();
  }

  static handleError(e) {
    console.log(JSON.stringify(e));
  }
}
