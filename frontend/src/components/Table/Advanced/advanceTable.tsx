import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import './advanceTable.module.css';

interface IProps {
    data: any[];
}

export default ({ data }: IProps) => {
    return (
        <DataTable value={ data } className='p-datatable-responsive-demo'>
            <Column field='userId' header='ID' sortable />
            <Column field='name' header='Name' sortable />
            <Column field='team' header='Team' sortable />
            <Column field='miles' header='Miles' sortable />
        </DataTable>
    );
}