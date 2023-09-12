import React, { useContext, useEffect, useState } from "react";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import GlobalContext from "./GlobalContext";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getMonth } from './util';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import DialogueBox from './DialogueBox';
import { fetchEvents } from "./util";

export default function CalendarHeader(){

  	const navigate = useNavigate();

    const [intervalState, setIntervalState] = useState(false);
    const [fetchKeeper, setFetchKeeper] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const handleIntervalToggle = () => {
        if (!intervalState) {
          const newIntervalId = setInterval(() => {
            setEventTrigger(Date.now());
            fetchEvents();
            setFetchKeeper(true);
            setEventTrigger(Date.now());
            setTimeout(() => {
                setEventTrigger(Date.now());
            }, 100);
            console.log('This will run every second!');
            setTimeout(() => {
                setFetchKeeper(false);
            }, 500);
            console.log('This will run every second!');
          }, 5000); // Interval duration: 1000 milliseconds (1 second)
          setIntervalId(newIntervalId);
          setIntervalState(true);
        } 
        else {
            clearInterval(intervalId);
            setIntervalId(null);
            setIntervalState(false);
        }
    };
    
    useEffect(()=>{
		if(!localStorage.getItem('formData'))
			navigate("/login")

        setEventTrigger(Date.now())
        fetchEvents();
        setTimeout(() => {
            setEventTrigger(Date.now())
        }, 100);

        // setInterval(() => {
        //     setEventTrigger(Date.now());
        //     fetchEvents();
        //     setFetchKeeper(true);
        //     setEventTrigger(Date.now());
        //     setTimeout(() => {
        //         setEventTrigger(Date.now());
        //     }, 100);
        //     console.log('This will run every second!');
        //     setTimeout(() => {
        //         setFetchKeeper(false);
        //     }, 500);
        //     console.log('This will run every second!');
        //   }, 5000);
	}, []);

    const [userType2, setUserType] = useState(localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')).userType : "user");
    console.log("userType", userType2)
    const {setEventTrigger, setShowEventModal, setShowUserInfo} = useContext(GlobalContext);
    const [date, setDate] = useState(new Date());

    const {monthIndex, setMonthIndex} = useContext(GlobalContext)
    var {savedEvents} = useContext(GlobalContext);

	function handlePrevMonth(){
        if(date.getMonth()-1 != monthIndex)
		    setMonthIndex(monthIndex - 1);
	}

	function handleNextMonth(){
        //if(date.getMonth()+1 != monthIndex)
		    setMonthIndex(monthIndex + 1);
	}

    function resetCalendar(){
		setMonthIndex(7);
    }

    function Logout(){
		localStorage.removeItem('formData');
		navigate("/login");
	}

    function refreshCalendar() {
        setEventTrigger(Date.now());
        setTimeout(() => {
            setEventTrigger(Date.now());
        }, 100);
    }

    return (
        <header className="px-4 py-2 flex items-center justify-between">
            <div className="flex flex-1 items-center justify-center">
                <h1 className="mr-10 text-base text-gray-500 font-bold pl-2 underline decoration-blue-700 decoration-2">Appointment Giver ID: {localStorage.getItem('appointmentGiver')}</h1>
                {/* <Button onClick={refreshCalendar}>
                    <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                        <RefreshIcon />
                    </span>
                </Button> */}
                {userType2 !== "doctor" && 
                <Button onClick={()=>{navigate("/choose")}}>
                    <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                        <SearchIcon />
                    </span>
                </Button> 
                }
                {/* <DialogueBox /> */}
                {/* <Button className="border rounded py-2 px-4 mr-5" onClick={resetCalendar}>Today</Button> */}
                <Button onClick={handlePrevMonth}>
                    <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                        <ChevronLeftIcon />
                    </span>
                </Button>
                <Button onClick={handleNextMonth}>
                    <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                        <ChevronRightIcon />
                    </span>
                </Button>
                <div style={{width: '220px'}} className="">
                    <h2 className="ml-4 text-base sm:text-xs md:text-xs lg:text-base 2xl:text-lg text-gray-500 font-bold">
                        {dayjs(new Date(dayjs().year(), monthIndex)).format(
                            "MMMM YYYY"
                        )}
                    </h2>
                </div>
            </div>
            <div className="flex flex-1 justify-center items-center text-base hidden">
                <Button color={`${intervalState == true ? "success" : "error"}`} variant="contained" 
                // onClick={()=>{
                //     if(intervalState == false){
                //         var interval = setInterval(
                //             () => {
                //             setEventTrigger(Date.now());
                //             fetchEvents();
                //             setFetchKeeper(true);
                //             setEventTrigger(Date.now());
                //             setTimeout(() => {
                //                 setEventTrigger(Date.now());
                //             }, 100);
                //             console.log('This will run every second!');
                //             setTimeout(() => {
                //                 setFetchKeeper(false);
                //             }, 500);
                //             }, 5000);
                //         setIntervalState(true);
                //     }
                //     else{
                //         clearInterval(interval);
                //         setIntervalState(false);
                //     }
                // }}
                
                onClick={handleIntervalToggle}

                >
                    Real Time Mode: {intervalState ? "on" : "off"}
                </Button>
                <div className="px-3">
                    <div className={`${fetchKeeper ? "" : "opacity-0"} w-3 h-3 bg-red-500 rounded-full`}></div>
                </div>
            </div>
            <div className="flex-1 flex justify-end">
                <div className="flex items-center justify-center text-base underline decoration-purple-700 decoration-2 font-semibold">
                    Type of User: {userType2 === "doctor" ? "doctor" : "user"}
                </div>
                {/* {userType2 == "user" &&
                <Button style={{marginRight: '0px'}} color="inherit" onClick={Logout}>
                    | Show The Appointments |
                </Button> 
                } */}
                {userType2 == "doctor" && 
                //<></>
                <Button style={{marginRight: '0px'}} color="inherit" onClick={()=>{navigate("/settings")}}>
                   <SettingsIcon />
                </Button>
                } 
                {
                userType2 != "doctor" &&
                <Button style={{marginRight: '0px'}} className="relative" color="inherit" onClick={()=>{setShowEventModal(true); setShowUserInfo(4);}}>
                   <NotificationsIcon />
                   {
                    localStorage.getItem('savedEvents') &&
                   <div className="absolute bottom-0 right-2 bg-blue-500 text-white rounded-full h-4 max-w-min p-1 flex justify-center items-center text-xs font-semibold">
                    {
                    JSON.parse(localStorage.getItem('savedEvents'))
                    .filter(
                        e=>
                        e.status != "pending" &&
                        e.isSeen != true && 
                        e.senderId == JSON.parse(localStorage.getItem('formData')).id
                        )
                        .length}
                   </div>
                   }
                </Button>
                }   
		        <Button style={{marginRight: '0px'}} color="inherit" onClick={Logout}>
                    <LogoutIcon />
                </Button>
            </div>
        </header>
    );
}