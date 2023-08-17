import React, { useContext, useEffect, useState } from "react";
import dayjs, {Dayjs} from "dayjs";
import { TextField, StyledTextarea, Button, selectClasses } from "@mui/material";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import "./CalendarSidebar.css"
import GlobalContext from "./GlobalContext";

export default function Sidebar({time, description}){
    
    const { daySelected, dispatchCalEvent, selectedEvent, timeBloque, setTimeBloque, setShowEventModal, setDescriptionBloque} = useContext(GlobalContext);
    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : "");

    async function fetchTest() {
        const response =  await fetch("http://localhost:52463/api/appointment/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

        const jsonData = await response.json();
        console.log("asd");
        const arr = jsonData;
        for (let index = 0; index < arr.length; index++) {
            var testDate = String(new Date(arr[index].date).getDate()).padStart(2, "0")+"-"+String(new Date(arr[index].date).getMonth()+1).padStart(2, "0")+"-"+ new Date(arr[index].date).getYear()
            console.log(testDate)
            arr[index].day = new dayjs("02-08-23").valueOf()
            arr[index].date = testDate
        }

        localStorage.setItem('savedEvents', JSON.stringify(arr));
        return jsonData;
    }

    useEffect(()=>{
        console.log("zortirizort2", daySelected, selectedEvent, time, description)
    },[])

    async function HandleEventSubmit(e){
        e.preventDefault();
        console.log("Event submit function call is successfully made.")
        const calendarEvent = {
            title,
            description,
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
            "description": description,
            "eventType": "emergency",
            "receiverId": localStorage.getItem("appointmentGiver"),
            "senderId": JSON.parse(localStorage.getItem('formData')).id,
            "date": daySelectedSet.format()
        }

        const response =  await fetch("http://localhost:52463/api/appointment/create", {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(datatoSend)
         })

         const jsonData = await response.json();
        
    }

    return (
        <div className="calendar-form">
            <h1 className="text-xl font-bold">Panel</h1>

            {/* <Button className="w-100 border rounded py-2 px-4 mt-5" color="error" onClick={fetchTest}>Refresh</Button>
             */}
            <form className="mt-2 w-100">
            
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
            <div className="mt-2 flex flex-column justify-stretch w-100">
                {/* <label for="textarea">Text</label> */}
                {
                
                    <TextareaAutosize id="textarea" className="bg-light min-h-24 max-h-60" minRows={5} name="description" onChange={ (event)=>{setDescriptionBloque(event.target.value);} } placeholder="Description text is here..."/>
                
                }
            </div>
            <div>
                {/*  */}
                {""+description}
            </div>
            <Button type="submit" className="w-100 border rounded py-2 px-4 mt-5" onClick={(e)=>{HandleEventSubmit(e); setShowEventModal(false);}}>Create</Button>
            
            </form>
        </div>

        
    );
}

