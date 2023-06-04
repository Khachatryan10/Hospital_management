import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface updateAppointementDataTypes{
    id: string,
    // patient_email: string,
    date: string,
    time: string,
    weekDay: string
}

interface updateAppointementsTypes{
    scheduleData: updateAppointementDataTypes[]
}

const initialState: updateAppointementsTypes = {
    scheduleData: []
}

export const updateAppointementsSlice = createSlice({
    name: "updateAppointementsData",
    initialState,
    reducers:{
        addDate:(state: updateAppointementsTypes, action:PayloadAction<updateAppointementDataTypes>):void => {
            state.scheduleData.push(action.payload)
        },
        
        removeDate:(state: updateAppointementsTypes, action:PayloadAction<string>):void => {
            state.scheduleData.map(date => {
            if (date.id === action.payload){
                state.scheduleData.splice(state.scheduleData.indexOf(date), 1)
            }
            return date
        })
        },
        
    }
})

export const updateAppointementsSliceReducer = updateAppointementsSlice.reducer
export const { addDate, removeDate } = updateAppointementsSlice.actions