import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import { getMonth } from './util';
import Month from './calendarComponent/Month';
import Sidebar from './Sidebar';
import CalendarHeader from './CalendarHeader';
import dayjs from "dayjs";
import GlobalContext from "./GlobalContext";
import EventsBar from "./EventsBar";
import EventModal from "./EventModal";

const StaticDatePicker = () => {
  	const navigate = useNavigate();
	
	const [currentMonth, setCurrentMonth] = useState(getMonth())
	const { monthIndex, showEventModal, setShowEventModal, daySelected } = useContext(GlobalContext);
	console.log(!localStorage.getItem('formData'));
	useEffect(()=>{
		if(!localStorage.getItem('formData'))
			navigate("/login")
	}, []);

	useEffect(()=>{
		setCurrentMonth(getMonth(monthIndex))
	}, [monthIndex]);

	function isDoctor() {
		return JSON.parse(localStorage.getItem('formData')).userType == "doctor" ? "hidden" : "";
	}

	/*
	function Logout(){
		localStorage.removeItem('formData');
		navigate("/login");
	}
	if(localStorage.getItem('formData') == null)
		Logout();

	useEffect(() => {
		if(localStorage.getItem('formData') == null){
		   	navigate("/calendar");
		}
	 }, []);
	*/
  return (
	<React.Fragment>
		
	{/* <Navbar /> */}

	<div className="h-90dvh flex flex-columns" style={{flexDirection: 'column'}}>
		<div>
			<CalendarHeader />
		</div>
		{/* {showEventModal && <EventModal />} */}
		{/* <div className="col-md-2 row bg-secondary"><Sidebar /></div> */}
		<div className="col-md-12 row">
			{/* <div className="col-md-3 border-top border-right p-3">
				<h2 className="text-xl font-bold">Panel</h2>
				<CreateEventButton />
			</div> */}
			{/* <div className="col-md-2 border-top border-right p-3">
				<Sidebar />
			</div> */}
			<div className="col-md-9 flex-1 row flex content-start">
				<div className="col-md-12">
					<div className="col-md-12 flex justify-center border-2 border-gray-300 px-0">
					<div className="flex-1 flex bg-gray-200 justify-center">
						MON
					</div>
					<div className="flex-1 flex bg-gray-300 justify-center">
						TUE
					</div>
					<div className="flex-1 flex bg-gray-200 justify-center">
						WED
					</div>
					<div className="flex-1 flex bg-gray-300 justify-center">
						THU
					</div>
					<div className="flex-1 flex bg-gray-200 justify-center">
						FRI
					</div>
					<div className="flex-1 flex bg-gray-300 justify-center">
						SAT
					</div>
					<div className="flex-1 flex bg-gray-200 justify-center">
						SUN
					</div>
					</div>
				</div>
				<div className="col-md-12">
					<Month month={currentMonth}/>
				</div>
				<div className="col-md-12">
					<div className="flex w-100 mt-1 justify-center items-center text-base">
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
            	    	<div className={`flex px-3 ${isDoctor()}`}>
            	    	    <div className="flex items-center">
            	    	        <div className="rounded-full border-gray-950 border-2" style={{width: '20px', height: '20px', background: "rgb(255, 111, 111)"}}></div>
            	    	    </div>
            	    	    <div className="px-2">
            	    	        <div className="flex">
            	    	        <p style={{width: 'max-content'}}>Rejected / Another user has a process</p>
            	    	        </div>
            	    	    </div>
            	    	</div>
						<div className={`flex px-3 ${isDoctor()}`}>
            	    	    <div className="flex items-center">
            	    	        <div className="rounded-full border-gray-950 border-2" style={{width: '20px', height: '20px', background: "rgb(191 219 254)"}}></div>
            	    	    </div>
            	    	    <div className="px-2">
            	    	        <div className="flex">
            	    	        <p style={{width: 'max-content'}}>You have an appointment from another doctor</p>
            	    	        </div>
            	    	    </div>
            	    	</div>
            		</div>
				</div>
			</div>
			<div className="col-md-3 border-top border-left p-3">
				<EventsBar />
				{showEventModal && <EventModal />}
			</div>
		</div>
	</div>
	</React.Fragment>
  );
};	

export default StaticDatePicker;
