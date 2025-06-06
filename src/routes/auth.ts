import { Router } from 'express'
import { validate } from '../middlewares/validate'
import { login, refreshToken, register } from '../controllers/auth'
import { loginSchema, registerSchema } from '../validators/auth'

const router = Router()

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: Register a new admin  # Fixed typo "summery" -> "summary"
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:  # Fixed typo "aplication" -> "application"
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: admin@example.com  # Fixed indentation
 *                          password:
 *                              type: string
 *                              example: password123
 *      responses:
 *          '201':
 *              description: Admin registered successfully
 *          '400':
 *              description: Bad Request
 */
router.post('/register', validate(registerSchema), register)

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Login as admin  # Changed description
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: admin@example.com  # Fixed indentation
 *                          password:
 *                              type: string
 *                              example: password123
 *      responses:
 *          '200':  # Changed from 201 to 200 for login
 *              description: Admin logged in successfully
 *          '400':
 *              description: Invalid credentials
 */
router.post('/login', validate(loginSchema), login)

router.post('/refresh-token',refreshToken)

export default router
