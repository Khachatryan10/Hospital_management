import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import { Route, Routes, Link} from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { addUserInfo, updataAuthentication } from "../features/userInfoSlice";
import ProfileForm from "./ProfileForm";
import { updateLogoutDisplay, toggleNavbarDisplay,clickedToToggle } from "../features/pageStateSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBars, faIdCard, faUser } from "@fortawesome/free-solid-svg-icons";
import FindDoctorsForm from "./FindDoctorsForm";
import DoctorsPage from "./DoctorsPage";
import MyAppointementsForm from "./MyAppointementsForm";
import ManageAppointementsForm from "./ManageAppointementsForm";
import AddMedicalHistory from "./AddMedicalHistory";
import MyMedicalHistory from "./MyMedicalHistory";
import NotificationsForm from "./NotificationsForm";
import CurrentNotificationForm from "./CurrentNotificationForm";
import ChartForm from "./ChartForm";

interface UserInfoTypesMap{
    id: string
    first_name: string,
    last_name: string,
    email: string,
    role: string,
    speciality?: string,
    phone_number: string,
    is_authenticated: boolean,
}

export default function NavBar():JSX.Element  {
    const dispatch = useDispatch()
    const authenticated: boolean = useSelector((state:RootState) => state.userInformation.authenticated)
    const username:string = useSelector((state:RootState) => state.userInformation.firstName) 
    const role:string = useSelector((state:RootState) => state.userInformation.role) 
    
    useEffect(() => {
        async function fetching(){
            await fetch("http://127.0.0.1:8000/user_data")
                .then(response => response.json())
                .then(data => {
                    data.map((elem:UserInfoTypesMap) => {
                
                    if (elem.is_authenticated){
                        dispatch(updataAuthentication(elem.is_authenticated))
                    }
                    
                    if (elem.id && elem.first_name && elem.last_name && elem.email && elem.phone_number && elem.role){
                        dispatch(addUserInfo({
                                id: elem.id,
                                firstName: elem.first_name,
                                lastName: elem.last_name,
                                email: elem.email,
                                role: elem.role,
                                speciality: elem.speciality,
                                phoneNumber: elem.phone_number,
                            })) 
                            
                        }

                    })
                }
            )
                .catch(error => console.log(error))
        }
        
        fetching()
    },[authenticated, dispatch])

    const handleClick = () => {
        dispatch(updateLogoutDisplay(true))
    }

    const handleDisplayNavbar = () => {
        dispatch(clickedToToggle(true))
        dispatch(toggleNavbarDisplay())
    }

    return(
        <>
            <nav className="navbar">
                <ul>
                    {authenticated &&
                    <li>
                            <FontAwesomeIcon icon={faBars} onClick={handleDisplayNavbar}/>
                    </li>
                    }
                    
                    {!authenticated && <li>
                        <Link to="/register">
                            <FontAwesomeIcon icon={faIdCard} />&nbsp;
                            Register
                        </Link>
                    </li>}
                    
                    {!authenticated && <li>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />&nbsp;
                        <Link to="/login">Login</Link>
                    </li>}

                    {authenticated && <Link to="/profile">
                        <FontAwesomeIcon icon={faUser} />&nbsp;
                        { username }
                    </Link>}

                    {authenticated && 
                    <li onClick={handleClick}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />&nbsp;
                        Logout
                    </li>}

                </ul>
            </nav>

            <Routes>
                <Route path='/profile' element={authenticated && <ProfileForm />}></Route>
                <Route path='/register' element={<RegisterForm />}></Route>
                <Route path='/login' element={<LoginForm />}></Route>
                <Route path='/appointements' element={authenticated && role === "Patient" && <FindDoctorsForm />}></Route>
                <Route path='/my-appointements' element={authenticated && <MyAppointementsForm />}></Route>
                <Route path='/manage-appointements' element={authenticated && role === "Doctor" && <ManageAppointementsForm />}></Route>
                <Route path='/doctor/:id' element={authenticated && <DoctorsPage />}></Route>
                <Route path='/add_medical_history' element={authenticated && role === "Doctor" && <AddMedicalHistory />}></Route>
                <Route path='/my_medical_history' element={authenticated && role === "Patient" && <MyMedicalHistory />}></Route>
                <Route path='/notifications' element={authenticated && <NotificationsForm />}></Route>
                <Route path='/notifications/:id' element={authenticated && <CurrentNotificationForm />}></Route>
                <Route path='/chart' element={authenticated && role === "Doctor" && <ChartForm />}></Route>
            </Routes>
        </>
    )
}
