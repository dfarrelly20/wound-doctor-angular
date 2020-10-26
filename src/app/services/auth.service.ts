import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase';
import { map } from 'rxjs/operators';

/**
 * This class has methods that handle user login and logout requests and 
 * for gets the current authenticated user logged in.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  /**
   * Method attempts to log a user in with an email and password
   * 
   * @param email The email address entered by the user
   * @param password The password entered by the user
   */
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  /**
   * Method returns the current authenticated user logged in
   */
  getAuth(){
    return this.afAuth.authState.pipe(
      map(auth => auth)
    );
  }

  /**
   * Method logs out a signed in user
   */
  logout(){
    this.afAuth.auth.signOut();
  }
}
