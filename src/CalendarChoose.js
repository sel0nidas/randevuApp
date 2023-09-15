import React, { useContext, useState, useEffect } from "react";
import "./CalendarChoose.css";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "./util";

export default function CalendarChoose() {

  	const navigate = useNavigate();
    const [userList, setUserList] = useState([]);

    var array = [];

    useEffect(()=>{

        if(JSON.parse(localStorage.getItem('formData')).id == localStorage.getItem('appointmentGiver')){
            navigate("/calendar")
        }

        fetch(`http://localhost:52463/api/doctor`, {
            method: 'GET'
        }).then(x=>x.json()).then(y=>{ 
            y.sort((a, b) => a.userId - b.userId);

            // Set the sorted data to userList
            setUserList(y);
        })
    }, [])

    function getCurrentDayClass(gender) {
        return gender === "E"
          ? "bg-blue-400 text-white rounded-full w-4"
          : "bg-red-300 text-white rounded-full w-4";
      }
      

    return (
        <div className="flex row px-7 calendarMainBloque justify-center items-center">
            <div className="p-10 rounded-xl w-5/12">
                <div className="flex justify-center w-100 my-3">
                    <h1 className="text-xl font-bold">Doctors</h1>
                </div>
                <div className="mt-3 w-100 px-5 overflow-auto  h-80">
                    {console.log("array to map", userList)}
                    <div className="col-md-12 row border-2 border-gray-950">
                        <div className="col-md-2 flex justify-start border-r-2 border-gray-950">ID</div>
                        <div className="col-md-5 border-r-2 border-gray-950">Username</div>
                        <div className="col-md-3 border-r-2 border-gray-950">Doctor Type</div>
                        <div className="col-md-2">Gender</div>
                    </div>
                    {userList.map((evt)=>(
                        <div className="col-md-12 row flex justify-center items-stretch py-3 cursor-pointer border-2 bg-gray-300 itemOnListofUsers" key={evt.id} onClick={()=>{localStorage.setItem("appointmentGiver", evt.userId); localStorage.setItem("appointmentGiverObject", JSON.stringify(evt)); fetchEvents(); navigate(`/calendar`)}}>
                            <div className="col-md-2 h-full">{evt.userId}</div>
                            <div className="col-md-5 h-full">{evt.name}</div>
                            <div className="col-md-3 h-full">{evt.doctorType}</div>
                            <div className="col-md-2 h-full flex justify-center">
                                <p className={`text-sm p-1 my-1 mr-2 text-center  ${getCurrentDayClass(evt.gender)}`}></p>
                                {evt.gender}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}