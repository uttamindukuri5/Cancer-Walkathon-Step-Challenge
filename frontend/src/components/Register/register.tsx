import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';

import classes from './register.module.css';

export default () => {
    const teams = [
        'team 1', 
        'team 2',
        'team 3',
        'team 4'
    ];
    const 
        messages = useRef(null),
        [selectedTeam, setSelectedTeam] = useState(teams[0]),
        [ firstName, setFirstName ] = useState(''),
        [ lastName, setLastName ] = useState(''),
        [ phone, setPhone ] = useState(''),
        [ email, setEmail ] = useState(''),
        [ touched, setTouched ] = useState({
            firstName: false,
            lastName: false,
            phone: false
        });
    
    const submit = (): void => {
        const user = {
            firstName,
            lastName,
            phone, 
            email,
            selectedTeam
        };

        if (firstName.trim().length > 1 && lastName.trim().length > 1 && validatePhone(phone)) {
            submitData(user);
        } else {
            //@ts-ignore
            messages.current.show({severity: 'error', summary: 'Error Message', detail: 'Please fill the required field'});
        }
    }

    const submitData = async (user: any) => {
        const response = {
            user: { 
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                team: user.team
            }
        };
        const data = await fetch('http://localhost:4000/register/user', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(response)
         });

         console.log(data);
    }

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /([2-9]\d{9})|([2-9]\d{2}-\d{3}-\d{4})/;
        return phoneRegex.test(phone);
    }

    return (
        <div id={ classes.form }>
            <Messages ref={ messages } />
            <div className={ classes.section }>
                <label className={ classes.text }><strong>First Name: </strong></label>
                <InputText 
                    value={ firstName } 
                    onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setFirstName(target.value) } 
                    required={ true }
                    onClick={ () => setTouched({ ...touched, firstName: true }) }
                    className={ touched.firstName ? ( firstName.trim().length > 1 ? '' : 'p-invalid') : '' }
                />
            </div>
            <div className={ classes.section }>
                <label className={ classes.text }><strong>Last Name: </strong></label>
                <InputText 
                    value={ lastName } 
                    onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setLastName(target.value) }
                    required={ true }
                    onClick={ () => setTouched({ ...touched, lastName: true }) }
                    className={ touched.lastName ? ( lastName.trim().length > 1 ? '' : 'p-invalid' ) : '' }
                />
            </div>
            <div className={ classes.section }>
                <label className={ classes.text }><strong>Phone: </strong></label>
                <InputText 
                    value={ phone } 
                    onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setPhone(target.value) }
                    required={ true }
                    onClick={ () => setTouched({ ...touched, phone: true }) }
                    className={ touched.phone ? ( validatePhone(phone) ? '' : 'p-invalid' ) : '' }
                />
            </div>
            <div className={ classes.section }>
                <label className={ classes.text }><strong>Email (Optional): </strong></label>
                <InputText value={ email } onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setEmail(target.value) }/>
            </div>
            <div className={ classes.section }>
                <label className={ classes.text }><strong>Team Name: </strong></label>
                <Dropdown 
                    id={ classes.dropdown }
                    value={selectedTeam} 
                    options={teams} onChange={(e) => setSelectedTeam(e.target.value)} 
                    filter 
                    showClear
                    placeholder="Select a Team"
                />
            </div>
            <div id={ classes.submitButton } className={ classes.section }>
                <Button label='Register User' className='p-button-success' onClick={ submit  }/>
            </div> 
        </div>
    ); 
}