import React from 'react';
import Chart from 'react-apexcharts';

const SparklineCharts = ({ data }) => {
  if (!data || data.length === 0) return <div>No data available</div>;

  // Sparkline data for adults and children
  const adultData = data.map(item => Number(item.adults));
  const childrenData = data.map(item => Number(item.children));

  const sparklineOptions = (title) => ({
    chart: {
      type: 'line',
      sparkline: { enabled: true },
    },
    title: {
      text: title,
      offsetX: 20,
      style: {
        fontSize: '20px',
      },
    },
    stroke: {
      curve: 'smooth',
    },
    yaxis: {
      min: 0,
    },
  });

  const sparklineSeries = (data) => [
    {
      name: 'Total',
      data: data,
    },
  ];

  return (
    <div className="sparkline-charts">
      <div className="sparkline">
        <Chart options={sparklineOptions('Adults Visitors')} series={sparklineSeries(adultData)} type="line" height={100} />
      </div>
      <div className="sparkline">
        <Chart options={sparklineOptions('Children Visitors')} series={sparklineSeries(childrenData)} type="line" height={100} />
      </div>
    </div>
  );
};

export default SparklineCharts;
