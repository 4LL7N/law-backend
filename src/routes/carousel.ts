import { Router } from 'express'
import { createCarousel, deleteCarousel, getAllCarousel, updateCarousel } from '../controllers/carousel'
import { requireAdmin } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import carouselSchema, { carouselEditSchema } from '../validators/carousel'

const router = Router()

router
    .route('/')
    .get(getAllCarousel)
    .post(requireAdmin, validate(carouselSchema), createCarousel)

router
    .route('/:id')
    .put(requireAdmin, validate(carouselEditSchema), updateCarousel)
    .delete(requireAdmin, deleteCarousel)

export default router

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Carousel API
 *   version: 1.0.0
 * tags:
 *   - name: Carousel
 *     description: Image carousel management API
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Carousel:
 *       type: object
 *       required:
 *         - title
 *         - subtitle
 *         - image
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           example: Summer Sale
 *         subtitle:
 *           type: string
 *           minLength: 1
 *           example: Up to 50% Off
 *         image:
 *           type: string
 *           format: uri
 *           example: https://example.com/summer-sale.jpg
 *         link1:
 *           type: string
 *           format: uri
 *           example: https://example.com/products/summer-collection
 *         link2:
 *           type: string
 *           format: uri
 *           example: https://example.com/special-offers
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *     CarouselUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           example: Updated Sale
 *         subtitle:
 *           type: string
 *           minLength: 1
 *           example: Special Offers
 *         image:
 *           type: string
 *           format: uri
 *         link1:
 *           type: string
 *           format: uri
 *         link2:
 *           type: string
 *           format: uri
 * paths:
 *   /api/carousel:
 *     get:
 *       summary: Get latest 4 carousel items
 *       tags: [Carousel]
 *       responses:
 *         200:
 *           description: List of carousel items
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   items:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Carousel'
 *                     maxItems: 4
 *               example:
 *                 items:
 *                   - title: "Summer Sale"
 *                     subtitle: "Up to 50% Off"
 *                     image: "https://example.com/summer.jpg"
 *     post:
 *       summary: Create a new carousel item
 *       tags: [Carousel]
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carousel'
 *             example:
 *               title: "New Collection"
 *               subtitle: "Winter Fashion"
 *               image: "https://example.com/winter.jpg"
 *               link1: "https://example.com/new-arrivals"
 *               link2: "https://example.com/winter-sale"
 *       responses:
 *         201:
 *           description: Carousel item created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Carousel'
 *   /api/carousel/{id}:
 *     patch:
 *       summary: Update a carousel item
 *       tags: [Carousel]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *             pattern: '^[0-9a-fA-F]{24}$'
 *           required: true
 *           description: MongoDB ID of the carousel item
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarouselUpdate'
 *             example:
 *               title: "Updated Sale"
 *               subtitle: "Special Offers"
 *       responses:
 *         204:
 *           description: Carousel item updated
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Carousel'
 *         404:
 *           description: Carousel item not found
 *     delete:
 *       summary: Delete a carousel item
 *       tags: [Carousel]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *             pattern: '^[0-9a-fA-F]{24}$'
 *           required: true
 *           description: MongoDB ID of the carousel item
 *       responses:
 *         200:
 *           description: Carousel item deleted
 *           content:
 *             application/json:
 *               example:
 *                 message: "Carousel deleted successfully"
 *         404:
 *           description: Carousel item not found
 */