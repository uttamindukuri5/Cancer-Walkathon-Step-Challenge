import React, { useState, useEffect } from 'react';

import AdvancedTable from '../Table/Advanced/advanceTable';
import Modal from '../Modal/modal';
import classes from './viewUsers.module.css';


export default () => {
    const 
        [ data, setData ] = useState([]),
        [ viewUser, setViewUser ] = useState({}),
        [ hideModal, setHideModal ] = useState(false);

    const fetchData = async() => {
        const response = await fetch('http://localhost:4000/listUsers');
        return await response.json();
    };

    useEffect(() => {
        fetchData()
            .then(data => {
                setData(data);
            });
    }, [setData]);

    return (
        <div className={ classes.data } >
            <AdvancedTable data={ data } setUser={ setViewUser } setModal={ setHideModal } />
            <Modal data={ viewUser } visible={ hideModal } changeVisibility={ setHideModal }/>
        </div>
    )
}