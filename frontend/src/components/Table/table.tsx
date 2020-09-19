import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface IProps {
    data: any[];
}
export default ({ data }: IProps) => {
    

    return (
        <div>
            <div className="card">
                <DataTable value={data}>
                    <Column field="teamName" header="Team"></Column>
                    <Column field="totalMiles" header="Miles"></Column>
                </DataTable>
            </div>
        </div>
    );
}