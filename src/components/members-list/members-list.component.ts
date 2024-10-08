import { Component, Input, OnChanges } from '@angular/core';
import { Member } from '../../models/member/member.interface';
import { AppConstants } from '../../app/app.constants';

@Component({
  selector: 'app-members-list',
  templateUrl: 'members-list.component.html'
})
export class MembersListComponent implements OnChanges {
  @Input()
  memberList: Member[];
  @Input()
  memberStatus: string;
  @Input()
  memberDepartmentStatus: string;
  @Input()
  listsHeader: string;
  memberListHeader: string;

  constructor() {}

  ngOnChanges() {
    if (this.memberStatus === AppConstants.MEMBER_STATUS.all) {
      this.memberListHeader = 'ALL';
    }

    if (this.memberStatus !== AppConstants.MEMBER_STATUS.all) {
      this.memberListHeader =
        this.memberStatus === 'true' ? 'ACTIVE' : 'INACTIVE';
    }

    if (
      this.memberDepartmentStatus &&
      this.memberDepartmentStatus !== AppConstants.DEFAULT_FILTER
    ) {
      this.memberListHeader += ' ' + this.memberDepartmentStatus.toUpperCase();
    }

    this.memberListHeader =
      this.listsHeader || `${this.memberListHeader} MEMBERS`;
  }
}
