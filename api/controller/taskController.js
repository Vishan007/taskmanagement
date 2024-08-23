const {CreateTask,FindTaskUserById,UpdateTask,DeleteTask,GetTaskbyId,SearchTask} = require('../../database/repository/user-task-repo')

const AddTask = async (req , res) => {
    try {
        const { _id ,title, description,status,dueDate,recurrence} = req.body;
        const newTask = await CreateTask({_id ,title, description,status,dueDate,recurrence});
        return res.status(201).json({ message: 'Task added successfully',data: newTask});
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' })
    }
}

const GetAllTaskbyUser = async (req , res) => {
    try {
        const alltask = await FindTaskUserById(req);
        return res.status(201).json({'data': alltask});
    } catch (error) {
        console.log("🚀 ~ file: taskController.js:18 ~ GetAllTaskbyUser ~ error:", error)
        res.status(400).json({ message: 'Bad Request' })
    }
}

const GetTaskId = async (req , res) => {
    try {
        const taskId = req.params.id;
        const oldTask = await GetTaskbyId(taskId)
        return res.status(200).json({data: oldTask });
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' })
    }
}
const UpdateTaskbyId = async (req , res) => {
    try {
        const updatedTask = await UpdateTask(req)
        return res.status(200).json({ message: 'Task updated successfully', data: updatedTask });
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' })
    }
}

const DeleteTaskbyId = async (req , res) => {
    try {
        const taskId = req.params.id;
        await DeleteTask(taskId)
        return res.status(200).json({ message: 'Task deleted successfully'});
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' })
    }
}

const Search  = async (req,res) => {
    try {
        const result = await SearchTask(req)
        return res.status(200).json({data: result });
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' })
    }
}

module.exports = {AddTask,GetAllTaskbyUser,UpdateTaskbyId,DeleteTaskbyId,GetTaskId,Search}
