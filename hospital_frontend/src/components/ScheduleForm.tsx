import { useEffect, useState } from "react"
import * as dateDataInfo from "../features/dateAndTimeSlice"
import { DateAndTimeTypes } from "../features/dateAndTimeSlice"
import { addAppointementInfo, removeAppointementInfo } from "../features/appointementInfoSlice"
import { useDispatch, useSelector } from "react-redux"
import UserInfoTypes from "../features/userInfoSlice"
import { RootState } from "../app/store"
import { useParams } from "react-router-dom"
import { setAppointementChosen, setNotWorkingDayDr, setBusyDay,
        reinitializeDate,allUnChosen, allChosen,
        setAppointementUnChosenDr, setAppointementChosenDr } from "../features/dateAndTimeSlice"
import { addDate, removeDate } from "../features/updateAppointementsSlice"

interface BusyDateTypes {
    id: string,
    date: string,
    time: string,
    week_day:string,
    working_day: string,
}

export default function ScheduleForm(): JSX.Element {
    const dateData = useSelector((state:RootState) => state.dateAndTime)
    const dispatch = useDispatch()
    const userInfo:UserInfoTypes = useSelector((state:RootState) => state.userInformation)
    const updated:boolean = useSelector((state:RootState) => state.updatedDoctorsPage.updated)

    const todayData = dateData.filter(data => data.date === dateDataInfo.todayDate) 
    const tomorrowData = dateData.filter(data => data.date === dateDataInfo.tomorrowDate)
    const day3 = dateData.filter(data => data.date === dateDataInfo.day3Date)
    const day4 = dateData.filter(data => data.date === dateDataInfo.day4Date)
    const day5 = dateData.filter(data => data.date === dateDataInfo.day5Date)
    const day6 = dateData.filter(data => data.date === dateDataInfo.day6Date)
    const day7 = dateData.filter(data => data.date === dateDataInfo.day7Date)
    const day8 = dateData.filter(data => data.date === dateDataInfo.day8Date)
    const day9 = dateData.filter(data => data.date === dateDataInfo.day9Date)
    const day10 = dateData.filter(data => data.date === dateDataInfo.day10Date)
    const day11 = dateData.filter(data => data.date === dateDataInfo.day11Date)
    const day12 = dateData.filter(data => data.date === dateDataInfo.day12Date)
    const day13 = dateData.filter(data => data.date === dateDataInfo.day13Date)
    const day14 = dateData.filter(data => data.date === dateDataInfo.day14Date)
    const day15 = dateData.filter(data => data.date === dateDataInfo.day15Date)
    const day16 = dateData.filter(data => data.date === dateDataInfo.day16Date)
    const day17 = dateData.filter(data => data.date === dateDataInfo.day17Date)
    
    const months: string[] = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug",	"Sept",	"Oct", "Nov"]
    const { id } = useParams()
    const [busyAppointements, setBusyAppointements] = useState<BusyDateTypes[]>([])
    const doctorsInfo = useSelector((state:RootState) => state.doctorsInfo.doctors.filter(doctor => doctor.id === id))
    const scheduleUpdated = useSelector((state:RootState) => state.updatedDoctorsSchedule.updated)
    let currentDoctorName = doctorsInfo.map((data) => data.first_name)[0]
    let currentDoctorLastName = doctorsInfo.map(data => data.last_name)[0]
    let currentDoctorEmail = doctorsInfo.map(data => data.email)[0]

    useEffect(() => {
    dispatch(reinitializeDate())

    const fetchAppointementData = async ():Promise<void> => {
            if (userInfo.role === "Patient"){
                fetch(`http://127.0.0.1:8000/doctors_schedule/${id}`)
                    .then(response => response.json())
                    .then(busyAppointementsData => {
                    setBusyAppointements(busyAppointementsData)
                })        
            }

            else if (userInfo.role === "Doctor"){
                fetch("http://127.0.0.1:8000/my_schedule")
                    .then(response => response.json())
                    .then(busyAppointementsData => {
                    setBusyAppointements(busyAppointementsData)
                })   
            }
            }
        fetchAppointementData()

    },[updated, dispatch, userInfo.role, id, scheduleUpdated])


    useEffect(() => {
        dispatch(reinitializeDate())

        dateData.map((data: DateAndTimeTypes) => {     
            if (data.weekDay === "Saturday" || data.weekDay === "Sunday"){  
                dispatch(setNotWorkingDayDr(data.id))
            }

            busyAppointements.map((busyDay) => {
                if (busyAppointements.length > 0){

                    if (busyDay.working_day && busyDay.date === data.date && busyDay.time.slice(0,5) === data.time){
                        dispatch(setBusyDay(data.id))
                    }

                    if (!busyDay.working_day && busyDay.date === data.date && busyDay.time.slice(0,5) === data.time){
                        dispatch(setNotWorkingDayDr(data.id))
                    }

            }
        })
    })

    },[busyAppointements, updated])


    const handleClick = (scheduleId:string) => {
        dateData.map((data: DateAndTimeTypes) => { 

            if (data.id === scheduleId && !data.chosen){
                
                if (userInfo.role === "Patient" && data.workingDay && !data.busy){
                    dispatch(addAppointementInfo({
                        doctorName: currentDoctorName,
                        patientName: userInfo.firstName,
                        doctorLastName: currentDoctorLastName,
                        patientLastName: userInfo.lastName,
                        doctorEmail: currentDoctorEmail,
                        patientEmail: userInfo.email,
                        weekDay: data.weekDay,
                        doctorId: id ? id : "",
                        appintementDate: data.date,
                        appintementTime: data.time
                    }))

                    dispatch(setAppointementChosen(data.id))
                }

                else if (userInfo.role === "Doctor" && data.weekDay !== "Saturday" && data.weekDay !== "Sunday"){
                    dispatch(setAppointementChosenDr(data.id))
                    dispatch(addDate({
                        id: data.id,
                        date: data.date,
                        time: data.time,
                        weekDay: data.weekDay
                    }))

                }
                
            }
            
            else if (data.id === scheduleId && data.chosen && !data.busy && userInfo.role === "Patient" ){
                dispatch(setAppointementChosen(data.id)) 
                dispatch(removeAppointementInfo())
            }

            else if (data.id === scheduleId && data.chosen && userInfo.role === "Doctor"){
                dispatch(setAppointementUnChosenDr(data.id)) 
                dispatch(removeDate(data.id))
            

                if (data.busy){
                    dispatch(setAppointementUnChosenDr(data.id)) 
                    dispatch(setBusyDay(data.id))
                
                }

                if (!data.workingDay){
                    dispatch(setAppointementUnChosenDr(data.id)) 
                    dispatch(setNotWorkingDayDr(data.id))
                }
            }

        })
    }

    const selectAll = (date:string) => {
        dispatch(allChosen(date))
        dateData.map(schedule => {
            if (schedule.date === date && schedule.weekDay !== "Saturday" && schedule.weekDay !== "Sunday"){
                dispatch(addDate({  
                        id: schedule.id,
                        date: schedule.date,
                        time: schedule.time,
                        weekDay: schedule.weekDay
                    }))
            }
        })
    }

    const unSelectAll = (date:string) => {
        dispatch(allUnChosen(date))
        dateData.map(schedule => {
            if (schedule.date === date){
                dispatch(removeDate(schedule.id))
            }
        })
        
    }
    const chosenOrNot = (date:DateAndTimeTypes[]) => {
        return date.some(day => { 
            if (!day.chosen){
                return true
            } 
            return false
        })
    }
    return(
        <>
            <div className="doctorsPageDiv__div1">
                {userInfo.role === "Doctor" && <button className={chosenOrNot(todayData) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(todayData) ? selectAll(dateDataInfo.todayDate): unSelectAll(dateDataInfo.todayDate)}>
                    {chosenOrNot(todayData) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>Today ({dateDataInfo.weekDays[dateDataInfo.todayDayOfWeek]})</h3>
                {todayData.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}

            </div>
                <div className="doctorsPageDiv__div2">
                {userInfo.role === "Doctor" && <button className={chosenOrNot(tomorrowData) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(tomorrowData) ? selectAll(dateDataInfo.tomorrowDate): unSelectAll(dateDataInfo.tomorrowDate)}>
                    {chosenOrNot(tomorrowData) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>Tomorrow ({dateDataInfo.weekDays[dateDataInfo.tomorrowDayOfWeek]})</h3>
                {tomorrowData.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id} 
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}

                    </div>

                <div className="doctorsPageDiv__div3">
                {userInfo.role === "Doctor" && <button className={chosenOrNot(day3) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day3) ? selectAll(dateDataInfo.day3Date): unSelectAll(dateDataInfo.day3Date)}>
                    {chosenOrNot(day3) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{dateDataInfo.weekDays[dateDataInfo.day3DayOfWeek]} {dateDataInfo.day3Date.slice(8,10)} {months[dateDataInfo.d3Month]}</h3>
                {day3.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div>

                <div className="doctorsPageDiv__div4">
                {userInfo.role === "Doctor" && <button className={chosenOrNot(day4) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day4) ? selectAll(dateDataInfo.day4Date): unSelectAll(dateDataInfo.day4Date)}>
                    {chosenOrNot(day4) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{dateDataInfo.weekDays[dateDataInfo.day4DayOfWeek]} {dateDataInfo.day4Date.slice(8,10)} {months[dateDataInfo.d4Month]}</h3>
                {day4.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div>

                <div className="doctorsPageDiv__div5">
                {userInfo.role === "Doctor" && <button className={chosenOrNot(day5) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day5) ? selectAll(dateDataInfo.day5Date): unSelectAll(dateDataInfo.day5Date)}>
                    {chosenOrNot(day5) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{dateDataInfo.weekDays[dateDataInfo.day5DayOfWeek]} {dateDataInfo.day5Date.slice(8,10)} {months[dateDataInfo.d5Month]}</h3>
                {day5.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn"
                            onClick={() => handleClick(data.id)}  key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div>

                <div className="doctorsPageDiv__div6">
                {userInfo.role === "Doctor" && <button className={chosenOrNot(day6) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day6) ? selectAll(dateDataInfo.day6Date): unSelectAll(dateDataInfo.day6Date)}>
                    {chosenOrNot(day6) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{ dateDataInfo.weekDays[dateDataInfo.day6DayOfWeek]} {dateDataInfo.day6Date.slice(8,10)} {months[dateDataInfo.d6Month]}</h3>
                {day6.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div>

                <div className="doctorsPageDiv__div7">
                {userInfo.role === "Doctor" && <button className={chosenOrNot(day7) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day7) ? selectAll(dateDataInfo.day7Date): unSelectAll(dateDataInfo.day7Date)}>
                    {chosenOrNot(day7) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{dateDataInfo.weekDays[dateDataInfo.day7DayOfWeek]} {dateDataInfo.day7Date.slice(8,10)} {months[dateDataInfo.d7Month]}</h3>
                {day7.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div> 

                <div className="doctorsPageDiv__div8">
                {userInfo.role === "Doctor" && <button className={chosenOrNot(day8) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day8) ? selectAll(dateDataInfo.day8Date): unSelectAll(dateDataInfo.day8Date)}>
                    {chosenOrNot(day8) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{ dateDataInfo.weekDays[dateDataInfo.day8DayOfWeek]} {dateDataInfo.day8Date.slice(8,10)} {months[dateDataInfo.d8Month]}</h3>
                {day8.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div> 

                <div className="doctorsPageDiv__div9">
                {userInfo.role === "Doctor" && <button className={chosenOrNot(day9) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day9) ? selectAll(dateDataInfo.day9Date): unSelectAll(dateDataInfo.day9Date)}>
                    {chosenOrNot(day9) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{ dateDataInfo.weekDays[dateDataInfo.day9DayOfWeek]} {dateDataInfo.day9Date.slice(8,10)} {months[dateDataInfo.d9Month]}</h3>
                {day9.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div> 

                <div className="doctorsPageDiv__div10">
                {userInfo.role === "Doctor" && <button className={chosenOrNot(day10) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day10) ? selectAll(dateDataInfo.day10Date): unSelectAll(dateDataInfo.day10Date)}>
                    {chosenOrNot(day10) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{ dateDataInfo.weekDays[dateDataInfo.day10DayOfWeek]} {dateDataInfo.day10Date.slice(8,10)} {months[dateDataInfo.d10Month]}</h3>
                {day10.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                                style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div> 
                <div className="doctorsPageDiv__div11">
                {userInfo.role === "Doctor" && <button className={chosenOrNot(day11) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day11) ? selectAll(dateDataInfo.day11Date): unSelectAll(dateDataInfo.day11Date)}>
                    {chosenOrNot(day11) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{dateDataInfo.weekDays[dateDataInfo.day11DayOfWeek]} {dateDataInfo.day11Date.slice(8,10)} {months[dateDataInfo.d11Month]}</h3>
                {day11.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div>
            
                <div className="doctorsPageDiv__div12">
                {userInfo.role === "Doctor" && <button className={chosenOrNot(day12) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day12) ? selectAll(dateDataInfo.day12Date): unSelectAll(dateDataInfo.day12Date)}>
                    {chosenOrNot(day12) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{dateDataInfo.weekDays[dateDataInfo.day12DayOfWeek]} {dateDataInfo.day12Date.slice(8,10)} {months[dateDataInfo.d12Month]}</h3>
                {day12.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div>
            
                <div className="doctorsPageDiv__div13">
                {userInfo.role === "Doctor" && <button className={chosenOrNot(day13) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day13) ? selectAll(dateDataInfo.day13Date): unSelectAll(dateDataInfo.day13Date)}>
                    {chosenOrNot(day13) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{dateDataInfo.weekDays[dateDataInfo.day13DayOfWeek]} {dateDataInfo.day13Date.slice(8,10)} {months[dateDataInfo.d13Month]}</h3>
                {day13.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div>
            
                <div className="doctorsPageDiv__div14">
                    {userInfo.role === "Doctor" && <button className={chosenOrNot(day14) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day14) ? selectAll(dateDataInfo.day14Date): unSelectAll(dateDataInfo.day14Date)}>
                    {chosenOrNot(day14) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{dateDataInfo.weekDays[dateDataInfo.day14DayOfWeek]} {dateDataInfo.day14Date.slice(8,10)} {months[dateDataInfo.d14Month]}</h3>
                {day14.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div>
            
                <div className="doctorsPageDiv__div15">
                    {userInfo.role === "Doctor" && <button className={chosenOrNot(day15) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day15) ? selectAll(dateDataInfo.day15Date): unSelectAll(dateDataInfo.day15Date)}>
                    {chosenOrNot(day15) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{dateDataInfo.weekDays[dateDataInfo.day15DayOfWeek]} {dateDataInfo.day15Date.slice(8,10)} {months[dateDataInfo.d15Month]}</h3>
                {day15.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div> 
            
                <div className="doctorsPageDiv__div16">
                    {userInfo.role === "Doctor" && <button className={chosenOrNot(day16) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day16) ? selectAll(dateDataInfo.day16Date): unSelectAll(dateDataInfo.day16Date)}>
                    {chosenOrNot(day16) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{ dateDataInfo.weekDays[dateDataInfo.day16DayOfWeek]} {dateDataInfo.day16Date.slice(8,10)} {months[dateDataInfo.d16Month]}</h3>
                {day16.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div> 

                <div className="doctorsPageDiv__div17">
                    {userInfo.role === "Doctor" && <button className={chosenOrNot(day17) ? "selectAllBtn": "unSelectAllBtn"} onClick={() => chosenOrNot(day17) ? selectAll(dateDataInfo.day17Date): unSelectAll(dateDataInfo.day17Date)}>
                    {chosenOrNot(day17) ? 
                    "Select All": "Unselect All"}
                </button>}
                <h3>{dateDataInfo.weekDays[dateDataInfo.day17DayOfWeek]} {dateDataInfo.day17Date.slice(8,10)} {months[dateDataInfo.d17Month]}</h3>
                {/* <p>{ dateDataInfo.day17Date }</p> */}
                {day17.map(data => {
                    return(
                        <button className="doctorsPageDiv__timeBtn" 
                            onClick={() => handleClick(data.id)} key={data.id}
                            title={data.busy ? "Busy" : !data.workingDay ? "Not Working": ""}
                            style={{
                                "backgroundColor": data.backgroundColor,
                                "transition": "0.50s", "boxShadow": ((userInfo.role === "Patient" && data.chosen && !data.busy ? "0px 0px 5px -1px black": data.busy && userInfo.role === "Patient") || (!data.workingDay && userInfo.role === "Patient")) ? "0px 0px 0px 0.40px black" :
                                ((userInfo.role === "Doctor" && data.chosen) ? "inset 0px 0px 5px -1px #144b57": (!data.chosen && data.busy) || (!data.workingDay)) ? "0px 0px 0px 0.40px black" : ""
                                }}>
                            {data.time}
                        </button>
                    )
                })}
            </div> 
        </>
    )
}
