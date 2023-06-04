import { configureStore } from "@reduxjs/toolkit"
import { userInfoSliceReducer } from "../features/userInfoSlice"
import { pageStateSliceReducer } from "../features/pageStateSlice"
import { doctorsInfoSliceReducer } from "../features/doctorsInfoSlice"
import { appointementInfoSliceReducer } from "../features/appointementInfoSlice"
import { dateAndTimeSliceReducer } from "../features/dateAndTimeSlice"
import { updatedDoctorsPageSliceReducer } from "../features/updatedDoctorsPageSlice"
import { updateAppointementsSliceReducer } from "../features/updateAppointementsSlice"
import { updatedDoctorsScheduleSliceSliceReducer } from "../features/updateDoctorsSchedule"

export const store = configureStore({
    reducer:{
        userInformation: userInfoSliceReducer,
        pageState: pageStateSliceReducer,
        doctorsInfo: doctorsInfoSliceReducer,
        appointementInfo: appointementInfoSliceReducer,
        dateAndTime: dateAndTimeSliceReducer,
        updatedDoctorsPage: updatedDoctorsPageSliceReducer,
        updateAppointements: updateAppointementsSliceReducer,
        updatedDoctorsSchedule: updatedDoctorsScheduleSliceSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export const AppDispatch = typeof store.dispatch