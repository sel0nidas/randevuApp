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

export default function CalendarHeader(){

  	const navigate = useNavigate();

    
    useEffect(()=>{
		if(!localStorage.getItem('formData'))
			navigate("/login")
	}, []);

    const [userType2, setUserType] = useState(localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')).userType : "user");
    console.log("userType", userType2)
    const {setEventTrigger} = useContext(GlobalContext);

    async function fetchEvents() {

        const response =  await fetch("http://localhost:52463/api/appointment/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
        const jsonData = await response.json();
        var array = [];
    
        jsonData.forEach(element => {
            console.log("elementCheck", new Date(element.date).getTime())
            element.day = new Date(element.date).getTime()
            element.id = 1691182800000
            array.push({title: element.title, day: new Date(element.date).getTime(), description: "", id: 1691269200000, status: element.status})
        });
        console.log("fetchedArray", array);
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

    const {monthIndex, setMonthIndex} = useContext(GlobalContext)
    var {savedEvents} = useContext(GlobalContext);

	function handlePrevMonth(){
		setMonthIndex(monthIndex - 1);
	}

	function handleNextMonth(){
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
                <h1 className="mr-10 text-base text-gray-500 fond-bold pl-2 underline decoration-blue-700 decoration-2">Appointment Giver ID: {localStorage.getItem('appointmentGiver')}</h1>
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
            <div className="flex flex-1 justify-center items-center text-base opacity-0">
                <div className="flex px-3">
                    <div className="flex items-center">
                        <div className="bg-gray-0 rounded-full border-gray-950 border-2" style={{width: '20px', height: '20px'}}></div>
                    </div>
                    <div className="px-2">
                        Available
                    </div>
                </div>
                <div className="flex px-3">
                    <div className="flex items-center">
                        <div className="bg-yellow-200 rounded-full border-gray-950 border-2" style={{width: '20px', height: '20px'}}></div>
                    </div>
                    <div className="px-2">
                        Waiting
                    </div>
                </div>
                <div className="flex px-3">
                    <div className="flex items-center">
                        <div className="bg-green-200 rounded-full border-gray-950 border-2" style={{width: '20px', height: '20px'}}></div>
                    </div>
                    <div className="px-2">
                        Accepted 
                        {/* {userType2 === "doctor" ? "Full" : "Accepted"} */}
                    </div>
                </div>
                <div className="flex px-3">
                    <div className="flex items-center">
                        <div className="rounded-full border-gray-950 border-2" style={{width: '20px', height: '20px', background: "rgb(255, 111, 111)"}}></div>
                    </div>
                    <div className="px-2">
                        <div className="flex">
                        <p style={{width: 'max-content'}}>Rejected / Another user has a process</p>
                        {/* Rejected / Another user has a process */}
                        
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex justify-end">
                <div className="flex items-center justify-center text-base underline decoration-purple-700 decoration-2">
                    Type of User: {userType2 === "doctor" ? "doctor" : "user"}
                </div>
                {userType2 == "user" &&
                <Button style={{marginRight: '0px'}} color="inherit" onClick={Logout}>
                    | Show The Appointments |
                </Button> 
                }
                {userType2 == "doctor" && 
                //<></>
                <Button style={{marginRight: '0px'}} color="inherit" onClick={()=>{navigate("/settings")}}>
                   <SettingsIcon />
                </Button>
                }
		        <Button style={{marginRight: '0px'}} color="inherit" onClick={Logout}>
                    <LogoutIcon />
                </Button> 
            </div>
        </header>
    );
}