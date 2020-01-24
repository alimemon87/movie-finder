import React from 'react';

//Application components
import Movie from '../../components/Movie/Movie';

import {Alert} from 'react-bootstrap';

class MoviesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageTitle: 'Popular Movies.',
            movies: [],
            errorMessage: '',
            loading: false,
        }
    }

    componentDidMount() {
        this.setState({loading: true}, ()=>{
            fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=d097798a730d510509b5e700d897c391&language=en-US&page=1`)
                .then(response => response.json())
                .then(jsonResponse => {
                if (jsonResponse.total_results > 0) {
                    if(jsonResponse.results.length > 0) {
                        jsonResponse.results.forEach( (item, index)=>{
                            let findMFL = this.props.moviesForLater.findIndex(movie=>{return movie.id === item.id});  
                            let findFM = this.props.favouriteList.findIndex(movie=>{return movie.id === item.id});      
                            item.watchMeLater = (findMFL === -1) ? false : true;
                            item.favourite = (findFM === -1) ? false : true;
                        });
                    }
                    this.setState({
                        movies: jsonResponse.results,
                        loading: false
                    });
                } else {
                    this.setState({
                        errorMessage: 'Fail to load data'
                    });
                }
            });
        });
    }

    checkBox = (e, movie, index) => {
        try {
            const checked = e.target.checked;
            let watchmeLaterMovies = [...this.state.movies];
            watchmeLaterMovies[index].watchMeLater = checked;
            this.setState({
                movies: watchmeLaterMovies
            }, ()=>{
                if(checked) {
                    this.props.setMoviesForLater(watchmeLaterMovies[index]);
                } else {
                    this.props.removeWatchMeLater(watchmeLaterMovies, index);
                }
                
            });
        } catch (error) {
            this.setState({
                errorMessage: error
            });
        }
    }

    favourite = (e, result, movie, index) => {
        try {
            
            let watchmeLaterMovies = [...this.state.movies];
            watchmeLaterMovies[index].favourite = result;
            
            this.setState({
                movies: watchmeLaterMovies
            }, ()=>{
                if(result) {
                    this.props.setFavouriteList(watchmeLaterMovies[index]);
                } else {
                    this.props.removeFavourite(watchmeLaterMovies, index);
                }
            });

        } catch (error) {
            this.setState({
                errorMessage: error
            });
        }
    }

    search = (searchValue) => {
        this.setState({loading: true, movies: []}, ()=>{
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=d097798a730d510509b5e700d897c391&language=en-US&query=${searchValue}&page=1&include_adult=false`)
                .then(response => response.json())
                .then(jsonResponse => {
                if (jsonResponse.total_results > 0) {
                    if(jsonResponse.results.length > 0) {
                        jsonResponse.results.forEach( (item, index)=>{
                            let findMFL = this.props.moviesForLater.findIndex(movie=>{return movie.id === item.id});  
                            let findFM = this.props.favouriteList.findIndex(movie=>{return movie.id === item.id});      
                            item.watchMeLater = (findMFL === -1) ? false : true;
                            item.favourite = (findFM === -1) ? false : true;
                        });
                    }
                    this.setState({
                        pageTitle: 'Search Result',
                        movies: jsonResponse.results,
                        loading: false
                    });
                } else {
                    this.setState({
                        errorMessage: 'Fail to load data'
                    });
                }
            });
        });
	};

    render () {
        const {loading, errorMessage, movies, pageTitle} = this.state;
        return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h3 className="text-center">  { (movies.length) ? pageTitle : ''}  </h3>
                    <div className="App">
                        <div className="movies">
                            {
                                (loading && !errorMessage) ? (
                                    <h3 className="text-center"> Loading... </h3>
                                ) : errorMessage ? (
                                    <div className="errorMessage">{errorMessage}</div>
                                ) : (
                                    movies.length > 0 ? (
                                        movies.map(
                                            (item, index) => (
                                                <Movie  key={`${index}-${item.Title}`} 
                                                    movie={item} 
                                                    checkBoxHandler = {(e) => this.checkBox(e, item, index)}
                                                    onFavouriteHandler = {(e, result)=> this.favourite(e, result, item, index)}
                                                />
                                            )
                                        )
                                    ) : (
                                        <Alert variant={"info"}>
                                            <h6 className='text-center'>Nothing to display.</h6>
                                        </Alert>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>           
            </div>
        </div>
      )
    }
}

export default MoviesList;