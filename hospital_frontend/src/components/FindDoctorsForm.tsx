import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addDoctorsData, emptyDoctorsData } from "../features/doctorsInfoSlice"
import DataTypes from "../features/doctorsInfoSlice"
import { RootState } from "../app/store"
import { Link} from "react-router-dom"
import { updateDoctorsPage } from "../features/updatedDoctorsPageSlice"
import InfiniteScroll from "react-infinite-scroll-component"

export default function FindDoctorsForm(){
    const dispatch = useDispatch()
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const doctorsInfo = useSelector((state:RootState) => state.doctorsInfo)
    const [inputValue, setInputValue] = useState<string>("")
    const [num, setNum] = useState<number>(9)
    const [hasMore, sethasMore] = useState<boolean>(true)
    const [allDoctorsNumber, setAllDoctorsNumber] = useState<number>(0)

    const handleClick = () => {
        dispatch(updateDoctorsPage())
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/all_doctors_number")
            .then(response => response.json())
            .then(appointementCount => setAllDoctorsNumber(appointementCount))
            .catch(err => console.log(err))
    },[])

    const fetchDoctorsData = async() => {
        setNum(prevNum => prevNum + 5)
        await fetch(`http://127.0.0.1:8000/doctors/${num}`)
            .then(response => response.json())
            .then(doctorsData => {
            
                if (hasMore){

                    if (allDoctorsNumber !== 0){
                        if (allDoctorsNumber > doctorsInfo.doctors.length){
                            sethasMore(true)
                        }
                    }

                    doctorsData.map((data:DataTypes) => {                   
                        
                        if (doctorsInfo.doctors.some(doctor => doctor.id === data.id)){
                            return
                        }
                            dispatch(addDoctorsData(data))
                    })
    }})
        .catch(error => console.log(error))
    }
    
    const fetchSearchedData = async () => {
            await fetch(`http://127.0.0.1:8000/search_doctors/${inputValue}/${num}`)
                .then(response => response.json())
                .then((doctorsData) => {
                    doctorsData.map((data:DataTypes) => {
                    dispatch(addDoctorsData(data))
                })
                
            })
    }


    useEffect(() => {
        if (inputValue === ""){            
          //  dispatch(emptyDoctorsData())
            fetchDoctorsData()
        }
        else {
            dispatch(emptyDoctorsData())
            fetchSearchedData()
        }

        if (num > allDoctorsNumber){
            setNum(9)
        }
    },[inputValue])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
   //useEffect(() => {
   //    if (inputValue !== ""){        
   //        dispatch(emptyDoctorsData())
   //        fetchSearchedData()
   //    }
   //},[inputValue])
 //},[dispatch, inputValue])

    return(
        <>            
        <input type="text" name="searchDoctors" placeholder="Search" value={inputValue} onChange={handleChange} className={displayNavbar ? "doctorsSearchInput": "doctorsSearchInputLeft"} />
        <InfiniteScroll
                dataLength={num}
                next={inputValue === "" ? fetchDoctorsData: fetchSearchedData}
                hasMore={hasMore}
                loader={<br/>}>

        <div className={displayNavbar ? "doctorInfoContainer": "doctorInfoContainerToLeft"}>
            {doctorsInfo.doctors.map((doctor => {
                return (
                    <Link to={`/doctor/${doctor.id}`} className="doctorInfoContainer__div" onClick={handleClick}>
                    <div key={doctor.id}>
                        <p>{doctor.first_name} {doctor.last_name}</p>
                        <p>{doctor.email}</p>
                        <p>{doctor.phone_number}</p>
                        <p>{doctor.speciality}</p>
                    </div>
                    </Link>
                )
            }
            ))}
        </div>
        </InfiniteScroll>
        </>
    )
}