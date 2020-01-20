import React, { useReducer, useEffect } from 'react';
import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import Movie from '../components/Movie/Movie';
import './App.css';

const MOVIE_API_URL = "https://api.themoviedb.org/3/movie/top_rated?api_key=d097798a730d510509b5e700d897c391&language=en-US&page=1";


const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
};


const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};



const App = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
    
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
        
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.results
        	});
      	});
  	}, []);

    const search = searchValue => {
    	dispatch({
      	type: "SEARCH_MOVIES_REQUEST"
    	});
	
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=d097798a730d510509b5e700d897c391&language=en-US&query=${searchValue}&page=1&include_adult=false`)
      	.then(response => response.json())
      	.then(jsonResponse => {
          console.log(jsonResponse);
        	if (jsonResponse.total_results > 0) {
          	dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.results
          	});
        	} else {
          	dispatch({
                type: "SEARCH_MOVIES_FAILURE",
                error: jsonResponse.Error
          	});
          }
      	});
	  };

    const { movies, errorMessage, loading } = state;

    const isFavouriteClick = (e,movie,index) =>{
      console.log(e.target);
    }

    const checkBox=(e,movie,index) => {
      
      const checked = e.target.checked;
      let watchmeLaterMovies = [...state.movies];
      watchmeLaterMovies =  watchmeLaterMovies[index];
      watchmeLaterMovies.watchMeLater = checked;
      dispatch({
        type: "IS_WATCH_ME",
        payload: watchmeLaterMovies
    });
    }

    return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
        <div className="App">
          
          <Search search={search} />

          <div className="movies">
            <h3 className="text-center">Results</h3>
            {loading && !errorMessage ? (
              <span>loading... </span>
            ) : errorMessage ? (
              <div className="errorMessage">{errorMessage}</div>
            ) : (
              
              movies.map((movie, index) => (
                <Movie  key={`${index}-${movie.Title}`} 
                movie={movie} 
                click={(e)=> isFavouriteClick(e,movie,index)} 
                checkBoxHandler = {(e) => checkBox(e,movie,index)}
                />
              ))
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
