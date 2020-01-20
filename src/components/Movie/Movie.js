import React, {useState} from "react";
import classes from './Movie.css';
import Checkbox from '../Checkbox/Checkbox';



const Movie = (props) => {
    let [result,setResult] = useState("");
    const {movie} = props;
    const movieArray = [movie];
    console.log(movieArray);
    const imageUrl = "https://image.tmdb.org/t/p/original/"+movie.poster_path ;
    const clickHandler = () => {
        if(result===true)
            setResult(false);
        else
            setResult(true);
    }
   const checkBoxHandler = () => {
       // const checked = e.target.checked;
        //console.log(checked);
        //props.movie['isFavorite'] = true;
        //console.log(props.movie);
    }
    return (
        <div className={classes.Movie}>
        <div className="card card-body bg-light ">
            <div className="row">
                <div className="col-md-4">
                    <img  className={classes.thumbnail} src={imageUrl} alt="movie" />
                </div>
                <div className="col-md-8">
                    <h4>{movie.title}</h4>
                    <ul className="list-group">
                        <li className="list-group-item">Date Released: {movie.release_date}</li>
                        <li className="list-group-item"><span className={classes.star}><i className={result? "fa fa-star fa-lg ": "fa fa-star-o" } onClick={clickHandler} ></i></span></li>
                        <li className="list-group-item">
                        
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id={movie.id} onClick={(e) =>props.checkBoxHandler(e)} />
                                <label className="custom-control-label" htmlFor={movie.id}>Watch Movie Later</label>
                            </div>
                         
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
        </div>
    );
};
export default Movie;