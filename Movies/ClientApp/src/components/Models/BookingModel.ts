export interface IBookingDetails {
    bookingData: IShowDictionary
}

export interface IShowDictionary {
    [imdb: string]: {
        showDetails: IShowDetails[]
    }
}

export interface IShowDetails {
    showTimings: string,
    seatsAvailabe: number;
    seatsBooked: number;
}

export const initialBookingData: IBookingDetails = {
    bookingData: []
}

export const initialShowDetails: IShowDetails[] =
    [{
        seatsAvailabe: 10,
        seatsBooked: 0,
        showTimings: "10:30 AM"
    },
    {
        seatsAvailabe: 10,
        seatsBooked: 0,
        showTimings: "2:00 PM"
    },
    {
        seatsAvailabe: 10,
        seatsBooked: 0,
        showTimings: "5:30 PM"
    }]

