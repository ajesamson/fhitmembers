import { Component, Input, OnChanges } from '@angular/core';
import * as lodash from 'lodash';

import { Member } from '../../models/member/member.interface';

@Component({
  selector: 'app-search-member',
  templateUrl: 'search-member.html'
})
export class SearchMemberComponent implements OnChanges {
  query: string;
  @Input()
  memberList: Member[];
  @Input()
  memberStatus: string;
  matchedMembers: any[];
  memberListHeader: string;

  constructor() {}

  ngOnChanges() {
    this.matchedMembers = this.memberList;
    if (this.memberStatus === 'all') {
      this.memberListHeader = 'ALL MEMBERS';
    }

    if (this.memberStatus !== 'all') {
      this.memberListHeader =
        this.memberStatus === 'true' ? 'ACTIVE MEMBERS' : 'INACTIVE MEMBERS';
    }
  }

  /**
   * Searches a member record by first name or last name
   *
   * @param query
   */
  searchMember(query: string) {
    query = query.trim();

    if (query.length < 1) {
      this.matchedMembers = this.memberList;
      return;
    }

    query = query.charAt(0).toUpperCase() + query.slice(1);
    this.matchedMembers = lodash.filter(this.memberList, function(m) {
      return m.firstName.startsWith(query) || m.lastName.startsWith(query);
    });
  }
}
