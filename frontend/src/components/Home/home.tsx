import React, { useState, useEffect } from 'react';
import { SelectButton } from 'primereact/selectbutton';

import Table from '../Table/table';
import Register from '../Register/register';
import RegisterMile from '../RegisterMile/registerMile';
import ViewMile from '../ViewMile/viewMile';
import ViewUsers from '../ViewUsers/viewUsers';
import classes from './home.module.css';

export default () => {

    const
        tabs = ['Dashboard', 'Walkers', 'Register', 'Enter Miles', 'View Miles'],
        [teams, setTeams]: any[] = useState([]),
        [numUsers, setNumUsers] = useState(0),
        [tab, setTab] = useState(tabs[0]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:4000/teams'); 
        return await response.json();
    };

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:4000/totalUsers');
        return await response.json();
    }

    const getRemainingDays = (): number => {
        const
            endDate = new Date("10/28/2020"),
            currentDate = new Date(),
            timeDifference = endDate.getTime() - currentDate.getTime(),
            daysDifference = timeDifference / (1000 * 3600 * 24); 

        return Math.floor(daysDifference) + 1;
    }

    useEffect(() => {
        fetchData()
            .then((data) => {
                setTeams(data);
            });
        fetchUsers()
            .then((data) => {
                setNumUsers(data.totalUsers);
            });
    }, [setTeams, setNumUsers]);

    let totalMiles = 0;
    teams.forEach((team: any) => {
        totalMiles += team.totalMiles;
    });

    const changeTab = (value: string) => {
        if (value === null) {
            return;
        }
        if (value !== tab) {
            setTab(value);
        }
        if (value === 'Dashboard') {
            window.location.reload(false);
        }
    }

    let base; 

    if (tab === 'Enter Miles') {
        base = (
            <RegisterMile />
        );
    } else if (tab === 'Dashboard') {
        base = (
            <div id={ classes.visual }>
                <div className='p-d-flex p-jc-center p-flex-column p-flex-md-row'>
                    <div className={classes.info + ' p-mb-2 p-mr-2'}>
                        <h4>Total Miles</h4>
                        <h2 className={ classes.heading }>{ totalMiles.toFixed(2) }</h2>
                    </div>
                    <div className={classes.info + ' p-mb-2 p-mr-2'}>
                        <h4>Target Goal</h4>
                        <h2 className={ classes.heading }>10,000</h2>
                    </div>
                    <div className={classes.info + ' p-mb-2 p-mr-2'}>
                        <h4>Total Registrants</h4>
                        <h2 className={ classes.heading }>{ numUsers }</h2>
                    </div>
                    <div className={classes.info + ' p-mb-2 p-mr-2'}>
                        <h4>Remaining Days</h4>
                        <h2 className={ classes.heading }>{ getRemainingDays() }</h2>
                    </div>
                </div>
                <hr />
                <div id={ classes.graphic }>
                    <div className={ classes.data }>
                        <Table data={ teams } viewTeam={ true } />
                    </div>
                </div>
            </div>
        );
    } else if (tab === 'View Miles'){
        base = (
            <ViewMile />
        );
    } else if (tab === 'Register') {
        base = (
            <Register />
        );
    } else if (tab === 'Walkers') {
        base = (
            <ViewUsers />
        );
    }

    return (
        <div>
            <div className={ classes.tab }>
                <SelectButton className='p-button-danger' value={ tab } options={ tabs } onChange={ (e) => { changeTab(e.value) } }/>
            </div>
            <div id={ classes.content }>
                { base }
            </div>
        </div>
    );
}