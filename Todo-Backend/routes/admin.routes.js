import  express  from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { changeRole, deleteUser, fetchAdminDashboard, getAllMessages, getAllUsers, getAllUserTask } from "../controllers/admin.controller.js";
import { decryptRequest } from "../middlewares/encryption.middleware.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, decryptRequest, fetchAdminDashboard)
router.post("/change-role", isAuthenticated, decryptRequest, changeRole)
router.delete("/delete-user/:id", isAuthenticated,decryptRequest, deleteUser)
router.get("/get-users-tasks", isAuthenticated, decryptRequest, getAllUserTask)
router.get("/get-messages", isAuthenticated, decryptRequest, getAllMessages)
router.get("/get-users", isAuthenticated, decryptRequest, getAllUsers)

export default router;