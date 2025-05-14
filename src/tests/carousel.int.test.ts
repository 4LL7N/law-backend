import request  from "supertest";
import app from "../server";
import mongoose from "mongoose";
import { creaetTestAdmin } from "./utils/createTestAdmin";


let token :string

beforeAll(async ()=>{
    await mongoose.connect(process.env.MONGO_URL!)
    const res = await creaetTestAdmin()
    token = res.token
})

afterAll(async ()=>{
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
})

describe('Carousel API',()=>{
    let id:string

    it('should create a carousel item',async ()=>{
        const res = await request(app).post('/api/carousel').set('Cookie',`token=${token}`).send({
            title:'test carousel',
            subtitle:'test subtitle',
            image:"https://via.placeholder.com/150",
            link1:"https://www.google.com",
            link2:"https://www.google.com"
        })
        
        
        expect(res.status).toBe(201)
        
        id=res.body.item._id
    })

    it('should get all carousel items',async()=>{
        const res = await request(app).get('/api/carousel')
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body.items)).toBe(true)
    })

    it('should upadate a carousle item',async ()=>{
        const res = await request(app).put(`/api/carousel/${id}`).set('Cookie',`token=${token}`).send({
            title:"test update"
        })
        
        expect(res.status).toBe(204)
    })

    it('should delete a carousle item',async ()=>{
        const res = await request(app).delete(`/api/carousel/${id}`).set('Cookie',`token=${token}`)
        expect(res.status).toBe(200)
        expect(res.body.message).toBe("Carousel deleted successfuly")
    })

})