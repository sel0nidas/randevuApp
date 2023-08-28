import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "./GlobalContext";
import { Button } from "@mui/material";
import TimeBlock from "./calendarComponent/TimeBlock";
import RefreshIcon from '@mui/icons-material/Refresh';

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
  /*
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
        array.push({title: element.title, day: new Date(element.date).getTime(), description: element.description, id: 1691269200000, status: element.status})
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
*/
const fetchEvents =  ()=> {

  var array = [];
  var arrayPersonal = [];
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
          //console.log("TESTEST", receiverId, senderId, element, element.senderId != senderId)
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
          array.push({title: element.title, day: new Date(element.date).getTime(), description: element.description, id: 1691269200000, descriptionFromDoctor: element.descriptionFromDoctor ,receiverId: element.receiverId, senderId: element.senderId,  status: element.status})
      });
      if(senderId != receiverId){
        fetch(`http://localhost:52463/api/appointment/getusercalendar/${senderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(x=>x.json()).then(y=>{

            y.forEach(element => {

                element.day = new Date(element.date).getTime()
                element.id = 1691182800000

                if(element.receiverId != receiverId){
                    if(element.status == "accepted" || element.status == "pending")
                        element.status = "anotherAppointment"
                    else if(element.status == "rejected")
                        element.status = "available"
                }
                array.push({title: element.title, day: new Date(element.date).getTime(), description: element.description, id: 1691269200000, receiverId: element.receiverId, senderId: element.senderId,  status: element.status})
                //console.log("other appointments", array.findIndex(e=>e.receiverId != receiverId))
            });
        })
      }
  
      //console.log("fetchedArray", array);
      localStorage.setItem("savedEvents", JSON.stringify(array));
      setEventTrigger(Date.now());
  })

  // fetch(`http://localhost:52463/api/appointment/getusercalendar/${senderId}`, {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // }).then(x=>x.json()).then(y=>{

  //     y.forEach(element => {
          
  //         element.day = new Date(element.date).getTime()
  //         element.id = 1691182800000

  //         if(element.receiverId != receiverId){
  //             if(element.status == "accepted" || element.status == "pending")
  //                 element.status = "rejected"
  //             else if(element.status == "rejected")
  //                 element.status = "available"
  //         }

  //         array.push({title: element.title, day: new Date(element.date).getTime(), description: "", id: 1691269200000, receiverId: element.receiverId, senderId: element.senderId,  status: element.status})

  //         //console.log("other appointments", array.findIndex(e=>e.receiverId != receiverId))

  //     });
  
  //     //console.log("fetchedArray", array);
  //     localStorage.setItem("savedEvents", JSON.stringify(array));
  //     // console.log("arr", arr);
  // })





  // fetch(`http://localhost:52463/api/appointment/getcalendar/${receiverId}`, {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // }).then(x=>x.json()).then(y=>{

  //     y.forEach(element => {
  //         //console.log("elementCheck", new Date(element.date).getTime())
  //         element.day = new Date(element.date).getTime()
  //         element.id = 1691182800000
  //         console.log("TESTEST", receiverId, senderId, element, element.senderId != senderId)
  //         if(receiverId != senderId){
  //             if(element.senderId != senderId && (element.status == "pending" || element.status == "accepted"))
  //                 element.status = "rejected";
  //             else if(element.senderId != senderId && (element.status == "rejected"))
  //                 element.status = "available"
  //         }
  //         else if(receiverId == senderId){
  //             if(element.status == "rejected"){
  //                 element.status = "available"
  //             }
  //         }
  //         array.push({title: element.title, day: new Date(element.date).getTime(), description: "", id: 1691269200000, receiverId: element.receiverId, senderId: element.senderId,  status: element.status})
  //     });

  
  //     //console.log("fetchedArray", array);
  //     localStorage.setItem("savedEvents", JSON.stringify(array));
  //     // console.log("arr", arr);
  // })
  return array;
}

function fetchMain() {
  fetchEvents();
  setEventTrigger(Date.now());
  setTimeout(() => {
  setEventTrigger(Date.now());
  }, 100);
}


let array = [
    { day: daySelected, time: "09:00", status: "available" },
    { day: daySelected, time: "10:00", status: "available" },
    { day: daySelected, time: "11:00", status: "available" },
    { day: daySelected, time: "13:00", status: "available" },
    { day: daySelected, time: "14:00", status: "available" },
    { day: daySelected, time: "15:00", status: "available" }
  ];

  
  function isDateOutOfRange(){
    return (daySelected.isBefore(dayjs()) === false && daySelected.isBefore(dayjs().add(60, 'day')) === true) || daySelected.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
  }

  useEffect(() => {
    
	const events = JSON.parse(localStorage.getItem('savedEvents')).filter(
		(evt) =>
		  dayjs(evt.day).format("DD-MM-YY") === daySelected.format("DD-MM-YY")
	  );
    const events2 = JSON.parse(localStorage.getItem('savedEvents2')).filter(
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
	  setDayEvents([...events, ...events2]);
    //console.log("filteredEvents", events);
  }, [savedEvents, daySelected, eventTrigger]);

  //   var testData = JSON.parse(localStorage.getItem('savedEvents'));
  //   console.log(testData)

  //   const test2 = testData.filter(element =>
  //     dayjs(element.day).format("DD-MM-YY") == daySelected.format("DD-MM-YY")
  //   )
  //  console.log(test2);
 
  return (
    <div>
      <div className="h-20 flex items-center w-100 justify-between">
        <div className="grid-cols-9">
          <h1 className="text-xl font-bold">Events for the day selected</h1>
          <h3 className="text-md">{daySelected.format("DD MMMM YYYY")}</h3>
        </div>
        <div className="grid-cols-3 flex justify-end">
         <Button
         color="primary"
         onClick={()=>{
          fetchEvents();
          setEventTrigger(Date.now());
          setTimeout(() => {
          setEventTrigger(Date.now());
          }, 100);
          }
        }
         class="bg-gray-950 hover:bg-gray-700 hover:transition-all transition-all text-white font-bold py-2.5 px-2.5 mr-3 rounded-full">
          <RefreshIcon />
        </Button>
        </div>
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
        if (index >= 0){
          array[index].status = evt.status;
          array[index].description = evt.description;
          array[index].descriptionFromDoctor = evt.descriptionFromDoctor;
        } 
        //console.log(index, array[index]);
      })}
      {
        (
          isDateOutOfRange()
        )
        
        ?

      (<div className="h-100 flex flex-column items-center row">
        
        {array.map((evt, id) => (
          <div
            className="col-lg-12 cursor-pointer"
            onClick={() => {
              setEventTrigger(Date.now());
            }}
          >
            <TimeBlock
              day={evt.day}
              time={evt.time}
              statusState={evt.status}
              description={evt.description}
              descriptionFromDoctor={evt.descriptionFromDoctor}
              key={id}
              type={"massive"}
            />
          </div>
        ))}
      </div>)
      :
      <div className="h-100 flex items-center">
        {/* The day is out of expected time range and you are absolutely unable to take an appointment for this day. */}
      </div>
      }
    </div>
  );
}
