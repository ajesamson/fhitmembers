import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Departments } from '../../config/departments';

@Component({
  selector: 'filter',
  templateUrl: 'filter.html'
})
export class FilterComponent {
  memberStatus = 'all';
  memberDepartmentStatus = 'all';
  departments = Departments;

  constructor(private viewCtrl: ViewController, private navParams: NavParams) {}

  ngOnInit() {
    if (this.navParams.data) {
      this.memberStatus = this.navParams.data.memberStatus;
      this.memberDepartmentStatus = this.navParams.data.memberDepartmentStatus;
    }
  }

  /**
   * Closes the filter popover
   */
  closeFilter() {
    this.viewCtrl.dismiss(this.memberStatus, this.memberDepartmentStatus);
  }
}
