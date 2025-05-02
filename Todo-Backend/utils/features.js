import jwt from "jsonwebtoken";
import { encryptResponse } from "./encrypt-response.js";
import {user as userModel} from "../models/user.model.js";



export const setCookie = async (user, res, message, statusCode=200) => {
  
  const token = jwt.sign(
    {_id:user._id}, 
    process.env.JWT_SECRET,  
    {
      expiresIn:"1m"
    }
)



  const refreshToken = jwt.sign(
    {_id:user._id}, 
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:"30d"
    }
  )

  // console.log("from set token user: ", user)

  user.refreshToken = refreshToken
  await user.save()

//   const user = userModel.findByIdAndUpdate(preUser._id,
//     {
//       refreshToken:refreshToken  
//   }
// )


  res.status(statusCode)
  .cookie("token",token,{
    httpOnly:true,
    // maxAge:1000*60*60*24*30,
    // path:"/",
    // domain:"localhost",
    sameSite:"none",
    secure:true,
  })  
  .cookie("refreshToken",refreshToken,{
    httpOnly:true,
    // maxAge:1000*60*60*24*30,
    sameSite:"none",
    secure:true,
  })
  encryptResponse(res,{
    success:true,
    message,
    user,
    token,
    refreshToken,
  }) 
}