import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  isCompleted:{
    type:Boolean,
    default:false
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
},{timestamps:true})

export const task = mongoose.model("task",taskSchema)