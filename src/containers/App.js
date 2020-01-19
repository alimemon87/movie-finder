import React, { useReducer, useEffect } from 'react';
import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import Movie from '../components/Movie/Movie';
import BeautyStar from "beauty-stars";
import './App.css';

//const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";
const MOVIE_API_URL = "https://api.themoviedb.org/3/movie/top_rated?api_key=d097798a730d510509b5e700d897c391&language=en-US&page=1";


const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};


const reducer = (state, action) => {
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



const App = () => {
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
	
        //fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
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
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
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
