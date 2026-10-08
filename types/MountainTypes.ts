/* 
 * MountainTypes.ts
 * Define types related to mountain data
 */

/*
 * Type interface for singular mountain
 */
export interface Mountain {
    id: string,
    name: string, // name of mountain
    state: string, // in the form of a two-letter state code

    location: Coordinates; // coordinates of main location
    parkingLots?: Coordinates[]; // array of parking lot coordinates
    address: string; // the text representation of address

    verticalDrop: number; // vertifcal drop in feet (summit - base)
    summit: number; // in ft
    baseElevation?: number // in ft

    passes: PassAccess[]; // passes that the mountain is on

    trails: Trails;
    liftsOpenWeekdays: string;
    liftsCloseWeekdays: string;
    liftsOpenWeekends: string;
    liftsCloseWeekends: string;
    nightSkiing?: boolean;

    pricing: PriceInterface;

    website: string;
    trailMapPdf?: string; // URL to trailmap pdf

    lastUpdated: string; // in Eastern Time
}

/*
 * Type interface for dd coordinates (latitude and longitude)
 */
interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface PriceInterface {
    liftTicketWeekday?: number;
    liftTicketWeekend?: number;
    rentalWeekday?: number;
    rentalWeekend?: number;
    lessonWeekday?: number;
    lessonWeekend?: number;
};

/* 
 * Type interface for ski resort pass access
 * passName         - string representing pass name, for example "Ikon"
 * passRestrictions - restrictions of the pass
 */
export interface PassAccess {
    passName: string;
    passRestrictions?: PassRestrictions[];
}

/* 
 * Type interface for ski resort pass restrictions
 * passType     - string representing type of pass, for example "Base" would be for "Ikon Base Pass"
 * restrictions - string representing what the restriction is, for example "no blackout dates"
 */
export interface PassRestrictions {
    passType: string;
    restrictions: string;
}

/* 
 * Type interface for ski resort trail distribution
 */
export interface Trails {
    bunny: number;
    green: number;
    blue: number;
    black: number;
    doubleBlack: number; // this will encapsulate double black and anything above
    glades?: number; // all levels
    terrainParks?: number;
}
