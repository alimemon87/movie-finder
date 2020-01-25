import React from 'react';
import Pagination from "react-js-pagination";

//Application components
import Movie from '../../components/Movie/Movie';

import {Alert} from 'react-bootstrap';

class MoviesList extends React.Component {

    constructor(props) {
        super(props);
        this.handlePageChange =  this.handlePageChange.bind(this);
        this.search = this.search.bind(this);
        this.state = {
            pageTitle: 'Popular Movies.',
            searchQuery: '',
            movies: [],
            errorMessage: '',
            loading: false,
            itemPerPage: 3,
            activePage: 1,
            totalResults: 0
        }
    }
    

    componentDidMount() {
        this.getFetchApi();
    }

   
    getFetchApi(){
        this.setState({loading: true}, ()=>{
            fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=d097798a730d510509b5e700d897c391&language=en-US&page=${this.state.activePage}`)
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
                        totalResults: jsonResponse.total_results,
                        loading: false,
                        searchQuery: ''
                    });
                } else {
                    this.setState({
                        errorMessage: 'Fail to load data'
                    });
                }
            });
        });
    }
    
    //Selecting Watch Movie Later Functionality
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
    
    //Selecting Favorites
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

    //Searching the movie when button clicks
    search = (searchValue) => {
        this.setState({loading: true, movies: [], searchQuery: searchValue}, ()=>{
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=d097798a730d510509b5e700d897c391&language=en-US&query=${this.state.searchQuery}&page=${this.state.activePage}&include_adult=false`)
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
    //Handling Pagination
    handlePageChange(pageNumber) {
        if(this.state.searchQuery === ""){
            this.getFetchApi();
        }else{
            this.search(this.state.searchQuery);
        }
        
        this.setState({activePage: pageNumber});
        
        
      }
    
    

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
            <div style={{display: "flex",justifyContent: "space-around",}}>
               {
                this.state.totalResults > 20 && !this.state.loading ?
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={20}
                    totalItemsCount={this.state.totalResults}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />: ""
               }
            </div>
        </div>
        
      )
    }
}

export default MoviesList;