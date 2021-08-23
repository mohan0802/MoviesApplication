import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as MovieStore from '../store/MovieStore';
import {
    BootstrapTable, TableHeaderColumn, TextFilter, SelectFilter
} from 'react-bootstrap-table';
import "react-bootstrap-table/css/react-bootstrap-table.css";
import 'bootstrap/dist/css/bootstrap.css';

// At runtime, Redux will merge together...
type MoviesProps =
    MovieStore.IMovieState // ... state we've requested from the Redux store
    & typeof MovieStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ page: string }>; // ... plus incoming routing parameters

const pageSize: number = 5;
export interface IMovieComponentState {
    page: number;
    sortName: string | undefined;
    sortOrder: 'asc' | 'desc';
}

const ListingType = {
    "NOW_SHOWING": "NOW SHOWING",
    "UP_COMING": "UP COMING"
}

export interface IFilterState {
    filterName: string;
    filterLanguage: number;
    filteredLocation: string;
}

export class MovieList extends React.Component<MoviesProps, IMovieComponentState> {
    constructor(props: MoviesProps) {
        super(props);
        this.state = {
            page: 1,
            sortName: undefined,
            sortOrder: 'desc'
        };
    }

    // This method is called when the component is first added to the document

    componentWillMount() {
        if (!sessionStorage.getItem("token")) {
            this.props.history.push("/login");
        }
        if (this.props.movies.length == 0) {
            this.props.requestAllMovies();
        }
    }

    public render() {
        return (
            <React.Fragment>
                {this.renderMoviesTable()}
            </React.Fragment>
        );
    }

    private defaultType = (cell: any, row: any) => {
        return <div title={cell} style={{ whiteSpace: "break-spaces" }}>{cell}</div>;
    }

    private languageType = (cell: any, row: any) => {
        return <div title={cell}>{MovieStore.Language[cell]}</div>;
    }

    private listingType = (cell: any, row: any) => {
        type listing = "NOW_SHOWING" | "UP_COMING";
        return <div title={cell} >{ListingType[MovieStore.ListingType[cell] as listing]}</div>;
    }

    private posterType = (cell: any, row: any) => {
        return <img src={cell} className="ellipsis" style={{ width: "100px", height: "100px" }}></img>;
    }

    private LanguageList = {
        1: 'ENGLISH',
        2: 'HINDI'
    }

    private LocationList = {
        'PUNE': 'PUNE',
        'DELHI': 'DELHI',
        'BANGALORE': 'BANGALORE',
        'CHENNAI': 'CHENNAI'
    }

    private getMovieDetails = (id: string) => {
        this.props.history.push('/movie/' + id);
    }

    private bookShow = (id: string) => {
        this.props.history.push('/movie/book/' + id);
    }

    private getColumns = (): any[] => {
        return [
            {
                header: '',
                key: 'index',
                isKey: true,
                dataFormat: this.defaultType,
                columnClassName: '',
                dataSort: true,
                toolTip: false,
                isHidden: true,
                //width: 'auto',
                filter: { type: 'TextFilter', style: { font: 'bold' } } as TextFilter

            },
            {
                header: 'Poster',
                key: 'poster',
                isKey: false,
                dataFormat: this.posterType,
                columnClassName: '',
                dataSort: true,
                isHidden: false,
                width: '100px'
            },
            {
                header: 'Name',
                key: 'title',
                isKey: false,
                dataFormat: this.defaultType,
                columnClassName: '',
                dataSort: true,
                toolTip: false,
                isHidden: false,
                //width: '200px',
                filter: { type: 'TextFilter', placeholder: 'NAME', style: { font: 'bold' } } as TextFilter
            },
            {
                header: 'Language',
                key: 'language',
                isKey: false,
                dataFormat: this.languageType,
                columnClassName: '',
                dataSort: true,
                toolTip: false,
                isHidden: false,
                //width: 'auto',
                filter: { type: 'SelectFilter', placeholder: 'Select Language', options: this.LanguageList } as SelectFilter
            },
            {
                header: 'Location',
                key: 'location',
                isKey: false,
                dataFormat: this.defaultType,
                columnClassName: '',
                dataSort: true,
                isHidden: false,
                //width: '75px',
                filter: { type: 'SelectFilter', placeholder: 'Select Location', options: this.LocationList } as SelectFilter
            },
            {
                header: 'Status',
                key: 'listingType',
                isKey: false,
                dataFormat: this.listingType,
                columnClassName: '',
                dataSort: true,
                toolTip: false,
                isHidden: false,
                //width: '100px',
            },
            {
                header: 'IMDB Rating',
                key: 'imdbRating',
                isKey: false,
                dataFormat: this.defaultType,
                columnClassName: '',
                dataSort: true,
                toolTip: false,
                isHidden: false,
                //width: 'auto',
            },
            {
                header: 'Action',
                key: 'button',
                isKey: false,
                dataFormat: this.action,
                columnClassName: 'button-cell',
                dataSort: false,
                toolTip: false,
                isHidden: false,
                width: '100px',
                filter: { type: 'TextFilter', placeholder: '', style: { display: 'none' } } as TextFilter
            },
        ];
    }

    private action = (cell: any, row: any) => {
        return (<div>
            <button title={"Movie Details"} type="button" className="btn-white btn-sm"
                onClick={() => { this.getMovieDetails(row.rowIndex) }}>
                <i className='fas fa-info-circle' style={{ color: "#17a2b8" }}></i>
            </button>
            <button title={"Book a show"} type="button" className="btn-white btn-sm"
                onClick={() => { this.bookShow(row.rowIndex) }}>
                <i className="fas fa-ticket-alt" style={{ color: "#fd7e14" }}></i>
            </button>
        </div>);
    }

    onSortChange = (sortName: any, sortOrder: any) => {
        this.setState({
            sortName: sortName,
            sortOrder: sortOrder
        });
    }

    renderShowsTotal(start: number, to: number, total: number) {
        return (
            <p>
                Showing {start} to {to} of {total} entries
            </p>
        );
    }

    private renderMoviesTable() {
        const data = this.props.movies.map((movie: MovieStore.IMovie, index: number) => {
            return {
                title: movie.title,
                language: movie.language,
                location: movie.location,
                listingType: movie.listingType,
                imdbRating: movie.imdbRating,
                imdbID: movie.imdbID,
                poster: movie.poster,
                button: 'Actions',
                rowIndex: index,
                index: ((this.state.page - 1) * pageSize) + index,
            }
        });
        let columns = this.getColumns();

        const options = {
            sizePerPage: 5,
            paginationShowsTotal: this.renderShowsTotal,
            onSortChange: this.onSortChange,
        };

        return <div>
            <div>
                <BootstrapTable ref='table'
                    data={data}
                    striped hover pagination
                    options={options}
                >
                    {columns.map((value, index) => {
                        return <TableHeaderColumn
                            key={index}
                            ref={value.key}
                            isKey={value.isKey}
                            dataField={value.key}
                            hidden={value.isHidden}
                            width={value.width}
                            columnClassName={value.columnClassName}
                            columnTitle={value.toolTip}
                            dataSort={value.dataSort}
                            dataFormat={value.dataFormat}
                            filter={value.filter}
                        >{value.header}
                        </TableHeaderColumn>;
                    })}

                </BootstrapTable>
            </div>
        </div>

    }
}

export default connect(
    (state: ApplicationState) => state.movies, // Selects which state properties are merged into the component's props
    MovieStore.actionCreators // Selects which action creators are merged into the component's props
)(MovieList as any);
