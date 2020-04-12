import React from 'react'

function DistrictTable(props) {
    
    let allDistrictsData = JSON.parse(JSON.stringify(props.allDistrictsData));

    if (allDistrictsData.length > 0) {
        allDistrictsData = allDistrictsData.find(stateDetails => stateDetails.state.toUpperCase() === props.state.toUpperCase());
        allDistrictsData = allDistrictsData.districtData.sort(function (a, b) {
            return b.confirmed - a.confirmed
        })
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">District</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                {
                    allDistrictsData.map((districtDetails, key) =>
                        <tr key={key}>
                            <td>{districtDetails.district}</td>
                            <td>
                                {districtDetails.confirmed}
                                {
                                    districtDetails.delta.confirmed > 0 ?
                                    <span className="newCasesTable deaths">
                                        &nbsp;&nbsp;<i className="fa fa-arrow-up" aria-hidden="true"></i>
                                        {districtDetails.delta.confirmed}
                                    </span>
                                    : ""
                                }
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default DistrictTable