const cron = require('node-cron');
const TaskModel = require('../database/models/Task');
const {CreateTask} = require('../database/repository/user-task-repo')


cron.schedule('0 0 * * *',async() => {
    console.log("cron started")
    const now = new Date();
    const tasks = await TaskModel.find({lastOccurrence:false});
    try {
        tasks.forEach(async (task) => {
            if (new Date(task.dueDate).getDate() < now.getDate()) {
                let newDueDate = new Date(task.dueDate);
    
                if (task.recurrence === 'daily') {
                    newDueDate.setDate(newDueDate.getDate() + 1);
                } else if (task.recurrence === 'weekly') {
                    newDueDate.setDate(newDueDate.getDate() + 7);
                } else if (task.recurrence === 'monthly') {
                    newDueDate.setMonth(newDueDate.getMonth() + 1);s
                }
                
                await CreateTask({
                    _id : task.user,
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    dueDate: newDueDate,
                    recurrence: task.recurrence,
                })
                task.lastOccurrence = true
                await task.save();
            }
        });
    } catch (error) {
        console.log(error)
    }
});

