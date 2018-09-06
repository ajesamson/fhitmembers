import { Component, Input } from '@angular/core';
import { Member } from '../../models/member/member.interface';
import { CameraProvider } from '../../providers/camera/camera';
import { ModalController } from 'ionic-angular';
import { PictureSourceComponent } from '../picture-source/picture-source';
import { AppConstants } from '../../app/app.constants';

@Component({
  selector: 'app-member-detail',
  templateUrl: 'member-detail.html'
})
export class MemberDetailComponent {
  @Input()
  member: Member;
  defaultInfo = 'Not available';

  constructor(
    private cameraProvider: CameraProvider,
    private modalCtrl: ModalController
  ) {}

  async chosePicture() {
    let pictureModal = this.modalCtrl.create(PictureSourceComponent);
    await pictureModal.present();

    pictureModal.onDidDismiss(pictureSource => {
      if (pictureSource === AppConstants.PICTURE_SOURCE.camera) {
        this.takePicture();
      } else if (pictureSource === AppConstants.PICTURE_SOURCE.gallery) {
        this.uploadPicture();
      }
    });
  }

  /**
   * Uploads an existing picture from device
   */
  uploadPicture() {
    this.cameraProvider.savePicture(
      this.member,
      AppConstants.PICTURE_SOURCE.gallery
    );
  }

  /**
   * Opens the camera to snap a new picture
   */
  takePicture() {
    this.cameraProvider.savePicture(
      this.member,
      AppConstants.PICTURE_SOURCE.camera
    );
  }
}
