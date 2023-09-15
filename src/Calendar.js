import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import { getMonth, fetchEvents } from './util';
import Month from './calendarComponent/Month';
import Sidebar from './Sidebar';
import CalendarHeader from './CalendarHeader';
import dayjs from "dayjs";
import GlobalContext from "./GlobalContext";
import EventsBar from "./EventsBar";
import EventModal from "./EventModal";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const StaticDatePicker = () => {
  	const navigate = useNavigate();
	

	const [fetchState, setFetchState] = useState();

	const [currentMonth, setCurrentMonth] = useState(getMonth())
	const { 
		monthIndex, 
		setMonthIndex, 
		showEventModal, 
		setShowEventModal, 
		daySelected, 
		weekIndex, 
		setWeekIndex,
		processState,
		setProcessState,
		setEventTrigger
	} = useContext(GlobalContext);
	
	// useEffect(()=>{
	
	// 	fetchEvents();
	// 	setEventTrigger(Date.now());
	// 	setTimeout(() => {
	// 		setEventTrigger(Date.now())
	// 	}, 100);
		
	// }, [])

	useEffect(() => {
		// callback function to call when event triggers
		const onPageLoad = () => {
		  console.log('page loaded');
		  setFetchState(fetchEvents());
		  setTimeout(() => {
			setEventTrigger(Date.now())
		  }, 200);
		};
		
		// Check if the page has already loaded
		if (document.readyState === 'complete') {
		  onPageLoad();
		} else {
		  window.addEventListener('load', onPageLoad, false);
		  // Remove the event listener when component unmounts
		  return () => window.removeEventListener('load', onPageLoad);
		}
	  }, []);

	useEffect(()=>{
		setEventTrigger(Date.now());
	}, [fetchState])

	useEffect(()=>{
		//console.log("flaired", dayjs().duration())
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

	<div className="flex flex-columns" style={{flexDirection: 'column'}}>
		<div>
			<CalendarHeader />
		</div>
		{/* {showEventModal && <EventModal />} */}
		{/* <div className="col-md-2 row bg-secondary"><Sidebar /></div> */}
		<div className="col-md-12 row h-90dvh">
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
				<div className="col-md-12 w-100 flex justify-center hidden">
					<div className="flex w-100 mt-1 justify-center items-center text-base row bg-slate-300 font-semibold max-w-min py-3 border-2 border-dashed border-black">
						<div className="col-md-12 flex justify-center">

            	    	<div className="flex px-3">
            	    		<div className="flex items-center">
            	    		        <div className="bg-white rounded-full border-gray-950 border-2" style={{width: '20px', height: '20px'}}></div>
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
            	    		        <div className="bg-gray-300 rounded-full border-gray-950 border-2" style={{width: '20px', height: '20px'}}></div>
            	    		    </div>
            	    		    <div className="px-2 line-through decoration-2">
            	    		        Canceled 
            	    		        {/* {userType2 === "doctor" ? "Full" : "Accepted"} */}
            	    		    </div>
            	    		</div>
						</div>
						<div className="col-md-12 flex justify-center">
            	    	<div className={`flex px-2 ${isDoctor()}`}>
            	    	    <div className="flex items-center">
            	    	        <div className="rounded-full border-gray-950 border-2" style={{width: '20px', height: '20px', background: "rgb(255, 111, 111)"}}></div>
            	    	    </div>
            	    	    <div className="px-2">
            	    	        <div className="flex">
            	    	        <p style={{width: 'max-content'}}>Rejected / Another user has a process</p>
            	    	        </div>
            	    	    </div>
            	    	</div>
						<div className={`flex px-2 ${isDoctor()}`}>
            	    	    <div className="flex items-center">
            	    	        <div className="rounded-full border-gray-950 border-2" style={{width: '20px', height: '20px', background: "rgb(191 219 254)"}}></div>
            	    	    </div>
            	    	    <div className="px-2">
            	    	        <div className="flex">
            	    	        <p style={{width: 'max-content'}}>You have an appointment request for another doctor</p>
            	    	        </div>
            	    	    </div>
            	    	</div>
						</div>
            		</div>
				</div>
			</div>
			
			<div className="col-md-3 row flex p-0">

			<div className="col-md-2 flex flex-column items-center content-center justify-center px-2 hidden">
				<p className="text-xs flex justify-center text-center font-semibold">Week Bar</p>
				<div className={`w-7 h-3 my-0.5 ${weekIndex==0 && weekIndex<2 ? "bg-blue-700" : "bg-blue-100"}`}></div>
				<div className={`w-7 h-3 my-0.5 ${weekIndex>=0 && weekIndex<2 ? "bg-blue-700" : "bg-blue-100"}`}></div>
				<div className={`w-7 h-3 my-0.5 ${weekIndex>=1 && weekIndex<3 ? "bg-blue-700" : "bg-blue-100"}`}></div>
				<div className={`w-7 h-3 my-0.5 ${weekIndex>=2 && weekIndex<4 ? "bg-blue-700" : "bg-blue-100"}`}></div>
				<div className={`w-7 h-3 my-0.5 ${weekIndex>=3 && weekIndex<5 ? "bg-blue-700" : "bg-blue-100"}`}></div>
			<Button onClick={()=>{
				if(weekIndex==0){
					setMonthIndex(monthIndex - 1);
					setWeekIndex(3)
				} 
				else 
					setWeekIndex(weekIndex-1)
			}}>
                    <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                        <KeyboardArrowUpIcon />
                    </span>
                </Button>
                <Button id="nextWeek" onClick={()=>{
				if(weekIndex>3){
					setMonthIndex(monthIndex + 1);
					setWeekIndex(0)
				} 
				else 
					setWeekIndex(weekIndex+1)
			}}>
                    <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                        <KeyboardArrowDownIcon />
                    </span>
                </Button>
			</div>

			<div className="col-md-12 border-top border-left p-3">
				<EventsBar />
				{showEventModal && <EventModal />}


				
			</div>

			</div>
		</div>
		
		{
		processState == 200 &&
		<Alert severity="warning" icon={<CircularProgress color="warning" fontSize="inherit" />} className="flex items-center border-yellow-600 border-2 absolute bottom-5 right-5">
			<div className="min-w-content">
				Proccessing...
			</div>
		</Alert>
		}

		{
		processState == 1 &&
		<Alert severity="success" className="flex items-center border-green-600 border-2 absolute bottom-5 right-5">
			<div className="min-w-content">
				Proccess is successfully done.
			</div>
		</Alert>
		}
		{
		processState == 3 &&
		<Alert severity="error" className="flex items-center border-red-600 border-2 absolute bottom-5 right-5">
			<div className="min-w-content">
				An Error Occured
			</div>
		</Alert>
		}
	</div>
	</React.Fragment>
  );
};	

export default StaticDatePicker;
