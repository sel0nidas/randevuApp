import React, { useContext, useEffect, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Settings(){
    const navigate = useNavigate();

    const [daystowork, setDaystowork] = React.useState(() => JSON.parse(localStorage.getItem('daystowork')));
    const [timestowork, setTimestowork] = React.useState(() => localStorage.getItem('timestowork') ? JSON.parse(localStorage.getItem('timestowork')) : []);

    const handleFormatDay = (event, newFormats) => {
    setDaystowork(newFormats);
    console.log(newFormats);
    let arr = [];
    newFormats.forEach(element => {
        arr.push(element);
    });
    localStorage.setItem("daystowork", JSON.stringify(arr))
    };

    const handleFormatTime = (event, newFormats) => {
    setTimestowork(newFormats);
    console.log(newFormats);
    let arr = [];
    newFormats.forEach(element => {
        arr.push(element);
    });
    localStorage.setItem("timestowork", JSON.stringify(arr))
    };

    async function saveDaystoWorkChanges(e) {
        e.preventDefault();
        console.log("submit is triggered...")
        const url = "http://localhost:52463/api/doctor/update"

        try {
         const datatoSend = {
            "worktimes": JSON.stringify(timestowork),
            "workdays": JSON.stringify(daystowork),
            "userId": JSON.parse(localStorage.getItem('formData')).id
         }
         const response =  await fetch(url, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(datatoSend)
         })

         const jsonData = await response.json();
         //localStorage.setItem('formData', JSON.stringify(jsonData));
         navigate("/login");
         

     } catch (error) {
      console.error(error);
     }

    }

    
      return (
        <div className="w-100 h-full py-5">
            <Button color="inherit" onClick={()=>{navigate("/calendar")}}>
                <ArrowBackIcon />
                <CalendarMonthIcon />
            </Button>
            <div className="w-100 flex justify-center mt-5">
                <h1 className="text-3xl font-bold">Gün Seçimi</h1>
            </div>
            
            <div className="w-100 h-100 flex justify-center flex-column items-center">
            <div>
                <ToggleButtonGroup
                className=""
                value={daystowork}
                onChange={handleFormatDay}
                aria-label="text formatting"
                >
                    <ToggleButton className="!text-2xl p-5" value="MON" aria-label="bold" color="success">
                        MON
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5" value="TUE" aria-label="bold2" color="success">
                        TUE
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5" value="WED" aria-label="bold2" color="success">
                        WED
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5" value="THU" aria-label="bold2" color="success">
                        THU
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5" value="FRI" aria-label="bold2" color="success">
                        FRI
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5" value="SAT" aria-label="bold2" color="success">
                        SAT
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5" value="SUN" aria-label="bold2" color="success">
                        SUN
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="mt-2">
                <ToggleButtonGroup
                className="row"
                value={timestowork}
                onChange={handleFormatTime}
                aria-label="text formatting"
                >
                    <ToggleButton className="!text-2xl p-5 col-md-2" value="09:00" aria-label="bold" color="success">
                        09:00
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5 col-md-2" value="10:00" aria-label="bold" color="success">
                        10:00
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5 col-md-2" value="11:00" aria-label="bold" color="success">
                        11:00
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5 col-md-2" value="12:00" aria-label="bold" color="success">
                        12:00
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5 col-md-2" value="13:00" aria-label="bold" color="success">
                        13:00
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5 col-md-2" value="14:00" aria-label="bold" color="success">
                        14:00
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5 col-md-2" value="15:00" aria-label="bold" color="success">
                        15:00
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5 col-md-2" value="16:00" aria-label="bold" color="success">
                        16:00
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5 col-md-2" value="17:00" aria-label="bold" color="success">
                        17:00
                    </ToggleButton>
                    <ToggleButton className="!text-2xl p-5 col-md-2" value="18:00" aria-label="bold" color="success">
                        18:00
                    </ToggleButton>
                </ToggleButtonGroup>
                
                <div className="flex justify-end w-100 mt-2">
                    <Button onClick={(e)=>saveDaystoWorkChanges(e)} className="px-5 py-3" variant="contained">Save Changes</Button>
                </div>
            </div>
        </div>
        </div>
        
      );
}