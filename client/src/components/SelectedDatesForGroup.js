import { Typography } from '@mui/material'
import React, { useState } from 'react'
export default function SelectedDatesForGroup() {
    const DateComponent = (props) => {
        const [selected, setSelected] = useState(true)
        
        return (selected) ? (
            <div className="border  border-red-100 bg-green-200 border-4 rounded-3xl p-4 m-2 " onClick={()=>setSelected(!selected)}>
                <p className="text-sm">{props.date}</p>
            </div>
        ) : (
            <div className="border  border-red-100 border-4 p-4 m-2  rounded-3xl " onClick={()=>setSelected(!selected)}>
                <p className="text-sm">{props.date}</p>
            </div>

        )
    }

    return (
        <div className='grid mt-32'>
        <Typography variant="h5" className="text-center">Selected Dates</Typography>
        <Typography variant="subtitle1" className="text-center">Change the dates to adjust class schedule</Typography>
        <div className="grid grid-cols-3 md:grid-cols-5 mt-4">
            <DateComponent date="Sep 30, Tue"/>
            <DateComponent date="Oct 1, Thu"/>
            <DateComponent date="Oct 3, Tue"/>
            <DateComponent date="Oct 6, Thu"/>
            <DateComponent date="Oct 9, Tue"/>

            <DateComponent date="Sep 30, Tue"/>
            <DateComponent date="Oct 1, Thu"/>
            <DateComponent date="Oct 3, Tue"/>
            <DateComponent date="Oct 6, Thu"/>
            <DateComponent date="Oct 9, Tue"/>
        </div>

        <Typography variant="small" className="text-center  text-gray-600 mt-8">* you can unselect dates by clicking on the date</Typography>
        </div>
    )
}