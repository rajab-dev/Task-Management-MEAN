import jwt  from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  username:{
    type:String,
    unique:true,
    required:true,
  },
  email:{
    type:String,
    unique:true,
    required:true,
  },
  password:{
    type:String,
    select:false,
    required:true
  },
  role:{
    type:String,
    default:"user"
  },
  tasks:[
    {
    type: mongoose.Schema.Types.ObjectId,
    ref:"task"
    }
  ],
  messages:[
     {
      type:mongoose.Schema.Types.ObjectId,
      ref:"message"
     }
  ],
  refreshToken:{
    type:String
  },
},{timestamps:true})

userSchema.methods.generateRefreshToken = function(){
 return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}


export const user = mongoose.model("user",userSchema)

