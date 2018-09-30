import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { GOOGLE_CONFIG } from '../../config/google.credentials';

@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {
  user: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private gPlus: GooglePlus,
    private platform: Platform
  ) {
    this.user = this.afAuth.authState;
  }

  /**
   * Initiates google login
   *
   * @returns {Promise<void>}
   */
  async googleLogin() {
    try {
      if (this.platform.is('cordova')) {
        await this.nativeGoogleLogin();
      } else {
        await this.webGoogleLogin();
      }
    } catch (e) {
      this.handleError(e);
    }
  }

  /**
   * Handles native login
   *
   * @returns {Promise<firebase.User>}
   */
  async nativeGoogleLogin() {
    try {
      const gplusUser = await this.gPlus.login({
        webClientId: GOOGLE_CONFIG.webClientId,
        offline: true,
        scopes: 'profile email'
      });

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      );
    } catch (err) {
      this.handleError(err);
    }
  }

  /**
   * Handles web login
   *
   * @returns {Promise<void>}
   */
  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.auth.signInWithPopup(provider);
    } catch (err) {
      this.handleError(err);
    }
  }

  /**
   * Logs user out
   */
  signOut() {
    this.afAuth.auth.signOut();
  }

  handleError(e) {
    console.error(e);
  }
}
