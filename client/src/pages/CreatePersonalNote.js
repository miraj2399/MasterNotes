
import Markdown from 'react-markdown'
import { useState } from 'react';
import { Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { CreateNoteService } from '../services/SpaceService';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Modal from "react-modal";

export default function CreatePersonalNote() {
    const [note, setNote] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
      setIsOpen(true);
  }
  
  function closeModal() {
      setIsOpen(false);
  }
  
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '80vw',
      height: '80vw',
      marginRight: '-50%',
      maxHeight: '500px',
      transform: 'translate(-50%, -50%)',
    },
  };
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
                    <SaveIcon onClick={(e)=>{
                        e.preventDefault()
                        CreateNoteService({
                            content:note
                        })
                        window.location.href = "/dashboard"
                    }}
                        />
                </button>
                <button className="bg-red-400 text-white p-2 rounded-3xl flex justify-center items-center gap-2">
                    <CancelIcon/>
                </button>
                <div>
                <button className="bg-red-400 text-white p-2 rounded-3xl flex justify-center items-center gap-2" onClick={openModal}>
                    <QuestionMarkIcon/>
                </button>   
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Information"
                    style={customStyles}
                >
                <div className="font-bold text-center">Markdown Instructions</div><br />
                <div className="text-center">
                <b># Heading 1</b> <br />
                <b>## Heading 2</b> <br />
                <b>### Heading 3</b> <br />
                <b>Bold </b>	**bold text**<br />
                <b>Italic	</b>*italicized text*<br />
                <b> Autolink literals</b>
                <br />
                www.example.com, https://example.com, and contact@example.com.
                <br />
                <b>Footnote</b>
                <br />
                A note[^1]
                <br />
                [^1]: Big note.
                <br />
                <b>Strikethrough</b>
                <br />
                ~one~ or ~~two~~ tildes.
                <br />
                <b>Table</b> 
                <br />
                | a | b  |  c |  d  |
                | - | :- | -: | :-: |
                <br />
                <b>Tasklist</b>
                <br />
                * [ ] to do
                <br />
                * [x] done
                </div>
                </Modal>
            </div>

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