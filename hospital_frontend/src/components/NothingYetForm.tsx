import { useSelector } from "react-redux"
import { RootState } from "../app/store"

export default function NothingYetForm(): JSX.Element {
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    return (
        <div className={displayNavbar ? "myNotificationsDiv" : "myNotificationsDivLeft"}>
            <div className="nothingYetDiv">
                <h1 className="nothingYetDiv__h1">Nothing Yet</h1>
            </div>
        </div>
    )
} 