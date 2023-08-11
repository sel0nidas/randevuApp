import React, { useEffect, useReducer, useState } from "react";
import GlobalContext from './GlobalContext'
import dayjs, { Dayjs } from 'dayjs'
import { useNavigate } from "react-router-dom";

function savedEventsReducer(state, {type, payload}){
    switch (type) {
        case "insert":
            console.log("insert", state === payload)
            return [...state,  payload];

        case "update":
            console.log("insert1", state, payload)
            return state.filter(event => event.id === payload.id ? payload : event)
            
        case "delete":
            return state.filter(event => event.id !== payload.id)

        default:
            throw new Error();
    }
}

const fetchEvents =  ()=> {

    var array = [];
    var senderId = 0;
    if(localStorage.getItem('formData')){
        senderId = JSON.parse(localStorage.getItem('formData')).id;
    }

    var receiverId = localStorage.getItem("appointmentGiver")//1;

    var statusTest;
    console.log("receiverId", receiverId);

    fetch(`http://localhost:52463/api/appointment/getcalendar/${receiverId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(x=>x.json()).then(y=>{

        y.forEach(element => {
            //console.log("elementCheck", new Date(element.date).getTime())
            element.day = new Date(element.date).getTime()
            element.id = 1691182800000
            console.log("TESTEST", receiverId, senderId, element, element.senderId != senderId)
            if(receiverId != senderId){
                if(element.senderId != senderId && (element.status == "pending" || element.status == "accepted"))
                    element.status = "rejected";
                else if(element.senderId != senderId && (element.status == "rejected"))
                    element.status = "available"
            }
            else if(receiverId == senderId){
                if(element.status == "rejected"){
                    element.status = "available"
                }
            }
            array.push({title: element.title, day: new Date(element.date).getTime(), description: "", id: 1691269200000, receiverId: element.receiverId, senderId: element.senderId,  status: element.status})
        });
        //console.log("fetchedArray", array);
        localStorage.setItem("savedEvents", JSON.stringify(array));
        // console.log("arr", arr);
    })
    return array;
}

function initEvents(){
    
    fetchEvents();  
    //console.log("testREFinit")
    
    // let arr = []
    // fetchEvents().then((data)=>{
        
    //     data.forEach(element => {
    //         element.day = dayjs(new Date(2023, 8, 18))
    //         arr.push(element);
    //     });
    // })
    
    // console.log("test1111", arr);
    
    // for (let index = 0; index < arr.length; index++) {
    //     var testDate = String(new Date(arr[index].date).getDate()).padStart(2, "0")+"-"+String(new Date(arr[index].date).getMonth()+1).padStart(2, "0")+"-"+ new Date(arr[index].date).getFullYear()
    //     console.log("testDate", testDate)
    //     arr[index].date = testDate
    // }

    // console.log("test2222", JSON.stringify(arr));
    // // localStorage.setItem("savedEvents", JSON.stringify(arr));
    // localStorage.setItem("savedEvents2", JSON.stringify()""+arr);
    // console.log("savedEvents2", localStorage.getItem("savedEvents2"))
    const storageEvents = localStorage.getItem("savedEvents") ? localStorage.getItem("savedEvents") : [];
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
}

export default function ContextWrapper(props){ 
    const [monthIndex, setMonthIndex] =  useState(dayjs().month())
    const [userId, setUserId] =  useState(localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')).id : 0);
    const [userType, setUserType] =  useState(localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')).userType : "user")
    const [eventTrigger, setEventTrigger] =  useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null);
    var [savedEvents, dispatchCalEvent] = useReducer(
        savedEventsReducer,
        [],
        initEvents
    );
    
    useEffect(()=>{
        console.log("savedEvents", savedEvents)
        setEventTrigger(Date.now());
        fetchEvents();
        setTimeout(() => {
            setEventTrigger(Date.now());
        }, 100);
        console.log("zort",savedEvents);
        
        //localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    }, [savedEvents]);

    return (
        <GlobalContext.Provider 
        value={{ 
            monthIndex, setMonthIndex,
            eventTrigger, setEventTrigger,
            userId, setUserId,
            userType, setUserType,
            daySelected, setDaySelected,
            showEventModal, setShowEventModal,
            daySelected, setDaySelected,
            dispatchCalEvent,  selectedEvent,
            savedEvents
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}