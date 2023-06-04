import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { Link } from "react-router-dom"
import { faBriefcaseMedical, faCalendarCheck, faListCheck, faNotesMedical } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function VerticalNavbar(){
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const role:string = useSelector((state:RootState) => state.userInformation.role)

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

                <div className="navbardiv">
                    <Link to="add_medical_history">
                        <li >
                            &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faNotesMedical} />&nbsp;
                            Medical History
                        </li>
                    </Link>
                </div>

                <div className="divBottomLine"></div>

            </ul>
        </div>
    )
}