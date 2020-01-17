import React from 'react';
import classes from './Header.css';

const header = (props) => {
    return(
        <header className={classes.Header}>
            <h1>{props.title}</h1>
        </header>
    );
};
export default header;