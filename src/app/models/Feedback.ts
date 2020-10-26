/**
 * Interface represents the feedback data for a patients wound. 
 */
export interface Feedback {
    // The ID of the patient who registered the wound
    userId?: string,
    // The ID of the wound
    woundId?: string,
    // The date of the feedback
    date?: any,
    // Url of the wouond image stored in Firebase Storage
    imageUrl?: string,
    // The Rgb RED component value
    red?: number,
    // The Rgb GREEN component value
    green?: number,
    // The Rgb BLUE component value
    blue?: number,
    // The latest Delta-E value calculated 
    woundChangeSinceLast?: number
}