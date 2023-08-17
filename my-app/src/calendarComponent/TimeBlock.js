import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import { Button } from "@mui/material";
import "../Day.css"
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';

export default function TimeBlock({ day, time, rowIdx, statusState, description, type }) {
    const [myStatus,setMyStatus] = useState();
    const { daySelected, dispatchCalEvent, selectedEvent, eventTrigger, setEventTrigger, setShowEventModal, timeBloque, setTimeBloque, setDescriptionBloque} = useContext(GlobalContext);
    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : "");
    
    const navigate = useNavigate();
    //console.log(!localStorage.getItem('formData'));
    // useEffect(()=>{

    //     try {
    //         if(!JSON.parse(localStorage.getItem('formData')).id)
    //             throw new Error('Fill the username field properly!');
    //         } catch (error) {
    //             navigate("/login")
    //     }
    // },[])

    const [userid, setUserid] = useState(0);

    const [userType, setUserType] = useState("user");
    
    useEffect(() => {
        console.log("TESAS", description);
        try {
            const formData = localStorage.getItem('formData');
            if (!formData) {
                throw new Error('Form data not found in localStorage.');
            }
            const parsedData = JSON.parse(formData);
            
            if (!parsedData.id) {
                throw new Error('Fill the username field properly!');
            }
    
            setUserid(parsedData.id);
            setUserType(parsedData.userType);
        } catch (error) {
            navigate("/login");
        }
    }, []);

    //console.log("user", userType, userid)
    //console.log(`TimeBlock${type}`, time, statusState, day.format().slice(0, -6));
    
    var date2 = day.set('hours', time[0]+time[1]).set('minutes', 0).set('seconds', 0).format().slice(0, -6)//time[0]+time[1])
    //date2 = date2.format().slice(0, -6);
    //console.log("check", date2)
    const fetchEvents = async ()=> {

        const response =  await fetch("http://localhost:52463/api/appointment/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
        const jsonData = await response.json();
        var array = [];
    
        jsonData.forEach(element => {
            //console.log("elementCheck", new Date(element.date).getTime())
            element.day = new Date(element.date).getTime()
            element.id = 1691182800000
            array.push({title: element.title, day: new Date(element.date).getTime(), description: "", id: 1691269200000, status: element.status})
        });
        //console.log("fetchedArray", array);
        localStorage.setItem("savedEvents", JSON.stringify(array));
        // console.log("arr", arr);
        // for (let index = 0; index < arr.length; index++) {
        //     var testDate = String(new Date(arr[index].date).getDate()).padStart(2, "0")+"-"+String(new Date(arr[index].date).getMonth()+1).padStart(2, "0")+"-"+ new Date(arr[index].date).getFullYear()
        //     console.log(testDate)
        //     arr[index].day = new dayjs("02-08-23").valueOf()
        //     arr[index].date = testDate
        // }
        // console.log("test2222", arr);
    
        // localStorage.setItem("savedEvents", JSON.stringify(arr));
        // return arr;
        return jsonData;
    }
    async function CheckAppointmentLimitByDate(date, id) {
        const datatoSend = {
            "date": date2,
            "senderId": userid//""+JSON.parse(localStorage.getItem("formData")).id
        }
        const response =  await fetch(`http://localhost:52463/api/appointment/checkdatelimit/`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(datatoSend)
     })

        const jsonData = await response.json();
        //console.log("xsasd", jsonData)
        return jsonData;
    }

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
    async function AddAppointment() {
        var obj;
        var obj2;
        try {
            obj = await getAppointmentByDate(localStorage.getItem("appointmentGiver"), day, time);
            console.log("added", obj);   
        } catch (error) {
            console.error(error);
        }

        try {
            obj2 = await CheckAppointmentLimitByDate(day, time);
            console.log("added2", obj2);   
        } catch (error) {
            console.error(error);
        }

        if(!obj && obj2 == false){
            
        console.log("Event submit function call is successfully made.")
        const calendarEvent = {
            title: time,
            description: "",
            status: "pending",
            day: day.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now()
        }
        if (selectedEvent) {
            dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
            dispatchCalEvent({ type: "insert", payload: calendarEvent });
        }

        const datatoSend = {
            "title": time,
            "description": "test1058",
            "eventType": "emergency",
            "receiverId": localStorage.getItem("appointmentGiver"),
            "senderId": userid, // 5
            "status": "pending",
            "date": day.set('hours', time[0]+time[1]).set('minutes', 0).set('seconds', 0).format()
    }
        console.log("datatoSend", datatoSend);
        const response =  await fetch("http://localhost:52463/api/appointment/create", {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(datatoSend)
         })

        const jsonData = await response.json();
        setMyStatus(jsonData?.status);
        console.log("jsondata",jsonData);
        
        }
        else if(obj){
            console.log("Event submit function call is successfully made.")
        const calendarEvent = {
            title: time,
            description: "",
            status: "pending",
            day: day.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now()
        }
        if (selectedEvent) {
            dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
            dispatchCalEvent({ type: "insert", payload: calendarEvent });
        }

        const datatoSend = {
            "id": obj.id,
            "title": time,
            "description": "test1058",
            "eventType": "emergency",
            "receiverId": localStorage.getItem("appointmentGiver"),
            "senderId": userid, // 5
            "status": "pending",
            "date": day.set('hours', time[0]+time[1]).set('minutes', 0).set('seconds', 0).format()
    }
        console.log("datatoSend", datatoSend);
        const response =  await fetch("http://localhost:52463/api/appointment/update", {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(datatoSend)
         })

        const jsonData = await response.json();
        setMyStatus(jsonData?.status);
        console.log("jsondata",jsonData);
        }
        if(obj){
            if(obj.status == "Pending"){
                alert("Error: You can't have an appointment for the date that is already settled.")
            }
        }
        if(obj2 == true){
            alert(`Error: You can't have 2 appointment for the same day.`)
            console.log(obj2, "TESTASD");
        }
        setEventTrigger(Date.now());
        setTimeout(() => {
           setEventTrigger(Date.now());
        }, 100);
        //console.log("eventTrigger", eventTrigger)
    }

    async function RejectOrAccept(responseType) {
        const obj = await getAppointmentByDate(localStorage.getItem("appointmentGiver"), day, time);
        console.log("idTest",obj);
        const calendarEvent = {
            time: title,
            description: "",
            status: responseType+"ed",
            day: day.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now()
        }
        
        dispatchCalEvent({ type: "update", payload: calendarEvent });

        const datatoSend = {
            "id": `${obj.id}`,
            "title": time,
            "description": "test1058",
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
    
     setEventTrigger(Date.now());
     setTimeout(() => {
        setEventTrigger(Date.now());
     }, 100);
     //console.log("eventTriggerRejectAccept", eventTrigger)
    }

    return (
        <div>
        {type=="small" ?
        (<div className="text-sm text-center rounded-sm py-0 small-timebloque" status = {statusState}>{time}</div>):
        (
        <div className="text-md text-center rounded-sm mt-2 px-3 py-2 row hover massive font-bold border-2 border-gray-950" 
        onClick={()=>{setTimeBloque(time); setDescriptionBloque(description); setShowEventModal(true);}} 
        status = {statusState}>
            <div className="col-lg-4 col-md-12 flex justify-center items-center">{time}</div>
            {userType != "doctor"  ? (
            statusState == "available" &&
            <div className="col-lg-8 col-md-4">
            <Button onClick={()=>{AddAppointment()}} variant="contained" color="primary">
                <AddIcon />
            </Button>
            </div>
            ) : (
            statusState == "pending" &&
            <>
            <div className="col-lg-4 col-md-4">
            <Button onClick={()=>{RejectOrAccept("accept") }} variant="contained" color="success">
                <DoneIcon />
            </Button>
            </div>
            
            <div className="col-lg-4 col-md-4">
            <Button onClick={()=>{RejectOrAccept("reject")}} variant="contained" color="error">
                <CloseIcon />
            </Button>
            </div>
            </>
            )
            }

            {
            (statusState == "accepted" && userType != "doctor") &&
            <div className="col-lg-8 col-md-4">
            <Button onClick={()=>{RejectOrAccept("reject")}} variant="contained" color="error">
                <CloseIcon />
            </Button>
            </div>
            }
        </div>
        
        )  
        }
        </div>
    )
}