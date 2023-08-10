import React, { useContext, useState } from 'react'
import GlobalContext from './GlobalContext'
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';

export default function EventModal() {

    const [title, setTitle] = useState('');
    const { showEventModal, setShowEventModal } = useContext(GlobalContext);

    return (
        <div className={`h-screen w-full fixed left-0 top-0 flex justify-center items-center modal-bloque`}>
            <form className='bg-white rounded-lg shadow-2xl w-1/4'>
                <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
                    <span className='material-icons-outlined text-gray-400'>
                        <DragHandleIcon />
                    </span>
                    <button onClick={()=>{setShowEventModal(false)}}>
                        <span className='material-icons-outlined text-gray-400'>
                            <CloseIcon />
                        </span>
                    </button>
                </header>
                <div className='p-3'>
                    <div className='grid grid-cols-1/5 items-end gap-y-7'>
                        <div></div>
                        <input type="text" />
                    </div>
                </div>
            </form>
        </div>
    )
}