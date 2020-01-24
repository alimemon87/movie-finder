import React, {useState} from "react";
import classes from './Movie.css';

const Movie = (props) => {

    let [result, setResult] = useState("");

    const {movie, hideCheckBox} = props;
    const imageUrl = "https://image.tmdb.org/t/p/original/"+movie.poster_path ;

    const clickHandler = (e) => {
        props.onFavouriteHandler(e, (!movie.favourite) ? true : false);
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
                        { (!props.hideFavourite) && <li className="list-group-item"><span className={classes.star}><i className={movie.favourite ? "fa fa-star fa-lg ": "fa fa-star-o" } onClick={clickHandler} ></i></span></li>}
                        {
                            (!props.hideWML) && <li className="list-group-item">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id={movie.id} checked={movie.watchMeLater ? true: false} onClick={(e) =>props.checkBoxHandler(e, movie.watchMeLater ? true: false)} />
                                    <label className="custom-control-label" htmlFor={movie.id}>Watch Movie Later</label>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
        </div>
    );
};
export default Movie;