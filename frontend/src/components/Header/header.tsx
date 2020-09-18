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
        <NavbarBrand><span className={ classes.navbarText }>Walk-a-thon</span></NavbarBrand>
        <div className= { classes.register }>  
          <Link to='/register'>
            <Button color="danger"><span>Register</span></Button>
          </Link>        
        </div>
      </Navbar>
    );
}
