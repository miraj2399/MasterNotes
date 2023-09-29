
import Markdown from 'react-markdown'
import { useState } from 'react';
import { Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
export default function CreatePersonalNote() {
    const [note, setNote] = useState("");
    return (
        <div className="grid md:grid-cols-2 gap-2">
            <div className="md:col-span-2">
            <div className="flex p-3 flex-wrap">
            <div className='flex-1'>
            <Typography variant="h5" className="text-center">Create Note</Typography>
            <Typography variant="subtitle1" className="text-center">Write your note in markdown</Typography>
            </div>
            <div className='flex justify-center items-center gap-2 mt-4 flex-1'>
                <button className="bg-green-400 text-white p-2 rounded-3xl flex justify-center items-center gap-2">
                    <SaveIcon/>
                </button>
                <button className="bg-red-400 text-white p-2 rounded-3xl flex justify-center items-center gap-2">
                    <CancelIcon/>
                </button>

            </div>
            </div>
            </div>
        
            <div>
                <textarea className="w-full min-h-screen p-5 border border-gray-300 outline-none " placeholder="Note 1" onChange={(e)=>setNote(e.target.value)}></textarea>
            </div>
            <div className='prose w-full min-h-screen p-5 border border-gray-300 outline-none '>
                <Markdown className="w-full">{note}</Markdown>
            </div>
        </div>
    )
}