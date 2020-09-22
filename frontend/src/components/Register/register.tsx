import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Captcha } from 'primereact/captcha';

import classes from './register.module.css';

export default () => {
    const teams = [
        'Plano/ Richardson', 
        'Frisco/ Prosper',
        'Irving/ Coppel',
        'Non-Dallas',
        'India'
    ];
    const 
        SITE_KEY = '6Lenhc4ZAAAAAG9-M_NTzCtMq0faInT6yp0PjXGH',
        messages = useRef(null),
        [selectedTeam, setSelectedTeam] = useState(teams[0]),
        [ firstName, setFirstName ] = useState(''),
        [ lastName, setLastName ] = useState(''),
        [ userId, setUserId ] = useState(''),
        [ phone, setPhone ] = useState(''),
        [ email, setEmail ] = useState(''),
        [ isHuman, setIsHuman ] = useState(false),
        [ touched, setTouched ] = useState({
            firstName: false,
            lastName: false,
            userId: false,
            phone: false,
            email: false
        });

    const resetValue = () => {
        setFirstName('');
        setLastName('');
        setUserId('');
        setPhone('');
        setEmail('');
        setTouched({
            firstName: false,
            lastName: false,
            userId: false,
            phone: false,
            email: false,
        });
    }

    const verifyCaptcha = async (res: any) => {
        const captchaRequestData = {
            humanKey: res.response
        }

        const response = await fetch('https://www.vtwalk.org:4000/register/captcha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(captchaRequestData)
        });

        if (response.status === 200) {
            setIsHuman(true);
        } else {
            setIsHuman(false);
        }
    };
    
    const submit = (): void => {
        const user = {
            firstName,
            lastName,
            userId: userId.toLowerCase(),
            phone, 
            email,
            selectedTeam
        };

        if (firstName.trim().length > 1 && lastName.trim().length > 1 && validatePhone(phone) && validateEmail(email) && validateUserId(userId)) {
            submitData(user);
        } else {
            if (firstName.trim().length < 1) {
                //@ts-ignore
                messages.current.show({severity: 'error', summary: 'Error Message', detail: 'Please fill in the first name'});
            }
            else if (lastName.trim().length < 1) {
                //@ts-ignore
                messages.current.show({severity: 'error', summary: 'Error Message', detail: 'Please fill in the last name'});
            }
            else if (!validateUserId(userId)) {
                //@ts-ignore
                messages.current.show({severity: 'error', summary: 'Error Message', detail: 'Please input a valid user ID'});
            }
            else if (!validatePhone(phone)) {
                //@ts-ignore
                messages.current.show({severity: 'error', summary: 'Error Message', detail: 'Please input a valid phone number'});
            }
            else if (!validateEmail(email)) {
                //@ts-ignore
                messages.current.show({severity: 'error', summary: 'Error Message', detail: 'Please input a valid email'});
            }
            else if (!validateUserId(userId)) {
                //@ts-ignore
                messages.current.show({severity: 'error', summary: 'Error Message', detail: 'Please input a valid user ID'});
            }
        }

        resetValue();
        
    }

    const submitData = async (user: any) => {
        const response = {
            user: { 
                firstName: user.firstName,
                lastName: user.lastName,
                userId: user.userId,
                phone: user.phone,
                email: user.email,
                team: user.selectedTeam
            }
        };
        const data = await fetch('https://www.vtwalk.org:4000/register/user', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(response)
         });

         if (data.status === 400) {
             // @ts-ignore
             messages.current.show({ severity: 'error', summary: 'User Already Registered', detail: 'Please provide a different user ID' });
         } else {
             // @ts-ignore
             messages.current.show({ severity: 'success', summary: 'Successfully Registerd', detail: 'Congratulations, you have been successfully registered' });
         }
    }

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /([2-9]\d{9})|([2-9]\d{2}-\d{3}-\d{4})/;
        return phoneRegex.test(phone);
    }

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailRegex.test(email);
    }

    const validateUserId = (userId: string): boolean => {
        return userId.trim().length > 0 && userId.trim().length < 21;
    }

    return (
        <div id={ classes.content }>
            <div id={ classes.form }>
                <Toast ref={ messages } />
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
                    <label className={ classes.text }><strong>User ID: </strong></label>
                    <InputText 
                        value={ userId } 
                        onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setUserId(target.value) }
                        required={ true }
                        onClick={ () => setTouched({ ...touched, userId: true }) }
                        className={ touched.userId ? ( validateUserId(userId) ? '' : 'p-invalid' ) : '' }
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
                    <label className={ classes.text }><strong>Email: </strong></label>
                    <InputText 
                        value={ email } 
                        onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setEmail(target.value) }
                        required={ true }
                        onClick={ ()=> setTouched({ ...touched, email: true }) }
                        className={ touched.email ? ( validateEmail(email) ? '' : 'p-invalid' ) : '' }
                    />
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
                <div className={ classes.section }>
                    <Captcha siteKey={ SITE_KEY } onResponse={ verifyCaptcha }/>
                </div>
                <div id={ classes.submitButton } className={ classes.section }>
                    <div className={ classes.formButton }>
                        <Link to='/'>
                            <Button label='Home' className='p-button-primary'/>
                        </Link>
                    </div>
                    <div className={ classes.formButton }>
                        <Button label='Register User' className='p-button-success' onClick={ submit  } disabled={ !isHuman }/>
                    </div>
                </div> 
            </div>
        </div>
    ); 
}