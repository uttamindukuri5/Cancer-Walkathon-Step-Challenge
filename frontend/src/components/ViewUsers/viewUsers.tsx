import React, { useState, useEffect } from 'react';

import AdvancedTable from '../Table/Advanced/advanceTable';
import classes from './viewUsers.module.css';

export default () => {
    const [ data, setData ] = useState([]);

    const fetchData = async() => {
        const response = await fetch('http://ec2-18-191-61-77.us-east-2.compute.amazonaws.com:4000/listUsers');
        return await response.json();
    };

    useEffect(() => {
        fetchData()
            .then(data => {
                setData(data);
            });
    }, [setData]);

    return (
        <div className={ classes.data }>
            <AdvancedTable data={ data } />
        </div>
    )
}