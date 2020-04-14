import React, { useState, useEffect } from 'react';

import axios from 'axios';
import * as Constants from '../constants';

import Total from './total'
import StateTable from './statetable'
import Map from './map'

function Body() {

    const [allStatesData, setAllStatesData] = useState([]);
    const [allDistrictsData, setAllDistrictsData] = useState([]);
    const [totalCountDetails, setTotalCountDetails] = useState({});
    const [lastUpdated, setLastUpdated] = useState("");
    const [maxActiveCases, setmaxActiveCases] = useState(0);

    useEffect(() => {
        getAllStatesData();
        getAllDistrictsData();
    }, [])

    function getAllStatesData() {
        axios.get(Constants.APIURL+Constants.StatesDetail).then(res => {

            let stateWiseData = res.data.statewise;

            setTotalCountDetails(stateWiseData[0]);
            setLastUpdated(stateWiseData[0].lastupdatedtime);

            stateWiseData.shift();

            stateWiseData = stateWiseData.filter(stateData => stateData.confirmed > 0)
                .sort(function (a, b) {
                    return b.confirmed - a.confirmed
                });

            setAllStatesData(stateWiseData);

            stateWiseData = stateWiseData.sort(function (a, b) {
                return b.active - a.active
            });

            setmaxActiveCases(stateWiseData[0].active);

        }).catch(err => {
            console.log(err);
        });
    }

    function getAllDistrictsData() {
        axios.get(Constants.APIURL+Constants.DistrictsDetail).then(res => {
            setAllDistrictsData(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const refreshData = () => {
        getAllStatesData();
        getAllDistrictsData();
    }

    return (
        <>
            <Total overAllState={totalCountDetails} lastUpdated={lastUpdated} refreshData={refreshData} />
            <div className="container-fluid">
                <div className="row">
                    <StateTable allStatesData={allStatesData} allDistrictsData={allDistrictsData} lastUpdated={lastUpdated} />
                    <Map allStatesData={allStatesData} maxActiveCases={maxActiveCases} />
                </div>
            </div>
        </>
    )
}

export default Body;