import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios';

import Header from './components/header'
import Total from './components/total'
import Table from './components/table'
import Map from './components/map'
import Footer from './components/footer'


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [allStatesData, setAllStatesData] = useState([]);
  const [allDistrictsData, setAllDistrictsData] = useState([]);
  const [totalCountDetails, setTotalCountDetails] = useState({});
  const [lastUpdated, setLastUpdated] = useState("");


  useEffect(() => {
    getAllStatesData();
    getAllDistrictsData();
  }, [])

  function getAllStatesData() {
    axios.get("https://api.covid19india.org/data.json").then(res => {
      let stateWiseData = res.data.statewise;

      setTotalCountDetails(stateWiseData[0]);
      setLastUpdated(stateWiseData[0].lastupdatedtime);

      stateWiseData.shift();

      stateWiseData = stateWiseData.filter(stateData=> stateData.confirmed > 0);

      setAllStatesData(stateWiseData);

    }).catch(err => {
      console.log(err);
    });
  }

  function getAllDistrictsData() {
    axios.get("https://api.covid19india.org/v2/state_district_wise.json").then(res => {
      setAllDistrictsData(res.data);
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <>
      <Header />
      <Total overAllState={totalCountDetails} />
      <div className="container-fluid">
        <div className="row">
          <Table allStatesData={allStatesData} allDistrictsData={allDistrictsData} lastUpdated={lastUpdated} />
          <Map allStatesData={allStatesData} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
