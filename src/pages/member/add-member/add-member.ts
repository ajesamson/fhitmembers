import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Member } from '../../../models/member/member.interface';
import { MemberProvider } from '../../../providers/member/member';
import { NotificationsProvider } from '../../../providers/notifications/notifications';
import { AppConstants } from '../../../app/app.constants';

@IonicPage()
@Component({
  selector: 'page-add-member',
  templateUrl: 'add-member.html'
})
export class AddMemberPage {
  member = {} as Member;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private notificationsProvider: NotificationsProvider,
    private memberProvider: MemberProvider
  ) {}

  /**
   * Receives member modified event and adds new member details
   *
   * @param memberData
   */
  onMemberModified(memberData: Member) {
    this.memberProvider.addMember(memberData);
    this.notificationsProvider.showToast(AppConstants.SUCCESS_MESSAGE.added);
    this.navCtrl.setRoot('MembersListPage').catch(error => console.log);
  }
}
