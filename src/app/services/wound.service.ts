import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs//operators';
import {Wound} from '../models/Wound';

/**
 * ClasshHas methods for retrieving wound data from Firestore.
 */
@Injectable({
  providedIn: 'root'
})
export class WoundService {

  /**
   * A reference to the wounds collection in Firestore
   */
  woundsCollection: AngularFirestoreCollection<Wound>;
  // woundDoc: AngularFirestoreDocument<Wound>;

  /**
   * An array of type Wound for holding all the Wounds of a given patient
   */
  wounds: Observable<Wound[]>;

  /**
   * Represents a single Wound object
   */
  wound: Observable<Wound>;

  constructor(private asf: AngularFirestore) { 
    this.woundsCollection = this.asf.collection('wounds');
  }

  /**
   * Method returns all the wounds registered to a patient
   * 
   * @param patientId The ID of the patient 
   */
  getWounds(patientId: string): Observable<Wound[]>{
    const collection = this.asf.collection<Wound>('wounds', ref => ref.where('userId', '==', patientId));
    this.wounds = collection
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Wound;
          return data
        }))
    );
    return this.wounds;
  }

  /**
   * Method gets the data for a given wound
   * 
   * @param woundId The ID of the wound to get
   */
  getWound(woundId: string): Observable<Wound>{
    const collection = this.asf.collection<Wound>('wounds', ref => ref.where('woundId', '==', woundId));
    const wound$ = collection
      .valueChanges()
      .pipe(
        map(wounds => {
          const wound = wounds[0];
          return wound;
        })
      );
    return wound$;
  }
}
