import React, { useEffect, useState } from "react";

const GlobalContext = React.createContext({
    timeBloque: "",
    setTimeBloque: ()=>{},
    descriptionBloque: "",
    setDescriptionBloque: ()=>{},
    monthIndex: 0,
    setMonthIndex: (index) =>{},
    eventTrigger: 0,
    setEventTrigger: (index) =>{},
    userId: 0,
    setUserId: (index) =>{},
    userType: "",
    setUserType: (index) =>{},
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) =>{},
    daySelected: null,
    setDaySelected: (day) =>{},
    showEventModal: false,
    setShowEventModal: ()=>{},
    dispatchCalEvent: ({type, payload}) => {},
    savedEvents: []
})

export default GlobalContext