import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Network } from '@ionic-native/network';
import * as papa from 'papaparse';
import * as moment from 'moment';
import * as _ from 'lodash';

import { Member } from '../../models/member/member.interface';
import { AppConstants } from '../../app/app.constants';
import { MemberImportProvider } from '../../providers/member/member-import';
import { NotificationsProvider } from '../../providers/notifications/notifications';

@Component({
  selector: 'import-member',
  templateUrl: 'import-member.html'
})
export class ImportMemberComponent implements OnInit {
  @Output()
  uploaded: EventEmitter<Member[]>;
  fileUpload: any;
  fileLabel: string = 'Choose a file';
  member: Member;
  uploadedMembers: Member[] = [];
  memberStatus: string = AppConstants.MEMBER_STATUS.all;

  constructor(
    private network: Network,
    private memberImportProvider: MemberImportProvider,
    private notificationsProvider: NotificationsProvider
  ) {
    this.uploaded = new EventEmitter();
  }

  ngOnInit() {
    this.memberImportProvider.previewUpdated.subscribe(
      (data: { member: Member; updatedMemberData: Member }) => {
        const foundIndex = _.findIndex(this.uploadedMembers, data.member);
        this.uploadedMembers.splice(foundIndex, 1, data.updatedMemberData);
      }
    );
  }

  /**
   * Uploads a file and extracts member data
   * @param e
   */
  uploadFile(e) {
    this.fileUpload = e.target.files[0] as object;
    this.fileLabel = this.fileUpload.name;

    papa.parse(this.fileUpload, {
      complete: results => {
        e.target.value = '';
        if (results.errors.length > 0) {
          this.handleError(results.errors[0].message);
          return;
        }

        if (this.network.type === 'none') {
          this.handleError(AppConstants.LIMITED_INTERNET_CONNECTION);
          return;
        }

        this.addMembers(results.data);
      }
    });
  }

  /**
   * Generates member details for uploaded members
   * @param membersData
   */
  addMembers(membersData) {
    if (membersData.length <= 1) {
      this.handleError(AppConstants.EMPTY_CSV_DATA);
      return;
    }

    this.uploadedMembers = [] as Member[];
    membersData.shift(0); // removes the header
    for (let newMember of membersData) {
      if (newMember.length !== 8) {
        continue;
      }

      const birthDate = moment(newMember[5].trim()).format('MMM DD');
      const statusReason =
        newMember[7].trim() !== 'active' ? 'Not provided' : '';

      this.member = {} as Member;
      this.member.firstName = newMember[0].trim();
      this.member.lastName = newMember[1].trim();
      this.member.gender = newMember[2].trim();
      this.member.address = newMember[3].trim();
      this.member.phoneNumber = newMember[4].trim();
      this.member.birthDate = birthDate;
      this.member.department = newMember[6].trim();
      this.member.status = newMember[7].trim() === 'active';
      this.member.statusReason = statusReason;

      this.uploadedMembers.push(this.member);
      this.memberUploaded();
    }
  }

  /**
   * Triggers the uploaded event
   */
  memberUploaded() {
    this.uploaded.emit(this.uploadedMembers);
  }

  handleError(e: string) {
    this.fileLabel = 'Choose a file';
    this.notificationsProvider.showToast(e);
  }
}
