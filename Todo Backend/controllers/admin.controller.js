import {user as userModel} from "../models/user.model.js";
import { task as taskModel } from "../models/task.model.js";
import { encryptResponse } from "../utils/encrypt-response.js";
import { message as messageModel } from "../models/message.model.js";




export const fetchAdminDashboard = async ( req, res ) => {

          try {

            const users = await userModel.find({}).populate("tasks");
            const filteredUsers = users.filter((user) => {
                return user.username !== "admin";
            })

            const tasks = await taskModel.find({})
            
            encryptResponse(res, {success:true, filteredUsers, tasks})


            
         } catch (error) {
            encryptResponse(res, {success:false, error:error.message})
             
        }


}


export const changeRole = async (req, res) => {

try {
        console.log("Role: ", req.body)
  
        const user = await userModel.findById(req.body.id)
        user.role = req.body.role;
        await user.save();
  
        encryptResponse(res, { success:true, user })
} catch (error) {

   encryptResponse(res, {success:false, error:error.message})

}
}


export const deleteUser = async (req, res) => {
   try {

    await userModel.findByIdAndDelete(req.params.id)

    encryptResponse(res, {success:true})
    
   } catch (error) {
      encryptResponse(res, {success:false, error:error.message})
   }
}

export const getAllUserTask = async (req, res) => {
try {
         const tasks = await taskModel.find({}).populate("user")
         console.log("Tasks Backend:" ,tasks)
         encryptResponse(res, {success:true, tasks})

} catch (error) {
   encryptResponse(res, {success:false})
   
}
}

export const getAllMessages = async (req, res) => {
     try {
       const allMessages = await messageModel.find({}).populate("user")
       encryptResponse(res, { success:true, allMessages})
     } catch (error) {
         encryptResponse(res, {success:false, error:error.message})
     }
}


export const getAllUsers = async (req, res) => {
     try {
        const users = await userModel.find({}).populate("tasks")
         encryptResponse(res, {success:true, users})
     } catch (error) {
         encryptResponse(res, {success:false})
        
     }
}  