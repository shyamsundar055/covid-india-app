import React from 'react'

function Total(props) {
    //console.log("refresh");
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 d-flex justify-content-center fadeIn" style={{ animationDelay: "1.2s" }}>
                        <p className="text-muted">Last updated : {props.lastUpdated}
                            {/* &nbsp;&nbsp;
                            <i className="fa fa-refresh" aria-hidden="true" style={{cursor:"pointer"}} onClick={props.refreshData}></i> */}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 d-flex justify-content-center">
                        <div className="row">
                            <div className="col-lg-3 fadeIn" style={{ animationDelay: "1.3s" }}>
                                <div className="total alert alert-info">
                                    <span className="totalHead">Total</span>
                                    <span className="totalCount">
                                        {props.overAllState.confirmed}
                                        {
                                            props.overAllState.deltaconfirmed > 0 ?
                                                <span className="newCases">&nbsp;<i className="fa fa-level-up" aria-hidden="true"></i> {props.overAllState.deltaconfirmed}</span>
                                                : ""
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="col-lg-3 fadeIn" style={{ animationDelay: "1.4s" }}>
                                <div className="total alert alert-warning">
                                    <span className="totalHead">Active</span>
                                    <span className="totalCount activecase">
                                        {props.overAllState.active}
                                    </span>
                                </div>
                            </div>
                            <div className="col-lg-3 fadeIn" style={{ animationDelay: "1.5s" }}>
                                <div className="total alert alert-success">
                                    <span className="totalHead">Recovered</span>
                                    <span className="totalCount recovered">
                                        {props.overAllState.recovered}
                                        {
                                            props.overAllState.deltarecovered > 0 ?
                                                <span className="newCases">&nbsp;<i className="fa fa-level-up" aria-hidden="true"></i> {props.overAllState.deltarecovered}</span>
                                                : ""
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="col-lg-3 fadeIn" style={{ animationDelay: "1.6s" }}>
                                <div className="total  alert alert-danger">
                                    <span className="totalHead">Deaths</span>
                                    <span className="totalCount deaths">
                                        {props.overAllState.deaths}
                                        {
                                            props.overAllState.deltadeaths > 0 ?
                                                <span className="newCases">&nbsp;<i className="fa fa-level-up" aria-hidden="true"></i> {props.overAllState.deltadeaths}</span>
                                                : ""
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}

export default Total;