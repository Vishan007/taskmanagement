const { UserModel, TaskModel } = require('../models');


const CreateUser = async({ userName, password }) => {
    const user = new UserModel({
        userName,
        password,
    })
    const userResult = await user.save();
    return userResult;
}

const FindUser = async (userName) => {
    const existingCustomer = await UserModel.findOne({userName:userName});
    return existingCustomer;
}


const CreateTask = async({_id,title,description,status,dueDate,recurrence}) => {
    const user = await UserModel.findById(_id,{password : 0,  __v : 0});
    if (user) {
        const newTask = new TaskModel({
            title,
            description,
            status,
            dueDate,
            recurrence,
            user : _id
        })
        await newTask.save();
        user.task.push(newTask);
    }
    return await user.save();
}

const FindTaskUserById = async (req) => {
    const { _id } = req.user;
    const { status, dueDate } = req.query;
    let filteredTasks = await UserModel.findById(_id).populate('task');
    if (filteredTasks && (status || dueDate) ){
        if (status) {
            filteredTasks = filteredTasks?.task?.filter(task => task.status.includes(status));
            return filteredTasks;
        } 
        if (dueDate) {
            filteredTasks = filteredTasks?.task?.filter(task => task?.dueDate.getDate() === new Date(dueDate).getDate())
            return filteredTasks;
        };
    }else{
        return filteredTasks?.task;
    }
};

const GetTaskbyId = async (id) => {
    const existingTask = await TaskModel.findById(id);
    return existingTask;
};


const UpdateTask = async (req) => {
    const taskId = req.params.id;
    const updatedTask = await TaskModel.findOneAndUpdate(
        { _id: taskId },
        req.body,
    );
    return updatedTask;
};

const DeleteTask = async (id) => {
    const oldTask = GetTaskbyId(id)
    if(oldTask){
        await TaskModel.deleteOne({ _id: id });
        return true
    }else{
        return false
    }
};

const DeleteUserTask = async (req) => {
    const { _id } = req.user;
    const taskId = req.params.id;
    const user = await UserModel.findById(_id);
    let index = user.task.indexOf(taskId)
    if (index !== -1) {
        user.task.splice(index, 1);
    }
    await user.save()
}

const SearchTask = async (req) => {
    const q = req.query;
    const filteredTask = await TaskModel.find({
        $or: [
            {
                'title': new RegExp(`${q?.title}`, 'i')
            },
            {
                'description': new RegExp(`${q?.description}`, 'i')
            },
        ]
    }, {__v: 0 })
    return filteredTask;
};

module.exports = {CreateUser,FindUser,FindTaskUserById,CreateTask,UpdateTask,DeleteTask,GetTaskbyId,SearchTask,DeleteUserTask};