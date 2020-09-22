import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SelectButton } from 'primereact/selectbutton';

import Chart from '../Chart/chart';
import Table from '../Table/table';
import RegisterMile from '../RegisterMile/registerMile';
import ViewMile from '../ViewMile/viewMile';
import ViewUsers from '../ViewUsers/viewUsers';
import classes from './home.module.css';

export default () => {

    const
        history = useHistory(),
        tabs = ['Dashboard', 'Register', 'Enter Miles', 'View Miles', 'Walkers'],
        [teams, setTeams]: any[] = useState([]),
        [numUsers, setNumUsers] = useState(0),
        [tab, setTab] = useState(tabs[0]);

    const fetchData = async () => {
        const response = await fetch('http://ec2-3-137-200-96.us-east-2.compute.amazonaws.com:4000/teams'); 
        return await response.json();
    };

    const fetchUsers = async () => {
        const response = await fetch('http://ec2-3-137-200-96.us-east-2.compute.amazonaws.com:4000/totalUsers');
        return await response.json();
    }

    const getRemainingDays = (): number => {
        const
            endDate = new Date("10/20/2020"),
            currentDate = new Date(),
            timeDifference = endDate.getTime() - currentDate.getTime(),
            daysDifference = timeDifference / (1000 * 3600 * 24); 

        return Math.floor(daysDifference);
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
                        <h2 className={ classes.heading }>{ totalMiles }</h2>
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
                        <Chart data={ teams } />
                    </div>
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
        history.push('/register');
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