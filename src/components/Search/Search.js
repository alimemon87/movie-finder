import React, {useState} from "react";
import classes from './Search.css';

const Search = (props) => {
    const [result,setResult] = useState("");

    const inputHandler = (e) => {
        setResult(e.target.value);
    }

    const emptyFields = () => {
        setResult("");
    }

    const clickHandler = (e) => {
        e.preventDefault();
        props.search(result);
        emptyFields();
    }

    return(
        <div className={classes.Search}>
            <h1 className={classes.textCenter}>Search For A Movie</h1> 
            <form>
                <div className="form-group">
                    <input value={result} onChange={inputHandler} type="text" className="form-control" plaveholder="Enter a Movie"/>
                </div>
                <input className="btn btn-primary btn-block" onClick={clickHandler} type="submit" value="Search" />
            </form>
        </div>
    );
}

export default Search;