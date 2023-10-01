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

