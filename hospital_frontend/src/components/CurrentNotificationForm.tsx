import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { RootState } from "../app/store"
import { MedicalHistoryDataTypes } from "./MyMedicalHistory"
import UserInfoTypes from "../features/userInfoSlice"
import { todayDate } from "../features/dateAndTimeSlice"
import { CsrfTokenDataType } from "./RegisterForm"

interface NotificationDataTypes {
    id: string,
    sender: string,
    sender_name: string,
    sender_last_name: string,
    receiver: string,
    notification_type: string,
    content: string,
    birth_date: string,
    date: string,
    time: string,
    seen: boolean
}

export default function CurrentNotificationForm(): JSX.Element {
    const { id } = useParams()
    const [notificationInformation, setNotificationInformation] = useState<NotificationDataTypes>({
        id: "",
        sender: "",
        sender_name: "",
        sender_last_name: "",
        receiver: "",
        notification_type: "",
        content: "",
        birth_date: "",
        date: "",
        time: "",
        seen: false
    })

    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const [csrf_token, setCsrf_token] = useState<string>("")

    useEffect(() => {
        fetch("http://127.0.0.1:8000/get_csrf_token")
            .then(response => response.json())
            .then((data:CsrfTokenDataType) => {
                setCsrf_token(data.csrf_token)
            }
        )  
    },[])

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/get_current_notification/${id}`)
            .then(response => response.json())
            .then((notifData) => notifData.map((data: NotificationDataTypes) => {
                setNotificationInformation(data)
        }))
    },[id])

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

    let td = new Date()
    let todatTime = `${td.getHours().toString().length === 1 ? "0" + td.getHours(): td.getHours()}:${td.getMinutes().toString().length === 1 ? "0" + td.getMinutes(): td.getMinutes()}`
    const userInfo:UserInfoTypes = useSelector((state:RootState) => state.userInformation)
    const navigate = useNavigate()

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

    const saveNotification = async () => {
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
                    receiver: notificationInformation.sender,
                    notification_type: "allowedToModifyMedHistory",
                    content: medicalHistoryData[0].medical_information,
                    date: todayDate,
                    time: todatTime,
                    notificationId: id
                })
            })
            .then(response =>  {
                if (!response.ok){
                    console.log("Something went wrong")
                }
            
                else {
                    return navigate("/notifications")
                }
            })

            .catch(error => console.log(error))
    }

    const refuseUpdate = async () => {
        await fetch(`http://127.0.0.1:8000/refuse_med_history_update/${id}`, {
            method: "POST",
            mode: "same-origin",
            headers: {
                'X-CSRFToken': csrf_token
            },
            })
            .then(response =>  {
                if (!response.ok){
                    console.log("Something went wrong")
                }
                else {
                    return navigate("/notifications")
                }
            })

            .catch(error => console.log(error))
    }
        
    const handleTextChange = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {        
    setNotificationInformation (prevState => {
            const {name, value} = e.target
            return{
                ...prevState,
                [name]: value
            }
        })
    }

    const saveUpdate = async () => {
        await fetch(`http://127.0.0.1:8000/update_med_history/${notificationInformation.sender}`, {
            method: "PUT",
            mode: "same-origin",
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({
                updatedContent: notificationInformation.content,
                birthDate: notificationInformation?.birth_date,
                notificationId: id
                })
            })
            .then(response =>  {
            
                if (response.ok){
                    return navigate("/notifications")
                }
                else {
                    console.log("Something went wrong")
                }

            })

            .catch(error => console.log(error))
    }
    

    return(
        <div className={displayNavbar ? "currentNotificationDiv": "currentNotificationDivLeft"}>
            <div>
                <h1 className="currentNotificationDiv__senderH1">{notificationInformation.sender_name} {notificationInformation.sender_last_name} ({notificationInformation.sender}) </h1>
                {notificationInformation.notification_type !== "allowedToModifyMedHistory" && <h1 className="currentNotificationDiv__notifContentH1">{notificationInformation.content}</h1>}
                {notificationInformation.notification_type === "allowedToModifyMedHistory" && 
                <div>
                    <h4>You can update {notificationInformation.sender_name} {notificationInformation.sender_last_name}'s medical history</h4>
                    <input type="date" className="currentNotificationDiv__inputDate" name="birth_date" onChange={handleTextChange} value={notificationInformation.birth_date}/>
                    <br />
                    <textarea className="currentNotificationDiv__textarea" name="content" value={notificationInformation.content} onChange={handleTextChange}  />
                    <br />
                    <br />
                    <button onClick={saveUpdate} className="currentNotificationDiv__saveUpdateBtn">Save</button>
                </div>
                }
            
                {notificationInformation.notification_type === "permissionAddMedicalHistory" &&
                <div className="currentNotificationDiv__allowRejectBtnsDiv">
                    <button onClick={saveNotification} className="currentNotificationDiv__allowBtn">Allow</button>
                    <button onClick={refuseUpdate} className="currentNotificationDiv__refuseBtn">Refuse</button>
                </div>
                }
            
                <h5 className="currentNotificationDiv__dateTime">Sent {notificationInformation.date} at {notificationInformation.time}</h5>
            </div>
        </div>
    )
}