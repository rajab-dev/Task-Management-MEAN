

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  message:{
    type:String,
    required:true,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
},{timestamps:true})

export const message = mongoose.model("message",messageSchema)