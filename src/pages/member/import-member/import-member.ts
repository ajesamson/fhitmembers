import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NotificationsProvider } from '../../../providers/notifications/notifications';
import { Network } from '@ionic-native/network';
import { File } from '@ionic-native/file';
import * as papa from 'papaparse';

import { MemberProvider } from '../../../providers/member/member';
import { Member } from '../../../models/member/member.interface';
import { AppConstants } from '../../../app/app.constants';
import { SAMPLE_CSV } from '../../../mocks/members/members';

@IonicPage()
@Component({
  selector: 'page-import-member',
  templateUrl: 'import-member.html'
})
export class ImportMemberPage {
  uploadedMembers: Member[] = [];
  savingStatus: boolean = false;

  constructor(
    private file: File,
    private notificationsProvider: NotificationsProvider,
    private network: Network,
    private memberProvider: MemberProvider
  ) {}

  /**
   * Saves uploaded member details
   */
  saveUploadedMembers() {
    if (this.network.type === 'none') {
      this.notificationsProvider.presentAlert(
        AppConstants.NO_CONNECTION,
        AppConstants.LIMITED_INTERNET_CONNECTION
      );

      return;
    }

    this.savingStatus = true;
    let loadingCtrl = this.notificationsProvider.presentLoadingDefault();

    this.uploadedMembers.forEach(member => {
      this.memberProvider.addMember(member);
    });
    loadingCtrl.dismiss().catch(e => console.error);
    this.notificationsProvider.showToast('New members imported');
    this.savingStatus = false;
  }

  /**
   * Handles uploaded event from import-member component
   *
   * @param members
   */
  memberUploaded(members: Member[]) {
    this.uploadedMembers = members;
  }

  /**
   * Saves sample csv file to device
   */
  async downloadCSV() {
    const filePath = this.file.externalDataDirectory;
    const fileName = 'member.csv';
    const csv = papa.unparse(SAMPLE_CSV);
    const fileContent = new Blob([csv]);

    try {
      let newDir = await this.file.createDir(filePath, 'templates', true );

      await this.file.writeFile(newDir.toURL(), fileName, fileContent, {replace: true});
      this.notificationsProvider.showToast(`File saved to \n${newDir.toURL()}`);
    } catch (e) {
      this.notificationsProvider.showToast(JSON.stringify(e));
    }

  }
}
