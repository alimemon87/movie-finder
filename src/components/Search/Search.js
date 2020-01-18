import React, {useState} from "react";

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
        <form className="search"> 
            <input value={result} onChange={inputHandler} type="text" />
            <input onClick={clickHandler} type="submit" Value="Search" />
        </form>
    );
}

export default Search;