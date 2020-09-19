import React, { useState, useEffect } from 'react';

import Chart from '../Chart/chart';
import Table from '../Table/table';
import RegisterMile from '../RegisterMile/registerMile';
import classes from './home.module.css';

export default () => {

    const 
        [teams, setTeams]: any[] = useState([]),
        [tab, setTab] = useState('Track Mile'),
        [hover, setHover] = useState('Track-Mile');

    const fetchData = async () => {
        const response = await fetch('http://localhost:4000/teams'); 
        return await response.json();
    };

    useEffect(() => {
        fetchData()
            .then((data) => {
                setTeams(data);
            });
    }, []);

    let totalMiles = 0;
    teams.forEach((team: any) => {
        totalMiles += team.totalMiles;
    });

    let base; 

    if (tab === 'Enter Miles') {
        base = (
            <RegisterMile />
        );
    } else {
        base = (
            <div>
                <div className={ classes.data }>
                    <h1 id={ classes.heading }>{ totalMiles } Miles</h1>
                    <Chart data={ teams } />
                </div>
                <div className={ classes.data }>
                    <Table data={ teams } />
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className={ classes.tab }>
                <div className={ hover === 'Mile Tracker' ? classes.active : classes.individualTab } onClick={ () => setTab('Mile Tracker') } onMouseEnter={ () => setHover('Mile Tracker')}>
                    Mile Tracker
                </div>
                <div className={ hover === 'Enter Miles' ? classes.active : classes.individualTab } onClick={ () => setTab('Enter Miles') } onMouseEnter={ () => setHover('Enter Miles')}>
                    Enter Miles
                </div>
            </div>
            <div id={ classes.content }>
                { base }
            </div>
        </div>
    );
}