import React, { useContext, useState } from 'react'
import GlobalContext from './GlobalContext'
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

export default function EventModal() {

    const [title, setTitle] = useState('');
    const { showEventModalCreate, setShowEventModalCreate } = useContext(GlobalContext);

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className={`h-screen w-full fixed left-0 top-0 flex justify-center items-center modal-bloque bg-gray-100 bg-opacity-50`} 
        onClick={(e)=>{
            if(e.target.contains(e.target.querySelector('form'))){
                setShowEventModal(false);
            }
        }}
        >
            <form className='bg-white rounded-lg shadow-2xl w-1/4 z-20' >
                {/* <header className='px-4 py-2 flex justify-end items-center'>
                    <button onClick={()=>{setShowEventModal(false)}}>
                        <span className='material-icons-outlined text-gray-400'>
                            <CloseIcon />
                        </span>
                    </button>
                </header> */}
                <div className='p-3'>
                    <EventsBar />
                    {/* <div className='grid grid-cols-1/5 items-end gap-y-7'>
                        <div></div>
                        <input type="text" />
                    </div> */}
                </div>
                <footer className="flex justify-end border-t p-3 mt-5">
                    <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded"
                    variant="contained"
                    color='primary'
                    >
                    Save
                    </Button>
                </footer>
            </form>
        </div>
    )
}