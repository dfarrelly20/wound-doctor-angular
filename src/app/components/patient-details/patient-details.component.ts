import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { WoundService } from '../../services/wound.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Patient } from '../../models/Patient';
import { Wound } from 'src/app/models/Wound';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})

/**
 * This class dynamically creates the page that displays the 
 * details of a patient. When the clinician chooses a patient from
 * the patients table of the dashboard, the ID of that patient is used 
 * create the url for this page. This ID is then retreived and used
 * to create the page specifc to the patient
 * 
 */
export class PatientDetailsComponent implements OnInit {

  // The id of the selected patient -- got from the url of the web page
  patientId: string;
  // A refernce to the Patient object created in this class
  patient: Patient;
  // A boolean that is used to indicate whether the wound is in danger
  // The value for this is got from the field 'wondInDanger' in the 'wounds' collection
  isInDanger: boolean;
  // An array of type Wound to store the wounds that are registered to this patient
  wounds: Wound[];

  // Injec the PatientService, WoundService, Router and ActivatedRoute into the constructor
  constructor(
    private patientService: PatientService,
    private woundService: WoundService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get the ID of the patient selected by the clincian
    // The ID is retreived from the url of the page by using ActivatedRoute
    this.patientId = this.route.snapshot.params['id'];
    // Get client document from Firebase using the patient service
    this.patientService.getPatient(this.patientId).subscribe(patient => {
      // This returns an Observable of type Patient which is set the Patient object here
      this.patient = patient;
    });
    this.woundService.getWounds(this.patientId).subscribe(wounds => {
      // The list of wounds registered to this patient -- store as Wound array to display in html table
      this.wounds = wounds;
    });
  }

}
