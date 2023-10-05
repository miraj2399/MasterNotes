import { useState, useEffect } from "react"
import { Button, Input } from "@material-tailwind/react";
import { InviteJoinGroupService } from "../services/GroupServices";
export default function InviteJoinGroup(props){
    const {group} = props;
    const [emails, setEmails] = useState([]);
    const [message, setMessage] = useState("");

    return (
        <div className="text-center p-5">
            <p className="text-gray-900 text-bold">Invite people to join your group</p>
            <div className="flex gap-2">
            {emails.map((email) => (
                <div className="bg-green-300 hover:bg-red-300 p-4 m-2 hover:scale-101 rounded-xl" onClick={(e)=>setEmails(emails.filter(
                    (item) => item !== email
                ))}>
                    <p>{email}</p>
                </div>
            ))}
            </div>
            <Input type="text" placeholder="Message" onKeyDown={(e) => {
                if (e.key === 'Enter'){
                    setMessage(e.target.value);
                    e.target.value = "";
                }
            }}/>
            <Input type="email" placeholder="Email" onKeyDown={(e) => {
                if (e.key === 'Enter'){
                    setEmails([...emails, e.target.value]);
                    e.target.value = "";
                }
            }
            }/>

            <Button className="bg-green-500 mt-2" onClick={() => {
                InviteJoinGroupService(group._id, emails,message).then((data) => {
                    window.location.href = "/dashboard"
                })
            }}>
                Invite
            </Button>
            
        </div>
    )
}