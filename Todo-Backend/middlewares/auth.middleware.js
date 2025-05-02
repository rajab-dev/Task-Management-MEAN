import jwt from "jsonwebtoken";
import { user as userModel } from "../models/user.model.js"
import { encryptResponse } from "../utils/encrypt-response.js";

export const isAuthenticated = async (req, res, next) => {
    // const { token } = req.cookies
    const token = req.headers.auth; 
    const refreshToken = req.headers["refresh-token"];
    console.log("refresh token backend: ", req.headers["refresh-token"])
    console.log("Token backend: ", token)
    // const sn = req.cookies.token
    // console.log("cookie from backend: ",sn)
   try {

     if(!token) return encryptResponse(res, {success:false, error:"login first"})
     // console.log("token", token)
     const decoded = await jwt.verify(token,process.env.JWT_SECRET) 
 
     //  console.log("decoded back:", decoded)
 
     if(decoded){
         const user = await userModel.findById(decoded._id)
         req.user = user;
         next();
     }
   } catch (error) {

    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      if (!refreshToken) {
          return encryptResponse(res, { success: false, error: "Session expired. Please log in again." });
      }

      try {
          const decodedRefreshToken = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

          const user = await userModel.findById(decodedRefreshToken._id);
          const newAccessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1m" });
          const newRefreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

          user.refreshToken = newRefreshToken
          await user.save();

          // console.log("generated new tokens from backend",newAccessToken, )
          // console.log("generated new tokens from backend", newRefreshToken)

          res.cookie("token", newAccessToken, {
            httpOnly:true,
            sameSite:"none",
            secure:true,
          });
          res.cookie("refreshToken", newRefreshToken, {
            httpOnly:true,
            sameSite:"none",
            secure:true,
          });


          res.setHeader("new-auth-token", newAccessToken);
          res.setHeader("new-refresh-token", newRefreshToken);

          req.user = user;
          next();
      } catch (refreshError) {
          return encryptResponse(res, { success: false, error: "Invalid refresh token. Please log in again." });
      }
  } else {
      return encryptResponse(res, { success: false, error: "Authentication failed." });
  }
}
   }
  

