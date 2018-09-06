import { Component, Input, OnChanges } from '@angular/core';
import { Member } from '../../models/member/member.interface';

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
  listsHeader: string;
  memberListHeader: string;

  constructor() {}

  ngOnChanges() {
    if (this.memberStatus === 'all') {
      this.memberListHeader = 'ALL';
    }

    if (this.memberStatus !== 'all') {
      this.memberListHeader =
        this.memberStatus === 'true' ? 'ACTIVE' : 'INACTIVE';
    }

    this.memberListHeader =
      this.listsHeader || `${this.memberListHeader} MEMBERS`;
  }
}
