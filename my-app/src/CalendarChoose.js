import React, { useContext, useState, useEffect } from "react";
import "./CalendarChoose.css";
import { useNavigate } from "react-router-dom";

export default function CalendarChoose() {

    
  	const navigate = useNavigate();
    
    const [userList, setUserList] = useState([]);

    var array = [];

    useEffect(()=>{

        if(JSON.parse(localStorage.getItem('formData')).id == localStorage.getItem('appointmentGiver')){
            navigate("/calendar")
        }

        fetch(`http://localhost:52463/api/user`, {
            method: 'GET'
        }).then(x=>x.json()).then(y=>{
            setUserList(y.filter(u=>u.userType === "doctor"));
        })
    }, [])

    return (
        <div className="flex row px-7 calendarMainBloque justify-center items-center">
            <div className="p-10 rounded-xl">
            <div className="flex justify-center w-100 my-3">
                <h1 className="text-xl font-bold">Doctors</h1>
            </div>
            <div className="mt-3 w-100 px-7 overflow-auto  h-80">
                {console.log("array to map", userList)}
                <div className="col-md-12 row border-2 border-gray-950">
                    <div className="col-md-3 flex justify-center border-r-2 border-gray-950">ID</div>
                    <div className="col-md-9">Username</div>
                </div>
                {userList.map((evt)=>(
                    <div className="col-md-12 row flex justify-center items-stretch py-3 cursor-pointer border-2 bg-gray-300 itemOnListofUsers" key={evt.id} onClick={()=>{localStorage.setItem("appointmentGiver", evt.id); navigate(`/calendar`)}}>
                        <div className="col-md-3 h-full">{evt.id}</div>
                        <div className="col-md-9 h-full">{evt.name}</div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}