// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import hotelBookingDataCSV from './data/hotelBookingData.csv'; // Adjust the path to your CSV file

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch and parse the CSV file
    fetch(hotelBookingDataCSV)
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data); // Set parsed data
          },
        });
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>Hotel Booking Dashboard</h1>
      {/* Render your charts here with the data */}
      {data.length > 0 ? (
        <div>
          {data.map((row, index) => (
            <div key={index}>
              <p>{row.country}</p> {/* Example rendering country */}
              {/* You can render more fields here or pass the data to chart components */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Dashboard;
