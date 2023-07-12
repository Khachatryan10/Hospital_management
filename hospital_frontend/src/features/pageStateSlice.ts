import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export default interface PageStateTypes {
    displayLogoutForm: boolean,
    displayDeleteDiv: boolean,
    displayNavbar: boolean,
    clickedToDisplayNavbar: boolean
}

const initialState: PageStateTypes = {
    displayLogoutForm: false,
    displayDeleteDiv: false,
    displayNavbar: true,
    clickedToDisplayNavbar: false
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

        displayVerticalNavbar: (state: PageStateTypes, action:PayloadAction<boolean>):void => {
            state.displayNavbar = action.payload
        },

        toggleNavbarDisplay: (state: PageStateTypes): void => {
            state.displayNavbar = !state.displayNavbar
        },

        clickedToToggle: (state: PageStateTypes, action:PayloadAction<boolean>): void => {
            state.clickedToDisplayNavbar = action.payload
        }

    }
})

export const pageStateSliceReducer = pageStateSlice.reducer
export const { updateLogoutDisplay, deleteDivDisplay, clickedToToggle, displayVerticalNavbar, toggleNavbarDisplay } = pageStateSlice.actions