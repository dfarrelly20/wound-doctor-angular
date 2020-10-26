import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs//operators';
import { Patient } from '../models/Patient';

/**
 * Class has methods that handle requests for patient information from Firestore
 */
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  /**
   * A reference to the patients collection in Firestore
   */
  patientsCollection: AngularFirestoreCollection<Patient>;
  // patientDoc: AngularFirestoreDocument<Patient>;

  /**
   * An array holding all the Patients associated with the doctor signed in
   */
  patients: Observable<Patient[]>;

  constructor(private asf: AngularFirestore) {
    // Get patients from collection and order by last name asc
    this.patientsCollection = this.asf.collection('patients', ref => ref.orderBy('fName', 'asc'));
  }

  /**
   * Method gets all the patients form Firestore
   */
  getPatients(): Observable<Patient[]> {
    // Get clients using id
    this.patients = this.patientsCollection
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Patient;
          return data
        }))
    );
    return this.patients;
  }

  /**
   * Method returns all the patients associated with the doctor making the request
   * 
   * @param id The ID of the doctor
   */
  getDoctorPatients(id: string): Observable<Patient[]>{
    const collection = this.asf.collection<Patient>('patients', ref => ref.where('doctorId', '==', id))

    this.patients = collection
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Patient;
          return data
        }))
    );
    return this.patients;
  }

  /**
   * Method returns a specific patient from Firestore 
   * 
   * @param id The ID of the patient
   */
  getPatient(id: string): Observable<Patient> {
    const collection = this.asf.collection<Patient>('patients', ref => ref.where('patientId', '==', id))
    const patient$ = collection
      .valueChanges()
      .pipe(
        map(patients => {
          const patient = patients[0];
          return patient;
        })
      );
    return patient$;
  };
}
