import React from 'react';
import Chart from 'react-apexcharts';

const TimeSeriesChart = ({ data }) => {
  // Ensure data is passed and not empty
  if (!data || data.length === 0) return <div>No data available</div>;

  const series = [
    {
      name: 'Total Visitors',
      data: data.map(item => ({
        x: new Date(item.date), // Assuming 'item.date' is a valid date field
        y: Number(item.adults) + Number(item.children) + Number(item.babies) // Total visitors
      })),
    },
  ];

  const options = {
    chart: {
      id: 'time-series-chart',
      zoom: { enabled: true },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Number of Visitors',
      },
    },
    title: {
      text: 'Number of Visitors Over Time',
      align: 'center',
    },
  };

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default TimeSeriesChart;
