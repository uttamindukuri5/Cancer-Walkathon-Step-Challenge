import React from 'react';
import { Dialog } from 'primereact/dialog';

interface IProps {
    data: any;
    visible: boolean;
    changeVisibility: any;
}

export default ({ data, visible, changeVisibility }: IProps)  => {
    return (
        <div>
            <Dialog visible={ visible } onHide={ () => changeVisibility(false) } position='top'>
                <h4>{ data.name }</h4>
                <h2>{ data.miles } miles</h2>
                <p>User ID: { data.userId }</p>
                <p>Team: { data.team }</p>
            </Dialog>
        </div>
    )
}