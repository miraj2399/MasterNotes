import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GetPersonalNoteByIdService, EditNoteService} from '../services/SpaceService';
export default function EditPersonalNote() {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [content, setContent] = useState("");
  useEffect(() => {
    async function getNote() {
      const noteRecieved = await GetPersonalNoteByIdService(id);
      setNote(noteRecieved);
      setContent(noteRecieved.content);
    }
    getNote();
  }, [id]);
  async function handleSubmit(e) {
    e.preventDefault();
    const newNote = {
      content: content,
      owner: note.owner
    };
    const response = await EditNoteService(id, newNote).then((data) => {
      window.location.href = `/personalNote/${id}`;
    }
    ).catch((err) => {
      console.log(err);
    });

  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row gap-2 items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Last updated at {new Date(note.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        })}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <textarea className="w-full h-96 p-2 rounded-md" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
      </form>
    </div>

  )
}