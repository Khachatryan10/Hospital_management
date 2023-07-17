import { useState, useEffect } from "react"
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { updataAuthentication } from "../features/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { CsrfTokenDataType } from "./RegisterForm";

interface loginInputsTypes {
    email: string,
    password: string,
}

interface StyleTypes {
    marginTop: string,
    height: string,
    width: string,
    Visibility: string,
    color: string,
}

interface ErrorMessageStyleTypes {
    styles: StyleTypes,
    message: string
}

export default function LoginForm():JSX.Element {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authenticate = useSelector((state:RootState) => state.userInformation.authenticated)
    const [csrf_token, setCsrf_token] = useState<string>("")

    useEffect(() => {
        fetch("http://127.0.0.1:8000/get_csrf_token")
            .then(response => response.json())
            .then((data:CsrfTokenDataType) => {
                setCsrf_token(data.csrf_token)
            }
        )  
    },[authenticate])

    const [loginInputs, setLoginInputs] = useState<loginInputsTypes>({
        email: "",
        password: ""
    })
    
    const [errorMessage, setMessageStyle] = useState<ErrorMessageStyleTypes>({
        styles: {
            marginTop: "0px",
            height: "30px",
            width: "100%",
            Visibility: "hidden",
            color: "rgb(255, 17, 17)",
        },
        message: ""
    })

    const handleLogin = async () => {
        await fetch("http://127.0.0.1:8000/login/request", {
                    method: "POST",
                    mode: "same-origin",
                    headers: {
                        'X-CSRFToken': csrf_token
                    },
                    body: JSON.stringify({
                        email: loginInputs.email,
                        password: loginInputs.password
                    })
                })
                .then(response => {
                    
                    if (!response.ok){
                        
                        setMessageStyle(prevState => {
                            return {
                                ...prevState,
                                styles: {
                                    ...prevState.styles,
                                    Visibility: "visible"
                                },
                                message: "Email and/or password is incorrect!"
                            }
                        })
                    }

                    else {
                        dispatch(updataAuthentication(true))
                        return navigate("/")
                    }
                })
            .catch(error => console.log(error))
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const {name, value} = event.target

        setLoginInputs(prevState => {
            return{
                ...prevState,
                [name]: value
            }
        })
    }

    return(
    <>
        <h2 className="loginPageTitle">Login</h2>
        <div className="loginDiv">
            <input type="text" className="loginDiv__input" value={loginInputs.email} name="email" placeholder="email" required onChange={handleInputChange} />
            <input type="password" className="loginDiv__input" value={loginInputs.password} name="password" placeholder="password" onChange={handleInputChange} />
            <p style={errorMessage.styles} className="messagePrg">{ errorMessage.message }</p>
            <button className="loginDiv__loginBtn" onClick={handleLogin}>Login</button>
        </div>
    </>
    )
}