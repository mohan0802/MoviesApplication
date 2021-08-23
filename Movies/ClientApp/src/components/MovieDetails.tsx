import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Language } from "../store/MovieStore";
import * as MovieStore from '../store/MovieStore';
import { ApplicationState } from '../store';
//import ReactStars from "react-rating-stars-component";
import { Button } from "react-bootstrap";

// At runtime, Redux will merge together...
type MovieDetailsProps = {
    movieList: MovieStore.IMovieState // ... state we've requested from the Redux store
}
    & typeof MovieStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ page: string }>; // ... plus incoming routing parameters

interface MovieDetailsState {
    movieList: MovieStore.IMovie[];
}

export class MovieDetails extends React.Component<MovieDetailsProps, MovieDetailsState> {
    constructor(props: MovieDetailsProps) {
        super(props);
        this.state = {
            movieList: []
        }
    }

    componentWillMount() {
        if (!this.props.movieList.movies || this.props.movieList.movies.length == 0) {
            this.setState({ movieList: JSON.parse(sessionStorage.getItem("movieList") as string) as MovieStore.IMovie[] });
        }
        else {
            this.setState({ movieList: this.props.movieList.movies });
        }
    }

    public render() {
        const params: any = this.props.match.params;
        const movie = this.state.movieList[parseInt(params.id)];
        return (
            <React.Fragment >
                <div className="movie-container">
                    <div>
                        <img src={movie.poster} className="movie-poster" />
                    </div>
                    <div className="marBottom15">
                        <h3 className="movie-title">{movie.title} </h3>
                    </div>
                    <div className="movie-info marBottom15">
                        <h4>Language</h4>
                        <span className="field-descriptor">{Language[movie.language]} </span>
                    </div>
                    <div className="movie-info marBottom15">
                        <h4>Plot</h4>
                        <span className="field-descriptor">{movie.plot} </span>
                    </div>
                    <div className="marBottom15">
                        <h4>Sound Effects</h4>
                        <ul>
                            {movie.soundEffects.map((effects, index) => {
                                return <li key={effects + index}>{effects}</li>
                            })}
                        </ul>
                    </div>
                    <div className="movie-still-container marBottom15">
                        <h4>Stills</h4>
                        <div className="field-descriptor">
                            {movie.stills.map((still, index) => {
                                return <img src={still} key={index} className="movie-still" />
                            })}
                        </div>
                    </div>
                    <div>
                        <h4>IMDB Rating</h4>
                        <div className="field-descriptor">
                            <span>{movie.imdbRating + "/10"}</span>
                            
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Button size="lg" type="button" onClick={() => { this.props.history.push("/movielist") }}>
                            Back to movie list
                    </Button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(
    (state: ApplicationState) => ({ movieList: state.movies }), // Selects which state properties are merged into the component's props
    { ...MovieStore.actionCreators } // Selects which action creators are merged into the component's props
)(MovieDetails as any);