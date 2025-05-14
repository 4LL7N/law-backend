import { Router } from "express";
import { creaetTeamMember, deleteTeamMember, getAllTeam, getTeamMember, updateTeamMember } from "../controllers/team";
import { requireAdmin } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { teamSchema } from "../validators/team";


const router = Router()

router
    .route('/')
    .get(getAllTeam)
    .post(requireAdmin,validate(teamSchema),creaetTeamMember)

router
    .route('/:id')
    .get(getTeamMember)
    .put(requireAdmin,validate(teamSchema),updateTeamMember)
    .delete(requireAdmin,deleteTeamMember)

/**
 * @swagger
 * tags:
 *   name: Team
 *   description: Team member management endpoints
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Admin access token
 * 
 *   schemas:
 *     TeamRequest:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - email
 *         - image
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         position:
 *           type: string
 *           example: Software Engineer
 *         subhead:
 *           type: string
 *           example: Tech Lead
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         number:
 *           type: string
 *           example: +1234567890
 *         linkedin:
 *           type: string
 *           format: url
 *           example: https://linkedin.com/in/john
 *         bio:
 *           type: string
 *           example: Experienced software developer with 5+ years in web technologies
 *         services:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Web Development", "Consulting"]
 *         image:
 *           type: string
 *           example: https://example.com/images/john.jpg
 * 
 *     TeamResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/TeamRequest'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 507f1f77bcf86cd799439011
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2023-08-01T12:34:56Z"
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: "2023-08-01T12:34:56Z"
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 404
 *         message:
 *           type: string
 *           example: "No member with this id"
 * 
 * /api/team:
 *   get:
 *     summary: Get all team members
 *     tags: [Team]
 *     responses:
 *       200:
 *         description: List of all team members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teamMembers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TeamResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 *   post:
 *     summary: Create a new team member (Admin only)
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamRequest'
 *     responses:
 *       201:
 *         description: Team member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * 
 * /api/team/{id}:
 *   get:
 *     summary: Get a single team member by ID
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Team member details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamResponse'
 *       404:
 *         description: Member not found
 *       500:
 *         description: Server error
 * 
 *   put:
 *     summary: Update a team member (Admin only)
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamRequest'
 *     responses:
 *       200:
 *         description: Updated team member
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamResponse'
 *       404:
 *         description: Member not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * 
 *   delete:
 *     summary: Delete a team member (Admin only)
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       202:
 *         description: Member deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: member deleted successfuly
 *                 deletedMember:
 *                   $ref: '#/components/schemas/TeamResponse'
 *       404:
 *         description: Member not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

    export default router