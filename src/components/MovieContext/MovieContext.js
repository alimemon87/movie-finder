/*import React, {useState, createContext} from 'react';

export const MovieContext = createContext();

export const MovieProvider = props => {

    const MOVIE_API_URL = "";
//const MOVIE_API_URL = "https://api.themoviedb.org/3/movie/top_rated?api_key=d097798a730d510509b5e700d897c391&language=en-US&page=1";


const initialState = {
  loading: false,
  movies: [],
  errorMessage: null,
};


export const reducer = (state, action) => {
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

    return (
        <MovieContext.Provider>
            {props.children}
        </MovieContext.Provider>
    );
}*/