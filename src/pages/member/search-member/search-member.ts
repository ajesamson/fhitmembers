import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Member } from '../../../models/member/member.interface';

@IonicPage()
@Component({
  selector: 'page-search-member',
  templateUrl: 'search-member.html'
})
export class SearchMemberPage {
  memberList: Member[];
  memberStatus: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.memberList = this.navParams.get('memberList');
    this.memberStatus = this.navParams.get('memberStatus');
  }
}
