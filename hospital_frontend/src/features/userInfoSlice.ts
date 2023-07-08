import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SpecialityType } from "./doctorsInfoSlice";

export default interface UserInfoTypes {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    speciality?: SpecialityType,
    phoneNumber: string,
    authenticated: boolean,
}

const initialState: UserInfoTypes = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    speciality: "",
    phoneNumber: "",
    authenticated: false
}

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers:{
        addUserInfo: (state: UserInfoTypes, action):void => {
            state.id = action.payload.id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.speciality = action.payload.speciality;
            state.phoneNumber = action.payload.phoneNumber;
        },
        updataAuthentication:(state, action:PayloadAction<boolean>):void => {
            state.authenticated = action.payload
        }
    }
})

export const userInfoSliceReducer = userInfoSlice.reducer
export const { addUserInfo, updataAuthentication } = userInfoSlice.actions