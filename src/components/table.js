import React from 'react';

function Table(props) {
    //data-parent="#states"
    return (
        <>
            <div className="col-lg-1">
                &nbsp;
            </div>
            <div className="col-lg-5 fadeIn" style={{ animationDelay: "1.8s" }}>
                <div className="table-responsive">
                    <table className="table stateTable" id="states">
                        <thead>
                            <tr>
                                <th scope="col">State/UT</th>
                                <th scope="col">
                                    <div className="d-none d-md-block">Active</div>
                                    <div className="d-sm-none activecase">A</div>
                                </th>
                                <th scope="col">
                                    <div className="d-none d-md-block">Recovered</div>
                                    <div className="d-sm-none recovered">R</div>
                                </th>
                                <th scope="col">
                                    <div className="d-none d-md-block">Deaths</div>
                                    <div className="d-sm-none deaths">D</div>
                                </th>
                                <th scope="col">
                                    <div className="d-none d-md-block">Total</div>
                                    <div className="d-sm-none">T</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="stateBody">
                            {
                                props.allStatesData.length ?
                                    props.allStatesData.map((statewise, index) =>
                                        <React.Fragment key={index}>
                                            <tr key={index} className={index % 2 === 0 ? "stateRow" : ""} style={{ cursor: "pointer" }} data-toggle="collapse" data-target={"#districts" + index}
                                                aria-expanded="false" aria-controls={"districts" + index}>
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
                                                            <span className="newCasesTable recovered">&nbsp;&nbsp;<i className="fa fa-arrow-up" aria-hidden="true">{statewise.deltarecovered}</i> </span>
                                                            : ""
                                                    }
                                                </td>
                                                <td>
                                                    {statewise.deaths}
                                                    {
                                                        statewise.deltadeaths > 0 ?
                                                            <span className="newCasesTable deaths">&nbsp;&nbsp;<i className="fa fa-arrow-up" aria-hidden="true">{statewise.deltadeaths}</i> </span>
                                                            : ""
                                                    }
                                                </td>
                                                <td>
                                                    {statewise.confirmed}
                                                    {
                                                        statewise.deltaconfirmed > 0 ?
                                                            <span className=" newCasesTable deaths">&nbsp;&nbsp;<i className="fa fa-arrow-up" aria-hidden="true">{statewise.deltaconfirmed}</i></span>
                                                            : ""
                                                    }
                                                </td>
                                            </tr>
                                            <tr key={"districts" + index} className="districtRow">
                                                <td colSpan="5" className="districtCell">
                                                    <div className="collapse" id={"districts" + index}>
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
                                                                                stateDetails.districtData.sort(function (a, b) {
                                                                                    return b.confirmed - a.confirmed
                                                                                }).map((districtDetails, key) =>
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
                                                    </div>
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