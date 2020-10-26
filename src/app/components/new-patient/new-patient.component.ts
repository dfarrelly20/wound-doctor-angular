import { Component, OnInit, ViewChild } from '@angular/core';
import { VerificationService } from '../../services/verification.service';
import { Router } from '@angular/router';

import { Verification } from '../../models/Verification';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})

/**
 * This class is used for creating the verification data to send
 * to Firestore. This data will be useed on the Android app tp
 * verify patient email addresses
 */
export class NewPatientComponent implements OnInit {

  // Object of type Verfication that will be used to create the verification model to add to collection
  patientToVerify: Verification = {
    patientEmail: '',
    verificationId: '',
    doctorId: ''
  }

  // Reference to the verificationForm element in the html file
  // This is the form that the doctor used to input the patients email address
  @ViewChild('verificationForm') form: any;

  // Inject the VerificationService and Router into the constructor
  constructor(
    private verificationService: VerificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * The method that is called when the doctor submits the form.
   * If successful will create an object of type Verification to add to the collection.
   * The param 'value' is the verification object to be created from the form inputs.
   * The param 'valid' checks for form validation.
   */
  onSubmit({ value, valid }: { value: Verification, valid: boolean }) {
    // Set the verificationID to create the verification object with
    // ID is generated using the generateId method -- the length of the ID can be changed here
    value.verificationId = this.generateId(5);
    // Set the doctorId to create the verfication object with
    // NOTE: the doctorId has been hardcoded in here, as there is only one doctor registered on this 
    // system and there is no facility to register a new doctor on the webapp
    value.doctorId = 'CFEQVt50pdRysCBtAu68K8Ai8OI2';

    if (!valid) {
      // Here if the form is not valid
      // Not valid if the emaail field is empty or the email address does not match the required pattern specified in the html form
      alert('Please enter the patients email address')
    } else {
      // Here if no validation errors
      // Call newVerification from verification service to submit new Verification object to collection
      this.verificationService.newVerification(value);
      // Navigate to dashboard
      this.router.navigate(['/']);
    }
  }

  /**
   * Method is used to generate the random verification ID to send to the user.
   * The code in this method is referenced from stackoverflow and can be found here:
   *      https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
   * 
   * @param length - the length of the ID to generate.
   */
  generateId(length: number) {
    var generatedId = '';
    var charactersToChooseFrom = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = charactersToChooseFrom.length;
    for (var i = 0; i < length; i++) {
      generatedId += charactersToChooseFrom.charAt(Math.floor(Math.random() * charactersLength));
    }
    return generatedId;
  }

}
