import  express from "express";
import { changePassword, getMyProfile, home, isAdmin, loginUser, logout, refreshToken, registerUser, sendMessage, updateProfile } from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { decryptRequest } from "../middlewares/encryption.middleware.js";
import { csrfMiddleware } from "../middlewares/csrfToken.middleware.js";

const router = express.Router();


router.get("/",home)

router.post("/register",decryptRequest, registerUser)
router.post("/login", decryptRequest, loginUser) 
router.get("/me", isAuthenticated,decryptRequest,getMyProfile)
router.get("/check-role",isAuthenticated, decryptRequest, isAdmin)
router.put("/update-profile", isAuthenticated, decryptRequest, updateProfile)
router.get("/logout", isAuthenticated, logout);
router.put("/change-password", isAuthenticated, decryptRequest, changePassword);
router.get("/refresh-token",decryptRequest, refreshToken);
router.post("/send-message",isAuthenticated, decryptRequest, sendMessage )



export default router