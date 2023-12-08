import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GetPersonalNoteByIdService, EditNoteService } from '../services/SpaceService';
// Define EditPersonalNote component

export default function EditPersonalNote() {
  // Get the 'id' parameter from the URL
  const { id } = useParams();
  // State variables to store note details and content
  const [note, setNote] = useState({});
  const [content, setContent] = useState("");
  // Fetch note details when the component mounts or 'id' changes
  useEffect(() => {
    async function getNote() {
      const noteRecieved = await GetPersonalNoteByIdService(id); // Fetch note by ID
      setNote(noteRecieved); // Set the fetched note
      setContent(noteRecieved.content); // Set the content of the note
    }
    getNote(); // Invoke the function to fetch note details
  }, [id]); // Trigger the effect when 'id' changes
  // Function to handle form submission for editing the note
  async function handleSubmit(e) {
    e.preventDefault();
    const newNote = {
      content: content, // Updated content of the note
      owner: note.owner // Keeping the owner information unchanged

    };
    // Send a request to edit the note using EditNoteService
    const response = await EditNoteService(id, newNote).then((data) => {
      window.location.href = `/personalNote/${id}`; // Redirect to the edited note's page

    }
    ).catch((err) => {
      console.log(err); // Log any errors that occur during the editing process
    });

  }
  // JSX for the EditPersonalNote component

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