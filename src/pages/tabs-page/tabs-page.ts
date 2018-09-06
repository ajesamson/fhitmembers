import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  tab1Root: string;
  tab2Root: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1Root = 'MembersListPage';
    this.tab2Root = 'SmsPage';
  }
}
