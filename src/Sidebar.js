import React, { useContext, useEffect, useState } from "react";
import dayjs, {Dayjs} from "dayjs";
import { TextField, StyledTextarea, Button, selectClasses } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import "./CalendarSidebar.css"
import GlobalContext from "./GlobalContext";
import BadgeIcon from '@mui/icons-material/Badge';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";

export default function Sidebar({time, description}){
    var navigate = useNavigate();
    const { daySelected, dispatchCalEvent, setEventTrigger, selectedEvent, timeBloque, setTimeBloque, setShowEventModal, descriptionBloque, setDescriptionBloque, descriptionBloquePatient, userType, statusType, descriptionBloqueDoctor, setDescriptionBloqueDoctor, anotherDoctor} = useContext(GlobalContext);
    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : "");

    const [userid, setUserid] = useState(JSON.parse(localStorage.getItem('formData')).id);

    var date2 = daySelected.set('hours', time[0]+time[1]).set('minutes', 0).set('seconds', 0).format().slice(0, -6)//time[0]+time[1])
    useEffect(()=>{
        console.log("zortirizort2", date2, selectedEvent, time, description)
    },[])

    async function getAppointmentByDate(receiverId, date, time){
        //console.log("inputs", time, date2)

        const datatoSend = {
            "title": ""+time,
            "date": date2,
            "receiverId": receiverId
        }
        const response =  await fetch(`http://localhost:52463/api/appointment/checkdate/`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(datatoSend)
     })

        const jsonData = await response.json();
        return jsonData;
    }

    async function RejectOrAccept(responseType) {
        const obj = await getAppointmentByDate(localStorage.getItem("appointmentGiver"), daySelected, time);
        console.log("idTest",obj);
        const calendarEvent = {
            time: title,
            description: "",
            descriptionBloqueDoctor,
            status: responseType+"ed",
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now()
        }
        
        dispatchCalEvent({ type: "update", payload: calendarEvent });

        const datatoSend = {
            "id": `${obj.id}`,
            "title": time,
            "description": description,
            "descriptionFromDoctor": descriptionBloqueDoctor,
            "eventType": "emergency",
            "status": responseType+"ed",
            "receiverId": localStorage.getItem("appointmentGiver"),
            "senderId": userid,
            "date": date2
        }

    const response =  await fetch(`http://localhost:52463/api/appointment/${responseType}`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(datatoSend)
     })

     const jsonData = await response.json();
    
        setShowEventModal(false);
     setEventTrigger(Date.now());
     setTimeout(() => {
        setEventTrigger(Date.now());
     }, 100);
     //console.log("eventTriggerRejectAccept", eventTrigger)
    }

    async function HandleEventSubmit(e){
        e.preventDefault();
        console.log("Event submit function call is successfully made.")
        const calendarEvent = {
            title,
            description,
            descriptionBloqueDoctor,
            status: "pending",
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now()
        }
        if (selectedEvent) {
            dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
            dispatchCalEvent({ type: "insert", payload: calendarEvent });
        }
        var daySelectedSet = daySelected.set('hour', time[0]+time[1]).set('minute', 0).set('second', 0);
        console.log("DATDATE", daySelectedSet.format(), time, time[0]+ time[1])
        const datatoSend = {
            "title": time,
            "description": ""+description,
            "eventType": "emergency",
            "receiverId": localStorage.getItem("appointmentGiver"),
            "senderId": JSON.parse(localStorage.getItem('formData')).id,
            "date": daySelectedSet.format()
        }
        console.log("datatoSend", datatoSend)
        const response =  await fetch("http://localhost:52463/api/appointment/create", {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(datatoSend)
         })

         const jsonData = await response.json();
         setShowEventModal(false);
         setEventTrigger(Date.now());
         setTimeout(() => {
            setEventTrigger(Date.now());
         }, 100);
    }

    return (
        <div className="calendar-form">
            {/* <Button className="w-100 border rounded py-2 px-4 mt-5" color="error" onClick={fetchTest}>Refresh</Button>
             */}
            <form className="w-100">
            <div className="flex items-center flex-column">
                {statusType == "anotherAppointment" &&
                <div className="flex flex-column items-center">
                    <p className="bg-red-300 p-2">This appointment request is from another doctor.</p>
                    <p className="mt-2">Request Situation is: XXXXXX</p>
                    <div className="px-5 mt-1">
                        <Button variant="contained" onClick={()=>{localStorage.setItem("appointmentGiver", 15); navigate("/login")}}>Go To that Doctor</Button>
                    </div>
                    <div className="px-5 mt-1">
                        <Button variant="contained" color="error">Cancel Appointment</Button>
                    </div>
                    <div className="flex items-center">
                        <p>Your Doctor is: Ömer Aktan</p>
                        <Button>
                            <InfoIcon />
                        </Button>
                    </div>
                </div>
                }
            </div>
            {/* <TextField
              id="filled-number"
              label="Receiver ID"
              type="number"
              name="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            /> */}
            

            {/* <TextField id="title" className="mt-2 w-100" label="Title" name="title" variant="filled" onChange={ (event)=>{setTitle(event.target.value);} } /> */}
            
            <div className="mt-1 flex flex-column justify-stretch w-100">
                {/* <label for="textarea">Text</label> */}
                {
                    (statusType === "available" && userType == "user") &&
                    <>
                        <TextareaAutosize id="textarea" className="bg-light min-h-24 max-h-60" minRows={5} name="description" onChange={ (event)=>{setDescriptionBloque(event.target.value);} } placeholder="Patient text is here..."/>
                        <Button type="submit" className="w-100 border rounded py-2 px-4 mt-5" onClick={(e)=>{HandleEventSubmit(e); setShowEventModal(false);}}>Create</Button>
                    </>
                }
                {
                    (statusType !== "available" && descriptionBloquePatient != "undefined") &&
                    <div className="mt-2 border-2 border-black">
                        <h2 className="text-lg font-bold flex justify-center w-100">Patient Note</h2>
                        <div className="mt-1 bg-yellow-200 border-t-2 border-black border-gray-500 py-1 px-3 h-24 flex justify-center items-center text-base font-semibold">{descriptionBloquePatient}</div>
                    </div>
                }
                {
                    (statusType === "pending" && userType == "doctor") &&
                    <div className="mt-2">
                        <div className="flex w-100">
                            <div className="flex-1 px-2">
                                <Button className="w-100" onClick={()=>{RejectOrAccept("accept")}} variant="contained" color="success">
                                    <DoneIcon />
                                </Button>
                            </div>
                            <div className="flex-1 px-2">
                                <Button className="w-100" onClick={()=>{RejectOrAccept("reject")}} variant="contained" color="error">
                                    <CloseIcon />
                                </Button>
                            </div>
                        </div>
                        <TextareaAutosize id="textarea" className="bg-light min-h-24 max-h-60 mt-2 w-100" 
                        maxLength={50}
                        style={{minHeight: "20px"}} minRows={5} name="descriptionFromDoctor" onChange={ (event)=>{setDescriptionBloqueDoctor(event.target.value);} } placeholder="Doctor text is here..."/>
                        
                    </div>
                }
                {console.log("descriptionBloqueDoctor"+descriptionBloqueDoctor)}
                {
                    (statusType !== "available" && statusType !== "pending" && descriptionBloqueDoctor != null && descriptionBloqueDoctor.length > 0 ) &&
                    <div className="mt-2 border-2 border-black">
                        <h2 className="text-lg font-bold flex justify-center w-100">Doctor Note</h2>
                        <div style={{backgroundColor: "rgb(136, 224, 165)"}} className="mt-1 border-t-2 border-black h-24 py-1 px-3 flex justify-center items-center text-base font-semibold">{descriptionBloqueDoctor}</div>
                    </div>
                }
            </div>
            </form>
        </div>

        
    );
}

