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
            <DataTable value={data} sortField={ viewTeam ? 'totalMiles' : 'date' } sortOrder={ -1 } >
                <Column field={viewTeam ? 'teamName' : 'date' } header={ viewTeam ? 'Team' : 'Date' }></Column>
                <Column field={viewTeam ? 'totalMiles' : 'miles'} header="Miles" bodyStyle={{ width: '100%', textAlign: 'right' }}></Column>
            </DataTable>
        </div>
    );
}