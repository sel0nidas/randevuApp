import React, { useContext } from "react";
import GlobalContext from "./GlobalContext";
import { Button } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function UserInfo() {
    const {selectedUser, setShowUserInfo} = useContext(GlobalContext);
    

    return (
        <div>
            <div className="flex">
                <Button onClick={()=>{setShowUserInfo(1)}} className="p-1 bg-black rounded-md bg-black" color="info" variant="contained"><KeyboardBackspaceIcon className="text-white"/></Button>
                <h1 className="px-3 font-bold text-lg underline decoration-black decoration-4 pt-1">User Details</h1>
            </div>
            {
            selectedUser &&
            <ul>
                <li className="flex items-center mt-1 py-1">
                    <h1 className="font-bold text-md px-3">Username: </h1>
                    <p>{selectedUser.name}</p>
                </li>
                <hr></hr>
                <li className="flex items-center mt-1 py-1">
                    <h1 className="font-bold text-md px-3">Doctor Type: </h1>
                    <p>{selectedUser.doctorType}</p>
                </li>
                <hr></hr>
                <li className="flex items-center mt-1 py-1">
                    <h1 className="font-bold text-md px-3">Work Days: </h1>
                    <div className="flex">
                        {
                            JSON.parse(selectedUser.workdays).map((element, id) => (
                                <p className="px-1 mx-1 flex items-center bg-blue-300 font-semibold">{element}</p>
                            ))
                        }
                    </div>
                    
                </li>
                <hr></hr>
                <li className="flex items-center mt-1 py-1">
                    <h1 className="font-bold text-md px-3">Work Times: </h1>
                    <div className="flex">
                        {   
                            JSON.parse(selectedUser.worktimes).map((element, id) => (
                                <p className="px-2 mx-1 flex items-center bg-green-200 font-semibold">{element}</p>
                            ))
                        }
                    </div>
                </li>
            </ul>
            }
        </div>
    );
}