/**
 * Interface represents a Patient object for retrieving Patient data from Firestore
 */
export interface Patient {
    // The ID of the patient
    patientId?: string,
    // The first name of the patient
    fName?: string,
    // The last name of the patient
    lName?: string,
    // The email address of the patient
    email?: string,
    // The phone number of the patient
    phone?: string,
    // The ID of the doctor who added the patient to the system
    doctorId?: string
}