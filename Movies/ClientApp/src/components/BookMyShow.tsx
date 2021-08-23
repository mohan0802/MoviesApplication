import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import * as MovieStore from '../store/MovieStore';
import { ApplicationState } from '../store';
import Select from 'react-select';


// At runtime, Redux will merge together...
type BookMyShowProps = {
    movieList: MovieStore.IMovieState // ... state we've requested from the Redux store
}
    & typeof MovieStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ page: string }>; // ... plus incoming routing parameters

interface BookMyShowState {
    seatsBooked: number;
    imdbId: string;
    selectedTime: { label: string; value: string };
}

interface ISelectOptions {
    label: string;
    value: string;
}

const ShowTimings: ISelectOptions[] = [
    { label: "10:30 AM", value: "10:30 AM" },
    { label: "2:00 PM", value: "2:00 PM" },
    { label: "5:30 PM", value: "5:30 PM" },
]

export class BookMyShow extends React.Component<BookMyShowProps, BookMyShowState> {
    constructor(props: BookMyShowProps) {
        super(props);
        this.state = {
            seatsBooked: 0,
            imdbId: "",
            selectedTime: { label: "", value: "" },
        }
    }

    componentWillMount() {
        const params: any = this.props.match.params;
        let movieList = [];
        if (!this.props.movieList.movies || this.props.movieList.movies.length == 0) {
            movieList = JSON.parse(sessionStorage.getItem("movieList") as string) as MovieStore.IMovie[]
            this.setState({ imdbId: movieList[parseInt(params.id)].imdbID });
        }
        else {
            movieList = this.props.movieList.movies;
            this.setState({ imdbId: movieList[parseInt(params.id)].imdbID });
        }
    }

    onShowTimingOptionsChange = (value: any) => {
        console.log(value);
        this.setState({ selectedTime: value });
    }

    bookMovieShow = () => {
        const params: any = this.props.match.params;
        this.props.bookMyShow(parseInt(params.id),
            this.state.imdbId, this.state.selectedTime.value, this.state.seatsBooked, () => {
                alert("Your seats are booked suucessfully!");
            });
    }

    onSeatsChange = (event: any) => {
        if (parseInt(event.target.value) > 10) {
            alert("Please enter a number between 1 to 10");
            return;
        }
        this.setState({ seatsBooked: parseInt(event.target.value) })
    }

    public render() {
        const params: any = this.props.match.params;
        const bookingDetails = this.props.movieList.bookingDetails.bookingData[parseInt(params.id)];
        return (
            <React.Fragment >
                <div className="booking-container">
                    {console.log(bookingDetails)}
                    <h3>Show Details</h3>
                    <div className="booking-details">
                        {bookingDetails && bookingDetails[this.state.imdbId].showDetails.map((data, index) => {
                            return <div className="booking-card col-sm-3">
                                <div>
                                    <h4>Show Timing </h4><span>{data.showTimings}</span>
                                </div>
                                <div>
                                    <h4>Seats Available </h4><span>{data.seatsAvailabe}</span>
                                </div>
                                <div>
                                    <h4>Seats Booked </h4><span>{data.seatsBooked}</span>
                                </div>

                            </div>
                        })}
                    </div>
                    <div className="booking-entry">
                        <div className="col-sm-4">
                            <span>Select Show Timings</span>
                            <Select
                                value={this.state.selectedTime}
                                onChange={this.onShowTimingOptionsChange}
                                options={ShowTimings}
                                placeholder={"Select..."}
                            />
                        </div>
                        <div className="col-sm-4">
                            <span>Enter number of seats</span>
                            <input type="number" value={this.state.seatsBooked} max={10} className="seat-input"
                                onChange={(e: any) => { this.onSeatsChange(e) }} />
                        </div>
                    </div>

                    <div className="btn-book">
                        <button type="button" className="btn" style={{ background: "rgb(244, 44, 82)", color: "white" }}
                            onClick={this.bookMovieShow}
                        > Book Now</button>
                    </div>
                    <div style={{ marginLeft: 15 }}>
                        <button className="btn btn-light" type="button" onClick={() => { this.props.history.push("/movielist") }}>
                            Back to movie list
                    </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(
    (state: ApplicationState) => ({ movieList: state.movies }), // Selects which state properties are merged into the component's props
    { ...MovieStore.actionCreators } // Selects which action creators are merged into the component's props
)(BookMyShow as any);