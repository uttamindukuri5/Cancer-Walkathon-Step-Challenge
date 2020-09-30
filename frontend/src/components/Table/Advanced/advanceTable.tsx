import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';

import './advanceTable.module.css';

interface IProps {
    data: any[];
    setModal: any;
    setUser: any;
}

export default ({ data, setModal, setUser }: IProps) => {

    const nameData = (data: any) => {
        return (
            <div>
                <Button label={ data.name } className={ 'p-button-raised p-button-secondary p-button-text' } onClick={ () => onDisplayModal(data) }/>
            </div>
        );
    }

    const onDisplayModal = (data: any): void => {
        setUser(data);
        setModal(true);
    };

    return (
        <div>
            <DataTable value={ data } className='p-datatable-responsive-demo' sortField='miles' sortOrder={ -1 }>
                <Column body={ nameData } field='name' header='Name' sortable />
                <Column field='miles' header='Miles' bodyStyle={{ width: '100%', textAlign: 'right' }} sortable />
            </DataTable>
        </div>
    );
}