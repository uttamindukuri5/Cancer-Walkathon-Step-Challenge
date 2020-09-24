import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import Table from '../Table/table';
import classes from './registerMile.module.css';
import fetch from 'node-fetch';

export default () => {
    const 
        today = new Date(),
        messages = useRef(null);

    const 
        [ date, setDate ] = useState(today),
        [ userId, setUserId ] = useState(''),
        [ mile, setMile ] = React.useState<number>(),
        [ data, setData ]: any[] = useState([]),
        [ totalMiles, setTotalMiles ] = useState(0); 


    const resetValue = () => {
        setUserId('');
        setMile(0);
    }

    const submit = async () => {
        if (mile) {
            const today = new Date();
            const track = {
                userId: userId.toLowerCase(),
                date,
                miles: mile.toFixed(2)
            };

            if (mile <= 0.00 && mile >= 21) {
                //@ts-ignore
                messages.current.show({ severity: 'error', summary: 'Mile Error', detail: 'Please enter a mile that is greater than 0 and less than or equal to 20' });
                return;
            }
    
            if (date > today) {
                //@ts-ignore
                messages.current.show({ severity: 'error', summary: 'Date Not Valid', detail: 'Cannot enter future date' });
                return;
            }
    
            await submitData(track);
            await fetchViewData(userId);
        } else {
            //@ts-ignore
            messages.current.show({ severity: 'error', summary: 'Mile Error', detail: 'Please enter a mile between 0.01 to 20.00 miles' });
            return;
        }

        resetValue();
    };

    const fetchViewData = async (userId: string) => {
        const request = {
            userId: userId.toLowerCase()
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
                messages.current.show({ severity: 'error', summary: 'User Not Found', detail: 'This user ID does not exist, please go to register page to enter your miles.' });
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
                date: `${ date.getMonth() + 1 }/${ date.getDate() }/${ date.getFullYear() }`,
                miles: track.miles
            }
            modifiedData.push(newData);
        };
        setTotalMiles(totalMiles);
        setData(modifiedData);
    }

    const submitData = async(track: any) => {
        const response = {
            tracker: {
                userId: track.userId,
                date: track.date,
                miles: track.miles
            }
        };
        try {
            const data = await fetch('https://www.vtwalk.org:4000/register/mile', {
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

    let viewData = null;
    if (data !== []) {
        viewData = (
            <div>
                <div className={classes.info}>
                    <h4>Total Miles</h4>
                    <h2 className={ classes.heading }>{ totalMiles.toFixed(2) }</h2>
                </div>
                <div className={ classes.data }>
                    <Table data={ data } viewTeam={false} />
                </div>
            </div>
            
        )
    }


    return (
        <div>
            <div id={ classes.form }>
                <Toast ref={ messages }/>
                <div className={ classes.section }>
                    <div>
                        <label className={ classes.text }><strong>User ID: </strong></label>
                    </div>
                    <div className={ classes.formInput }>
                        <InputText 
                            value={ userId } 
                            onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setUserId(target.value) }
                            style={{ width: 'inherit' }}    
                        />
                    </div>
                </div>
                <div className={ classes.section }>
                    <div>
                        <label className={ classes.text }><strong>Date: </strong></label>
                    </div>
                    <div className={ classes.formInput }>
                        <Calendar 
                            value={date} 
                            onChange={(e) => setDate(e.value as Date) }
                            style={{ width: 'inherit' }}
                        ></Calendar>
                    </div>
                </div>
                <div className={ classes.section }>
                    <div>
                        <label className={ classes.text }><strong>Miles: </strong></label>
                    </div>
                    <div className={ classes.formInput }>
                        <InputNumber 
                            value={ mile } 
                            onValueChange={ (e) => setMile(e.value) } 
                            mode='decimal' 
                            minFractionDigits={ 2 } 
                            maxFractionDigits={ 2 }
                            style={{ width: 'inherit' }}    
                        />
                    </div>
                </div>
                <span id={ classes.info } className="p-tag p-tag-warning">Note: 2000 steps = 1 mile and 1 km = 0.62 mile</span>
                <div id={ classes.submitButton }>
                    <Button label='Track Miles' className='p-button-success' onClick={ submit }/>
                </div> 
            </div>
            <div>
                { viewData }
            </div>
        </div>
    );
}