import { task as taskModel } from "../models/task.model.js";
import {user as userModel} from "../models/user.model.js";
import { encryptResponse } from "../utils/encrypt-response.js";

export const newTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const isExist = await taskModel.findOne({
      $and:[
        {user:req.user._id},
        {description},
      ],
    })
       console.log("IsExist: ",isExist);
    if(isExist){
      return encryptResponse(res, {success:false, error:"task already exists"})
    }
    const newTask = await taskModel.create({
      title,
      description,
      user: req.user._id,
    });

    const user = await userModel.findById(req.user._id)

     user.tasks.push(newTask._id)

     await user.save();

     encryptResponse(res, { success: true, newTask });
  } catch (error) {
    encryptResponse(res, { success: false, error: "something went wrong" });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const {taskTitle, taskDescription, taskStatus, dateFrom, dateTo, page, pageSize} = req.body;
    const query = {
      user: req.user._id
    };

    if(dateFrom && dateTo){
      const startDateTime = new Date(dateFrom);
      const endDateTime = new Date(dateTo);
   query.createdAt= {
      $gte: startDateTime, // Greater than or equal to start date-time
      $lte: endDateTime    // Less than or equal to end date-time
    }
  }
    // Add title filter only if taskTitle exists
    if (taskTitle) {
      query.title = { $regex: taskTitle, $options: 'i' }; // Case-insensitive search
    }
    
    if (taskStatus) {
      query.isCompleted = taskStatus == "1" ? true : false 
    }
    if (taskDescription) {
      query.description = { $regex: taskDescription, $options: 'i' };
    }
    let tasks = await taskModel.find(query)  
    .sort({ createdAt: -1 })
    .skip(page * pageSize)
    .limit(pageSize);
    const total = await taskModel.countDocuments(query);
    encryptResponse(res,{ success: true, tasks,total } )
  }catch (error) {
   const  data = { success: false, error: "something went wrong" }
    encryptResponse(res, data)     
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findById(id);
    task.isCompleted = !task.isCompleted;

   await task.save();

   encryptResponse(res, { success: true,task, message: "Task Updated Successfully" });
  } catch (error) {
    encryptResponse(res, { success: false, error: "something went wrong" });

  }
};


export const editTask = async (req, res) => {
    try {

      const { id } = req.params

      const { title, description } = req.body;

      const task = await taskModel.findById(id)
      task.title = title,
      task.description = description
      await task.save();


      encryptResponse(res, {success:true, task})

    } catch (error) {
      
      encryptResponse(res, {success:false, error:"something went wrong!!!"})
    }
}


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    let user = await userModel.findById(req.user._id);

    const userTasks = user.tasks.filter((task) => {
       return task._id.toString() !== id.toString()  
    })

    user.tasks = userTasks;
    await user.save();

    await taskModel.findByIdAndDelete(id);

    encryptResponse(res,{ success: true, message: "Task Deleted Successfully" });
  } catch (error) {
    encryptResponse(res, { success: false, error: "something went wrong" });

  }
};
