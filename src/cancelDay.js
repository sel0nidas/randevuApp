import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "./util";

export default function CancelDay({time}) {
    
    const {setShowEventModal, setShowUserInfo, daySelected, setEventTrigger, setProcessState} = useContext(GlobalContext)
    const navigate = useNavigate();
    const [receiverId, setReceiverId] = useState(1)
    const [date, setDate] = useState(daySelected)
    function handleCancelDay() {

        if (localStorage.getItem('formData')) {
            setReceiverId(JSON.parse(localStorage.getItem('formData')).id)   
        }
        else{
            setReceiverId(1);
        }

        fetch(`http://localhost:52463/api/appointment/cancel/?receiverId=${receiverId}&date=${date}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        }})
        .then((response)=>{
        if (response.ok) {
            return response.json();
          }
          throw new Error("You can't cancel the day which is after less than 24 hours");
        })
        .then((v)=>{
            fetchEvents();
            setShowEventModal(false);
            setShowUserInfo(1);
            setProcessState(1);
            setEventTrigger(Date.now());
            setTimeout(() => {
                setEventTrigger(Date.now());
            }, 100);
            setTimeout(() => {
                setProcessState(0);
            }, 1000);
        })
        .catch(error=>{
            alert(error);
            // setProcessState(3);
            // setTimeout(() => {
            //     setProcessState(0);
            // }, 1000);
        })
    }

    return (
        <div className="">
            <div className="px-3">
                {}
                <h3 className="text-center text-lg underline decoration-red-500 decoration-4 py-2 font-semibold underline-offset-4">
                    Are you sure about canceling <br></br>the appointments for the whole day?
                </h3>
                <h3 className="text-center text-sm bg-red-300 py-2 px-5 mx-3 mt-2 font-semibold">
                    Note: Any appointment which conflicts with that decision will be immediately terminated.
                </h3>
            </div>
            <div className="flex justify-evenly mt-2 w-100">
                <Button variant="contained" color="success" onClick={handleCancelDay}>Accept</Button>
                <Button variant="contained" color="error" onClick={()=>{setShowEventModal(false); setShowUserInfo(1)}}>Refuse</Button>
            </div>
        </div>
    );
}