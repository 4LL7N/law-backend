import { Router } from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlogBySlug, updateBlog } from "../controllers/blog";
import { requireAdmin } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { blogSchema, blogUpdateSchema } from "../validators/blog";


const router = Router()

router
    .route('/')
    .get(getAllBlogs)
    .post(requireAdmin,validate(blogSchema),createBlog)

router
    .route("/getWithSlug/:slug")
    .get(getBlogBySlug)

router
    .route("/:id")
    .put(requireAdmin,validate(blogUpdateSchema),updateBlog)
    .delete(requireAdmin,deleteBlog)

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - category
 *         - content
 *         - author
 *         - lawWays
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the blog
 *         title:
 *           type: string
 *           example: "Understanding Legal Rights"
 *         slug:
 *           type: string
 *           example: "understanding-legal-rights"
 *         category:
 *           type: string
 *           example: "Legal Rights"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["law", "rights"]
 *         author:
 *           type: string
 *           example: "John Doe"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: url
 *           example: ["https://via.placeholder.com/150"]
 *         subtitle:
 *           type: string
 *           example: "A comprehensive guide to legal rights"
 *         socialLinks:
 *           type: array
 *           items:
 *             type: string
 *             format: url
 *           example: ["https://facebook.com/example"]
 *         content:
 *           type: string
 *           example: "Full blog content here..."
 *         lawWays:
 *           type: string
 *           example: "Legal procedures explained"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Blog not found"
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 * 
 * tags:
 *   - name: Blog
 *     description: Blog article operations
 * 
 * paths:
 *   /blog:
 *     get:
 *       tags: [Blog]
 *       summary: Get all blogs
 *       parameters:
 *         - name: category
 *           in: query
 *           schema:
 *             type: string
 *           description: Filter by category
 *         - name: tags
 *           in: query
 *           schema:
 *             type: string
 *           description: Period-separated list of tags (e.g. "tag1.tag2")
 *         - name: search
 *           in: query
 *           schema:
 *             type: string
 *           description: Full-text search query
 *         - name: page
 *           in: query
 *           schema:
 *             type: integer
 *             default: 1
 *           description: Page number
 *         - name: limit
 *           in: query
 *           schema:
 *             type: integer
 *             default: 6
 *           description: Items per page
 *       responses:
 *         200:
 *           description: Paginated list of blogs
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   page:
 *                     type: integer
 *                   total:
 *                     type: integer
 *                   totalPages:
 *                     type: integer
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Blog'
 *     post:
 *       tags: [Blog]
 *       summary: Create new blog (Admin only)
 *       security:
 *         - cookieAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - category
 *                 - content
 *                 - author
 *                 - lawWays
 *               properties:
 *                 title:
 *                   type: string
 *                 category:
 *                   type: string
 *                 content:
 *                   type: string
 *                 author:
 *                   type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: url
 *                 subtitle:
 *                   type: string
 *                 socialLinks:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: url
 *                 lawWays:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       responses:
 *         201:
 *           description: Blog created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Blog'
 *         400:
 *           description: Duplicate error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 * 
 *   /blog/getWithSlug/{slug}:
 *     get:
 *       tags: [Blog]
 *       summary: Get blog by slug
 *       parameters:
 *         - name: slug
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Blog details
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Blog'
 *         404:
 *           description: Not found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 * 
 *   /blog/{id}:
 *     put:
 *       tags: [Blog]
 *       summary: Update blog (Admin only)
 *       security:
 *         - cookieAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Blog'
 *                 - not:
 *                     required:
 *                       - _id
 *                       - slug
 *                       - createdAt
 *                       - updatedAt
 *       responses:
 *         200:
 *           description: Updated blog
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Blog'
 *         404:
 *           description: Not found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 * 
 *     delete:
 *       tags: [Blog]
 *       summary: Delete blog (Admin only)
 *       security:
 *         - cookieAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         404:
 *           description: Not found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */


export default router
