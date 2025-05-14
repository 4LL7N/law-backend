import { Router } from 'express'
import { createContact, getAllContact } from '../controllers/contact'
import { validate } from '../middlewares/validate'
import { contactSchema } from '../validators/contact'
import { requireAdmin } from '../middlewares/auth'

const router = Router()

router.post('/', validate(contactSchema), createContact)

router.get('/', requireAdmin, getAllContact)

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact form management endpoints
 * 
 * /api/contacts:
 *   post:
 *     summary: Submit a new contact message
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactRequest'
 *           examples:
 *             basicContact:
 *               value:
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 number: "+1234567890"
 *                 message: "I have a question about your services"
 *     responses:
 *       '201':
 *         description: Contact message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '400':
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 *   get:
 *     summary: Retrieve paginated contact messages (Admin only)
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for paginated results
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page (max 100)
 *         example: 10
 *     responses:
 *       '200':
 *         description: Paginated list of contact messages
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedContacts'
 *       '401':
 *         description: Unauthorized - Missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '403':
 *         description: Forbidden - Insufficient permissions
 *       '500':
 *         description: Internal server error
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Admin access token (JWT)
 * 
 *   schemas:
 *     ContactRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - number
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         number:
 *           type: string
 *           minLength: 5
 *           maxLength: 15
 *           pattern: '^\+?[0-9\s\-()]+$'
 *           example: "+1234567890"
 *         message:
 *           type: string
 *           minLength: 10
 *           example: "I have a question about your services"
 * 
 *     ContactResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/ContactRequest'
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
 *     PaginatedContacts:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           description: Current page number
 *           example: 1
 *         limit:
 *           type: integer
 *           description: Number of items per page
 *           example: 10
 *         total:
 *           type: integer
 *           description: Total number of contacts
 *           example: 50
 *         totalPages:
 *           type: integer
 *           description: Total number of pages
 *           example: 5
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ContactResponse'
 * 
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Message sent
 *         data:
 *           $ref: '#/components/schemas/ContactResponse'
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: "Validation error"
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "email"
 *               message:
 *                 type: string
 *                 example: "Invalid email format"
 */

export default router
