import React, { useState, useEffect } from 'react';

import AdvancedTable from '../Table/Advanced/advanceTable';
import classes from './viewUsers.module.css';

export default () => {
    const [ data, setData ] = useState([]);

    const fetchData = async() => {
        const response = await fetch('https://www.vtwalk.org:4000/listUsers');
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