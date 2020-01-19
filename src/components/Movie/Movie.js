import React from "react";
import classes from './Movie.css';



const Movie = ({movie}) => {
    const imageUrl = "https://image.tmdb.org/t/p/original/"+movie.poster_path ;
    
    return (
        <div className={classes.Movie}>
        <div className="card card-body bg-light ">
            <div className="row">
                <div className="col-md-4">
                    <img  className={classes.thumbnail} src={imageUrl} alt="movie image" />
                </div>
                <div className="col-md-8">
                    <h4>{movie.title}</h4>
                    <ul className="list-group">
                        <li className="list-group-item">Date Released: {movie.release_date}</li>
                        <li className="list-group-item"><i className="fa fa-star-o star-icon"></i></li>
                        
                    </ul>
                </div>
            </div>
        </div>
        </div>
        /*<div className ={classes.Movie}>
            <div className={classes.MovieItem}>
                <h3>{movie.title}</h3>
                <img width="250px" height="400px" src={imageUrl} alt="movie image" />
                <div>
                <p>{movie.release_date}</p> 
                </div>
               
                
            </div>
        </div>*/
    );
};
export default Movie;