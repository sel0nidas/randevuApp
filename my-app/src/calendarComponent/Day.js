import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../GlobalContext";
import { Button } from "@mui/material";
import TimeBlock from "./TimeBlock";
import "../Day.css"
export default function Day({ day, rowIdx }) {

  const [status, setStatus] = useState('available');
  
  const [stateTest, setStateTest] = useState("");

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
let array = [
    {date: day, time: '09:00', status: "available"},
    {date: day, time: '10:00', status: "available"},
    {date: day, time: '11:00', status: "available"},
    {date: day, time: '13:00', status: "available"},
    {date: day, time: '14:00', status: "available"},
    {date: day, time: '15:00', status: "available"}
]

  useEffect(() => {
	const events = JSON.parse(localStorage.getItem('savedEvents')).filter(
		(evt) =>
		  dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
	  );
	  setDayEvents(events);
	  //console.log(status, "dayEvents",dayEvents)

  }, [savedEvents, day, eventTrigger, localStorage.getItem('savedEvents')]);
  
  function isBefore() {
    return !day.isBefore(dayjs()) || day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "cursor-pointer" : "";
  }

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

    function setTitleAsTime(text) {
          alert(text)
    }

    function isAvailable(events, time){
      var test = events.findIndex(e=>e.title == "09:00") 
      console.log(test)
      return test;
    }

    function isWeekend(day) {
      if(day.format("dddd") == "Saturday" || day.format("dddd") == "Sunday")
        return "weekend"
      else
        return "weekday"
    }

  return (
    <div className={`border border-gray-200 flex flex-col overflow-y-auto ${isBefore()}`}
    partOfWeek={isWeekend(day)}
    status={status}
    onClick={() => {
      setDaySelected(day);
    }}
    >
      <header className={`flex flex-col items-center ${isBefore()}`}
      onClick={() => {
      setDaySelected(day);
      }}
      >
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className={`flex-1 flex row col-md-12 justify-center w-100 ${isBefore()}`}
      >
        
      {/* {console.log("test"+day.format('dddd'))} */}
        
      {dayEvents.map((evt, idx) => {
            var index = array.findIndex(o => o.time == evt.title)
            if(index>=0){
				array[index].status = evt.status
				
			}
            //console.log(index, array[index])
        })}
      {
        array.map((evt, id)=>(
          (
            (day.isBefore(dayjs()) === false
            ||
            day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            )
            // &&
            // day.format("dddd") != "Saturday"
            // &&
            // day.format("dddd") != "Sunday"
            
          )
          &&
          <div className="px-0.5 py-0 col-md-6">
            <TimeBlock day={evt.date} time={evt.time} statusState={evt.status} key={id} type={"small"}/>
          </div>
        ))
      }
      
      </div>
    </div>	
  );

}