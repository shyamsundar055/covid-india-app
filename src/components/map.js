import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client';
import geoDataIndia from '../maps/india';

function Map(props) {
    const d3Container = useRef(null);
    const d3Tooltip = useRef(null);

    useEffect(() => {
        if (props.allStatesData && d3Container.current && d3Tooltip.current) {

            let allStates = JSON.parse(JSON.stringify(props.allStatesData));

            const width = 750;
            const height = 500;

            const svg = d3.select(d3Container.current)
                .attr("viewBox", `0 0 ${width} ${height}`);

            const projection = d3.geoMercator()
                .center([10, 0])
                //.scale([800/(2*Math.PI)]) 
                .scale([750])
                .translate([-600, 550])


            const tooltip = d3.select(d3Tooltip.current);
            const path = d3.geoPath().projection(projection)


            const g = svg.append("g")
                .attr("width", "100%")
                .attr("viewBox", `0 0 ${width} ${height}`)

            g.selectAll("path")
                .data(topojson.feature(geoDataIndia, geoDataIndia.objects["india"]).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function (d) {
                    let stateDetails = allStates.find(stateDetail => stateDetail.state.toUpperCase() === d.properties.st_nm.toUpperCase())
                    let range = stateDetails ? stateDetails.active : 0;

                    if (range > 1000)
                        return "red";
                    else if (range >= 500 && range <= 999)
                        return "#D65F59";
                    else if (range >= 100 && range <= 499)
                        return "rgb(255, 232, 121)";
                    else if (range >= 50 && range <= 99)
                        return "#71e3e8";
                    else
                        return "#7cdc7c";
                }
                )
                .attr("stroke", "#B4B1B1")
                .attr("stroke-width", "1px")
                .on("mouseover", function (d, i) {
                    d3.select(this).attr("stroke-width", "2px").attr("stroke", "red");
                })
                .on("mouseout", function (d, i) {
                    d3.select(this).attr("stroke-width", "1px").attr("stroke", "#B4B1B1");
                    tooltip.style("visibility", "hidden");
                })
                .append("title")
                .text(function (d) {
                    let stateDetails = allStates.find(stateDetail => stateDetail.state.toUpperCase() === d.properties.st_nm.toUpperCase())
                    let active = stateDetails ? stateDetails.active : 0;
                    let state = stateDetails ? stateDetails.state : "";
                    return `${state} : ${active}`

                }
                )

        }

    }, [props.allStatesData])

    return (
        <div className="col-lg-6 text-center">
            <div className="row">
                <div className="col-lg-12 fadeIn" style={{ animationDelay: "2.0s" }}>
                    <div className="">
                        <div className="tooltip visualization-tooltip" style={{ width: "187px", height: "172px", visibility: "hidden" }} ref={d3Tooltip}>
                        </div>
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
                                    <tr>
                                        <td style={{ width: "20%" }}>0-49</td>
                                        <td style={{ width: "20%" }}>50-99</td>
                                        <td style={{ width: "20%" }}>100-499</td>
                                        <td style={{ width: "20%" }}>500-999</td>
                                        <td style={{ width: "20%" }}>>=1000</td>
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