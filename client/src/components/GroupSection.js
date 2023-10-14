import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import GroupCard from './GroupCard';
import { GetAllGroupsService } from '../services/GroupServices';

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

    return (
        <div className="bg-white p-8 rounded-lg ">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl font-extrabold text-blue-700 tracking-wide">Groups</h1>
                <Button
                    color="blue"
                    onClick={handleCreateGroupClick}
                    className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                    Create Group
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {groups.map((group) => (
                    <GroupCard key={group._id} group={group} />
                ))}
            </div>
        </div>
    );
}
