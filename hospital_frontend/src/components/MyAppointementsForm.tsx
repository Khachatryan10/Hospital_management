import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import UserInfoTypes from "../features/userInfoSlice"

interface MyAppointementDataTypes {
    doctor_name: string,
    doctor_last_name: string,
    patient_name: string,
    patient_last_name: string
    doctor_email: string ,
    doctor_id: string,
    week_day: string,
    date: string,
    time: string 
}

export default function MyAppointementsForm(): JSX.Element {
    const [myAppointements, setmyAppointements] = useState<MyAppointementDataTypes[]>([])
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const userInfo:UserInfoTypes = useSelector((state:RootState) => state.userInformation)

    useEffect(() => {
        fetch("http://127.0.0.1:8000/my_appointements_data")
            .then(response => response.json())
            .then(doctorsData => {
                const data = doctorsData.map((data:MyAppointementDataTypes) => {
                    return data
                })

            setmyAppointements(data)
        })
        .catch(error => console.log(error))

    },[])

        
        return (
                <div className={displayNavbar ? "myAppointementContainer": "myAppointementContainerLeft"}>
                        {
                    myAppointements.map(appointement => {
                    return (
                    <div className="myAppointementContainer__myAppointementDiv">
                            {userInfo.role === "Patient" && <p>Appointement with {appointement.doctor_name} {appointement.doctor_last_name}</p>} 
                            {userInfo.role === "Doctor" && <p>Appointement with {appointement.patient_name} {appointement.patient_last_name}</p> }
                            <p>{appointement.date} at {appointement.time.slice(0,5)}</p>
                            <p></p>                            
                            </div>
                        )
                    })
                }
                </div>
        )
}