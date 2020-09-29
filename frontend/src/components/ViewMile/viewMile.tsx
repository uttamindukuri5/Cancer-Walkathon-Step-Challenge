import React, { useState, useRef } from 'react';
import { Messages } from 'primereact/messages';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import Table from '../Table/table';
import classes from './viewMile.module.css'

export default () => {
    const 
        messages = useRef(null),
        [ data, setData ]: any[] = useState([]),
        [ userId, setUserId ] = useState(''),
        [ totalMiles, setTotalMiles ] = useState(0); 

    const submit = () => {
        submitData(userId);
        setUserId('');
    };

    const submitData = async(userId: string) => {
        const request = {
            userId: userId.toLowerCase()
        }
        try {
            const response = await fetch('https://www.vtwalk.org:4000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            if (response.status === 404 || response.status === 400) {
                // @ts-ignore
                messages.current.show({ severity: 'error', detail: 'No miles entered or User ID does not exist.' });
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
        let totalMiles: number = 0;
        for (let track of data) {
            totalMiles += track.miles;
            const date = new Date(track.date);
            const newData = {
                date: `${ date.getMonth() + 1 }/${ date.getDate() }/${ date.getFullYear() }`,
                miles: track.miles
            }
            modifiedData.push(newData);
        };
        totalMiles = parseFloat(totalMiles.toFixed(2));
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
            <div id={ classes.form }>
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
                <div>
                    <Messages ref={ messages } />
                </div>
                <div id={ classes.submitButton }>
                    <Button label='View Miles' className='p-button-success' onClick={ submit  }/>
                </div> 
            </div>
            <div>
                { viewData }
            </div>

        </div>
    );
};