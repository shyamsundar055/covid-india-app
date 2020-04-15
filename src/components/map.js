import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client';
import geoDataIndia from '../maps/india';

function Map(props) {
    const d3Container = useRef(null); 
    const rangeSplit = parseInt(props.maxActiveCases/5);

    useEffect(() => {
        
        if (props.allStatesData && props.maxActiveCases && d3Container.current) {

            let allStates = JSON.parse(JSON.stringify(props.allStatesData));

            const width = 750;
            const height = 500;

            const svg = d3.select(d3Container.current)
                .attr("viewBox", `0 0 ${width} ${height}`);

            const projection = d3.geoMercator()
                .center([10, 0])
                .scale([750])
                .translate([-600, 550]);


            const path = d3.geoPath().projection(projection);

            const g = svg.append("g")
                .attr("width", "100%")
                .attr("viewBox", `0 0 ${width} ${height}`);

            g.selectAll("path")
                .data(topojson.feature(geoDataIndia, geoDataIndia.objects["india"]).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function (d) {
                    let stateDetails = allStates.find(stateDetail => stateDetail.state.toUpperCase() === d.properties.st_nm.toUpperCase())
                    let range = stateDetails ? stateDetails.active : 0;

                    if (range >= ((rangeSplit*4)+1))
                        return "red";
                    else if (range >= ((rangeSplit*3)+1) && range <= (rangeSplit*4))
                        return "#D65F59";
                    else if (range >= ((rangeSplit*2)+1) && range <= (rangeSplit*3))
                        return "rgb(255, 232, 121)";
                    else if (range >= (rangeSplit+1) && range <= (rangeSplit*2))
                        return "#71e3e8";
                    else
                        return "#7cdc7c";
                })
                .attr("stroke", "#B4B1B1")
                .attr("stroke-width", "1px")
                .on("mouseover", function (d, i) {
                    d3.select(this).attr("stroke-width", "2px").attr("stroke", "red");
                })
                .on("mouseout", function (d, i) {
                    d3.select(this).attr("stroke-width", "1px").attr("stroke", "#B4B1B1");
                })
                .append("title")
                .text(function (d) {
                    let stateDetails = allStates.find(stateDetail => stateDetail.state.toUpperCase() === d.properties.st_nm.toUpperCase())
                    let active = stateDetails ? stateDetails.active : 0;
                    let state = stateDetails ? stateDetails.state : "";
                    return `${state} : ${active}`

                });

        }

    }, [props.allStatesData,props.maxActiveCases,rangeSplit])

    return (
        <div className="col-lg-6 text-center">
            <div className="row">
                <div className="col-lg-12 fadeIn" style={{ animationDelay: "2.0s" }}>
                    <div className="">
                        <svg ref={d3Container}>
                        </svg>
                        <div style={{ fontSize: "14px" }}>Active cases</div>
                        <div className="d-flex justify-content-center">
                            <table className="rangeTable">
                                <tbody>
                                    <tr>
                                        <td style={{ backgroundColor: "#7cdc7c", width: "5%" }}></td>
                                        <td style={{ backgroundColor: "#71e3e8", width: "5%" }}></td>
                                        <td style={{ backgroundColor: "rgb(255, 232, 121)", width: "5%" }}></td>
                                        <td style={{ backgroundColor: "#D65F59", width: "5%" }}></td>
                                        <td style={{ backgroundColor: "red", width: "5%" }}></td>
                                    </tr>
                                    <tr className="rangeValueRow">
                                        <td style={{ width: "20%" }}>0-{rangeSplit}</td>
                                        <td style={{ width: "20%" }}>{rangeSplit+1}-{(rangeSplit*2)}</td>
                                        <td style={{ width: "20%" }}>{(rangeSplit*2)+1}-{(rangeSplit*3)}</td>
                                        <td style={{ width: "20%" }}>{(rangeSplit*3)+1}-{(rangeSplit*4)}</td>
                                        <td style={{ width: "20%" }}>>={(rangeSplit*4)+1}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Map