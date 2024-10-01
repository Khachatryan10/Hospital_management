import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../app/store"
import ScheduleForm from "./ScheduleForm"
import { reinitializeDate } from "../features/dateAndTimeSlice"
import { updateDoctorsPage } from "../features/updatedDoctorsPageSlice"
import { useDispatch } from "react-redux"
import { removeAppointementInfo } from "../features/appointementInfoSlice"
import { CsrfTokenDataType } from "./RegisterForm"

interface DoctorDataTypes {
    firstName: string,
    lastName: string, 
    email: string,
    role: string,
    phoneNumber: string,
    speciality: string
}

interface DoctorDataMapTypes {
    first_name: string,
    last_name: string, 
    email: string,
    role: string,
    phone_number: string,
    speciality: string
}

interface ErrorMessageStyleTypes {
    height: string,
    fontSize: string,
    marginTop: string,
    marginBottom: string,
    color: string,
    Visibility: string
}

export interface appontementStateTypes {
    styles: ErrorMessageStyleTypes,
    message: string
    passwordInputAppointement: string
}

export default function DoctorsPage(){
    const [doctorData, setDoctorData] = useState<DoctorDataTypes>({
        firstName: "",
        lastName: "", 
        email: "",
        role: "", 
        phoneNumber: "",
        speciality: ""
    })
    
    const updated:boolean = useSelector((state:RootState) => state.updatedDoctorsPage.updated)

    const dispatch = useDispatch()
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const { id } = useParams()
    const [csrf_token, setCsrf_token] = useState<string>("")
    const [appontementState, setAppontementState] = useState<appontementStateTypes>({
        styles:{
            height: "5px",
            fontSize: "17px",
            marginTop: "5px",
            marginBottom: "0",
            color: "",
            Visibility: "hidden"
        },
        passwordInputAppointement: "",
        message: ""
    })


    useEffect(() => {
        dispatch(reinitializeDate())
        setDoctorData({
            firstName: "",
            lastName: "", 
            email: "",
            role: "", 
            phoneNumber: "",
            speciality: ""
        })

    fetch(`http://127.0.0.1:8000/doctor_data/${id}`)
        .then(response => response.json())
        .then((doctorData) => doctorData.map((data: DoctorDataMapTypes) => {
            setDoctorData(prevState => {
                return {
                    ...prevState,
                        firstName: data.first_name,
                        lastName: data.last_name, 
                        email: data.email,
                        role: data.role, 
                        phoneNumber: data.phone_number,
                        speciality: data.speciality
                }
            })
        }))
    },[updated, id, dispatch])

    const refContainer = useRef<HTMLDivElement>(null);

    const handleClickToScrollPrevious = () => {
        refContainer.current?.scrollBy({left: - refContainer.current?.clientWidth, behavior: "auto"})
    }

    const handleClickToScrollNext = () => {
        refContainer.current?.scrollBy({left: refContainer.current?.clientWidth, behavior: "auto"})
    }
    
    const appointementInfo = useSelector((state:RootState) => state.appointementInfo)
    
    useEffect(() => {
        fetch("http://127.0.0.1:8000/get_csrf_token")
            .then(response => response.json())
            .then((data:CsrfTokenDataType) => {
                setCsrf_token(data.csrf_token)
            }
        )  
    },[appointementInfo, updated])

    
    const postAppointementData = async () => {
        if (appointementInfo.doctorName !== ""){
        await fetch("http://127.0.0.1:8000/add_appointement", {
            method: "POST",
            mode: "same-origin",
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({
                    doctorName: doctorData.firstName,
                    doctorLastName: doctorData.lastName,
                    doctorEmail: doctorData.email,
                    patientName: appointementInfo.patientName,
                    patientLastName: appointementInfo.patientLastName,
                    patientEmail: appointementInfo.patientEmail,
                    doctorId: appointementInfo.doctorId,
                    weekDay: appointementInfo.weekDay, 
                    appintementDate: appointementInfo.appintementDate,
                    appintementTime: appointementInfo.appintementTime,
                    passwordAppointement: appontementState.passwordInputAppointement
                })
            })
            .then(response =>  {
                    setAppontementState(prevState => {
                        return{
                            ...prevState,
                                styles:{
                                    ...prevState.styles,
                                        color: response.ok ? "green": "rgb(255, 17, 17)",
                                        Visibility: "visible"
                                },
                                passwordInputAppointement: response.ok ? "" : appontementState.passwordInputAppointement,
                                message: response.ok ? "Appointement is fixed":
                                response.status === 409 ? "You already have an appointement for this day":
                                response.status === 404 ? "Wrong password":
                                response.status === 403 ? "Please choose appointement time":
                                response.status === 422 ? "Please provide password" : "Something went wrong"
                        }
                    })
            
            })

            .catch(error => console.log(error))
            dispatch(updateDoctorsPage())
            dispatch(removeAppointementInfo())
        }
    }

    return(
            <>
                <div className={displayNavbar ? "userInfoDivDoctor": "userInfoDivDoctorLeft"}>
                <h2>Name: { doctorData.firstName }</h2>
                <h2>Lastname: { doctorData.lastName }</h2>
                <h2>Email: { doctorData.email }</h2>
                <h2>Phone Number: { doctorData.phoneNumber }</h2>
                <h2>{ doctorData.speciality }</h2> 
                <br />

                </div>
                    <br />
                <div className={displayNavbar ? "appointementTitlesDiv": "appointementTitlesDivLeft"}>
                    <h1 className="appointementTitlesDiv__title">Take Appointement</h1>
                </div>
                <br />

            <div className={displayNavbar ? "doctorsPageDiv": "doctorsPageDivLeft"} ref={refContainer}>
                <ScheduleForm />
            </div> 
            
            <div className={displayNavbar ? "appointementDiv": "appointementDivLeft"}>
                <button className="appointementDiv__btnPrev" onClick={handleClickToScrollPrevious}>Previous</button>
                <button className="appointementDiv__btnNext" onClick={handleClickToScrollNext}>Next</button>
            </div>
            
            <div className={displayNavbar ? "errMessageDiv": "errMessageDivLeft"}>
                <h3 style={appontementState.styles} className="errMessage">{ appontementState.message }</h3>
            </div>
            <br />
            <input type="password" className={displayNavbar ? "confirmDatePassword": "confirmDatePasswordLeft"} placeholder="Password" value={appontementState.passwordInputAppointement} 
                    onChange={(e) => setAppontementState(prevState => {
                        return{
                            ...prevState,
                                styles:{
                                    ...prevState.styles,
                                },
                                passwordInputAppointement: e.target.value
                        }
            })}/>
            <button onClick={postAppointementData} className={displayNavbar ? "confirmDateBtn": "confirmDateBtnLeft"}>Confirm</button>
        </>
    )
}