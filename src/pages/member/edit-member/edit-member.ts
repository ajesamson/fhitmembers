import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Member } from '../../../models/member/member.interface';
import { NotificationsProvider } from '../../../providers/notifications/notifications';
import { MemberProvider } from '../../../providers/member/member';
import { AppConstants } from '../../../app/app.constants';
import { MemberImportProvider } from '../../../providers/member/member-import';
import { BirthdayNotificationProvider } from '../../../providers/birthday-notification/birthday-notification';

@IonicPage()
@Component({
  selector: 'page-edit-member',
  templateUrl: 'edit-member.html'
})
export class EditMemberPage {
  member: Member;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private notificationProvider: NotificationsProvider,
    private memberProvider: MemberProvider,
    private memberImportProvider: MemberImportProvider,
    private birthdayProvider: BirthdayNotificationProvider
  ) {}

  ionViewDidLoad() {
    this.member = this.navParams.get('member');
  }

  /**
   * Updates member details.
   * Clears all notification and celebrants list for existing members
   *
   * @param updatedMemberData
   * @returns {Promise<void>}
   */
  async onMemberModified(updatedMemberData: Member) {
    if (updatedMemberData.key !== undefined) {
      this.memberProvider.updateMember(updatedMemberData).then(() => {
        this.notificationProvider.showToast(
          AppConstants.SUCCESS_MESSAGE.updated
        );
      });

      await this.birthdayProvider.updateNotification(this.member);
    }

    if (updatedMemberData.key === undefined) {
      const previewData = { member: this.member, updatedMemberData };
      this.memberImportProvider.previewUpdated.next(previewData);
    }

    this.navCtrl.pop().catch(EditMemberPage.handleError);
  }

  static handleError(err) {
    console.log(JSON.stringify(err));
  }
}
