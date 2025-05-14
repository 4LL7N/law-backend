import  request  from "supertest";
import app from "../server";
import mongoose from "mongoose";
import dotenv  from "dotenv"
dotenv.config()

beforeAll(async()=>{
    await mongoose.connect(process.env.MONGO_URL!)
})

afterAll(async()=>{
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
})

describe('Auth api',()=>{
    const testEmail = "test@email.com"
    const testPassword = 'test123'

    it('should register an admin',async ()=>{
        const res = await request(app).post('/api/auth/register').send({
            email:testEmail,
            password:testPassword
        })
        expect(res.status).toBe(201)
        expect(res.body.message).toBe("Admin registerd successfuly")
    })

    it("should login an admin",async () =>{
        const res = await request(app).post('/api/auth/login').send({
            email:testEmail,
            password:testPassword
        })
        expect(res.status).toBe(200)
        expect(res.body.message).toBe("admin logged in successfuly")
    })

    it('should not login in with invalid credentials',async()=>{
        const res = await request(app).post('/api/auth/login').send({
            email:testEmail,
            password:"wrongpassword"
        })
        expect(res.status).toBe(401)
        expect(res.body.message).toBe('invalid credentials')
    })
})