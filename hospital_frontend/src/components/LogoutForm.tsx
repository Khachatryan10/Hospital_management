import { useDispatch, useSelector } from "react-redux"
import { addUserInfo } from "../features/userInfoSlice"
import { updataAuthentication } from "../features/userInfoSlice"
import { useNavigate } from "react-router-dom"
import { updateLogoutDisplay } from "../features/pageStateSlice"
import { RootState } from "../app/store"

export default function LogoutForm(): JSX.Element{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)

    const handleLogout = async() => {
        await fetch("http://127.0.0.1:8000/logoutUser")
        dispatch(updataAuthentication(false))
        dispatch(addUserInfo({
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                role: "",
                speciality: "",
                phoneNumber: "",
        }))

        dispatch(updateLogoutDisplay(false))
        return navigate("login")
    }

    const cancelLogout = () => {
            dispatch(updateLogoutDisplay(false))
    }


    return(
        <div className="coverAllLogoutForm">
            <div className={displayNavbar ? "logoutFormContainerLeft": "logoutFormContainer"}>
                <h2>Are you sure you want to log out ?</h2>
                <button className="logoutFormContainer__btnLogout" onClick={handleLogout}>Yes</button>
                <button className="logoutFormContainer__btnCancelLogout" onClick={cancelLogout}>Cancel</button>
            </div>
        </div>
    )
}