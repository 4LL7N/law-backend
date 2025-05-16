import { Router } from "express";
import { validate } from "../middlewares/validate";
import { commentSchema } from "../validators/comment";
import { createComment, deleteComment, getCommentByBlog } from "../controllers/comment";
import { requireAdmin } from "../middlewares/auth";

const router = Router()

router
    .route('/:blogId')
    .get(getCommentByBlog)
    .post(validate(commentSchema),createComment)

router.delete('/delete/:commentId',requireAdmin,deleteComment)

export default router