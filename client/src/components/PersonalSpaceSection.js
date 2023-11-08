import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import PersonalNoteCard from './PersonalNoteCard';
import { GetAllNotesService } from '../services/SpaceService';
import { Link } from 'react-router-dom';

export default function PersonalSpaceSection() {
    const handleCreateNoteClick = () => {
        window.location.href = '/createPersonalNote';
    };

    const [notes, setNotes] = useState([]);
    
    useEffect(() => {
        async function getNotes() {
            const notes = await GetAllNotesService();
            setNotes(notes);
        }
        getNotes();
    }, []);

    return (
        <div className="bg-white p-8 rounded-lg ">
            <div className="flex items-center justify-between mb-4">
                <h1 className="hover:text-blue-500 text-gray-800 text-4xl text-center font-extralight">Personal Space</h1>
                <Button
                    color="blue"
                    onClick={handleCreateNoteClick}
                    className="px-6 py-2 text-white bg-cyan-500  hover:bg-cyan-600  rounded-md text-md font-light">
                    Create Note
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                {notes.map((note) => (
                    <div key={note._id}>
                        <Link to={`/personalNote/${note._id}`} >
                        <PersonalNoteCard note={note} />
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    );
}
