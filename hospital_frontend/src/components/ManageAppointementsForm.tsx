import { useDispatch, useSelector } from "react-redux";
import ScheduleForm from "./ScheduleForm"
import { RootState } from "../app/store";
import { useEffect, useRef, useState } from "react";
import getCookie from "../csrf/csrf_token"
import { updateDoctorsSchedule } from "../features/updateDoctorsSchedule";
import { removeDate } from "../features/updateAppointementsSlice";
import { appontementStateTypes } from "./DoctorsPage";

export default function ManageAppointementsForm():JSX.Element{
    const displayNavbar:boolean = useSelector((state:RootState) => state.pageState.displayNavbar)
    const refContainer = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch()
    const updateSchedule = useSelector((state:RootState) => state.updateAppointements.scheduleData)
    const [csrf_token, setCsrf_token] = useState<string>("")
    const [dayChoicesDr, setDayChoicesDr] = useState<string>("")

    const handleClickToScrollPrevious = () => {
        refContainer.current?.scrollBy({left: - refContainer.current?.clientWidth, behavior: "auto"})
    }

    const handleClickToScrollNext = () => {
        refContainer.current?.scrollBy({left: refContainer.current?.clientWidth , behavior: "auto"})
    }

    const [appontementState, setAppontementState] = useState<appontementStateTypes>({
        styles:{
            height: "5px",
            fontSize: "17px",
            marginTop: "5px",
            marginBottom: "5px",
            color: "",
            Visibility: "hidden"
        },
        passwordInputAppointement: "",
        message: ""
    })

    const handleChoiceChange = (event: React.ChangeEvent<HTMLSelectElement>):void => {
        setDayChoicesDr(event.target.value)
    }

    useEffect(() => {
        const getCsrfToken = getCookie('csrftoken');
        setCsrf_token(getCsrfToken ? getCsrfToken: "")
    },[]) // add dependancy

    const clickUpdateSchedule = async () => {
        await fetch("http://127.0.0.1:8000/update_appointement", {
            method: "POST",
            mode: "same-origin",
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({
                scheduleToUpdate: updateSchedule,
                choice: dayChoicesDr,
                password: appontementState.passwordInputAppointement
            })
        })

                .then(response => {
                    if (!response.ok){
                        console.log("Falied to post a request")
                    }

                    else {
                        dispatch(updateDoctorsSchedule())
                        updateSchedule.map(schedule => dispatch(removeDate(schedule.id)))
                        setAppontementState(prevState => {
                            return{
                                ...prevState,
                                    styles:{
                                        ...prevState.styles,
                                    },
                                    passwordInputAppointement: ""
                            }
                        })
                    }

                    setAppontementState(prevState => {
                        return{
                            ...prevState,
                                styles:{
                                    ...prevState.styles,
                                        color: response.ok ? "green": "rgb(255, 17, 17)",
                                        Visibility: "visible"
                                },
                                passwordInputAppointement: response.ok ? "" : appontementState.passwordInputAppointement,
                                message: response.ok ? "Sucessfully saved !":
                                
                                response.status === 404 ? "Wrong password":
                                response.status === 403 ? "Please choose appointement time":
                                response.status === 422 ? "Please provide password" : 
                                response.status === 406 ? "missing choice from options" : "Something went wrong"
                        }
                    })
                })
    }
    
    return(
        <>
            <div className={displayNavbar ? "manageDoctorsPageDiv": "manageDoctorsPageDivLeft"} ref={refContainer}>
                <ScheduleForm />
            </div> 
            
            <div className={displayNavbar ? "appointementDiv": "appointementDivLeft"}>
                <button className="appointementDiv__btnPrev" onClick={handleClickToScrollPrevious}>Previous</button>
                <button className="appointementDiv__btnNext" onClick={handleClickToScrollNext}>Next</button>
            </div>

            <select className={displayNavbar ? "setDayChoicesDiv": "setDayChoicesDivLeft"} value={dayChoicesDr} onChange={handleChoiceChange} name="choice">
                    <option disabled selected value={""}>Set as</option>
                    <option value="wDay">Working</option>
                    <option value="notWDay">Not Working</option>
            </select>

                <input type="password" className={displayNavbar ? "confirmDatePassword": "confirmDatePasswordLeft"} placeholder="Password" value={appontementState.passwordInputAppointement} 
                    onChange={(e) => setAppontementState(prevState => {
                        return{
                            ...prevState,
                                styles:{
                                    ...prevState.styles,
                                },
                                passwordInputAppointement: e.target.value
                        }
            })}/>

            <div className={displayNavbar ? "errMessageDiv": "errMessageDivLeft"}>
                <h3 style={appontementState.styles} className="errMessage">{ appontementState.message }</h3>
            </div>

            <p className={displayNavbar ? "prgInfo": "prgInfoLeft"}>If the time is marked red (busy) and you change it to working day or not working day the appointement will be removed</p>
            <button onClick={clickUpdateSchedule} className={displayNavbar ? "confirmUpdateBtn": "confirmUpdateBtnLeft"}>Confirm</button>
        </>
    )
}