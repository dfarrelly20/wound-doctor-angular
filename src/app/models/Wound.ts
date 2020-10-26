/**
 * Interface represents a Wound object for retrieving Wound data from Firestore
 */
export interface Wound {
    // The ID of the wound
    woundId?: string,
    // The ID of the patient who registered the wound
    userId?: string,
    // The ID of the bandage currently on the wound
    bandageId?: string,
    // The name of the limb where the wound is situated
    limbName?: string,
    // The date the wound was registered on the system
    date?: any,
    // The number of hours set between each health check
    hoursUntilCheck?: number
    // The date the bandage was last changed on this wound
    bandageLastChanged?: any,
    // The date of the next health check for this wound
    nextHealthCheck?: any,
    // Whether a large Delta-E value has been detected for the wound or not
    woundInDanger?: boolean
}