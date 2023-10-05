import {Button} from '@material-tailwind/react'
import GroupCard from './GroupCard'
import { useEffect,useState } from 'react'
import {GetAllGroupsService} from '../services/GroupServices'

export default function GroupSection(){
    const [groups, setGroups] = useState([])
    useEffect(() => {
        GetAllGroupsService().then((data)=>{
            setGroups(data)
            console.log(data)
        })

    }, [])

    const handleCreateGroupClick = () => {
        window.location.href = "/createGroup"
    }

    return (
        <div>
        <div className="flex p-3 flex-wrap">
        <h1 className="text-3xl font-bold flex-1">Groups</h1>
        <Button className="mr-3" onClick={handleCreateGroupClick}>
            Create Group
        </Button>
        </div>
        < div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        { groups&&groups.map((group)=>(
                <GroupCard key={group._id} group={group}/>
            ))
        }
        </div>
        </div>

    )

}