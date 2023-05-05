import React from 'react';
import { Doughnut } from "react-chartjs-2";

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: "bottom"
        },
        datalabels: {
            display: true
        }
    },
    aspectRatio: 10,
};


const DoughnutChart = ({ chartData }) => {
    const data = {
        labels: Object.keys(chartData),
        datasets: [
            {
                data: Object.values(chartData),
                backgroundColor: ["#9370DB", "#C7B198", "#E53D00", "#FFCE56", "#7EC0EE"]
            },
        ],
    };


    return (
        <div >
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default DoughnutChart;