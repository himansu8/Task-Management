import calculateReminder from '../utils/reminder.js';
import schedule from 'node-schedule';
import reminderScheduling from '../utils/scheduleJob.js'
import taskModel from '../models/taskModel.js';
import userModel from '../models/userModel.js';
import mongoose from 'mongoose';
//import sendMail from '../email_demo.js';


export async function createTask(req, res) {
    try {
        //console.log("decoded==>>",req.payload.user_id);
        const { taskName, taskDeadLine } = req.body

        // find user id database
        let userFound = await userModel.findById(req.payload.user_id)
        //console.log(userFound)
        if (!userFound) {
            return res.status(404).json({ error: 'not found' })
        }

        let cur_date = new Date();
        let deadline_date = new Date(taskDeadLine);


        let reminders = calculateReminder(cur_date, deadline_date);
        //taskObj.reminder = [...reminders]

        const existingTask = await taskModel.findOne({
            // userId: req.payload.user_id,
            taskName: taskName
        });

        if (existingTask) {
            return res.status(400).json({ error: 'Task name already exists for this user' });
        }


        let taskObj = {
            userId: req.payload.user_id,
            taskName,
            createdAt: cur_date,
            deadline: deadline_date,
            isCompleted: false,
            // reminder: []
            reminders
        }


        let task = await taskModel.create(taskObj);


        res.status(200).json({ msg: "task created successfylly" })

        let userMailBody = {
            to: userFound.email,
            subject: "Task Tracker",
            text: `Your Task ${taskObj.taskName} has been scheduled`,
            html: `<h1>Your Task ${taskObj.taskName} has been scheduled</h1>`
        }

        //scheduling the reminders notification for the each task

        reminders.forEach((ele, index) => {
            schedule.scheduleJob(`${task._id}_${index + 1}`, ele, () =>
                reminderScheduling(userMailBody)
            );
        })

        // reminders.forEach((ele, index) => {
        //     schedule.scheduleJob(`${task._id}_${index + 1}`, ele, function (){
        //         sendMail(userMailBody)
        //     }); 
        // }) 

        console.log("my reminder >>>> ", schedule.scheduledJobs);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })
    }
}

export async function deleteTask(req, res) {
    try {
        //console.log("decoded==>>",req.payload.user_id);
        const { taskid } = req.params


        let userFound = await userModel.findById(req.payload.user_id)
        //console.log(userFound)
        if (!userFound) {
            return res.status(404).json({ error: 'not found' })
        }

        
        if (!mongoose.isValidObjectId(taskid)) {
            return res.status(400).json({ error: 'please pass valid taskid' })
        }

        let singletask = await taskModel.findOneAndDelete({ _id: taskid });
        //console.log(singletask)
        if (!singletask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        //remove the schedule jobs
        let userMail = {
            to: userFound.email,
            subject: "Task Tracker Deleted",
            text: `Your Task ${singletask.taskName} has been deleted`,
            html: `<h1>Your Task ${singletask.taskName} has been deleted</h1>`
        }
        singletask.reminders.forEach((ele, index) => {
            schedule.cancelJob(`${taskid}_${index + 1}`);
            reminderScheduling(userMail)
        });

        //console.log(schedule.scheduledJobs)

        res.status(200).json({ msg: "task deleted successfylly" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })
    }
}

export async function updateTask(req, res) {
    try {
        //console.log("decoded==>>",req.payload.user_id);
        const { taskid } = req.params
        const { updateTaskName, taskDeadLine, newIsCompleted } = req.body
        //console.log(req.body);
        //console.log(req.params);


        let userFound = await userModel.findById(req.payload.user_id)
        //console.log(userFound)
        if (!userFound) {
            return res.status(404).json({ error: 'not found' })
        }



        if (!mongoose.isValidObjectId(taskid)) {
            return res.status(400).json({ error: 'please pass valid taskid' })
        }

        let deadline_date = new Date(taskDeadLine);
        let cur_date = new Date()
        let newReminders = calculateReminder(cur_date, deadline_date)

        //console.log(newReminders);


        let task = await taskModel.findByIdAndUpdate(
            taskid,
            { $set: { taskName: updateTaskName, deadline: deadline_date, reminders: newReminders, isCompleted: newIsCompleted } },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ error: 'task not found' })
        }
        //console.log(task)
        let userMailBody = {
            to: userFound.email,
            subject: "Task Tracker updated",
            text: `Your Task ${task.taskName} has been scheduled`,
            html: `<h1>Your Task ${task.taskName} has been updated and scheduled</h1>`
        }
        let userMail = {
            to: userFound.email,
            subject: "Task Tracker",
            text: `Your Task ${task.taskName} has been completed`,
            html: `<h1>Your Task ${task.taskName} has been completed</h1>`
        }
        //cancell the job 
        task.reminders.forEach((ele, index) => {
            schedule.cancelJob(`${taskid}_${index + 1}`);
            reminderScheduling(userMail)
            //console.log("cancell the job")
        })

        if (task.isCompleted == false) {
            //rescheduling the jobs===========================================
            task.reminders.forEach((ele, index) => {
                schedule.scheduleJob(`${taskid}_${index + 1}`, ele, () => reminderScheduling(userMailBody));
            })
            //console.log("reshedule")
        }

        console.log("my reminder >>>> ", schedule.scheduledJobs);
        

        res.status(200).json({ msg: "task updated successfylly" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })



    }
}


export async function allTask(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.payload.user_id)) {
            return res.status(400).json({ error: 'please pass valid userid' })
        }

        let tasks = await taskModel.find({ userId: req.payload.user_id });


        if (!tasks) {
            return res.status(404).json({ error: 'task not found' })
        }

        res.status(200).send(tasks)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })
    }
}

export async function singleTask(req, res) {
    try {
        const { taskid } = req.params

        if (!mongoose.isValidObjectId(taskid)) {
            return res.status(400).json({ error: 'please pass valid taskid' })
        }


        let singletask = await taskModel.findById(taskid);
        //console.log(singletask)

        if (!singletask) {
            return res.status(404).json({ error: 'task not found' })
        }
        res.status(200).send(singletask)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })
    }
}

