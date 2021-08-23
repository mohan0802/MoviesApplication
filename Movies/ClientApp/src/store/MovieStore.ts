import { cloneDeep } from 'lodash';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { IBookingDetails, IShowDetails, initialBookingData, initialShowDetails } from '../components/Models/BookingModel';

export interface IMovieState {
    isLoading: boolean;
    movies: IMovie[];
    bookingDetails: IBookingDetails;
}

export interface IMovie {
    language: Language;
    location: string;
    plot: string;
    poster: string;
    soundEffects: string[];
    stills: string[];
    title: string;
    imdbID: string;
    listingType: ListingType;
    imdbRating: string;
}

export enum Language {
    NONE = 0,
    ENGLISH,
    HINDI
}
export enum ListingType {
    NOW_SHOWING = 0,
    UP_COMING
}

interface RequestAllMoviesAction {
    type: 'REQUEST_ALLMOVIES';
}

interface ReceiveAllMoviesAction {
    type: 'RECEIVE_ALLMOVIES';
    movies: IMovie[];
}

interface InitialiseBookingState {
    type: 'INITIALISE_BOOKING';
    movies: IMovie[];
}

interface ResponseBookMovieShow {
    type: 'BOOK_MOVIE_SHOW_RESPONSE';
    id: number;
    imdbId: string;
    timings: string;
    seats: number;
}

type KnownAction = RequestAllMoviesAction | ReceiveAllMoviesAction | InitialiseBookingState | ResponseBookMovieShow;


// ACTION CREATORS
export const actionCreators = {
    requestAllMovies: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let state = getState().movies;
        if (state && state.movies.length == 0 /*&& !sessionStorage.getItem("movieList")*/) {
            fetch(`api/Movies/GetAllMovies`)
                .then(response => response.json() as Promise<IMovie[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_ALLMOVIES', movies: data });
                    dispatch({ type: 'INITIALISE_BOOKING', movies: data });
                    if (!sessionStorage.getItem("movieList")) {
                        sessionStorage.setItem("movieList", JSON.stringify(data));
                    }
                });

            dispatch({ type: 'REQUEST_ALLMOVIES' });
        }
        else {
            dispatch({ type: 'RECEIVE_ALLMOVIES', movies: JSON.parse(sessionStorage.getItem("movieList") as string) as IMovie[] });
            dispatch({ type: 'INITIALISE_BOOKING', movies: JSON.parse(sessionStorage.getItem("movieList") as string) as IMovie[] });
        }
    },

    bookMyShow: (id: number, imdbId: string, timings: string, seats: number,
        successCallback: () => void): AppThunkAction<KnownAction> => (dispatch, getState) => {
            dispatch({ type: 'BOOK_MOVIE_SHOW_RESPONSE', id: id, imdbId: imdbId, timings: timings, seats: seats });
            successCallback();
        },
};

// REDUCER

const unloadedState: IMovieState = {
    movies: [], isLoading: false, bookingDetails: { bookingData: [] }
};

export const reducer: Reducer<IMovieState> = (state: IMovieState | undefined, incomingAction: Action): IMovieState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ALLMOVIES':
            return {
                movies: state.movies,
                bookingDetails: { bookingData: [] },
                isLoading: true
            };
        case 'RECEIVE_ALLMOVIES':

            return {
                movies: action.movies,
                bookingDetails: { bookingData: [] },
                isLoading: false
            };
        case 'INITIALISE_BOOKING':
            let booking: IBookingDetails = { bookingData: [] };
            action.movies.map((movie, index) => {
                booking.bookingData.push({ [movie.imdbID]: { showDetails: [...initialShowDetails] } });
            });
            console.log(booking);
            return {
                bookingDetails: booking,
                movies: action.movies,
                isLoading: false
            };
        case 'BOOK_MOVIE_SHOW_RESPONSE':
            let showsBooked = cloneDeep(state.bookingDetails);
            let showToBook = cloneDeep(showsBooked.bookingData[action.id]);
            let showIndex = showToBook[action.imdbId].showDetails.findIndex(x => x.showTimings == action.timings);
            if (showIndex > -1) {
                showToBook[action.imdbId].showDetails[showIndex].seatsAvailabe -= action.seats;
                showToBook[action.imdbId].showDetails[showIndex].seatsBooked += action.seats;
                showsBooked.bookingData[action.id] = showToBook;
            }

            return {
                bookingDetails: showsBooked,
                movies: state.movies,
                isLoading: false
            }


        default:
            const exhaustiveCheck: never = action;
    }
    return state || unloadedState;
};