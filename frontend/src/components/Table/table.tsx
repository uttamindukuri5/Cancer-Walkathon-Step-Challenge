import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface IProps {
    data: any[];
    viewTeam: boolean;
}
export default ({ data, viewTeam }: IProps) => {
    return (
        <div>
            <DataTable value={data}>
                <Column field={viewTeam ? 'teamName' : 'date' } header={ viewTeam ? 'Team' : 'Date' }></Column>
                <Column field={viewTeam ? 'totalMiles' : 'miles'} header="Miles"></Column>
            </DataTable>
        </div>
    );
}