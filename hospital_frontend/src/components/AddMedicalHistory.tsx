import { useEffect, useState } from "react"
import getCookie from "../csrf/csrf_token"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { appontementStateTypes } from "./DoctorsPage"

interface medicalHistoryInputsTypes {
    email: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    medInfo: string
}

export default function AddMedicalHistory(){

    const [medicalHistoryInputs, setMedicalHistoryInputs] = useState<medicalHistoryInputsTypes>({
        email: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        medInfo: ""
    })

    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const [csrf_token, setCsrf_token] = useState<string>("")

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

    useEffect(() => {
        const getCsrfToken = getCookie('csrftoken');
        setCsrf_token(getCsrfToken ? getCsrfToken: "")
    },[])


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
                                "Something went wrong"
                        }
                    })
            
            })

            .catch(error => console.log(error))
    }

    return(
        <div className={displayNavbar ? "MedHistoryContainerDiv": "MedHistoryContainerDivLeft"}>
            <input type="text" className="MedHistoryContainerDiv__input" placeholder="Email" name="email" onChange={handleValueChange} value={medicalHistoryInputs.email}/>
            <input type="text" className="MedHistoryContainerDiv__input" placeholder="First name" name="firstName" onChange={handleValueChange} value={medicalHistoryInputs.firstName}/>
            <input type="text" className="MedHistoryContainerDiv__input" placeholder="Last name" name="lastName" onChange={handleValueChange} value={medicalHistoryInputs.lastName}/>
            <input type="date" className="MedHistoryContainerDiv__input" placeholder="Birth day" name="birthDate" onChange={handleValueChange} value={medicalHistoryInputs.birthDate}/>
            <textarea id="" className="MedHistoryContainerDiv__textarea" placeholder="Medical Information" minLength={1} maxLength={7000} name="medInfo" onChange={handleValueChange} value={medicalHistoryInputs.medInfo}>
            </textarea>

            {/* <div className={displayNavbar ? "errMessageDiv": "errMessageDivLeft"}> */}
                <h3 style={appontementState.styles} className="errMessage">{ appontementState.message }</h3>
            {/* </div> */}

            <button onClick={addData} className={displayNavbar ? "addMedHistoryBtn": "addMedHistoryBtnLeft"}>Add</button>
        </div>
    )
}
