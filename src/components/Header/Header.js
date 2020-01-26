import React from 'react';
import {Navbar, Form} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Search from '../Search/Search';

const header = (props) => {
    //inline object for css style
    const style = {
        color: 'black',
        fontWeight: 'bold'
    }
    return(
        <header>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                    <NavLink activeStyle={style} exact className="nav-link"  to="/">Home</NavLink>
                </Navbar.Brand>
                <Navbar.Brand>
                    <NavLink activeStyle={style} className="nav-link" to="/watch/later">Watch Later Movies</NavLink>
                </Navbar.Brand>
                <Navbar.Brand>
                    <NavLink activeStyle={style} className="nav-link" to="/favourite/movies">Favourite Movies</NavLink>
                </Navbar.Brand>
                <Form inline className='form-inline my-2 my-lg-0'>
                    <Search search={props.search}/>
                </Form>
            </Navbar>
        </header>
    );
};

export default header;