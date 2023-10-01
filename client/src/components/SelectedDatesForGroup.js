import { Input, Typography } from '@mui/material'
import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
export default function SelectedDatesForGroup(props) {
    const {dates, setDates,startDate,endDate} = props
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")

    const DateComponent = (props) => {
        const {date} = props
        const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
        const handleClick = () => {
            setDates(dates.filter((d)=>d.getTime()!==date.getTime()))
        }

        return (
            <div className="border border-gray-300 rounded-3xl p-2 m-2 flex justify-center items-center gap-2 bg-blue-600 hover:bg-red-700" onClick={handleClick}>
                <Typography variant="small">{weekdays[date.getUTCDay()]}, {date.getUTCMonth()+1}/{date.getUTCDate()} [x]</Typography>
            </div>
        )

    }

    const AddDateComponent = () => {
        const handleAddDate = (e) => {
            e.preventDefault()
            // check if the date is in the range
            const date = new Date(e.target.value)
            if (date.getTime()<startDate.getTime() || date.getTime()>endDate.getTime()){
                setOpen(true)
                setMessage("Date must be in the range")
                return
            }
            // check if the date is already in the dates array
            if (dates.map((d)=>d.getTime()).includes(date.getTime())){
                setOpen(true)
                setMessage("Date already selected")
                return
            }
            // sort the dates array
            const newDates = [...dates,date]
            newDates.sort((a,b)=>a.getTime()-b.getTime())
            setDates(newDates)
        }

        return (
            dates.length>0?(
            <div className="border border-gray-300 rounded-3xl p-2 m-2 flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 p-3">
                <Input type="date" size='sm' onChange={handleAddDate}/>
            </div>):null
        )
    }

    return (
        <div className='grid mt-32'>
        <Typography variant="h5" className="text-center">Selected Dates</Typography>
        <Typography variant="subtitle1" className="text-center">Change the dates to adjust class schedule</Typography>
        <div className="grid grid-cols-3 md:grid-cols-4 mt-4">
            {
                dates.map((date)=>(
                    <DateComponent date={date} key={date}/>
                ))
            }
            <AddDateComponent/>
        </div>

        <Typography variant="small" className="text-center  text-gray-600 mt-8">* you can add or delete dates withing range</Typography>
        <Snackbar
        
        open={open}
        onClose={()=>setOpen(false)}
        message={message}
        
        />

        </div>
    )
}