import { useEffect, useState } from "react"
import UserInfoTypes from "../features/userInfoSlice"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { appontementStateTypes } from "./DoctorsPage"
import { todayDate } from "../features/dateAndTimeSlice"
import { CsrfTokenDataType } from "./RegisterForm"

interface MedicalHistoryInputsTypes {
    [key :string]: string
}

interface StyleTypes {
    backgroundColor: string
}

interface SendRequestBtnDataTypes {
    text: string,
    style: StyleTypes
}

interface MyUpdateRequestDataTypes {
    id: string,
    sender: string,
    sender_name: string,
    sender_last_name: string,
    receiver: string,
    notification_type: string,
    content: string,
    date: string,
    time: string
}

export default function AddMedicalHistory(){

    const [medicalHistoryInputs, setMedicalHistoryInputs] = useState<MedicalHistoryInputsTypes>({
        email: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        medInfo: ""
    })

    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const [csrf_token, setCsrf_token] = useState<string>("")
    const userInfo:UserInfoTypes = useSelector((state:RootState) => state.userInformation)
    const [displayUpdateRequest, setDisplayUpdateRequest] = useState<boolean>(false)
    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
        const {name, value} = event.target
        setMedicalHistoryInputs(prevState => {
            return{
                ...prevState,
                [name]: value
            }
        })
    }
    const [appontementState, setAppontementState] = useState<appontementStateTypes>({
        styles:{
            height: "5px",
            fontSize: "17px",
            marginTop: "5px",
            marginBottom: "35px",
            color: "",
            Visibility: "hidden"
        },
        passwordInputAppointement: "",
        message: ""
    })

    const [sendRequestBtnText, setSendRequestBtnText] = useState<SendRequestBtnDataTypes>({
        text: "Send",
        style: {
            backgroundColor: ""
        }
    })

    useEffect(() => {
        fetch("http://127.0.0.1:8000/get_csrf_token")
            .then(response => response.json())
            .then((data:CsrfTokenDataType) => {
                setCsrf_token(data.csrf_token)
            }
        )},[])


    const addData = async () => {
        await fetch("http://127.0.0.1:8000/add_medical_history_data", {
            method: "POST",
            mode: "same-origin",
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({
                    email: medicalHistoryInputs.email,
                    firstName: medicalHistoryInputs.firstName,
                    lastName: medicalHistoryInputs.lastName,
                    birthDate: medicalHistoryInputs.birthDate,
                    medInfo: medicalHistoryInputs.medInfo
                })
            })
            .then(response =>  {
                if (response.status === 409){
                    setDisplayUpdateRequest(true)
                }
                else {
                    setDisplayUpdateRequest(false)
                }

                setAppontementState(prevState => {
                        return{
                            ...prevState,
                                styles:{
                                    ...prevState.styles,
                                        color: response.ok ? "green": "rgb(255, 17, 17)",
                                        Visibility: "visible"
                                },
                                passwordInputAppointement: response.ok ? "" : appontementState.passwordInputAppointement,
                                message: response.ok ? "Sucessfully saved !":
                                
                                response.status === 400 ? "Please fill all fields":
                                response.status === 404 ? "Patient is not found" : 
                                response.status === 409 ? "The patient already has a medical history, send a request to update it" : "Something went wrong"
                        }
                    })
            
            })

            .catch(error => console.log(error))
    }

    let td = new Date()
    let todatTime = `${td.getHours().toString().length === 1 ? "0" + td.getHours(): td.getHours()}:${td.getMinutes().toString().length === 1 ? "0" + td.getMinutes(): td.getMinutes()}`

    const sendRequestMedHistory = async () => {
        await fetch("http://127.0.0.1:8000/save_notification", {
            method: "POST",
            mode: "same-origin",
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({
                    sender: userInfo.email,
                    senderName: userInfo.firstName,
                    senderLastName : userInfo.lastName, 
                    receiver: medicalHistoryInputs.email,
                    notification_type: "permissionAddMedicalHistory",
                    content: "asks for permission to update your medical history",
                    date: todayDate,
                    time: todatTime
                })
            })
            .then(response =>  {
                if (!response.ok){
                    console.log("Something went wrong")
                }
                else {
                    setSendRequestBtnText(prevState => {
                        return {
                            ...prevState,
                            text: "Sent",
                            style: {
                                ...prevState.style,
                                backgroundColor: "#8ecad7"
                            }
                        }
                    })
                }
            })

            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/my_update_requests")
            .then(response => response.json())
            .then(data => {
                data.map((dt:MyUpdateRequestDataTypes) => {
                    if (dt.sender === userInfo.email && dt.receiver === medicalHistoryInputs.email){
                        setSendRequestBtnText(prevState => {
                            return {
                                ...prevState,
                                text: "Sent",
                                style: {
                                    ...prevState.style,
                                    backgroundColor: "#8ecad7"
                                }
                            }
                        })
                    }
                    else {
                        setSendRequestBtnText(prevState => {
                            return {
                                ...prevState,
                                text: "Send",
                                style: {
                                    ...prevState.style,
                                    backgroundColor: "#35b2ce"
                                }
                            }
                        })
                    }
                })
        })
        .catch(error => console.log(error))

    },[appontementState])

    return(
        <div className={displayNavbar ? "MedHistoryContainerDiv": "MedHistoryContainerDivLeft"}>
            <input type="text" className="MedHistoryContainerDiv__input" placeholder="Email" name="email" onChange={handleValueChange} value={medicalHistoryInputs.email}/>
            <input type="text" className="MedHistoryContainerDiv__input" placeholder="First name" name="firstName" onChange={handleValueChange} value={medicalHistoryInputs.firstName}/>
            <input type="text" className="MedHistoryContainerDiv__input" placeholder="Last name" name="lastName" onChange={handleValueChange} value={medicalHistoryInputs.lastName}/>
            <input type="date" className="MedHistoryContainerDiv__input" placeholder="Birth day" name="birthDate" onChange={handleValueChange} value={medicalHistoryInputs.birthDate}/>
            <textarea id="" className="MedHistoryContainerDiv__textarea" placeholder="Medical Information" minLength={1} maxLength={7000} name="medInfo" onChange={handleValueChange} value={medicalHistoryInputs.medInfo}>
            </textarea>
                <h3 style={appontementState.styles} className="errMessage">{ appontementState.message }</h3>
                {displayUpdateRequest &&  <h3 className="sendUpdateRequestH1">Send request to update the medical history <button onClick={sendRequestBtnText.text === "Send" ? sendRequestMedHistory: undefined} style={sendRequestBtnText.style} className="medHistUpdateRequestBtn">{sendRequestBtnText.text}</button></h3>}
            <button onClick={addData} className={displayNavbar ? "addMedHistoryBtn": "addMedHistoryBtnLeft"}>Add</button>
        </div>
    )
}
