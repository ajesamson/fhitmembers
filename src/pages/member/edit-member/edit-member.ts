import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Member } from '../../../models/member/member.interface';
import { NotificationsProvider } from '../../../providers/notifications/notifications';

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
    private notificationProvider: NotificationsProvider
  ) {}

  ionViewDidLoad() {
    this.member = this.navParams.get('member');
  }

  /**
   * Clears all notification and celebrants list
   *
   * @returns {Promise<void>}
   */
  async onMemberModified() {
    await this.notificationProvider.updateMemberNotification(this.member);
    this.navCtrl.pop().catch(EditMemberPage.handleError);
  }

  static handleError(err) {
    console.log(JSON.stringify(err));
  }
}
