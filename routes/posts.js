import express from "express";

//controllers
import postsController from "../controllers/postsController.js";

// middleware
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", postsController.getPosts);
router.post("/", postsController.createPost);
router.patch("/:id", auth, postsController.updatePost);
router.delete("/:id", auth, postsController.deletePost);
router.patch("/:id/likePost", auth, postsController.likePost);

export default router;
