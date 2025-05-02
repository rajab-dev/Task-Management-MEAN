import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { 

  deleteTask, 
  editTask, 
  getAllTask, 
  newTask, 
  updateTask 

    } from "../controllers/task.controller.js";

import { decryptRequest } from "../middlewares/encryption.middleware.js";
import { csrfMiddleware } from "../middlewares/csrfToken.middleware.js";



const router = express.Router()


router.post("/new", isAuthenticated, csrfMiddleware, decryptRequest, newTask) 

router.get("/all-tasks", isAuthenticated, csrfMiddleware, decryptRequest, getAllTask)
router.post("/getUserTasks", isAuthenticated, csrfMiddleware, decryptRequest, getAllTask)

router.put("/update/:id", isAuthenticated, decryptRequest, updateTask)

router.put("/edit/:id", isAuthenticated, decryptRequest, editTask)

router.delete("/delete/:id", isAuthenticated, decryptRequest, deleteTask)

export default router 