import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs//operators';
import { Feedback } from '../models/Feedback';

/**
 * This class has methods that handle requests for Wound feedback information 
 * from Firestore.
 */
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  /**
   * A reference to the feedback collection in Firestore
   */
  feedbackCollection: AngularFirestoreCollection<Feedback>;

  // feedbackDoc: AngularFirestoreDocument<Feedback>;

  /**
   * An array holding all the feedback data for a wound
   */
  allFeedback: Observable<Feedback[]>;

  /**
   * The latest feedback for this wound
   */
  latestFeedback: Observable<Feedback>;

  constructor(private asf: AngularFirestore) {
    this.feedbackCollection = this.asf.collection('feedback');
  }

  /**
   * Method returns all the Feedback data for a given wound from Firestore
   * 
   * @param woundId The ID of the wound
   */
  getAllFeedback(woundId: string): Observable<Feedback[]> {
    // Reference to feedback collection -- look for woundId
    const collection = this.asf.collection<Feedback>('feedback', ref => ref.where('woundId', '==', woundId));
    this.allFeedback = collection
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Feedback;
          return data
        }))
      );
    return this.allFeedback;
  }

  /**
   * Method returns the most recent Feedback data for this wound from Firestore
   * 
   * @param woundId The ID of the wound
   */
  getLatestFeedback(woundId: string): Observable<Feedback>{
    const collection = this.asf.collection<Feedback>('feedback', ref => ref.where('woundId', '==', woundId));
    // Reference to feedback collection -- look for woundId
    const feedback$ = collection
      .valueChanges()
      .pipe(
        map(allFeedback => {
          const feedback = allFeedback[0];
          return feedback;
        })
      );
    return feedback$;
  }
}
