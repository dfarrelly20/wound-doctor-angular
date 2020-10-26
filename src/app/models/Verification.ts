/**
 * Interface represents the Verification data to be sent to Firestore
 */
export interface Verification {
    // The email address of the patient to add
    patientEmail: string,
    // The ID of the verfication code to sent to the patients email
    verificationId: string,
    // The ID of the doctor adding the patient
    doctorId: string
}