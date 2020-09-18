import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

import classes from './registerMile.module.css';

export default () => {
    const today = new Date();
    const 
        [ date, setDate ] = useState(today),
        [ phone, setPhone ] = useState(''),
        [ mile, setMile ] = useState(0);

    const submit = () => {
        const track = {
            phone,
            date,
            miles: mile
        };

        console.log(track);

        submitData(track);
    };

    const submitData = async(track: any) => {
        const response = {
            tracker: {
                phone: track.phone,
                date: track.date,
                miles: track.miles
            }
        };
        try {
            const data = await fetch('http://localhost:4000/register/mile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(response)
            });

            if (data.status === 400) {
                console.log('User does not exist');
            }
        } catch (e) {
            console.log('hello');
            console.error(e);
        }
        
    }


    return (
        <div id={ classes.form }>
            <div className={ classes.section }>
                <label className={ classes.text }><strong>Phone: </strong></label>
                <InputText value={ phone } onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setPhone(target.value) }/>
            </div>
            <div className={ classes.section }>
                <label className={ classes.text }><strong>Date: </strong></label>
                <Calendar value={date} onChange={(e) => setDate(e.value as Date) }></Calendar>
            </div>
            <div className={ classes.section }>
                <label className={ classes.text }><strong>Mile: </strong></label>
                <InputText value={ mile } onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setMile(parseInt(target.value)) }/>
            </div>
            <div id={ classes.submitButton } className={ classes.section }>
                <Button label='Track Mile' className='p-button-success' onClick={ submit  }/>
            </div> 
        </div>
    );
}