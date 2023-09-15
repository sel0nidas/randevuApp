import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "./GlobalContext";
import { fetchEvents } from "./util";

export default function Notifications({setWidth, senderId}) {
    
    const [listOfNotifications, setListOfNotifications] = useState(localStorage.getItem('savedEvents') ? JSON.parse(localStorage.getItem('savedEvents')).filter(e => e.status != "pending" && e.senderId == senderId) : [])
    
    const {setEventTrigger} = useContext(GlobalContext);

    async function fetchSeen() {
        const response = await fetch(`http://localhost:52463/api/appointment/seen/?senderId=${senderId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
             }
        });

        return response;
    }

    useEffect(()=>{
        setListOfNotifications(localStorage.getItem('savedEvents') ? JSON.parse(localStorage.getItem('savedEvents')).filter(e => e.status != "pending" && e.senderId == senderId) : []);
        fetchSeen();
        fetchEvents();
        setEventTrigger(Date.now());
        setTimeout(() => {
            setEventTrigger(Date.now());
        }, 100);
        console.log("listOfNotifications", listOfNotifications);
    }, [])

    function handleStatusInNotifications(statusVar) {
        switch (statusVar) {
            case "accepted":
                return "bg-green-300";
            case "rejected":
                return "bg-red-300";
            case "canceled":
                return "bg-gray-300";
        }
        
    }

    return(
        
        <div class="w-100 flex flex-column items-center">
            
            <h2 className="font-bold text-lg">
                List of Notifications
            </h2>
            {
            listOfNotifications.length > 0 ?
            <div className="row col-md-12 w-100 mt-3">
                <div className="col-md-12 h-72 overflow-y-auto">
                    {listOfNotifications.map((item, id)=>(
                        <div className="flex mt-1 items-center border-t-2 py-1.5 justify-center">
                            <div className="w-10 flex justify-center">
                                {
                                !item.isSeen &&
                                <div className="bg-blue-500 w-2 h-2 rounded-full"></div>
                                }
                            </div>
                            <p>Appointment in</p>
                            <p className="underline decoration-green-300 decoration-4 border-0 border-black font-semibold w-28 flex justify-center px-1 py-2">{dayjs(item.day).format("DD-MM-YYYY")}</p>
                            <p className="underline decoration-blue-300 decoration-4 border-0 border-black border-l-0 font-semibold w-16 flex justify-center px-1 py-2">{dayjs(item.day).format("HH:mm")}</p>
                            <p className="px-2 flex">
                                is 
                                <p className={`${handleStatusInNotifications(item.status)} border-2 border-black mx-2 px-1 w-20 flex justify-center`}>{item.status}</p>
                            </p>
                            <p className="hidden">
                                İşlemin yapıldığı tarih: x
                                {/* {""+JSON.stringify(item)} */}
                            </p> 
                        </div>
                    ))}
                </div>
            </div>
            :
            <div className="w-100">Herhangi bir bildiriminiz bulunmamaktadır.</div>
            }
        </div>
    );
}