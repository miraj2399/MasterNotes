//this function generates an array of dates within a specified range (from startDate to endDate) that match the given weekdays. It takes 3 parameters to compute the dates in the range
export default function getDatesInRange(startDate,endDate,weekdays){
    const order = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    const days = weekdays.map((day)=>order.indexOf(day))
    var currentDate = startDate
    const dates = []
    console.log("at the beginning of the function", currentDate)
    while (currentDate<=endDate){
        if (days.includes(currentDate.getDay())){
            dates.push(new Date(currentDate.getTime()))
        }
        currentDate.setDate(currentDate.getDate()+1)
    }
    return dates
}

