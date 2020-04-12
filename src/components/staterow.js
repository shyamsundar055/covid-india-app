import React from 'react'
import DistrictTable from './districttable';

function StateRow(props){
    
    return (
        <>
        {
            props.allStatesData.length ?
            props.allStatesData.map((statewise, index) =>
                <React.Fragment key={index}>
                    <tr key={index} 
                        className={index % 2 === 0 ? "stateRow" : ""} 
                        style={{ cursor: "pointer" }} 
                        data-toggle="collapse" 
                        data-target={"#districts" + index}
                        aria-expanded="false" 
                        aria-controls={"districts" + index}>
                        <td>
                            <span style={{ color: "#717171", fontSize: "0.80em", cursor: "pointer", position: "absolute", left: "0.20rem" }}>
                                <i className="fa fa-chevron-circle-down" aria-hidden="true"></i>
                            </span>
                            &nbsp;{statewise.state}
                        </td>
                        <td>{statewise.active}</td>
                        <td>
                            {statewise.recovered}
                            {
                                statewise.deltarecovered > 0 ?
                                    <span className="newCasesTable recovered">
                                        &nbsp;&nbsp;<i className="fa fa-arrow-up" aria-hidden="true">{statewise.deltarecovered}</i> 
                                    </span>
                                    : ""
                            }
                        </td>
                        <td>
                            {statewise.deaths}
                            {
                                statewise.deltadeaths > 0 ?
                                    <span className="newCasesTable deaths">
                                        &nbsp;&nbsp;<i className="fa fa-arrow-up" aria-hidden="true">{statewise.deltadeaths}</i> 
                                    </span>
                                    : ""
                            }
                        </td>
                        <td>
                            {statewise.confirmed}
                            {
                                statewise.deltaconfirmed > 0 ?
                                    <span className=" newCasesTable deaths">
                                        &nbsp;&nbsp;<i className="fa fa-arrow-up" aria-hidden="true">{statewise.deltaconfirmed}</i>
                                    </span>
                                    : ""
                            }
                        </td>
                    </tr>
                    <tr key={"districts" + index} className="districtRow">
                        <td colSpan="5" className="districtCell">
                            <div className="collapse" id={"districts" + index}>
                                <DistrictTable allDistrictsData={props.allDistrictsData} state={statewise.state} />
                            </div>
                        </td>
                    </tr>
                </React.Fragment>
            ) : <tr><td></td></tr>
        }
        </>
    )
}

export default StateRow;