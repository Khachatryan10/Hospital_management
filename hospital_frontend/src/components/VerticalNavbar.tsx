import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { Link } from "react-router-dom"
import { faBell, faBriefcaseMedical, faCalendarCheck, faChartSimple, faListCheck, faNotesMedical } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { clickedToToggle, displayVerticalNavbar } from "../features/pageStateSlice"

export default function VerticalNavbar(){
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const clicked:boolean = useSelector((state:RootState) => state.pageState.clickedToDisplayNavbar)
    const role:string = useSelector((state:RootState) => state.userInformation.role)
    const [notificationCount, setNotificationCount] = useState<number>(0)
    const notificationData = useSelector((state:RootState) => state.notificationsData.notifications)
    const dispatch = useDispatch()
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

    const getWindowSize = () => {
        setWindowWidth(window.innerWidth)
        dispatch(clickedToToggle(false))
    }

    useEffect(() => {
        window.addEventListener("resize", getWindowSize)
        return () => {
            window.removeEventListener("resize", getWindowSize)
        }
    },[])

    if (windowWidth < 1276 && !clicked){
        dispatch(displayVerticalNavbar(false))
    }

    else if (windowWidth > 1276 && !clicked){
        dispatch(displayVerticalNavbar(true))
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/get_notification_count")
            .then(response => response.json())
            .then((count:number) => {
                setNotificationCount(count)
            }
        )
    },[notificationData])

    const closeNavbar = () => {
        if(windowWidth < 1276){
            dispatch(displayVerticalNavbar(false))
        }
    }

    useEffect(() => {
        closeNavbar()
    },[windowWidth])

    return(
        <div className={displayNavbar ? "verticalNavbar": "verticalNavbarHide"}>
            <ul>
            
                {role === "Patient" && 
                <>
                    <div className="navbardiv">
                        <Link to="/appointements" onClick={closeNavbar}>
                            <li>
                                &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faBriefcaseMedical} />&nbsp;
                                Find Doctors
                            </li>
                        </Link>
                    </div>
                    <div className="divBottomLine"></div>
                </>
                }
                
                {role === "Doctor" && 
                <>
                    <div className="navbardiv">
                        <Link to="/manage-appointements" onClick={closeNavbar}>
                            <li>
                                &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faListCheck} />&nbsp;
                                Manage Schedule
                            </li>
                        </Link>
                    </div>
                    <div className="divBottomLine"></div>
                </>
                }

                <div className="navbardiv">
                    <Link to="/my-appointements" onClick={closeNavbar}>
                        <li>
                            &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCalendarCheck} />&nbsp;
                            My Appointements
                        </li>
                    </Link>
                </div>

                <div className="divBottomLine"></div>

            {role === "Doctor" && 
                <>
                    <div className="navbardiv">
                        <Link to="add_medical_history" onClick={closeNavbar}>
                            <li >
                                &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faNotesMedical} />&nbsp;
                                Add Medical History
                            </li>
                            </Link>
                        </div>
                    <div className="divBottomLine"></div>
                </>
}
                

            {role === "Patient" && 
                <>
                    <div className="navbardiv">
                        <Link to="my_medical_history" onClick={closeNavbar}>
                            <li >
                                &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faNotesMedical} />&nbsp;
                                My Medical History
                            </li>
                        </Link>
                    </div>
                <div className="divBottomLine"></div>
            </>
            }

    <div className="navbardiv">
                    <Link to="/notifications" onClick={closeNavbar}>
                        <li>
                            &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faBell} />&nbsp;
                            Notifications { notificationCount > 0 ? notificationCount: "" }
                        </li>
                    </Link>
                </div>

    <div className="divBottomLine"></div>
        {role === "Doctor" &&
        <>
            <div className="navbardiv">
                    <Link to="/chart" onClick={closeNavbar}>
                        <li>
                            &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faChartSimple} />&nbsp;
                            Appointement Chart
                        </li>
                    </Link>
            </div>                     
            <div className="divBottomLine"></div>
        </>
        }
            </ul>
        </div>

    
    )
}