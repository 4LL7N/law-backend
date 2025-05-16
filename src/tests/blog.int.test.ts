import mongoose from "mongoose"
import request from 'supertest'
import app from "../server"
import { creaetTestAdmin } from "./utils/createTestAdmin"
import { title } from "process"

let token :string
let blogId:string
let slug:string

beforeAll(async()=>{
    await mongoose.connect(process.env.MONGO_URL!)
    const res = await creaetTestAdmin()
    token= res.token
})

afterAll(async()=>{
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
})

describe('Blog API', () => {
    it('should create a blog', async () => {
        const res = await request(app)
            .post('/api/blog')
            .set('Cookie', `token=${token}`)
            .send({
                title: 'Test blog',
                category: 'Test category',
                content: 'This cotetn',
                author: 'Test Author',
                images:['https://via.placeholder.com/150'],
                subtitle:'Test Subtitle',
                socialLinks:['https://www.facebook.com'],
                lawWays:'Test Law Way',
                tags:['Test Tag']
            });
            expect(res.status).toBe(201)
            blogId=res.body._id
            slug=res.body.slug
    });

    it('should get all blogs',async()=>{
        const res = await request(app).get('/api/blog')

        expect(res.status).toBe(200)
        expect(Array.isArray(res.body.data)).toBe(true)
    })

    it('should get a blog by slug',async () =>{
        const res = await request(app).get(`/api/blog/getWithSlug/${slug}`)

        expect(res.status).toBe(200)
        expect(res.body.slug).toBe(slug)
    })

    it('should update a blog',async () =>{
        const res = await request(app)
        .put(`/api/blog/${blogId}`)
        .set('Cookie',`token=${token}`)
        .send({
            title:'Update Blog'
        })

        expect(res.status).toBe(200)
        expect(res.body.title).toBe("Update Blog")
    })

    it('should update a blog',async () =>{
        const res = await request(app)
        .delete(`/api/blog/${blogId}`)
        .set('Cookie',`token=${token}`)
        

        expect(res.status).toBe(200)
        expect(res.body.message).toBe("Blog deleted successfully")
    })
});