import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export default interface PageStateTypes {
    displayLogoutForm: boolean
    displayDeleteDiv: boolean
    displayNavbar: boolean
}

const initialState: PageStateTypes = {
    displayLogoutForm: false,
    displayDeleteDiv: false,
    displayNavbar: true
}

export const pageStateSlice = createSlice({
    name: "pageState",
    initialState,
    reducers:{
        updateLogoutDisplay:(state: PageStateTypes, action:PayloadAction<boolean>):void => {
            state.displayLogoutForm = action.payload
        },

        deleteDivDisplay:(state: PageStateTypes, action:PayloadAction<boolean>):void => {
            state.displayDeleteDiv = action.payload
        },

        displayVerticalNavbar: (state: PageStateTypes):void => {
            state.displayNavbar = !state.displayNavbar
        }
    }
})

export const pageStateSliceReducer = pageStateSlice.reducer
export const { updateLogoutDisplay, deleteDivDisplay, displayVerticalNavbar } = pageStateSlice.actions