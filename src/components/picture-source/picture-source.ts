import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'picture-source',
  templateUrl: 'picture-source.html'
})
export class PictureSourceComponent {
  constructor(private viewCtrl: ViewController) {}

  /**
   * Closes the profile photo window
   *
   * @param source
   */
  closeModal(source: string) {
    this.viewCtrl.dismiss(source).catch(PictureSourceComponent.handleError);
  }

  static handleError(e) {
    console.log(JSON.stringify(e));
  }
}
