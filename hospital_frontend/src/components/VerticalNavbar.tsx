import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { Link } from "react-router-dom"
import { faBell, faBriefcaseMedical, faCalendarCheck, faChartSimple, faListCheck, faNotesMedical } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

export default function VerticalNavbar(){
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const role:string = useSelector((state:RootState) => state.userInformation.role)
    const [notificationCount, setNotificationCount] = useState<number>(0)
    const notificationData = useSelector((state:RootState) => state.notificationsData.notifications)

    useEffect(() => {
        fetch("http://127.0.0.1:8000/get_notification_count")
            .then(response => response.json())
            .then((count:number) => {
                setNotificationCount(count)
            }
        )
    },[notificationData])

    return(
        <div className={displayNavbar ? "verticalNavbar": "verticalNavbarHide"}>
            <ul>
            
                {role === "Patient" && 
                <>
                    <div className="navbardiv">
                        <Link to="/appointements">
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
                        <Link to="/manage-appointements">
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
                    <Link to="/my-appointements">
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
                        <Link to="add_medical_history">
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
                        <Link to="my_medical_history">
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
                    <Link to="/notifications">
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
                    <Link to="/chart">
                        <li>
                            &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faChartSimple} />&nbsp;
                            Chart
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