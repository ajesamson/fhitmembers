import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'filter',
  templateUrl: 'filter.html'
})
export class FilterComponent {
  memberStatus = 'all';

  constructor(private viewCtrl: ViewController, private navParams: NavParams) {}

  ngOnInit() {
    if (this.navParams.data) {
      this.memberStatus = this.navParams.data.memberStatus;
    }
  }

  /**
   * Closes the filter popover
   */
  closeFilter() {
    this.viewCtrl.dismiss(this.memberStatus);
  }
}
