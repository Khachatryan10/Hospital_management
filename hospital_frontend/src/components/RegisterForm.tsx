import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface LoginInputTypes {
    name: string,
    lastName : string,
    email: string,
    role: string,
    speciality?: string,
    registCodeDoctor? : string,
    phoneNumber: string,
    password: string,
    confirmation: string
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

interface RegisterStyleTypes {
    color: string,
    textalign: string,
    height: string,
    marginLeft: string,
    marginRight: string,
    Visibility: string,
}

interface RegisterMessageTypes {
    styles: RegisterStyleTypes,
    message: string,
}

export interface CsrfTokenDataType {
    csrf_token: string
}

export default function RegisterForm():JSX.Element {
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


    const [registerInputs, setRegisterInputs] = useState<LoginInputTypes>({
        "name": "",
        "lastName": "",
        "email": "",
        "role": "Patient",
        "speciality": "",
        "registCodeDoctor": "",
        "phoneNumber": "",
        "password": "",
        "confirmation": "",
})

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

const passwordLength = registerInputs.password.length
const containsNumber = /\d/.test(registerInputs.password)
const containsCapitalLetter = /[A-Z]/.test(registerInputs.password)
const containsSmallLetter = /[a-z]/.test(registerInputs.password)
const containsSpecificCharacter = /[/,?(){}_[\]#\-*+<>|;:!'".\\$~@`]/.test(registerInputs.password)
const matchesAll = passwordLength && containsNumber && containsCapitalLetter && containsSmallLetter && containsSpecificCharacter;
const {name, lastName, email, phoneNumber, password, confirmation, role} = registerInputs
const numberFormatRegex = /[0][0-9]{1}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}$/.test(phoneNumber)
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)


const [registerMessage, setRegisterMessage] = useState<RegisterMessageTypes>({
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>):void => {
    const {name, value} = event.target
        setRegisterInputs(previousState => {
            return {
                ...previousState,
                [name]: value
            }
        })
    }

    useEffect(() => {
            if (phoneNumber && !numberFormatRegex){
                setRegisterMessage(prevState => {
                    return{
                        ...prevState,
                        styles:{
                            ...prevState.styles,
                            Visibility: "visible",
                        },
                        message: "Phone number must fit the following format 0x-xx-xx-xx-xx"
                    }
                })
            }
        
            else if (password && confirmation && password !== confirmation){
                setRegisterMessage(prevState => {
                    return{
                        ...prevState,
                        styles:{
                            ...prevState.styles,
                            Visibility: "visible",
                        },
                        message: "Password and Confirmation don't match"
                    }
                })
            }

            else if (email && !emailRegex){
                setRegisterMessage(prevState => {
                    return{
                        ...prevState,
                        styles:{
                            ...prevState.styles,
                            Visibility: "visible",
                        },
                        message: "Invalid Email"
                    }
                })
            }

            else {
                setRegisterMessage(prevState => {
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
        
    },[confirmation, email, emailRegex, lastName, name, numberFormatRegex, password, phoneNumber])

    const navigate = useNavigate()

    const registerUser = async(): Promise<void> => {

            if (!name || !lastName || !email || !phoneNumber || !password || !confirmation){
                setRegisterMessage(prevState => {
                    return{
                        ...prevState,
                        styles:{
                            ...prevState.styles,
                            Visibility: "visible",
                        },
                        message: "Please fill all fields"
                    }
                })
            }
        
        if (name && lastName && email && role && phoneNumber && password && confirmation && matchesAll && numberFormatRegex && password === confirmation && emailRegex){
            await fetch("http://127.0.0.1:8000/registerUser/post", {
                    method: "POST",
                    mode: "same-origin",
                    headers: {
                        'X-CSRFToken': csrf_token
                    },
                    body: JSON.stringify({
                        name: registerInputs.name,
                        lastName: registerInputs.lastName,
                        email: registerInputs.email,
                        role: registerInputs.role,
                        speciality: registerInputs.speciality,
                        registCodeDoctor: registerInputs.registCodeDoctor,
                        phoneNumber: registerInputs.phoneNumber,
                        password: registerInputs.password,
                        confirmation: registerInputs.confirmation
                    })
                })

                .then(response => {
                    if (response.status === 409){
                        setRegisterMessage(prevState => {
                    return{
                        ...prevState,
                        styles: {
                            ...prevState.styles,
                            Visibility: "visible",
                        },
                        message: "Email is already in use"
                    }
                })
            }

                if (response.status === 400){
                            setRegisterMessage(prevState => {
                    return{
                        ...prevState,
                        styles:{
                            ...prevState.styles,
                            Visibility: "visible",
                        },
                            message: "Please fill the inputs with appropriate format"
                        }
                    })
                }

                if (response.status === 401){
                            setRegisterMessage(prevState => {
                    return{
                        ...prevState,
                        styles:{
                            ...prevState.styles,
                            Visibility: "visible",
                        },
                            message: "Please provide a valid code"
                        }
                    })
                }

                if (response.status === 422){
                            setRegisterMessage(prevState => {
                    return{
                        ...prevState,
                        styles:{
                            ...prevState.styles,
                            Visibility: "visible",
                        },
                            message: "Please select speciality field"
                        }
                    })
                }

                if (response.status === 200){
                    return navigate("/login")
                }
            })
            .catch(error => console.log(error))
        }
    }

    
    return(
    <>
        <h2 className="pageTitle">Register</h2>
        <div className="registerDiv">
                <input type="text" className="registerDiv__input" value={registerInputs.name} onChange={handleInputChange} name="name" placeholder="name" maxLength={64}/>
                <input type="text" className="registerDiv__input" value={registerInputs.lastName} onChange={handleInputChange} name="lastName" placeholder="lastname" maxLength={64} />
                <input type="text" className="registerDiv__input" value={registerInputs.email} onChange={handleInputChange} name="email" placeholder="email" />
                <select className="registerDiv__select" value={registerInputs.role} onChange={handleInputChange} name="role">
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                </select>
                {registerInputs.role === "Doctor" && <input type="text" className="registerDiv__input" value={registerInputs.registCodeDoctor} onChange={handleInputChange} name="registCodeDoctor" placeholder="registration code (Doctor)" />}
                {registerInputs.role === "Doctor" && <select name="speciality" className="registerDiv__select" value={registerInputs.speciality} onChange={handleInputChange}>
                    <option disabled selected value={""}>Speciality</option>
                    <option value="Endocrinologist">Endocrinologist</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Radiologist">Radiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Oncologist">Oncologist</option>
                    <option value="Urologist">Urologist</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Hematologist">Hematologist</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                </select>}

                <input type="tel" className="registerDiv__input" value={registerInputs.phoneNumber} onChange={handleInputChange} name="phoneNumber"  placeholder="phone number 0X-XX-XX-XX-XX" />
                <input type="password" className="registerDiv__input" value={registerInputs.password} onChange={handleInputChange} name="password" placeholder="password" />
                <p style={prgStyle}>Password must contain at least 8 characters and must include number, capital and small letter and special character</p>
                <div style={passwordChecker}></div>
                <input type="password" className="registerDiv__input" value={registerInputs.confirmation} onChange={handleInputChange} name="confirmation" placeholder="confirmation" />
                <p style={registerMessage.styles} className="messagePrg">{registerMessage.message}</p>
                <button className="registerDiv__registerBtn" onClick={registerUser}>Register</button>
        </div>
    </>
    )
}