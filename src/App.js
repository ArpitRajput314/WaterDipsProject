import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Papa from "papaparse";
import TimeSeriesChart from "./components/TimeSeriesChart";
import CountryChart from "./components/CountryChart";
import SparklineCharts from "./components/SparklineCharts";

const App = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  // Fetch and parse the CSV file
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/hotelBookingData.csv`)
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            console.log(result.data); // Log parsed data to console
            setData(result.data); // Store parsed data in state
          },
        });
      });
  }, []);

  // Function to filter data by date range
  const filterDataByDate = () => {
    const filtered = data.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate && date <= endDate;
    });
    setFilteredData(filtered); // Set filtered data to state
  };

  const handleApplyDateRange = () => {
    filterDataByDate(); // Call filter function on button click
  };

  return (
    <div className="dashboard">
      <h1>Hotel Booking Dashboard</h1>
      <div className="date-picker">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy/MM/dd"
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Select start date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy/MM/dd"
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="Select end date"
        />
        <button onClick={handleApplyDateRange} style={buttonStyle}>
          Apply Date Range
        </button>
      </div>
      <div className="charts">
        {filteredData.length > 0 ? (
          <>
            <TimeSeriesChart data={filteredData} />
            <CountryChart data={filteredData} />
            <SparklineCharts data={filteredData} />
          </>
        ) : (
          <div>No data available for the selected date range</div>
        )}
      </div>
    </div>
  );
};

// Add some basic styling for the button
const buttonStyle = {
  marginLeft: "10px",
  padding: "10px 15px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default App;
