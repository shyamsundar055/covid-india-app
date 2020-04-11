import React from 'react';

function Table(props) {
 
    return (
        <>
            <div className="col-lg-1">
                    &nbsp;
            </div>
            <div className="col-lg-5">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">State/UT</th>
                                <th scope="col">Active</th>
                                <th scope="col">Recovered</th>
                                <th scope="col">Deaths</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody className="stateBody">
                            {
                                props.allStatesData.length ?
                                    props.allStatesData.map((statewise, index) => 
                                        <React.Fragment key={index}>
                                            <tr key={index} className={ index % 2 === 0 ? "stateRow": ""}>
                                                <td>
                                                    <i className="fa fa-chevron-circle-down" aria-hidden="true" data-toggle="collapse" data-target={"#districts" + index} style={{color:"#717171"}}></i>
                                                    &nbsp;{statewise.state}
                                                </td>
                                                <td>{statewise.active}</td>
                                                <td>
                                                    {statewise.recovered}
                                                    {
                                                        statewise.deltarecovered > 0 ?
                                                            <span className="newCasesTable recovered">&nbsp;&nbsp;<i className="fa fa-arrow-up" aria-hidden="true"></i> {statewise.deltarecovered}</span>
                                                            : ""
                                                    }
                                                </td>
                                                <td>
                                                    {statewise.deaths}
                                                    {
                                                        statewise.deltadeaths > 0 ?
                                                            <span className="newCasesTable deaths">&nbsp;&nbsp;<i className="fa fa-arrow-up" aria-hidden="true"></i> {statewise.deltadeaths}</span>
                                                            : ""
                                                    }
                                                </td>
                                                <td>
                                                    {statewise.confirmed}
                                                    {
                                                        statewise.deltaconfirmed > 0 ?
                                                            <span className=" newCasesTable deaths">&nbsp;&nbsp;<i className="fa fa-arrow-up" aria-hidden="true"></i> {statewise.deltaconfirmed}</span>
                                                            : ""
                                                    }
                                                </td>
                                            </tr>
                                            <tr key={"districts" + index} className="collapse" id={"districts" + index}>
                                                <td colSpan="5">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">District</th>
                                                                <th scope="col">Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            props.allDistrictsData.map((stateDetails) => { 
                                                                if (stateDetails.state.toUpperCase() === statewise.state.toUpperCase()) {
                                                                    return (
                                                                        stateDetails.districtData.map((districtDetails, key) =>  
                                                                        <tr key={key}>
                                                                            <td>{districtDetails.district}</td>
                                                                            <td>
                                                                                {districtDetails.confirmed}
                                                                                {
                                                                                    districtDetails.delta.confirmed > 0 ?
                                                                                        <span className="newCasesTable deaths">&nbsp;&nbsp;<i className="fa fa-arrow-up" aria-hidden="true"></i> {districtDetails.delta.confirmed}</span>
                                                                                        : ""
                                                                                }
                                                                            </td>
                                                                        </tr> 
                                                                                
                                                                        )

                                                                    )
                                                                } 
                                                            })
                                                        }
                                                        </tbody> 
                                                    </table>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ) : <tr><td></td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Table;