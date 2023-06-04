import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addDoctorsData, emptyDoctorsData } from "../features/doctorsInfoSlice"
import DataTypes from "../features/doctorsInfoSlice"
import { RootState } from "../app/store"
import { Link} from "react-router-dom"
import { updateDoctorsPage } from "../features/updatedDoctorsPageSlice"

export default function FindDoctorsForm(){
    const dispatch = useDispatch()
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const doctorsInfo = useSelector((state:RootState) => state.doctorsInfo)

    useEffect(() => {
        // const controller = new AbortController()
        // const signal = controller.signal
        dispatch(emptyDoctorsData())
        fetch("http://127.0.0.1:8000/doctors",)
            .then(response => response.json())
            .then(doctorsData => {
                doctorsData.map((data:DataTypes) => {
                    dispatch(addDoctorsData(data))
                })
        })
        .catch(error => console.log(error))

    },[dispatch])

    const handleClick = () => {
        dispatch(updateDoctorsPage())
    }
    
    return(
        <div className={displayNavbar ? "doctorInfoContainer": "doctorInfoContainerToLeft"}>
            {doctorsInfo.doctors.map((doctor => {
                return (
                    <Link to={`/doctor/${doctor.id}`} className="doctorInfoContainer__div" onClick={handleClick}>
                    <div key={doctor.id}>
                        <p>{doctor.first_name} {doctor.last_name}</p>
                        <p>{doctor.email}</p>
                        <p>{doctor.phone_number}</p>
                        <p>{doctor.speciality}</p>
                    </div>
                    </Link>
                )
            }))}
        </div>
    )
}