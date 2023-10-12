import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import PersonalNoteCard from './PersonalNoteCard';
import { CreateNoteService, GetAllNotesService } from '../services/SpaceService';

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
                <h1 className="text-4xl font-extrabold text-green-700 tracking-wide">Personal Space</h1>
                <Button
                    color="green"
                    onClick={handleCreateNoteClick}
                    className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md">
                    Create Note
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {notes.map((note) => (
                    <div key={note._id}>
                        <PersonalNoteCard note={note} />
                    </div>
                ))}
            </div>
        </div>
    );
}
