import dayjs from "dayjs"
import GlobalContext from "./GlobalContext";
import { useContext } from "react";
export function getMonth(month = dayjs().month()){

    const year = dayjs().year()
    var counter = 0;
    const firstDayOfTheMonth = dayjs(new Date(year, month, 0)).day()
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const daysMatrix = new Array(5).fill([]).map(()=>{
            return new Array(7).fill(null).map(()=>{
                currentMonthCount++
                console.log("",currentMonthCount)
                return dayjs(new Date(year,  month, currentMonthCount))
        })
    })

    return daysMatrix;

}

export function fetchEvents(){

    var array = [];
    var arrayPersonal = [];
    var daystowork = [];
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

            array.push({
                title: element.title, 
                day: new Date(element.date).getTime(), 
                description: element.description, 
                id: 1691269200000, 
                descriptionFromDoctor: element.descriptionFromDoctor, 
                receiverId: element.receiverId, 
                name: element.name, 
                receiverUser: element.receiverUser, 
                senderId: element.senderId,  
                status: element.status,
                isSeen: element.isSeen,
                operationDate: element.operationDate
            })
            function compareDates(a, b) {
                const dateA = new Date(a.operationDate);
                const dateB = new Date(b.operationDate);
            
                if (dateA < dateB) {
                    return -1;
                } else if (dateA > dateB) {
                    return 1;
                } else {
                    return 0;
                }
            }
            
            // Sort the array of objects by date
            array.sort(compareDates);
            console.log("checkcanceled", element, new Date(element.date).getTime(), array.findIndex(e=>e.date == new Date(element.date).getTime()))
            
        });
        //console.log("fetchedArray", array);
        localStorage.setItem("savedEvents", JSON.stringify(array.reverse()));
    })
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
                var status = "available"
                if(element.receiverId != receiverId){
                    if(element.status == "accepted" || element.status == "pending")
                        status = "anotherAppointment"
                    else if(element.status == "rejected")
                        status = "available"
                }
                if(status === "anotherAppointment"){
                    if(element.receiverId == receiverId)
                    console.log("SDSDSD", element.receiverUser);
                    var receiverUser = {name:""};
                    if(element.receiverUser)
                    receiverUser = element.receiverUser
                    arrayPersonal.push({
                        title: element.title, 
                        day: new Date(element.date).getTime(), 
                        description: element.description, 
                        descriptionFromDoctor: element.descriptionFromDoctor, 
                        id: 1691269200000, 
                        receiverId: element.receiverId, 
                        name: element.name, 
                        receiverUser: receiverUser, 
                        senderId: element.senderId,  
                        status: status,
                        realStatus: element.status,
                        isSeen: element.isSeen,
                        operationDate: element.operationDate
                    })
                }
                
                //console.log("other appointments", array.findIndex(e=>e.receiverId != receiverId))
            });
            //console.log("fetchedArray", array);
            localStorage.setItem("savedEvents2", JSON.stringify(arrayPersonal));
            // console.log("arr", arr);
        })
        // fetch(`http://localhost:52463/api/doctor/getwithuserid/${receiverId}`, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(x=>x.json()).then(y=>{
                
        //         console.log("kesinbak", JSON.parse(y.workdays)[0]);
        //         localStorage.setItem('daystowork', y.workdays);
        //     })
    }

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