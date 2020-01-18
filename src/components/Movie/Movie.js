import React from "react";

const Movie = ({movie}) => {
    const poster = movie.Poster ;
    return (
        <div className ="movie">
            <h3>{movie.Title}</h3>
            <div>
                <img width="250" src={poster} alt="movie image" />
            </div>
            <p>{movie.Year}</p>
        </div>
    );
};
export default Movie;