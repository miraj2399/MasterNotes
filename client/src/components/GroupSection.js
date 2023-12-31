import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import GroupCard from './GroupCard';
import { GetAllGroupsService } from '../services/GroupServices';
/**
 * Functional component representing a section for displaying groups.
 */

export default function GroupSection() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        GetAllGroupsService().then((data) => {
            setGroups(data);
        }, []);
    });

    const handleCreateGroupClick = () => {
        window.location.href = "/createGroup";
    };
    
    /**
     * GroupSection component
     * Displays a list of groups and provides a button to create a new group.
     */
    return (
        <div className="bg-white p-8 rounded-lg ">
            <div className="flex items-center justify-between mb-4">
                <h1 className="hover:text-green-500 text-gray-800 text-4xl text-center font-extralight">Groups</h1>
                <Button
                    color="green"
                    onClick={handleCreateGroupClick}
                    className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md text-md font-light">
                    Create Group
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                {groups.map((group) => (
                    <GroupCard key={group._id} group={group} />
                ))}
            </div>
        </div>
    );
}
