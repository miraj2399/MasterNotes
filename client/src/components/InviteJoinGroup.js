import { useState, useEffect } from "react"
import Popup from 'reactjs-popup';
import Modal from "react-modal";
import { Button, Input } from "@material-tailwind/react";
import { InviteJoinGroupService } from "../services/GroupServices";
/**
 * Functional component representing a button to invite people to join a group.
 * 
 * @param {Object} props - The properties passed to the component.
 *   @param {Object} group - The group object for which invitations are being sent.
 */

export default function InviteJoinGroup(props){
    const {group} = props;
    const [emails, setEmails] = useState([]);
    const [message, setMessage] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          maxHeight: '500px',
          transform: 'translate(-50%, -50%)',
        },
      };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    /**
     * InviteJoinGroup component.
     * Displays a button to open the invitation modal and allows users to invite others to join the group.
     */
    return (
        <div className="text-center">
        <div>
        <Button className="bg-white hover:bg-white bg-opacity-50 border text-black font-light text-sm border-black border-2" onClick={openModal}>Invite</Button>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Invite"
        >
            <div>
            <h1 color="blue-gray" className="text-gray-800 text-lg text-center font-extralight mb-5 mt-5">Invite people to join your group</h1>
                <div className="mb-3">
                    <Input type="text" placeholder="Message" onKeyDown={(e) => {
                    if (e.key === 'Enter'){
                        setMessage(e.target.value);
                        e.target.value = "";
                    }
                }}/></div>
                <div className="mb-5">
                <Input type="email" placeholder="Email" onKeyDown={(e) => {
                    if (e.key === 'Enter'){
                        setEmails([...emails, e.target.value]);
                        e.target.value = "";
                    }
                }
                }/></div>
                {emails.map((email) => (
                    <div className="bg-green-300 hover:bg-red-300 p-4 m-2 hover:scale-101 rounded-xl" onClick={(e)=>setEmails(emails.filter(
                        (item) => item !== email
                    ))}>
                        <p>{email}</p>
                    </div>
                ))}

                <div className="flex justify-center items-center">
                <Button className="bg-green-500 mt-2" onClick={() => {
                InviteJoinGroupService(group._id, emails,message).then((data) => {
                    window.location.href = "/dashboard"
                })
            }}>
                Invite
            </Button></div>
            </div>
            </Modal>
        </div>
        </div>
    )
}
