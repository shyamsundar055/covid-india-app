import React from 'react';
import StateRow from './staterow';

function StateTable(props) {
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
                            <StateRow allStatesData={props.allStatesData} allDistrictsData={props.allDistrictsData} />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default StateTable;