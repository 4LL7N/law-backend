import mongoose from 'mongoose'
import request from 'supertest'
import { creaetTestAdmin } from './utils/createTestAdmin'
import { describe } from 'node:test'
import app from '../server'


let token :string

beforeAll(async()=>{
    await mongoose.connect(process.env.MONGO_URL!)
    const res = await creaetTestAdmin()
    token = res.token
})

afterAll(async()=>{
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
})

describe('Team API',()=>{
    let memberId:string

    it('should allow admin to create a team meber',async ()=>{
        const res = await request(app).post('/api/team').set('Cookie',`token=${token}`).send({
            name:"jhon",
                position:'sofeqwcqcqec',
                subhead:"qecqecqec",
                email:"qecqec@cqewcwe.wecwec",
                linkedin:'https://www.linkedin.com',
                bio:"fweonwrijgjwrg",
                services:["wefewfwe","wefwef"],
                image:"ewfwefwef"
        })
        expect(res.status).toBe(201)
        expect(res.body.createdMember.name).toBe('jhon')
        
        memberId = res.body.createdMember._id
    })
    it('should fetch all team memebers',async ()=>{
        const res = await request(app).get('/api/team')
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body.teamMembers)).toBe(true)
    })
    it('should fetch a single team memeber',async ()=>{
        
        const res = await request(app).get(`/api/team/${memberId}`)
        
        expect(res.status).toBe(200)
        expect(res.body.member).toHaveProperty('name')
    })
    it('should allow admin to update a single team memeber',async ()=>{
        const res = await request(app).put(`/api/team/${memberId}`).set('Cookie',`token=${token}`).send({
            name:"JHON do",
                position:'sofeqwcqcwefwefweqec',
                email:"qewefwefcqec@cqewcwe.wecwec",
                image:"ewfwefwwefwefef"
        })
        expect(res.status).toBe(200)
        expect(res.body.updatedMember.name).toBe('JHON do')
    })
    it('should allow admin to delete a single team memeber',async ()=>{
        const res = await request(app).delete(`/api/team/${memberId}`).set('Cookie',`token=${token}`)
        
        expect(res.status).toBe(202)
        expect(res.body.message).toBe("member deleted successfuly")
    })
})