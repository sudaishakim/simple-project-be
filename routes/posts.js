import express from "express";

//controllers
import postsController from "../controllers/postsController.js";

const router = express.Router();

router.get("/", postsController.getPosts);
router.post("/", postsController.createPost);
router.patch("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);
router.patch("/:id/likePost", postsController.likePost);

export default router;
