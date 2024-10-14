import React from 'react';
import Chart from 'react-apexcharts';

const CountryChart = ({ data }) => {
  if (!data || data.length === 0) return <div>No data available</div>;

  // Group data by country and count the number of visitors (adults + children + babies)
  const countryVisitorData = data.reduce((acc, item) => {
    const country = item.country;
    const totalVisitors = Number(item.adults) + Number(item.children) + Number(item.babies);

    if (acc[country]) {
      acc[country] += totalVisitors;
    } else {
      acc[country] = totalVisitors;
    }
    return acc;
  }, {});

  const series = [
    {
      name: 'Visitors per Country',
      data: Object.values(countryVisitorData),
    },
  ];

  const options = {
    chart: {
      id: 'country-chart',
    },
    xaxis: {
      categories: Object.keys(countryVisitorData), // Country names
    },
    title: {
      text: 'Number of Visitors per Country',
      align: 'center',
    },
    dataLabels: {
      enabled: true,
    },
    yaxis: {
      title: {
        text: 'Number of Visitors',
      },
    },
  };

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default CountryChart;
