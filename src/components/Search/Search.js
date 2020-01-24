import React, {useState, Fragment} from "react";
//import classes from './Search.css';

import {FormControl, Button} from 'react-bootstrap';

const Search = (props) => {
    const [result,setResult] = useState("");

    const inputHandler = (e) => {
        //e.preventDefault();
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
        
        <Fragment>
            <FormControl type="text" placeholder="Search" value={result} onChange={inputHandler} className="mr-sm-2" />
            <Button type="submit" variant="outline-success" onClick={clickHandler}>Search</Button>
        </Fragment>

        
        
    );
}

export default Search;