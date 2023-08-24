import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../GlobalContext";
import { Alert, Button } from "@mui/material";
import TimeBlock from "./TimeBlock";
import "../Day.css"
export default function Day({ day, rowIdx }) {

  const [status, setStatus] = useState('available');
  
  const [stateTest, setStateTest] = useState("");
  const [daystowork, setDaystowork] = useState(localStorage.getItem('daystowork'))//['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']);

  const [dayEvents, setDayEvents] = useState([]);
  var {
    setDaySelected,
    setShowEventModal,
    savedEvents,
    setSelectedEvent,
    monthIndex,
    setMonthIndex,
	eventTrigger,
	setEventTrigger
  } = useContext(GlobalContext);

  

  const fetchEvents = async ()=> {
    const response =  await fetch("http://localhost:52463/api/doctor/2", {
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
    return jsonData;
}
let array = [
    {date: day, time: '09:00', status: "available", description: "", descriptionFromDoctor: ""},
    {date: day, time: '10:00', status: "available", description: "", descriptionFromDoctor: ""},
    {date: day, time: '11:00', status: "available", description: "", descriptionFromDoctor: ""},
    {date: day, time: '13:00', status: "available", description: "", descriptionFromDoctor: ""},
    {date: day, time: '14:00', status: "available", description: "", descriptionFromDoctor: ""},
    {date: day, time: '15:00', status: "available", description: "", descriptionFromDoctor: ""}
]

  useEffect(() => {
	const events = JSON.parse(localStorage.getItem('savedEvents')).filter(
		(evt) =>
		  dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
	  );
	  setDayEvents(events);
	  //console.log(status, "dayEvents",dayEvents)

  }, [savedEvents, day, eventTrigger]);
  
  function isDayAvailableForDoctor(dayOfWeekString){
      return daystowork.includes(dayOfWeekString);
  }
  
  function isBefore() {
    return !day.isBefore(dayjs()) || day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "cursor-pointer" : "";
  }

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  
  function isDateInRange(){
    return (day.isBefore(dayjs()) === false && day.isBefore(dayjs().add(60, 'day')) === true) || day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
  }
  
  function isDateInRangeClass() {
    return isDateInRange() ? "" : "opacity-50";
  }
  function isNextOrPrevMonth(){
    return (parseInt(day.format('MM')) === monthIndex+1) ? "" : "opacity-50 !bg-gray-200";
  }

    function isWeekend(day) {
      if(day.format("dddd") == "Saturday" || day.format("dddd") == "Sunday")
        return "weekend"
      else
        return "weekday"
    }

  return (
    <div className={`border border-gray-200 flex flex-col overflow-y-auto ${isBefore()} ${isNextOrPrevMonth()} hover:bg-blue-100`}
    partOfWeek={isWeekend(day)}
    status={status}
    onClick={() => {
      setDaySelected(day);
      
      // if(isDateInRange())
      //   setShowEventModal(true);

    }}
    >
      <header className={`flex flex-col items-center ${isBefore()} ${isDateInRangeClass()}`}
      onClick={() => {
      setDaySelected(day);
      }}
      >
        {/* {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()
          </p>
        )} */}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className={`flex-1 flex row col-md-12 justify-center hidden md:flex w-100 ${isBefore()} ${isDateInRangeClass()}`}
      >
        
      {/* {console.log("test"+day.format('dddd'))} */}
      
      {dayEvents.map((evt, idx) => {
            var index = array.findIndex(o => o.time == evt.title)
            if(index>=0){
			      	array[index].status = evt.status
              array[index].description = evt.description
              array[index].descriptionFromDoctor = evt.descriptionFromDoctor
                  
			      }
        })}
      
      {
        console.log("asx2", array, day.format("ddd"), day.format("DD-MM-YY"))
      }
      
      {
        array.map((evt, id)=>(
          (
            (
              isDateInRange()
              &&
              isDayAvailableForDoctor(day.format('ddd').toUpperCase())
            )
            // &&
            // day.format("dddd") != "Saturday"
            // &&
            // day.format("dddd") != "Sunday"
            
          )
          &&
          <div className="px-0.5 py-0 col-md-6">
            <TimeBlock day={evt.date} time={evt.time} description={evt.description} descriptionFromDoctor={evt.descriptionFromDoctor} statusState={evt.status} key={id} type={"small"}/>
          </div>
        ))
      }
      
      </div>
    </div>	
  );

}