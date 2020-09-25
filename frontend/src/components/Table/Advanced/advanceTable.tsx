import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import './advanceTable.module.css';

interface IProps {
    data: any[];
}

export default ({ data }: IProps) => {

    return (
        <div>
            <DataTable value={ data } className='p-datatable-responsive-demo'>
                <Column field='userId' header='User ID' sortable />
                <Column field='miles' header='Miles' bodyStyle={{ width: '100%', textAlign: 'right' }} sortable />
            </DataTable>
        </div>
    );
}