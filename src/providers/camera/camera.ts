import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import { Member } from '../../models/member/member.interface';
import { MemberProvider } from '../member/member';
import { AppConstants } from '../../app/app.constants';

@Injectable()
export class CameraProvider {
  constructor(
    private camera: Camera,
    private storage: AngularFireStorage,
    private memberProvider: MemberProvider
  ) {}

  savePicture(member: Member, sourceType: string) {
    const refPath = `membersProfilePictures/${member.key}/profilePicture.png`;
    const pictureStorageRef = this.storage.ref(refPath);
    const pictureSource =
      sourceType === AppConstants.PICTURE_SOURCE.camera
        ? this.camera.PictureSourceType.CAMERA
        : this.camera.PictureSourceType.SAVEDPHOTOALBUM;
    const options: CameraOptions = {
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: pictureSource,
      allowEdit: true,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 200,
      targetHeight: 200,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then(imageData => {
      pictureStorageRef
        .putString(imageData, 'base64', { contentType: 'image/png' })
        .snapshotChanges()
        .pipe(
          finalize(() => {
            pictureStorageRef.getDownloadURL().subscribe(url => {
              member.avatar = url;
              this.memberProvider.updateMember(member);
            });
          })
        )
        .subscribe();
    });
  }
}
