import React from 'react';
import {Navbar, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Search from '../Search/Search';

const header = (props) => {
    return(
        <header>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                    <Link to="/">Home</Link>
                </Navbar.Brand>
                <Navbar.Brand>
                    <Link to="/watch/later">Watch Later Movies</Link>
                </Navbar.Brand>
                <Navbar.Brand>
                    <Link to="/favourite/movies">Favourite Movies</Link>
                </Navbar.Brand>
                <Form inline className='text-right'>
                    <Search search={props.search}/>
                </Form>
            </Navbar>
        </header>
    );
};

export default header;