import {Button} from '@material-tailwind/react'
import PersonalNoteCard from './PersonalNoteCard'
import {useState, useEffect} from 'react'
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
        <div>
            <div className="flex p-3 flex-wrap">
                <h1 className="text-gray-800 text-3xl flex-1 font-bold">Personal Space</h1>
                <Button className="mr-3" style={{width:"150px", height: "50px"}} onClick={handleCreateNoteClick}>
                    Create Note
                </Button>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {notes.map((note) => (
                    <div key={note._id}>
                    <PersonalNoteCard note={note}  />
                    </div>
                ))}
            </div>
        </div>
    );
}