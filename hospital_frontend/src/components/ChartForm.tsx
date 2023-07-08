import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

interface ChartBarDataTypes {
    date: string,
    count: number,
    week_day: string,
    day_month: string
}

export default function ChartForm() {
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const [data, setData] = useState<ChartBarDataTypes[]>([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/char_bar_info")
            .then(response => response.json())
            .then((data:ChartBarDataTypes[]) => {
                    setData(data)
                })
            
    },[])

    console.log(data)

    const svgRef = useRef<SVGSVGElement | null>(null)
    const w = 650
    const h = 400 

    useEffect(() => {
        const chartSVG = d3.select(svgRef.current)
            .attr("width", w)
            .attr("height", h)
            
        chartSVG.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 65)
            .attr("y", (d, i) => d.count > 0 ? h - 18 * d.count : h - 10)
            .attr("width", 55)            
            .attr("height", (d) => d.count > 0 ? 18 * d.count: 10)
            .on("mouseover", function (d) {
                d3.select(this).transition().duration(500).style("fill", "rgb(31, 111, 116)")
            })
            .on("mouseout", function (d) {
                d3.select(this).transition().duration(500).style("fill", "")
            })
            .attr("fill",(d) => d.count > 0 ? "rgba(19,204,208,1)": "grey")
            .attr("cursor", "pointer")
            .append("title")
            .text((d) => d.count > 1 ? d.count + " appointements": d.count + " appointement")

        chartSVG.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", (d, i) => i * 65.70)
            .attr("y", (d, i) => d.count > 0 ? h - 18 * d.count - 18: h - 7 * 4)
            .text((d) => data.indexOf(d) === 0 ? "Today" : d.day_month)
            .style("font-size", "15px")
            .attr("fill", "#067397")

    },[data])

    return (
        <>
            <h1 className={displayNavbar ? "charFormH1": "charFormH1Left"}>Chart of Appointements</h1>
            <svg className={displayNavbar ? "charFormSvg" : "charFormSvgLeft"} ref={svgRef} ></svg>  
        </>
    )
}