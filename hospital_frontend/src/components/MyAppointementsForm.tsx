import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import UserInfoTypes from "../features/userInfoSlice"
import NothingYetForm from "./NothingYetForm"
import InfiniteScroll from "react-infinite-scroll-component"

export interface MyAppointementDataTypes {
    id: string,
    doctor_name: string,
    doctor_last_name: string,
    patient_name: string,
    patient_last_name: string
    doctor_email: string ,
    doctor_id: string,
    week_day: string,
    date: string,
    time: string 
}

export default function MyAppointementsForm(): JSX.Element {
    const [myAppointements, setMyAppointements] = useState<MyAppointementDataTypes[]>([])
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const userInfo:UserInfoTypes = useSelector((state:RootState) => state.userInformation)
    const [num, setNum] = useState<number>(12)
    const [hasMore, sethasMore] = useState<boolean>(true)
    const months: string[] = ["", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug",	"Sept",	"Oct", "Nov", "Dec"]
    const [appointementsLength, setAppointementsLength] = useState<number>(0)

    useEffect(() => {
        fetch("http://127.0.0.1:8000/all_appointements_count")
            .then(response => response.json())
            .then(appointementCount => setAppointementsLength(appointementCount))
            .catch(err => console.log(err))
    },[])

const fetchAppointementsData = async () => {
        setNum(prevNum => prevNum + 5)
        
        await fetch(`http://127.0.0.1:8000/my_appointements_data/${num}`)
            .then(response => response.json())
            .then((doctorsData:MyAppointementDataTypes[]) => {

            doctorsData.map((data:MyAppointementDataTypes) => {
                if (myAppointements.some(elem => elem.id === data.id)){
                    return
                }
            })        

            if (hasMore) { 
                if (appointementsLength !== 0){
                    if (appointementsLength <= myAppointements.length){
                        sethasMore(false)
                    }
                

                doctorsData.map((data:MyAppointementDataTypes) => {

                if (myAppointements.some(elem => elem.id === data.id)){
                    return
                }

            setMyAppointements((prevState) => [...prevState, data])

            })
            }
        }

        })

        .catch(error => console.log(error))
    }


    useEffect(() => {
        fetchAppointementsData()
    },[appointementsLength])
        
        return (
            <>            
            {myAppointements.length === 0 && <NothingYetForm />}

                <InfiniteScroll 
                        dataLength={num}
                        next={fetchAppointementsData}
                        hasMore={hasMore}
                        loader={<br/>}
                        >

        <div className={displayNavbar ? "myAppointementContainer": "myAppointementContainerLeft"}>
            {myAppointements.length !== 0 &&  
                    myAppointements.map(appointement => {
                    return (            
                        <div className="myAppointementContainer__myAppointementDiv" key={appointement.id}>
                            {userInfo.role === "Patient" && <p>Appointement with {appointement.doctor_name} {appointement.doctor_last_name}</p>} 
                            {userInfo.role === "Doctor" && <p>Appointement with {appointement.patient_name} {appointement.patient_last_name}</p> }
                            <p>{appointement.date.slice(5,7).startsWith("0") ? appointement.date.slice(8,10) + " " + months[parseInt(appointement.date.slice(6,7))] : appointement.date.slice(8,10) + " " + months[parseInt(appointement.date.slice(5,7))]} at {appointement.time.slice(0,5)}</p>
                            <p></p>                            
                        </div>  
                    )
                })            
            }
        </div>
            </InfiniteScroll>
        </>
        )
}