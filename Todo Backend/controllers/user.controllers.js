import {user as userModel} from "../models/user.model.js";
import { message as messageModel } from "../models/message.model.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";
import { encryptResponse } from "../utils/encrypt-response.js";
import axios from "axios";





export const registerUser = async (req, res)=>{

try {

    const { username, email, password } = req.body
    
    const user = await userModel.findOne({
      $or: [
      { username }, 
      { email }
]})
  
    if(user){
     return encryptResponse(res,{success:false,error:"user already exists!!!"})
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    const createdUser = await userModel.create({
        username,
        email,
        password:hashedPassword,
    })
  
    setCookie(createdUser, res, "Registered Successfully",201)


} catch (error) {
   console.log(`Error Message: ${ error.message }`)
   encryptResponse(res, {success:false, error:"Something went wrong"})
}

}


export const loginUser = async (req, res) => {

  try {
    
    const { username, password } = req.body;

 
   console.log("username password =>", {username, password}) 
    

    const isUserExist = await userModel.findOne({username}).select("+password")

    console.log("is user exists =>", isUserExist)

    if(!isUserExist) return encryptResponse(res, {success:false,error:"username or password is invalid"})
        
      const decodedPassword = await bcrypt.compare(password,isUserExist.password)

      console.log("decoded password =>", decodedPassword)

      if(!decodedPassword) return encryptResponse(res, {success:false, error:"username or password is invalid"})

        setCookie(isUserExist,res,"Welcome Back", 200)
        
  } catch (error) {
    console.log(`Error Message: ${ error.message }`)
    encryptResponse(res, {success:false, error:"Something went wrong"})
  }


}


export const getMyProfile = async (req, res) => {
   try {
     const user = await userModel.findById(req.user._id).populate("tasks")
     encryptResponse(res, {success:true, user})
   } catch (error) {
    encryptResponse(res,{success:false, error:error.message})
   }
}

export const logout = async (req, res) => {

  const user = await userModel.findById(req.user._id);
         user.refreshToken = undefined;
         await user.save();

    res.cookie("token","",{
      expires:new Date(Date.now()),
      httpOnly:true,
      // path:"/",
      // domain:"localhost",
      sameSite:"none",
      secure:true,
    })

    res.cookie("refreshToken","",{
      expires:new Date(Date.now()),
      httpOnly:true,
      // path:"/",
      // domain:"localhost",
      sameSite:"none",
      secure:true, 
    })

    encryptResponse(res,{success:true,message:"logout successfully"})

    
}

export const isAdmin = (req, res) => {
try {
      console.log("user",req.user)
      const user = req.user
      encryptResponse(res,{success:true, user})

} catch (error) {
  encryptResponse(res,{success:false, error:error.message})
   
}
}

export const updateProfile = async (req, res) => {
   try {

    const { username, email } = req.body;

     const user =  await userModel.findOne({  _id: { $nin: [(req.user._id)] },
      $or:[
        {username},
        {email},
      ]
    })

     console.log("User:", user)
     if(user){
       return encryptResponse(res, {success:false, error:"user already exist!!!"})
     }

     const loggedInUser = await userModel.findByIdAndUpdate(req.user._id, {
      username,
      email,
     })

       await loggedInUser.save();
    
       encryptResponse(res, {success:true,})


   } catch (error) {
    encryptResponse(res, {success:false, error:error.message})
   }
}


export const changePassword = async (req, res) => {
    try {
      
      const { oldPassword, newPassword, repeatPassword } = req.body;

      // console.log(oldPassword, newPassword, repeatPassword)

      const user = await userModel.findById(req.user._id).select("+password"); 

      const isPassCorrect = await bcrypt.compare(oldPassword, user.password)

      console.log("isPassCorrect", isPassCorrect)

      if(!isPassCorrect){
         return encryptResponse(res, {success:false, error:"incorrect password!!!"})
      }

     const isPassSame = newPassword === repeatPassword; 

     if(!isPassSame){
        return encryptResponse(res, {success:false, error:" new passwords must be same!!!"})
     }

     const encryptedPassword = await bcrypt.hash(newPassword, 10);

     console.log("encrypted pass:", encryptedPassword);

     user.password = encryptedPassword;
     await user.save();


     encryptResponse(res, {success:true});

    } catch (error) {
      encryptResponse(res,{success:false, error:"something went wrong!!!"});
    }
}


export const refreshToken = async (req, res) => {
  console.log("in refresh token")
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return encryptResponse(res, { success: false, error: "No refresh token" });

  try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      const newAccessToken = jwt.sign({ _id: decoded._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

      encryptResponse(res, { success: true, accessToken: newAccessToken });
  } catch (error) {
      return encryptResponse(res, { success: false, error: "Invalid refresh token" });
  }
}


export const sendMessage = async (req, res) => {
     try {
        console.log("req body for send message =>", req.body)
         const { title, message } = req.body;
         const user = await userModel.findById(req.user._id);
         const newMessage = await messageModel.create({
            title,
            message,
            user: user._id
         })
         user.messages.push(newMessage._id)
         await user.save();
        encryptResponse(res, {success:true, message:newMessage})
     } catch (error) {
        encryptResponse(res, {success:false, error:error.message})
     }
}

export const home = (req, res)=>{
  res.send("working!!!!")
}