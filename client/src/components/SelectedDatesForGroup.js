import { Input } from '@mui/material'
import {
    Typography,
  } from "@material-tailwind/react";
import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
/**
 * Functional component representing the display of selected dates for a group.
 * 
 *   @param {Object} props - The properties passed to the component.
 *   @param {Array} dates - The array of selected dates.
 *   @param {Function} setDates - The function to update the selected dates.
 *   @param {Date} startDate - The start date for the date range.
 *   @param {Date} endDate - The end date for the date range.
 */
export default function SelectedDatesForGroup(props) {
    const {dates, setDates,startDate,endDate} = props
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [dateText, setDateText] = useState("No Dates Selected Yet")

    /**
     * Component representing an individual selected date.
     * 
     * @param {Object} props - The properties passed to the component.
     * @param {Date} date - The selected date.
     */

    const DateComponent = (props) => {
        setDateText("Selected Dates");
        const {date} = props
        const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
        const handleClick = () => {
            setDates(dates.filter((d)=>d.getTime()!==date.getTime()))
        }

        return (
            <div className="border h-14 border-gray-300 rounded-3xl p-2 m-2 flex justify-center items-center gap-2 bg-cyan-500 bg-opacity-50 hover:bg-red-200" onClick={handleClick}>
            <Typography variant="small">{weekdays[date.getDay()]}, {date.getMonth()+1}/{date.getDate()} [x]</Typography>
          </div>
        )

    }
    
    /**
     * Component representing the input for adding a new date.
     */
    const AddDateComponent = () => {
        /**
         * Handles the submit event for adding a new date.
         * 
         * @param {Object} e - The submit event.
         */
        const handleAddDate = (e) => {
            e.preventDefault()
            // check if the date is in the range
            const date = new Date(e.target.value + " EDT")
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
                <div className="border h-14 border-gray-300 rounded-3xl p-2 m-2 flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 p-3">
                <Input type="date" size='sm' onChange={handleAddDate}/>
              </div>):null
        )
    }

     /**
     * SelectedDatesForGroup component
     * Displays a grid of selected dates, an input for adding new dates, and a Snackbar for displaying messages.
     */
    return (
        <div className='grid mt-10'>
        <Typography className="text-center text-gray-900 text-3xl">{dateText}</Typography>
        <Typography variant="subtitle1" className="text-center text-xl mt-4">Add class dates to view and adjust schedule</Typography>
        <div className="grid grid-cols-3 md:grid-cols-3 mt-3">
            {
                dates.map((date)=>(
                    <DateComponent date={date} key={date}/>
                ))
            }
            <AddDateComponent/>
        </div>

        <Typography variant="small" className="text-center  text-gray-600 mt-3">You can add or delete dates within range</Typography>
        <Snackbar
        
        open={open}
        onClose={()=>setOpen(false)}
        message={message}
        
        />

        </div>
    )
}