import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface appointementInfoTypes {
    patientName: string,
    doctorName: string,
    doctorLastName: string,
    patientLastName: string,
    patientEmail: string,
    doctorEmail:string,
    weekDay:string,
    doctorId: string,
    appintementDate: string,
    appintementTime: string
}

const initialState: appointementInfoTypes = {
    patientName: "",
    doctorName: "",
    doctorLastName: "",
    patientLastName: "",
    patientEmail: "",
    doctorEmail: "",
    weekDay: "",
    doctorId: "",
    appintementDate: "",
    appintementTime: ""
}

export const appointementInfoSlice = createSlice({
    name: "appointementInfo",
    initialState,
    reducers: {
        addAppointementInfo: (state, actions:PayloadAction<appointementInfoTypes>):void => {
            state.doctorName = actions.payload.doctorName;
            state.patientName = actions.payload.patientName;
            state.doctorLastName = actions.payload.doctorLastName;
            state.patientLastName = actions.payload.patientLastName;
            state.patientEmail = actions.payload.patientEmail;
            state.doctorEmail = actions.payload.doctorEmail;
            state.weekDay = actions.payload.weekDay;
            state.doctorId = actions.payload.doctorId;
            state.appintementDate = actions.payload.appintementDate;
            state.appintementTime = actions.payload.appintementTime
        },
        
        removeAppointementInfo: (state):void => {
                state.doctorName = "";
                state.patientName = "";
                state.doctorLastName = "";
                state.patientLastName = "";
                state.patientEmail = "";
                state.doctorEmail = "";
                state.weekDay = "";
                state.doctorId = "";
                state.appintementDate = "";
                state.appintementTime = ""
        }
    }
})

export const appointementInfoSliceReducer = appointementInfoSlice.reducer
export const { addAppointementInfo, removeAppointementInfo } = appointementInfoSlice.actions