import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type SpecialityType  = "Doctor" | "Receptionist" | ""

export default interface DataTypes {
    email: string,
    first_name: string,
    id: string,
    last_name: string,     
    phone_number: string,
    role: string,
    speciality: SpecialityType
}

export interface DoctorsDataTypes {
    doctors: DataTypes[]
}

const initialState: DoctorsDataTypes = {
    doctors: []
} 

export const doctorsInfoSlice = createSlice({
    name: "doctors",
    initialState,
    reducers: {
        addDoctorsData: (state, action:PayloadAction<DataTypes>) => {
            state.doctors.push(action.payload)
        },
        emptyDoctorsData: (state) => {
            state.doctors = [] 
        }
    }
})

export const doctorsInfoSliceReducer = doctorsInfoSlice.reducer
export const { addDoctorsData, emptyDoctorsData } = doctorsInfoSlice.actions