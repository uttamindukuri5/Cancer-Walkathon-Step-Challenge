import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

export default () => {
    const today = new Date();
    const [ date, setDate ] = useState(today);
    return (
        <div>
            <div className="section">
                <label><h6>Phone: </h6></label>
                <InputText />
            </div>
            <div className="section">
                <label><h6>Phone: </h6></label>
                <Calendar value={date} onChange={(e) => setDate(e.value as Date) }></Calendar>
            </div>
            <div className="section">
                <label><h6>Mile: </h6></label>
                <InputText />
            </div>
        </div>
    );
}