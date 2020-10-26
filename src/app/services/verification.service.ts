import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Verification } from '../models/Verification';

/**
 * Class has methods that are used to create a Verification object 
 * to add to Firestore.
 */
@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  /**
   * A reference to the verification collection in Firestore
   */
  verificationCollection: AngularFirestoreCollection<Verification>;
  // verificationDoc: AngularFirestoreDocument<Verification>;
  verification: Observable<Verification>;

  constructor(private asf: AngularFirestore) {
    this.verificationCollection = this.asf.collection('verification');
   }

   /**
    * Method adds a new Verification object to Firestore
    * 
    * @param verification The Verification object to add to Firestore
    */
   newVerification(verification: Verification){
     // Add object to collection
     this.verificationCollection.add(verification);
   }
}
