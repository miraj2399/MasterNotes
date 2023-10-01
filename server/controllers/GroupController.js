
const Group = require('../models/GroupModel');
const User = require('../models/UserModel');
const LectureDate = require('../models/LectureDateModel');

async function CreateGroupHandler(req, res) {
    const {name, courseNumber, courseTitle, instructor, location, startTime, endTime, startDate, endDate, weekdays, description, inviteOnly, dates} = req.body;
  

    try {
        const group = await Group.create({
            name: name,
            courseNumber: courseNumber,
            courseTitle: courseTitle,
            instructor: instructor,
            location: location,
            startTime: startTime,
            endTime: endTime,
            startDate: startDate,
            endDate: endDate,
            weekdays: weekdays,
            description: description,
            inviteOnly: inviteOnly,
            owner: req.userId
        });

        const lectureDates = [];

        for (let i = 0; i < dates.length; i++) {
            const lectureDate = await LectureDate.create({
                date: dates[i],
                group: group._id
            });
            lectureDates.push(lectureDate._id);
        }
        await group.updateOne({$push: {dates: lectureDates}});
    
        await User.findByIdAndUpdate(req.userId, {$push: {groups: group._id}});
        res.status(201).json(group);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }  
}

async function GetAllGroupsHandler (req, res) {
    try{
    const groupIds = await User.findById(req.userId).select("groups");
    const groups = await Group.find({
        '_id': { $in: groupIds.groups}
    });

    console.log(groupIds);
    res.status(200).json(groups);

}
catch (err) {
    console.log(err);
    res.status(500).json({message: err.message});   
}
}

async function GetGroupByIdHandler (req,res){
    try {
        const group = await Group.findById(req.params.id);
        const lectureDates = await LectureDate.find({
            '_id': { $in: group.dates}
        });
        group.dates = lectureDates;

        res.status(200).json(group);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
}



module.exports = {
    CreateGroupHandler,
    GetAllGroupsHandler,
    GetGroupByIdHandler
};