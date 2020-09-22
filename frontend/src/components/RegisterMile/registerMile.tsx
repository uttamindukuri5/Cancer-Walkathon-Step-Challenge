import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
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
        [ userId, setUserId ] = useState(''),
        [ mile, setMile ] = React.useState<number>();


    const resetValue = () => {
        setUserId('');
        setMile(0);
    }

    const submit = () => {
        if (mile) {
            const today = new Date();
            const track = {
                userId: userId.toLowerCase(),
                date,
                miles: mile
            };
            if (mile >= 21) {
                //@ts-ignore
                messages.current.show({ severity: 'error', summary: 'Mile limit exceeded', detail: 'You can have a max of 20 miles' });
                resetValue();
                return;
            }
    
            if (date > today) {
                //@ts-ignore
                messages.current.show({ severity: 'error', summary: 'Date Not Valid', detail: 'Cannot enter future date' });
                resetValue();
                return;
            }
    
            submitData(track);
        }

        resetValue();
    };

    const submitData = async(track: any) => {
        const response = {
            tracker: {
                userId: track.userId,
                date: track.date,
                miles: track.miles
            }
        };
        try {
            const data = await fetch('http://ec2-18-191-61-77.us-east-2.compute.amazonaws.com:4000/register/mile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(response)
            });

            if (data.status === 404 || data.status === 400) {
                // @ts-ignore
                messages.current.show({ severity: 'error', summary: 'User Not Found', detail: 'This user ID does not exist, please go to register page to enter your miles.' });
            } else {
                // @ts-ignore
                messages.current.show({ severity: 'success', summary: 'Miles Saves', detail: 'Your miles have been successfully saved' });
            }
        } catch (e) {
            console.log(e);
        }
        
    }


    return (
        <div id={ classes.form }>
            <Toast ref={ messages }/>
            <div className={ classes.section }>
                <label className={ classes.text }><strong>User ID: </strong></label>
                <InputText value={ userId } onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setUserId(target.value) }/>
            </div>
            <div className={ classes.section }>
                <label className={ classes.text }><strong>Date: </strong></label>
                <Calendar value={date} onChange={(e) => setDate(e.value as Date) }></Calendar>
            </div>
            <div className={ classes.section }>
                <label className={ classes.text }><strong>Miles: </strong></label>
                <InputNumber value={ mile } onValueChange={ (e) => setMile(e.value) } mode='decimal' minFractionDigits={ 2 } maxFractionDigits={ 2 }/>
            </div>
            <span className="p-tag p-tag-warning">Note: 2000 steps = 1 mile and 1km = 0.62 mile</span>
            <div id={ classes.submitButton } className={ classes.section }>
                <Button label='Track Miles' className='p-button-success' onClick={ submit }/>
            </div> 
        </div>
    );
}