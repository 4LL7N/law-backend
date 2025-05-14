import  request  from "supertest";
import app from "../server"
import mongoose from "mongoose";
import { creaetTestAdmin } from "./utils/createTestAdmin";

let token :string

beforeAll(async()=>{
    await mongoose.connect(process.env.MONGO_URL!)
    const res = await creaetTestAdmin()
    token= res.token
})

afterAll(async ()=>{
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
})

describe('Contact API',()=>{
    it('should allow guests to submit a message',async ()=>{
        const res = await request(app).post('/api/contact').send({
            name:"Jhon do",
            email:"jhon@doe.com",
            number:"+1234567890",
            message:"test messagehjhg"
        })
        
        expect(res.status).toBe(201)
        expect(res.body.message).toBe('Message sent')
    })

    it('should return paginated rsults',async()=>{
        const res = await request(app)
            .get('/api/contact/?page=1&limit=2')
            .set('Cookie',`token=${token}`)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
        expect(Array.isArray(res.body.data)).toBe(true)
    })

    it('should fail to submit with invalid email',async()=>{
        const res = await request(app).post('/api/contact').send({
            name:"Jhon do",
            email:"invalid email",
            number:"+124121242123",
            message:"test message"
        })

        expect(res.statusCode).toBe(400)
    })
})