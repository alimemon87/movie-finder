import React, {useState, Fragment} from "react";
//import classes from './Search.css';

import {FormControl, Button} from 'react-bootstrap';

const Search = (props) => {
    //Using Hook
    const [result,setResult] = useState("");


    const inputHandler = (e) => {
        //e.preventDefault();
        setResult(e.target.value);
    }

    //Make all fields empty
    const emptyFields = () => {
        setResult("");
    }

    //When search button pressed
    const clickHandler = (e) => {
        e.preventDefault();
        props.search(result);
        emptyFields();
    }

    return(
        
        <Fragment>
            <FormControl type="text" placeholder="Search" value={result} onChange={inputHandler} className="mr-sm-2" />
            <Button type="submit" id="my-button" variant="outline-success" onClick={clickHandler}>Search</Button>
        </Fragment>

        
        
    );
}

export default Search;