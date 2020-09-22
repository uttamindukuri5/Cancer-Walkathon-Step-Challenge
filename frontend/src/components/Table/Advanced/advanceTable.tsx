import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import './advanceTable.module.css';

interface IProps {
    data: any[];
    setModal: any;
    setUser: any;
}

export default ({ data, setModal, setUser }: IProps) => {
    const viewInfo = (id: string) => {
        return (
            <Button label='View More' color='primary' onClick={ () => renderData(id) }/>
        );
    };

    const renderData = (id: string) => {
        setUser(id);
        setModal(true);
    }

    return (
        <div>
            <DataTable value={ data } className='p-datatable-responsive-demo'>
                <Column field='userId' header='User ID' sortable />
                <Column field='miles' header='Miles' sortable />
                <Column field='userId' body={ (userId: string) => viewInfo(userId) } header="Action" />
            </DataTable>
        </div>
    );
}