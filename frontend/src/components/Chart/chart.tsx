import React from 'react';
import { Chart } from 'primereact/chart';

interface IProps {
    data: [any]
}
export default ({data}: IProps) => {
    const labelList: string[] = [];
    const miles: number[] = [];
    for (let team of data) {
        labelList.push(team.teamName);
        miles.push(team.totalMiles);
    }
    const basicData = {
        labels: labelList,
        datasets: [
            {
                label: 'Miles',
                backgroundColor: '#42A5F5',
                data: miles
            }
        ]
    };

    const basicOptions = {
        legend: {
            labels: {
                fontColor: '#495057'
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: '#495057'
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: '#495057'
                }
            }]
        }
    };

    return(
        <div>
            <Chart type="horizontalBar" data={basicData} options={ basicOptions }/>
        </div>
    );
}