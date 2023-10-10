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
        <h1 className="text-gray-800 text-3xl flex-1 font-bold"> My Groups</h1>
        <Button className="mr-3"  style={{width:"150px", height: "50px"}} onClick={handleCreateGroupClick}>
            Create Group
        </Button>
        </div>
        < div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        { groups&&groups.map((group)=>(
                <GroupCard key={group._id} group={group}/>
            ))
        }
        </div>
        </div>

    )

}