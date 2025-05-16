import mongoose from "mongoose"
import { creaetTestAdmin } from "./utils/createTestAdmin"
import Blog from "../models/Blog"
import app from "../server"
import request  from "supertest"
import { commentSchema } from "../validators/comment"

let token:string
let blogId:string
let commentId:string

beforeAll(async()=>{
    await mongoose.connect(process.env.MONGO_URL!)
    const res = await creaetTestAdmin()
    token= res.token

    const blog = await Blog.create({
        title:'Test Blog',
        category:'Test Category',
        content:'test',
        author:'Test blog',
        images:['https://adfadf.adgadg.com'],
        subtitle:'test blog',
        socialLinks:['https://twitter.com/test'],
        lawWays:'Test',
        tags:['test']
    })
    blogId=blog._id.toString()
})

afterAll(async()=>{
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
})

describe('Comments API',()=>{
    it('should allow public to submit a top-level comment',async()=>{
        const res = await request(app)
            .post(`/api/comments/${blogId}`)
            .send({
                name:'test user',
                content:'test'
            })
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('_id')
            expect(res.body.content).toBe("test")
            commentId = res.body._id
    })

    it('should allow public to reply on a comment',async()=>{
        const res = await request(app)
            .post(`/api/comments/${blogId}`)
            .send({
                name:'2 test user',
                content:'2 test',
                parentId:commentId
            })
            expect(res.status).toBe(201)
            expect(res.body.parentId.toString()).toBe(commentId)
    })

    it('should return all comment on blog',async()=>{
        const res = await request(app).get(`/api/comments/${blogId}`)
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)

        const topLevel = res.body.find((c:any)=> c._id == commentId)
        expect(topLevel?._id).toBe(commentId)
        expect(topLevel?.replies?.length).toBeGreaterThan(0)
    })

    it('should allow admin to delete a comment its replies',async()=>{
        const res = await request(app)
            .delete(`/api/comments/delete/${commentId}`)
            .set('Cookie',`token=${token}`)

        expect(res.status).toBe(200)
        expect(res.body.message).toBe('Comment deleted')

        const check = await request(app).get(`/api/comments/${blogId}`)
        const deleted = check.body.find((c:any)=>c._id == commentId)
        expect(deleted).toBeUndefined()
    })
})