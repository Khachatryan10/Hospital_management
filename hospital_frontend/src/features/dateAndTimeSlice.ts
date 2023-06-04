import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {v4 as uuid} from "uuid";

export interface DateAndTimeTypes {
    id: string,
    weekDay: string,
    date: string,
    time: string,
    workingDay: boolean,
    busy: boolean,
    backgroundColor: string
    chosen: boolean
}

export const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let today = new Date();
today.setDate(today.getDate())
export let tMonth = today.getMonth() + 1
let todayYear = today.getFullYear()
let todayMonth = tMonth.toString().length === 1 ? "0" + tMonth: tMonth
let todayDayOfMonth = today.getDate().toString().length === 1 ? "0" + today.getDate(): today.getDate()
export let todayDate = `${todayYear}:${todayMonth}:${todayDayOfMonth}`
export let todayDayOfWeek = today.getDay()


let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
export let tmMonth = tomorrow.getMonth() + 1
let tomorrowYear = tomorrow.getFullYear()
let tomorrowMonth = tmMonth.toString().length === 1 ? "0" + tmMonth: tmMonth 
let tomorrowDayOfMonth = tomorrow.getDate().toString().length === 1 ? "0" + tomorrow.getDate(): tomorrow.getDate()
export let tomorrowDate = `${tomorrowYear}:${tomorrowMonth}:${tomorrowDayOfMonth}`
export let tomorrowDayOfWeek = tomorrow.getDay()

let day3 = new Date();
day3.setDate(day3.getDate() + 2);
export let d3Month = day3.getMonth() + 1
let day3Year = day3.getFullYear()
let day3Month = d3Month.toString().length === 1 ? "0" + d3Month: d3Month 
let day3DayOfMonth = day3.getDate().toString().length === 1 ? "0" + day3.getDate(): day3.getDate()
export let day3Date = `${day3Year}:${day3Month}:${day3DayOfMonth}`
export let day3DayOfWeek = day3.getDay()

let day4 = new Date();
day4.setDate(day4.getDate() + 3);
export let d4Month = day4.getMonth() + 1
let day4Year = day4.getFullYear()
let day4Month = d4Month.toString().length === 1 ? "0" + d4Month: d4Month 
let day4DayOfMonth = day4.getDate().toString().length === 1 ? "0" + day4.getDate(): day4.getDate()
export let day4Date = `${day4Year}:${day4Month}:${day4DayOfMonth}`
export let day4DayOfWeek = day4.getDay()

let day5 = new Date();
day5.setDate(day5.getDate() + 4);
export let d5Month = day5.getMonth() + 1
let day5Year = day5.getFullYear()
let day5Month = d5Month.toString().length === 1 ? "0" + d5Month: d5Month
let day5DayOfMonth = day5.getDate().toString().length === 1 ? "0" + day5.getDate(): day5.getDate()
export let day5Date = `${day5Year}:${day5Month}:${day5DayOfMonth}`
export let day5DayOfWeek = day5.getDay()

let day6 = new Date();
day6.setDate(day6.getDate() + 5);
export let d6Month = day6.getMonth() + 1
let day6Year = day6.getFullYear()
let day6Month = d6Month.toString().length === 1 ? "0" + d6Month: d6Month 
let day6DayOfMonth = day6.getDate().toString().length === 1 ? "0" + day6.getDate(): day6.getDate()
export let day6Date = `${day6Year}:${day6Month}:${day6DayOfMonth}`
export let day6DayOfWeek = day6.getDay()

let day7 = new Date();
day7.setDate(day7.getDate() + 6);
export let d7Month = day7.getMonth() + 1
let day7Year = day7.getFullYear()
let day7Month = d7Month.toString().length === 1 ? "0" + d7Month: d7Month 
let day7DayOfMonth = day7.getDate().toString().length === 1 ? "0" + day7.getDate(): day7.getDate()
export let day7Date = `${day7Year}:${day7Month}:${day7DayOfMonth}`
export let day7DayOfWeek = day7.getDay()

let day8 = new Date();
day8.setDate(day8.getDate() + 7);
export let d8Month = day8.getMonth() + 1
let day8Year = day8.getFullYear()
let day8Month = d8Month.toString().length === 1 ? "0" + d8Month: d8Month 
let day8DayOfMonth = day8.getDate().toString().length === 1 ? "0" + day8.getDate(): day8.getDate()
export let day8Date = `${day8Year}:${day8Month}:${day8DayOfMonth}`
export let day8DayOfWeek = day8.getDay()

let day9 = new Date();
day9.setDate(day9.getDate() + 8);
export let d9Month = day9.getMonth() + 1
let day9Year = day9.getFullYear()
let day9Month = d9Month.toString().length === 1 ? "0" + d9Month: d9Month 
let day9DayOfMonth = day9.getDate().toString().length === 1 ? "0" + day9.getDate(): day9.getDate()
export let day9Date = `${day9Year}:${day9Month}:${day9DayOfMonth}`
export let day9DayOfWeek = day9.getDay()

let day10 = new Date();
day10.setDate(day10.getDate() + 9);
export let d10Month = day10.getMonth() + 1
let day10Year = day10.getFullYear()
let day10Month = d10Month.toString().length === 1 ? "0" + d10Month: d10Month 
let day10DayOfMonth = day10.getDate().toString().length === 1 ? "0" + day10.getDate(): day10.getDate()
export let day10Date = `${day10Year}:${day10Month}:${day10DayOfMonth}`
export let day10DayOfWeek = day10.getDay()

let day11 = new Date();
day11.setDate(day11.getDate() + 10);
export let d11Month = day11.getMonth() + 1
let day11Year = day11.getFullYear()
let day11Month = d11Month.toString().length === 1 ? "0" + d11Month: d11Month 
let day11DayOfMonth = day11.getDate().toString().length === 1 ? "0" + day11.getDate(): day11.getDate()
export let day11Date = `${day11Year}:${day11Month}:${day11DayOfMonth}`
export let day11DayOfWeek = day11.getDay()

let day12 = new Date();
day12.setDate(day12.getDate() + 11);
export let d12Month = day12.getMonth() + 1
let day12Year = day12.getFullYear()
let day12Month = d12Month.toString().length === 1 ? "0" + d12Month: d12Month 
let day12DayOfMonth = day12.getDate().toString().length === 1 ? "0" + day12.getDate(): day12.getDate()
export let day12Date = `${day12Year}:${day12Month}:${day12DayOfMonth}`
export let day12DayOfWeek = day12.getDay()

let day13 = new Date();
day13.setDate(day13.getDate() + 12);
export let d13Month = day13.getMonth() + 1
let day13Year = day13.getFullYear()
let day13Month = d13Month.toString().length === 1 ? "0" + d13Month: d13Month 
let day13DayOfMonth = day13.getDate().toString().length === 1 ? "0" + day13.getDate(): day13.getDate()
export let day13Date = `${day13Year}:${day13Month}:${day13DayOfMonth}`
export let day13DayOfWeek = day13.getDay()

let day14 = new Date();
day14.setDate(day14.getDate() + 13);
export let d14Month = day14.getMonth() + 1
let day14Year = day14.getFullYear()
let day14Month = d14Month.toString().length === 1 ? "0" + d14Month: d14Month 
let day14DayOfMonth = day14.getDate().toString().length === 1 ? "0" + day14.getDate(): day14.getDate()
export let day14Date = `${day14Year}:${day14Month}:${day14DayOfMonth}`
export let day14DayOfWeek = day14.getDay()

let day15 = new Date();
day15.setDate(day15.getDate() + 14);
export let d15Month = day15.getMonth() + 1
let day15Year = day15.getFullYear()
let day15Month = d15Month.toString().length === 1 ? "0" + d15Month: d15Month 
let day15DayOfMonth = day15.getDate().toString().length === 1 ? "0" + day15.getDate(): day15.getDate()
export let day15Date = `${day15Year}:${day15Month}:${day15DayOfMonth}`
export let day15DayOfWeek = day15.getDay()

let day16 = new Date();
day16.setDate(day16.getDate() + 15);
export let d16Month = day16.getMonth() + 1
let day16Year = day16.getFullYear()
let day16Month = d16Month.toString().length === 1 ? "0" + d16Month: d16Month 
let day16DayOfMonth = day16.getDate().toString().length === 1 ? "0" + day16.getDate(): day16.getDate()
export let day16Date = `${day16Year}:${day16Month}:${day16DayOfMonth}`
export let day16DayOfWeek = day16.getDay()

let day17 = new Date();
day17.setDate(day17.getDate() + 16);
export let d17Month = day17.getMonth() + 1
let day17Year = day17.getFullYear()
let day17Month = d17Month.toString().length === 1 ? "0" + d17Month: d17Month 
let day17DayOfMonth = day17.getDate().toString().length === 1 ? "0" + day17.getDate(): day17.getDate()
export let day17Date = `${day17Year}:${day17Month}:${day17DayOfMonth}`
export let day17DayOfWeek = day17.getDay()


export const initialState: DateAndTimeTypes[] = [
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "09:00", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "09:20", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "09:40", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "10:00", workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "10:20", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "10:40", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "11:00", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "11:20", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "11:40", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "12:00", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "13:30", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "13:50", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "14:10", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "14:30", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "14:50", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "15:10", workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "15:30", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "15:50", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "16:10", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "16:30", workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[todayDayOfWeek]}`, date: todayDate, time: "16:50", workingDay: true, busy: false, backgroundColor: "", chosen: false},

    // Tomorrow

    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[tomorrowDayOfWeek]}`, date: tomorrowDate, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    
    // Day 3

    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day3DayOfWeek]}`, date: day3Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    
    // Day 4

    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day4DayOfWeek]}`, date: day4Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},

    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day5DayOfWeek]}`, date: day5Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},

    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day6DayOfWeek]}`, date: day6Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},

    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day7DayOfWeek]}`, date: day7Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},

    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day8DayOfWeek]}`, date: day8Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},

    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day9DayOfWeek]}`, date: day9Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},

    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day10DayOfWeek]}`, date: day10Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},

    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day11DayOfWeek]}`, date: day11Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day12DayOfWeek]}`, date: day12Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},

    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day13DayOfWeek]}`, date: day13Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},

    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day14DayOfWeek]}`, date: day14Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},

    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day15DayOfWeek]}`, date: day15Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},

    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day16DayOfWeek]}`, date: day16Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},

    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "09:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "09:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "09:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "10:00",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "10:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "10:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "11:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "11:20",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "11:40",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "12:00",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "13:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "13:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "14:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "14:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "14:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "15:10",workingDay: true, busy: false, backgroundColor: "", chosen: false}, 
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "15:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "15:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "16:10",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "16:30",workingDay: true, busy: false, backgroundColor: "", chosen: false},
    {id: uuid(), weekDay: `${weekDays[day17DayOfWeek]}`, date: day17Date, time: "16:50",workingDay: true, busy: false, backgroundColor: "", chosen: false},
]

export const dateAndTimeSlice = createSlice({
    name: "DateAndTime",
    initialState,
    reducers: {
        setAppointementChosen: (state:DateAndTimeTypes[], actions:PayloadAction<string>):void => {
            state.map(day => {
                if (day.id === actions.payload && !day.busy && !day.chosen && day.workingDay){
                    day.chosen = true;
                    day.backgroundColor = "rgb(83, 228, 148)"
                }
            
                else if (day.chosen && !day.busy){
                    day.chosen = false;
                    day.backgroundColor = ""
                }
            })
        },

        setBusyDay: (state:DateAndTimeTypes[], actions:PayloadAction<string>):void => { 
            state.map(day => {
                if (day.workingDay && day.id === actions.payload){
                    day.busy = true;
                    day.backgroundColor = "rgb(251, 186, 186)"
                }
            })
        },

        reinitializeDate: (state:DateAndTimeTypes[]):void => {
            state.map(day => {
                    day.chosen = false;
                    day.busy = false;
                    day.backgroundColor = ""
                    day.workingDay = true
                
            })
        },

        allChosen: (state:DateAndTimeTypes[], actions:PayloadAction<string>): void => {
            state.map(day => {
                if (day.date === actions.payload && day.weekDay !== "Saturday" && day.weekDay !== "Sunday"){
                    day.chosen = true;
                    day.backgroundColor = "#91d6e6"
                }
            })            
        },

        allUnChosen: (state:DateAndTimeTypes[], actions:PayloadAction<string>):void => {
            state.map(day => {
                if (day.date === actions.payload && !day.workingDay){
                    day.chosen = false;
                    day.workingDay = false;
                    day.backgroundColor = "rgb(206, 206, 206)";
                }

                if (day.date === actions.payload && day.workingDay){
                    day.chosen = false;
                    day.workingDay = true;
                    day.backgroundColor = "";
                }

                if (day.date === actions.payload && day.busy){
                    day.chosen = false;
                    day.busy = true;
                    day.backgroundColor = "rgb(251, 186, 186)";
                }

            })            
        },

        setAppointementChosenDr: (state:DateAndTimeTypes[], actions:PayloadAction<string>):void => {
            state.map(day => {
                if (day.id === actions.payload){
                    day.chosen = true;
                    day.backgroundColor = "#91d6e6"
                }
            }) 
        },

        setAppointementUnChosenDr: (state:DateAndTimeTypes[], actions:PayloadAction<string>):void => {
            state.map(day => {
                if (day.id === actions.payload && day.chosen){
                    day.chosen = false;
                    day.backgroundColor = ""
                }
            }) 
        },

        setNotWorkingDayDr:(state:DateAndTimeTypes[], actions:PayloadAction<string>):void => {
            state.map(day => {
                if (day.id === actions.payload){
                    day.chosen = false;
                    day.workingDay = false;
                    day.backgroundColor = "rgb(206, 206, 206)"
                }
            })
        }

        
    }
})

export const dateAndTimeSliceReducer = dateAndTimeSlice.reducer
export const { setAppointementChosen,allUnChosen, setNotWorkingDayDr, setBusyDay, reinitializeDate, allChosen, setAppointementUnChosenDr, setAppointementChosenDr } = dateAndTimeSlice.actions
export * from "./dateAndTimeSlice"