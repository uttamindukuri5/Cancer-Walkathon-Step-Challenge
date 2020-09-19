import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import Table from '../Table/table';
import classes from './viewMile.module.css'

export default () => {
    const 
        messages = useRef(null),
        [ data, setData ]: any[] = useState([]),
        [ phone, setPhone ] = useState(''),
        [ totalMiles, setTotalMiles ] = useState(0); 

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /([2-9]\d{9})|([2-9]\d{2}-\d{3}-\d{4})/;
        return phoneRegex.test(phone);
    }

    const submit = () => {
        if (!validatePhone(phone)) {
            //@ts-ignore
            messages.current.show({ severity: 'error', summary: 'Invalid Phone Number', detail: 'Please enter the correct phone number EX: (2142345678 or 214-234-5678' });
            setPhone('');
            return;
        }

        submitData(phone);

        setPhone('');
    };

    const submitData = async(phone: string) => {
        const request = {
            phone: phone
        }
        try {
            const response = await fetch('http://localhost:4000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            if (response.status === 404 || response.status === 400) {
                // @ts-ignore
                messages.current.show({ severity: 'error', summary: 'User Not Found', detail: 'This phone number does not exist, please go to register page to enter your miles.' });
            } else {
                const data = await response.json();
                formatData(data);
            }
        } catch (e) {
            console.log(e);
        } 
    }

    const formatData = (data: any) => {
        const modifiedData: any[] = [];
        let totalMiles = 0;
        for (let track of data) {
            totalMiles += track.miles;
            const date = new Date(track.date);
            const newData = {
                date: `${ date.getMonth() }/${ date.getDate() }/${ date.getFullYear() }`,
                miles: track.miles
            }
            modifiedData.push(newData);
        };
        setTotalMiles(totalMiles);
        setData(modifiedData);
    }

    let viewData = null;
    if (data !== []) {
        viewData = (
            <div>
                <div className={classes.info}>
                    <h4>Total Miles</h4>
                    <h2 className={ classes.heading }>{ totalMiles }</h2>
                </div>
                <div className={ classes.data }>
                    <Table data={ data } viewTeam={false} />
                </div>
            </div>
            
        )
    }

    return (
        <div>
            <Toast ref={ messages } />
            <div id={ classes.form }>
                <div className={ classes.section }>
                    <label className={ classes.text }><strong>Phone: </strong></label>
                    <InputText value={ phone } onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setPhone(target.value) }/>
                </div>
                <div id={ classes.submitButton } className={ classes.section }>
                    <Button label='Track Miles' className='p-button-success' onClick={ submit  }/>
                </div> 
            </div>
            <div>
                { viewData }
            </div>

        </div>
    );
};