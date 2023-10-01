export default function GroupCard(props) {
    const group = props.group
    return (
        <div className="group-card border border-red-100 border-1 p-4  m-2 hover:scale-105 hover:bg-green-100" 
        onClick={()=>window.location.href=`/group/${group._id}`}
        >
            <h1 className="text-2xl font-bold">{group.name}</h1>
            <div className="flex gap-2">
            <p className=" text-gray-500 text-sm">{group.courseTitle}</p>
            <p className=" text-gray-500 text-sm">{group.courseNumber}</p>
            </div>
            <p className=" text-gray-500 text-sm">{group.instructor}</p>
            <p className=" text-gray-500 text-sm">{group.location}</p>
            <p className=" text-gray-500 text-sm">{group.startTime} - {group.endTime}</p>
            <p className=" text-gray-500 text-sm">
                {
                group.weekdays.map((day)=>(
                    <span>{day} </span>
                ))
                }
            </p>
            </div>
    )
}
