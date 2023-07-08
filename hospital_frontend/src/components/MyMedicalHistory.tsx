import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import NothingYetForm from "./NothingYetForm"

// interface MedicalHistoryDataTypes {
//     patientEmail: string,
//     doctorEmail: string,
//     doctorName: string,
//     doctorLastName: string,
//     patientName: string,
//     patientLastName: string,
//     patientBirthDate: string,
//     medicalInformation: string
// }

export interface MedicalHistoryDataTypes {
    patient_email: string,
    doctor_email: string,
    doctor_name: string,
    doctor_last_name: string,
    patient_name: string,
    patient_last_name: string,
    patient_birth_date: string,
    medical_information: string
}

export default function MyMedicalHistory(): JSX.Element {
    const [medicalHistoryData, setMedicalHistoryData] = useState<MedicalHistoryDataTypes[]>([{
        patient_email: "",
        doctor_email: "",
        doctor_name: "",
        doctor_last_name: "",
        patient_name: "",
        patient_last_name: "",
        patient_birth_date: "",
        medical_information: ""
    }])


    useEffect(() => {
        fetch("http://127.0.0.1:8000/get_my_medical_history")
            .then(response => response.json())
            .then((data:MedicalHistoryDataTypes[]) => {
                if(Object.values(data[0]).every(property => property !== "")){
                    setMedicalHistoryData(data)
                }
            }
        )
    },[])


    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)

    const medInfo = medicalHistoryData[0]

        // if(Object.values(medicalHistoryData[0]).every(property => property !== "")){
        //     console.log(Object.values(medicalHistoryData[0]))
        // }

    return( 
        <>
        {Object.values(medInfo).every(data => data !== "") ?
        <div className={displayNavbar ? "MyMedHistoryContainerDiv" : "MyMedHistoryContainerDivLeft"}>
            <h3>{medInfo.patient_name} {medInfo.patient_last_name}</h3>
            <h4>{medInfo.patient_birth_date}</h4>
            <div className="MyMedHistoryContainerDiv__medicalInfo">
                <p className="MyMedHistoryContainerDiv__prg">
                    {medInfo.medical_information}
                </p>
                <br />
                Written by Doctor {medInfo.doctor_name} {medInfo.doctor_last_name}
            </div>
            
        </div>:
            <NothingYetForm />
    }
    </>

        )
    
}