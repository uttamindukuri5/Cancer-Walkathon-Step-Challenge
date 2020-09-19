import React from 'react';
import { Link } from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    Button
  } from 'reactstrap';

import classes from './header.module.css'

export default () => {

    return (
      <Navbar color="primary" light expand="md">
        <NavbarBrand>
          <Link to='/'>
            <span className={ classes.navbarText }>Walk-a-thon</span>
          </Link>
        </NavbarBrand>
        <div className= { classes.register }>  
          <Link to='/register'>
            <Button color="danger"><span>Register</span></Button>
          </Link>        
        </div>
      </Navbar>
    );
}
