import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Member } from '../../../models/member/member.interface';

@IonicPage()
@Component({
  selector: 'page-add-member',
  templateUrl: 'add-member.html'
})
export class AddMemberPage {
  member = {} as Member;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  onMemberModified() {
    this.navCtrl.setRoot('MembersListPage').catch(error => console.log);
  }
}
