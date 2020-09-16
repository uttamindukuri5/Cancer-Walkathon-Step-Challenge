import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import classes from './register.module.css';

export default () => {
    const teams = [
        'team 1', 
        'team 2',
        'team 3',
        'team 4'
    ];
    const [selectedTeam, setSelectedTeam] = useState(teams[0]);

    return (
        <div id="form">
            <div className={ classes.section }>
                <label><h6>First Name: </h6></label>
                <InputText />
            </div>
            <div className={ classes.section }>
                <label><strong>Last Name: </strong></label>
                <InputText />
            </div>
            <div className={ classes.section }>
                <label><strong>Phone: </strong></label>
                <InputText />
            </div>
            <div className={ classes.section }>
                <label><strong>Email (Optional): </strong></label>
                <InputText />
            </div>
            <div className={ classes.section }>
                <label><strong>Team Name: </strong></label>
                <Dropdown value={selectedTeam} options={teams} onChange={(e) => setSelectedTeam(e.target.value)} filter showClear
    placeholder="Select a Team"/>
            </div>
        </div>
    ); 
}