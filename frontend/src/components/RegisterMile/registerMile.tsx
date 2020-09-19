import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import classes from './registerMile.module.css';

export default () => {
    const 
        today = new Date(),
        messages = useRef(null);

    const 
        [ date, setDate ] = useState(today),
        [ phone, setPhone ] = useState(''),
        [ mile, setMile ] = useState(0);


    const resetValue = () => {
        setPhone('');
        setMile(0);
    }

    const submit = () => {
        const track = {
            phone,
            date,
            miles: mile
        };

        console.log(track);

        submitData(track);

        resetValue();
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
                // @ts-ignore
                messages.current.show({ severity: 'error', summary: 'User Not Found', detail: 'This phone number does not exist, please go to register page to enter your miles.' });
            } else {
                // @ts-ignore
                messages.current.show({ severity: 'success', summary: 'Miles Saves', detail: 'Your miles have been successfully saved' });
            }
        } catch (e) {
            console.log('hello');
            console.error(e);
        }
        
    }


    return (
        <div id={ classes.form }>
            <Toast ref={ messages }/>
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