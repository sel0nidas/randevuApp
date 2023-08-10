import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "./GlobalContext";
import { Button } from "@mui/material";
import TimeBlock from "./calendarComponent/TimeBlock";

export default function EventsBar() {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    daySelected,
    setDaySelected,
    setShowEventModal,
    setEventTrigger,
    savedEvents,
    setSelectedEvent,
	eventTrigger
  } = useContext(GlobalContext);
  console.log("daySelected", savedEvents);
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
    { day: daySelected, time: "09:00", status: "available" },
    { day: daySelected, time: "10:00", status: "available" },
    { day: daySelected, time: "11:00", status: "available" },
    { day: daySelected, time: "13:00", status: "available" },
    { day: daySelected, time: "14:00", status: "available" },
    { day: daySelected, time: "15:00", status: "available" },
  ];


  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('savedEvents')).filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === daySelected.format("DD-MM-YY")
    );
    events.sort((a, b) => {
      const timeA = a.title;
      const timeB = b.title;

      if (timeA < timeB) {
        return -1;
      }
      if (timeA > timeB) {
        return 1;
      }
      return 0;
    });
    setDayEvents(events);
    //console.log("filteredEvents", events);
  }, [savedEvents, daySelected, eventTrigger, localStorage.getItem('savedEvents')]);

  //   var testData = JSON.parse(localStorage.getItem('savedEvents'));
  //   console.log(testData)

  //   const test2 = testData.filter(element =>
  //     dayjs(element.day).format("DD-MM-YY") == daySelected.format("DD-MM-YY")
  //   )
  //  console.log(test2);
 
  return (
    <div>
      <div className="h-20">
        <h1 className="text-xl font-bold">Events for the day selected</h1>
        <h3 className="text-md">{daySelected.format("DD MMMM YYYY")}</h3>
      </div>
      {/* {
        
        dayEvents.map((evt, idx) => ( 
        <div className="border mt-2">
          <div
            key={idx+"title"}
            //onClick={() => setSelectedEvent(evt)}
            className={`bg-blue-200 p-1 m-auto text-gray-600 text-sm rounded truncate`}//${evt.label}
          >
            {evt.title}
          </div>
          <hr></hr>
          <div
          style={{wordWrap: "break-word"}}
            key={idx+"desc"}
          >
            {evt.description}
          </div>
        </div>
        ))
        } */}

      {/* {
          dayEvents.map((evt, idx)=>(
            <div className="border mt-2">
              <TimeBlock day={daySelected} status={"pending"} time={evt.title} key={idx}/>
            </div>
          ))
        } */}

      {dayEvents.map((evt, idx) => {
        var index = array.findIndex((o) => o.time == evt.title);
        if (index >= 0) array[index].status = evt.status;
        //console.log(index, array[index]);
      })}
      {
        (
        daySelected.isBefore(dayjs()) === false
            ||
          daySelected.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
        )
        
        ?

      (<div className="h-100 flex flex-column items-center">
        
        {array.map((evt, id) => (
          <div
            className="col-md-12 cursor-pointer"
            onClick={() => {
              setEventTrigger(Date.now());
            }}
          >
            <TimeBlock
              day={evt.day}
              time={evt.time}
              statusState={evt.status}
              key={id}
              type={"massive"}
            />
          </div>
        ))}
      </div>)
      :
      <div className="h-100 flex items-center">
        The day is before today and you are absolutely unable to send an appointment request for that day.
      </div>
      }
    </div>
  );
}
