import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Captcha } from 'primereact/captcha';

import classes from './register.module.css';

export default () => {
    const teams = [
        'Plano/ Richardson Pursuers', 
        'Frisco/ Prosper Achievers',
        'Irving/ Coppell Believers',
        'International Inspirers',
        'Rest of USA Innovators'  
    ];

    const 
        SITE_KEY = '6Lenhc4ZAAAAAG9-M_NTzCtMq0faInT6yp0PjXGH',
        messages = useRef(null),
        [selectedTeam, setSelectedTeam] = useState(''),
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

        const response = await fetch('http://localhost:4000/register/captcha', {
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

        if (validateName(firstName) && validateName(lastName) && validatePhone(phone) && validateEmail(email) && validateUserId(userId) && selectedTeam.trim().length > 1) {
            submitData(user);
        } else {
            if (!validateName(firstName)) {
                //@ts-ignore
                messages.current.show({severity: 'error', detail: 'First Name allows minimum of 2 alphabets / No Special Characters or Numbers'});
            }
            else if (!validateName(lastName)) {
                //@ts-ignore
                messages.current.show({severity: 'error', detail: 'Last Name allows minimum of 2 alphabets / No Special Characters or Numbers'});
            }
            else if (!validateUserId(userId)) {
                //@ts-ignore
                messages.current.show({severity: 'error', detail: 'User ID must have a minimum of 4 characters.'});
            }
            else if (!validatePhone(phone)) {
                //@ts-ignore
                messages.current.show({severity: 'error', detail: 'Enter a valid phone number'});
            }
            else if (!validateEmail(email)) {
                //@ts-ignore
                messages.current.show({severity: 'error', detail: 'Enter a valid email'});
            } else if (selectedTeam.trim().length < 1) {
                //@ts-ignore
                messages.current.show({severity: 'error', detail: 'Select a team'});
            }
        }
        
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
        const data = await fetch('http://localhost:4000/register/user', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(response)
         });

         if (data.status === 400) {
             // @ts-ignore
             messages.current.show({ severity: 'error', detail: 'Please provide a different user ID' });
         } else {
             // @ts-ignore
             messages.current.show({ severity: 'success', detail: 'Congratulations, you have been successfully registered' });
             resetValue();
         }
    }

    const validateName = (name: string): boolean => {
        const nameRegex = /^[a-zA-Z]{2,15}$/;
        return nameRegex.test(name);
    }

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^[0-9]{10,12}$/;
        return phoneRegex.test(phone);
    }

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email.toLowerCase());
    }

    const validateUserId = (userId: string): boolean => {
        return userId.trim().length >= 4
    }



    return (
        <div id={ classes.content }>
            <div id={ classes.form }>
                <div className={ classes.section }>
                    <div className={ classes.inputLabel }>
                        <label className={ classes.text }><strong>First Name: </strong></label>
                    </div>
                    <div className={ classes.formInput }>
                        <InputText 
                            value={ firstName } 
                            onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setFirstName(target.value) } 
                            required={ true }
                            onClick={ () => setTouched({ ...touched, firstName: true }) }
                            className={ touched.firstName ? ( validateName(firstName) ? '' : 'p-invalid') : '' }
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
                <div className={ classes.section }>
                    <div className={ classes.inputLabel }>
                        <label className={ classes.text }><strong>Last Name: </strong></label>
                    </div>
                    <div className={ classes.formInput }>
                        <InputText 
                            value={ lastName } 
                            onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setLastName(target.value) }
                            required={ true }
                            onClick={ () => setTouched({ ...touched, lastName: true }) }
                            className={ touched.lastName ? ( validateName(lastName) ? '' : 'p-invalid' ) : '' }
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
                <div className={ classes.section }>
                    <div className={ classes.inputLabel }>
                        <label className={ classes.text }><strong>User ID: </strong></label>
                    </div>
                    <div className={ classes.formInput }>
                        <InputText 
                            value={ userId } 
                            onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setUserId(target.value) }
                            required={ true }
                            onClick={ () => setTouched({ ...touched, userId: true }) }
                            className={ touched.userId ? ( validateUserId(userId) ? '' : 'p-invalid' ) : '' }
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
                <div className={ classes.section }>
                    <div className={ classes.inputLabel }>
                        <label className={ classes.text }><strong>Phone: </strong></label>
                    </div>
                    <div className={ classes.formInput }>
                        <InputText 
                            value={ phone } 
                            onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setPhone(target.value) }
                            required={ true }
                            onClick={ () => setTouched({ ...touched, phone: true }) }
                            className={ touched.phone ? ( validatePhone(phone) ? '' : 'p-invalid' ) : '' }
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
                <div className={ classes.section }>
                    <div className={ classes.inputLabel }>
                        <label className={ classes.text }><strong>Email: </strong></label>
                    </div>
                    <div className={ classes.formInput }>
                        <InputText 
                            value={ email } 
                            onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setEmail(target.value) }
                            required={ true }
                            onClick={ ()=> setTouched({ ...touched, email: true }) }
                            className={ touched.email ? ( validateEmail(email) ? '' : 'p-invalid' ) : '' }
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
                <div className={ classes.section }>
                    <div className={ classes.inputLabel }>
                        <label className={ classes.text }><strong>Team Name: </strong></label>
                    </div>
                    <div className={ classes.formInput }>
                        <Dropdown 
                            id={ classes.dropdown }
                            value={selectedTeam} 
                            options={teams} onChange={(e) => setSelectedTeam(e.target.value)} 
                            filter 
                            showClear
                            placeholder="Select a Team"
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
                <div id={ classes.captcha }  className={ classes.section }>
                    <Captcha siteKey={ SITE_KEY } onResponse={ verifyCaptcha }/>
                </div>
                <div>
                    <Messages ref={ messages } />
                </div>
                <div id={ classes.submitButton } className={ classes.section }>
                    <div className={ classes.formButton }>
                        <Button label='Register User' className='p-button-success' onClick={ submit  } disabled={ !isHuman }/>
                    </div>
                </div> 
            </div>
        </div>
    ); 
}