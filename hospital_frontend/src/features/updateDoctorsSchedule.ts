import { createSlice } from "@reduxjs/toolkit"

interface InitStateTypes {
    updated: boolean
}

const initialState: InitStateTypes = {
    updated: false
}

export const updatedDoctorsScheduleSlice = createSlice({
    name: "updateDoctorsPage",
    initialState,
    reducers: {
        updateDoctorsSchedule: (state):void => {
            state.updated = !state.updated;
        },
    }
})

export const updatedDoctorsScheduleSliceSliceReducer = updatedDoctorsScheduleSlice.reducer
export const { updateDoctorsSchedule } = updatedDoctorsScheduleSlice.actions