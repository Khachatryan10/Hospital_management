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

interface ResponsiveSizeI {
    w: number,
    h: number ,
    rectW: number,
    rectX: number,
    textFontSize: string
}

export default function ChartForm() {
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const [data, setData] = useState<ChartBarDataTypes[]>([]);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

    const initialSate = {
        w: 650,
        h: 400,
        rectW: 55,
        rectX: 65,
        textFontSize: "15px"
    }

    const [responsiveSize, setResponsiveSize] = useState<ResponsiveSizeI>(initialSate)

    useEffect(() => {
        fetch("http://127.0.0.1:8000/char_bar_info")
            .then(response => response.json())
            .then((data:ChartBarDataTypes[]) => {
                    setData(data)
                })
    },[])

    const getWindowSize = () => {
        setWindowWidth(window.innerWidth) 
    }

    useEffect(() => {
        window.addEventListener("resize", getWindowSize) 
        
        return () => {
            window.removeEventListener("resize", getWindowSize)
        }
    },[])

    useEffect(() => {
        if (windowWidth < 831){
            setResponsiveSize({
                w: 275,
                h: 255,
                rectW: 20,
                rectX: 27,
                textFontSize: "8px"  
            })
        }

        else if (windowWidth > 1547){
            setResponsiveSize({
                w: 855,
                h: 555,
                rectW: 72,
                rectX: 85,
                textFontSize: "19px"
            })
        }

        else {
            setResponsiveSize(initialSate)
        }

    },[windowWidth])

    const svgRef = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        const chartSVG = d3.select(svgRef.current)
            .attr("width", responsiveSize.w)
            .attr("height", responsiveSize.h)
            
        chartSVG.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * responsiveSize.rectX)
            .attr("y", (d, i) => d.count > 0 ? responsiveSize.h - 18 * d.count : responsiveSize.h - 10) 
            .attr("width", responsiveSize.rectW)            
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
            .attr("x", (d, i) => i * responsiveSize.rectX)
            .attr("y", (d, i) => d.count > 0 ? responsiveSize.h - 18 * d.count - 18: responsiveSize.h - 7 * 4)
            .text((d) => data.indexOf(d) === 0 ? "Today" : d.day_month)
            .style("font-size", responsiveSize.textFontSize)
            .attr("fill", "#067397")

    },[data, windowWidth])

    /*
        When looking the responsivness of the chart using devtools, the chart's container div changes size,
        but the charbars disappear. If you refresh the page you can see the charbars.
    */

    return (
            <svg className={displayNavbar ? "charFormSvg" : "charFormSvgLeft"} ref={svgRef} ></svg>  
    )
}