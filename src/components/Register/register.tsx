import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import classes from './register.module.css';

export default () => {
    return (
        <div id="form">
            <div className={ classes.section }>
                <label><strong>First Name: </strong></label>
                <InputText />
            </div>
            <div className={ classes.section }>
                <label><strong>Last Name: </strong></label>
                <InputText />
            </div>
            <div className={ classes.section }>
                <label><strong>Phone</strong></label>
                <InputText />
            </div>
            <div className={ classes.section }>
                <label><strong>Email (Optional): </strong></label>
                <InputText />
            </div>
            <div className={ classes.section }>
                <label><strong>Team Name: </strong></label>
            </div>
        </div>
    ); 
}