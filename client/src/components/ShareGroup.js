import { useState, useEffect } from "react"
import Popup from 'reactjs-popup';
import Modal from "react-modal";
import { Button, Input } from "@material-tailwind/react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from "@mui/material";

export default function ShareGroup(props){
    const {group} = props;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

   
    const handleCopy = async () => {
        const inputElement = document.getElementById('inviteLinkInput');
      
        if (inputElement) {
          try {
            await navigator.clipboard.writeText(inputElement.value);
            setIsCopied(true);
      
            // Optionally, you can reset the "Copied" state after a certain time
            setTimeout(() => setIsCopied(false), 3000);
      
            console.log('Link copied to clipboard!');
          } catch (err) {
            console.error('Unable to copy to clipboard:', err);
          }
        }
      };

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          maxHeight: '500px',
          width: '80%', // Set the width to 80% of the parent container
          maxWidth: '600px', // Set a maximum width if needed
          transform: 'translate(-50%, -50%)',
        },
      };
      

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const inviteLink = `http://localhost:3000/group/${group._id}`

    return (
        <div className="text-center">
        <div>
        <Button className="bg-white hover:bg-white bg-opacity-50 border text-black font-light text-sm border-black border-2" onClick={openModal}>Share</Button>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Invite"
        >
              <div>
          <h1 color="blue-gray" className="text-gray-800 text-lg text-center font-extralight mb-1 mt-5">
            Share Link
          </h1>
          <p className="text-gray-600 text-mg text-center font-extralight mb-5">
          Anyone with the link can join the group
          </p>
          <div className="flex items-center ml-5">
            <Input id="inviteLinkInput" type="text" readOnly="readonly" value={inviteLink} />
            <div className="ml-5 mr-5">
            <IconButton onClick={handleCopy}> <ContentCopyIcon /></IconButton></div>
                </div>
                {isCopied && <p className="mt-5 text-center font-light text-green-500">Link copied to clipboard!</p>}
                </div>
            </Modal>
        </div>
        </div>
    )
}
