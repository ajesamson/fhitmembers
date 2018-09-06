import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Member } from '../../../models/member/member.interface';

@IonicPage()
@Component({
  selector: 'page-member-detail',
  templateUrl: 'member-detail.html'
})
export class MemberDetailPage {
  member: Member;

  constructor(private navParams: NavParams) {}

  ionViewDidLoad() {
    this.member = this.navParams.get('member');
  }
}
