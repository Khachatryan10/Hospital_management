import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import UserInfoTypes from "../features/userInfoSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { deleteDivDisplay } from "../features/pageStateSlice"
import { CsrfTokenDataType } from "./RegisterForm"

interface PasswordTypes {
    oldPassword: string
    newPassword: string,
    newPasswordConfirmation: string
}

interface PasswordStylesTypes{
    width: string,
    height: string,
    marginTop: string,
    marginBottom: string,
    backgroundColor: string,
    maxWidth: string,
    display: string,
    transition: string,
    borderRadius: string,
}

interface PrgStyleTypes {
    marginTop: string,
    width: string,
    transition: string,
    display: string,
    color: string
}

interface PasswordChangeStyleTypes {
    color: string,
    textalign: string,
    height: string,
    marginLeft: string,
    marginRight: string,
    Visibility: string,
}

interface PasswordChangeTypes {
    styles: PasswordChangeStyleTypes,
    message: string,
}

export default function ProfileForm(): JSX.Element {
    const userInfo:UserInfoTypes = useSelector((state:RootState) => state.userInformation)
    const authenticate = useSelector((state:RootState) => state.userInformation.authenticated)
    const [csrf_token, setCsrf_token] = useState<string>("")
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)

    const dispatch = useDispatch()

const [passwordChecker, setPasswordChecker] = useState<PasswordStylesTypes>({
    width: "100%",
    height: "",
    marginTop: "1px",
    marginBottom: "15px",
    backgroundColor: "red",
    maxWidth: "100%",
    display: "none",
    transition: "1s",
    borderRadius: "5px",
})

const [prgStyle, setPrgStyle] = useState<PrgStyleTypes>({
    marginTop: "0",
    width: "100%",
    transition: "1s",
    display: "none",
    color: ""
})

const [passwordChange, setpasswordChange] = useState<PasswordTypes>({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: ""
})

const [passwordChangeStyleAndMessage, setpasswordChangeStyleAndMessage] = useState<PasswordChangeTypes>({
    styles:{
        color: "rgb(255, 17, 17)",
        textalign: "center",
        height: "30px",
        marginLeft: "auto",
        marginRight: "auto",
        Visibility: "hidden",
    },

    message: "",
})

    const passwordLength = passwordChange.newPassword.length
    const containsNumber = /\d/.test(passwordChange.newPassword)
    const containsCapitalLetter = /[A-Z]/.test(passwordChange.newPassword)
    const containsSmallLetter = /[a-z]/.test(passwordChange.newPassword)
    const containsSpecificCharacter = /[/,?(){}_[\]#\-*+<>|;:!'".\\$~@`]/.test(passwordChange.newPassword)
    const matchesAll = passwordLength && containsNumber && containsCapitalLetter && containsSmallLetter && containsSpecificCharacter;

    useEffect(() => {
        setPasswordChecker(prevState => {
        return{
            ...prevState,
            height: "4px",
            display: passwordLength ? "block": "none" ,
            borderRadius: "3px",
            width: matchesAll && passwordLength >= 8 ? "100%": passwordLength <= 7 && passwordLength >= 4 && !matchesAll ? "60%": !matchesAll && passwordLength >= 8 ? "60%": passwordLength <= 7 && passwordLength >= 4 && matchesAll ? "60%": "15%",
            backgroundColor: passwordLength <= 7 && !matchesAll ? "rgb(255, 17, 17)" : passwordLength >= 8 && passwordLength < 10 && !matchesAll ? "orange": passwordLength >= 8 && matchesAll ? "rgb(0, 194, 146)": "orange",
        }
    })

    setPrgStyle(prevState => {
        return{
            ...prevState,
            display: passwordLength ? "block": "none",
            color:  passwordLength <= 7 && !matchesAll ? "rgb(255, 17, 17)" : passwordLength >= 8 && passwordLength < 10 && !matchesAll ? "orange": passwordLength >= 8 && matchesAll ? "rgb(0, 194, 146)": "orange"
        }
    })
    },[passwordLength, matchesAll])
    const {oldPassword, newPassword, newPasswordConfirmation} = passwordChange

    useEffect(() => {
        if (newPassword && newPasswordConfirmation && newPassword !== newPasswordConfirmation){
                setpasswordChangeStyleAndMessage(prevState => {
                    return{
                        ...prevState,
                        styles:{
                            ...prevState.styles,
                            color: "rgb(255, 17, 17)",
                            Visibility: "visible",
                        },
                        message: "Password and Confirmation don't match"
                    }
                })
        }
            else {
                setpasswordChangeStyleAndMessage(prevState => {
                    return{
                        ...prevState,
                        styles: {
                            ...prevState.styles,
                            Visibility: "hidden",
                        },
                        message: ""
                    }
                })
            }
    },[newPassword, newPasswordConfirmation])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/get_csrf_token")
            .then(response => response.json())
            .then((data:CsrfTokenDataType) => {
                setCsrf_token(data.csrf_token)
            }
        )    
    },[authenticate])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const {name, value} = event.target

        setpasswordChange(previousState => {
            return {
                ...previousState,
                [name]: value
            }
        })
    }

    const saveChange = async () => {
        await fetch("http://127.0.0.1:8000/change_password/request", {
                method: "POST",
                mode: "same-origin",
                headers: {
                    'X-CSRFToken': csrf_token
                },
                body: JSON.stringify({
                    oldPassword: passwordChange.oldPassword,
                    newPassword: passwordChange.newPassword,
                    newPasswordConfirmation: passwordChange.newPasswordConfirmation
                    })
                })
                .then(response =>  {

                    if (response.ok){
                        // ?
                        setpasswordChangeStyleAndMessage(prevState => {
                                return{
                                    ...prevState,
                                        styles:{
                                        ...prevState.styles,
                                        color: "green",
                                        Visibility: "visible",
                                    },
                                message: "Password is changed successfully"
                            }
                        })
                    }

                    if(response.status === 401){
                        setpasswordChangeStyleAndMessage(prevState => {
                                return{
                                    ...prevState,
                                        styles:{
                                        ...prevState.styles,
                                        color: "rgb(255, 17, 17)",
                                        Visibility: "visible",
                                    },
                                message: "Wrong password"
                            }
                        })
                    }

                    if(response.status === 409){
                        setpasswordChangeStyleAndMessage(prevState => {
                                return{
                                    ...prevState,
                                        styles:{
                                        ...prevState.styles,
                                        color: "rgb(255, 17, 17)",
                                        Visibility: "visible",
                                    },
                                message: "New password can't be the same as the old one"
                            }
                        })
                    }

                    if(response.status === 422){
                        setpasswordChangeStyleAndMessage(prevState => {
                                return{
                                    ...prevState,
                                        styles:{
                                        ...prevState.styles,
                                        color: "rgb(255, 17, 17)",
                                        Visibility: "visible",
                                    },
                                message: "Password and confirmation mismatch"
                            }
                        })
                    }

                    if(response.status === 400){
                        setpasswordChangeStyleAndMessage(prevState => {
                                return{
                                    ...prevState,
                                        styles:{
                                        ...prevState.styles,
                                        color: "rgb(255, 17, 17)",
                                        Visibility: "visible",
                                    },
                                message: "Please fill password with appropriate format"
                            }
                        })
                    }
                })

                if (!oldPassword || !newPassword || !newPasswordConfirmation){
                    setpasswordChangeStyleAndMessage(prevState => {
                                return{
                                    ...prevState,
                                        styles:{
                                        ...prevState.styles,
                                        color: "rgb(255, 17, 17)",
                                        Visibility: "visible",
                                    },
                                message: "Please fill the input fields"
                            }
                        })
                }
    }

    const handleClickDeleteDisplay = () => {
        dispatch(deleteDivDisplay(true))
    }

    return(
        <>
            <div className={displayNavbar ? "userInfoDiv": "userInfoDivLeft"}>
                    <h2>Name: {userInfo.firstName}</h2>
                    <h2>Lastname: {userInfo.lastName}</h2>
                    <h2>Email: {userInfo.email}</h2>
                    <h2>Registered as {userInfo.role}</h2>
                    <h2>{userInfo.speciality}</h2>
                    <h2>Phone Number: {userInfo.phoneNumber}</h2>
            </div>
        <div className={displayNavbar ? "profileDiv": "profileDivLeft"}>
                <>
                <br />
                <br />
                    <h2 className="profileDiv__h2">Change Password</h2>
                    <input type="password" className="profileDiv__input" value={passwordChange.oldPassword} onChange={handleInputChange} name="oldPassword" placeholder="old password" />
                    <input type="password" className="profileDiv__input" value={passwordChange.newPassword} onChange={handleInputChange} name="newPassword" placeholder="new password" />
                    <p style={prgStyle}>Password must contain at least 8 characters and must include number, capital and small letter and special character</p>
                    <div style={passwordChecker}></div>
                    <input type="password" className="profileDiv__input" value={passwordChange.newPasswordConfirmation} onChange={handleInputChange} name="newPasswordConfirmation" placeholder="new password confirmation" />
                    <p style={passwordChangeStyleAndMessage.styles} className="messagePrg">{passwordChangeStyleAndMessage.message}</p>
                    <button className="profileDiv__changePasswordBtn" onClick={saveChange}>Save</button>
                </>
            <br />

            <div className="profileDiv__deleteAccountDiv">
                <p className="profileDiv__deleteWorningPrg">If you delete your account all appointments, medical history etc will be removed permanently</p>
                <button className="profileDiv__deleteAccountBtn" onClick={handleClickDeleteDisplay}>Delete Account</button>
            </div>
        </div>
    </>
    )
}