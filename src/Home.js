import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import WatchLater from './containers/SelectedMovies/SelectedMovies';
import FavouriteMovies from './containers/SelectedMovies/SelectedMovies';
import MovieList from './containers/Movies/MoviesList';

import Header from './components/Header/Header';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.moviesListRef = React.createRef();
        this.state = {
            moviesForLater : [],
            favouriteList : []
        }
    }

    setMoviesForLater = (list) => {
        this.setState({ moviesForLater: [...this.state.moviesForLater, list] });
    }

    setFavouriteList = (list) => {
        this.setState({ favouriteList: [...this.state.favouriteList, list] });
    }

    removeFavourite = (movie, index) => {
        let favouriteCopy = [...this.state.favouriteList];
        favouriteCopy.splice(index, 1);
        this.setState({ favouriteList:  favouriteCopy });
    }

    removeWatchMeLater = (movie, index) => {
        let favouriteCopy = [...this.state.moviesForLater];
        favouriteCopy.splice(index, 1);
        this.setState({ moviesForLater:  favouriteCopy });
    }

    search = (searchValue) => {
        this.moviesListRef.current.search(searchValue);
	};

    render() {
        const {moviesForLater, favouriteList} = this.state;
        return (
            <Router>
                <Header search={this.search} />
                <Switch>
                    <Route 
                        path="/" 
                        exact 
                        render = {
                            (history) => {
                                return <MovieList
                                    ref={this.moviesListRef} 
                                    route={history}
                                     moviesForLater={moviesForLater}
                                      favouriteList={favouriteList} 
                                      setFavouriteList={this.setFavouriteList} 
                                      setMoviesForLater={this.setMoviesForLater} 
                                      removeFavourite={this.removeFavourite} 
                                      removeWatchMeLater={this.removeWatchMeLater}
                                    />
                            }
                        }
                    />
                    <Route 
                        path="/watch/later" 
                        exact 
                        render = {
                            (history) => {
                                return <WatchLater 
                                    route={history} 
                                    pageTitle={"Watch Me Later"} 
                                    hideFavourite = {true}
                                    selectedMovies={moviesForLater} 
                                    setMoviesForLater={this.setMoviesForLater}
                                    removeWatchMeLater={this.removeWatchMeLater} 
                                />
                            }
                        }
                    />

                    <Route 
                        path="/favourite/movies" 
                        exact 
                        render = {
                            (history) => {
                                return <FavouriteMovies
                                    route={history} 
                                    pageTitle={"Favourite List"} 
                                    selectedMovies={favouriteList} 
                                    hideWML = {true}
                                    setFavouriteList={this.setFavouriteList} 
                                    removeFavourite={this.removeFavourite} 
                                />
                            }
                        }
                    />
                    
                </Switch>
            </Router>
        );
    } 
    
}

export default Home;
