import { createSlice } from "@reduxjs/toolkit"

interface InitStateTypes {
    updated: boolean
}

const initialState: InitStateTypes = {
    updated: false
}

export const updatedDoctorsPageSlice = createSlice({
    name: "updateDoctorsPage",
    initialState,
    reducers: {
        updateDoctorsPage: (state):void => {
            state.updated = !state.updated;
        },
    }
})

export const updatedDoctorsPageSliceReducer = updatedDoctorsPageSlice.reducer
export const { updateDoctorsPage } = updatedDoctorsPageSlice.actions