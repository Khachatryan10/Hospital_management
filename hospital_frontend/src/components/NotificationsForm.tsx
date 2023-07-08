import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/store"
import { useEffect, useState } from "react"
import getCookie from "../csrf/csrf_token"
import { useNavigate } from "react-router-dom"
import { addNotificationData, removeNotificationData, updateNotificationSeen } from "../features/notificationsSlice"
import { NotificationsDataTypes } from "../features/notificationsSlice"
import NothingYetForm from "./NothingYetForm"

export default function NotificationsForm(): JSX.Element {
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const dispatch = useDispatch()
    const notificationData = useSelector((state:RootState) => state.notificationsData.notifications)
    const [csrf_token, setCsrf_token] = useState<string>("")

    useEffect(() => {
        dispatch(removeNotificationData())
        fetch("http://127.0.0.1:8000/get_my_notifications")
            .then(response => response.json())
            .then((data) => {
                    data.map((notification:NotificationsDataTypes) => {
                        dispatch(addNotificationData(notification))
                })
            }
        )
    },[])


    console.log(notificationData)

    useEffect(() => {
        const getCsrfToken = getCookie('csrftoken');
        setCsrf_token(getCsrfToken ? getCsrfToken: "")
    },[])

    const navigate = useNavigate()

    const seeFullNotification = async (id:string) => {
        if (id) {
        await fetch(`http://127.0.0.1:8000/update_notification_seen/${id}`, {
            method: "PUT",
            mode: "same-origin",
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({
                id: id,
                })
            })
            .then(response =>  {
            
                if (response.ok){

                    dispatch(updateNotificationSeen(id))

                    //setNotificationData(prevState => {
                      //  return prevState.map(data => {
                        //    if (data.id === id){
                 //              return{
                 //                  ...data,
                 //                  seen: true
                 //              }
                 //          }
                 //          else {
                 //              return data
                 //          }
                 //      })
                 //  })

                    return navigate(id)
                }
                else {
                    console.log("Something went wrong")
                }

            })

            .catch(error => console.log(error))

        }
    }

    return(
        <>
        {notificationData.length === 0 ? <NothingYetForm /> :
        <div className={displayNavbar ? "myNotificationsDiv" : "myNotificationsDivLeft"}>
            <ul>
                {notificationData.map(notifData => {
                    return(
                        <div className="myNotificationsDiv__div" onClick={() => seeFullNotification(notifData.id)} key={notifData.id}>
                            {!notifData.seen && <div className="myNotificationsDiv__unreadMarkDiv"></div>}
                            <li className="myNotificationsDiv__li">
                                <h3>Notification from {notifData.sender_name} {notifData.sender_last_name}</h3>
                            </li>
                        </div>
                    )
                })
            }
            </ul>
        </div>
        }
        </>
    )
} 