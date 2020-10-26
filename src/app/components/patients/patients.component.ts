import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { AuthService } from '../../services/auth.service';
import { Patient } from '../../models/Patient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})

/**
 * The class that generates the patients table that is displayed 
 * on the dashboard. The table is populated dynamically from Firestore,
 * by querying the 'patient's collection with the ID of the clinician 
 * who is logged in
 */
export class PatientsComponent implements OnInit {

  // Patient array to store list of Patients belonging to the doctor who is signed in
  patients: Patient[];
  // The doctorId of the doctor who is signed in
  loggedInDoctor: string;

  // Inject the PatientService and AuthService into the constructor
  constructor(
    private patientService: PatientService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // This is where check is done to see which doctor is signed in
    // Call the getAuth method from auth service which will check who is signed in
    this.authService.getAuth().subscribe(auth => {
      // First check if there is someone signed in at all
      if(auth) {
        // Here if a doctor is signed in
        // Get the uid of the doctor signed in -- this is the doctorId
        this.loggedInDoctor = auth.uid;
        // Use the patient service to call the getDoctorPatients method
        // Pass in the doctorId of the doctor signed in
        this.patientService.getDoctorPatients(this.loggedInDoctor).subscribe(patients => {
          // Set the Patient array to the patients that are returned from the collection
          // This will be the patients that are registered to the doctor whose Id was passed in
          this.patients = patients
        })
      }
    });
  }
}
