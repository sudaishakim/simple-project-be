import express from "express";

//controllers
import userController from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signin", userController.signIn);
router.post("/signup", userController.signUp);

export default router;
