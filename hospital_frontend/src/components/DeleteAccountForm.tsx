import { deleteDivDisplay } from "../features/pageStateSlice"
import { useDispatch, useSelector } from "react-redux"
import getCookie from "../csrf/csrf_token"
import { useEffect, useState } from "react"
import { RootState } from "../app/store"
import { useNavigate } from "react-router-dom"
import { updataAuthentication } from "../features/userInfoSlice"


interface ErrorMessageStyleTypes {
    height: string,
    fontSize: string,
    marginTop: string,
    color: string,
    Visibility: string
}

interface ErrorMessage {
    styles: ErrorMessageStyleTypes,
    message: string
}

export default function DeleteAccountForm(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCancel = () => {
        dispatch(deleteDivDisplay(false))
    }

    const authenticate = useSelector((state:RootState) => state.userInformation.authenticated)
    const [csrf_token, setCsrf_token] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState("")
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
        styles:{
            height: "5px",
            fontSize: "14px",
            marginTop: "5px",
            color: "rgb(255, 17, 17)",
            Visibility: "hidden"
        },
        message: ""
    })

    useEffect(() => {
        const getCsrfToken = getCookie('csrftoken');
        setCsrf_token(getCsrfToken ? getCsrfToken: "")
    },[authenticate])

    const deleteAccount = async () => {
        await fetch("http://127.0.0.1:8000/delete_account/request", {
                    method: "DELETE",
                    mode: "same-origin",
                    headers: {
                        'X-CSRFToken': csrf_token
                    },
                    body: JSON.stringify({
                        deleteAccountPassword: passwordInput
                    })
                })

            .then(response => {
                if (!response.ok){
                    setErrorMessage(prevState => {
                        return{
                            ...prevState,
                            styles:{
                                ...prevState.styles,
                                fontSize: "14px",
                                Visibility: "visible"
                            },
                            message: "Wrong password"
                        }
                    })
                }
                else {
                    dispatch(deleteDivDisplay(false))
                    dispatch(updataAuthentication(false))
                    return navigate("/login")
                }
            })

    if (!passwordInput){
        setErrorMessage(prevState => {
            return{
                ...prevState,
                    styles:{
                        ...prevState.styles,
                        fontSize: "14px",
                        Visibility: "visible"
                    },
                message: "Please fill the input"
                }
        })
    }
}

    return(
        <div className="coverAllDeleteAccount">
        <div className="deleteAccountFormContainer">
            <h2>Please provide your password</h2>
            <input type="password" className="deleteAccountFormContainer__passwordInput" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="password" name="deleteAccountPassword" />
            <br />
            <h3 style={errorMessage.styles}>{ errorMessage.message }</h3>
            <button className="deleteAccountFormContainer__deleteBtn" onClick={deleteAccount}>Delete</button>
            <button className="deleteAccountFormContainer__cancelBtn" onClick={handleCancel}>Cancel</button>
        </div>
        </div>
    )
}