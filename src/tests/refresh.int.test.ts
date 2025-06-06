import dotenv from 'dotenv'
import mongoose, { Mongoose } from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin'
import jwt from 'jsonwebtoken'
import request from 'supertest'
import app from '../server'

dotenv.config()

let refreshToken: string

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)

  const password = await bcrypt.hash('test1234', 10)
  const admin = await Admin.create({
    email: 'test@test.com',
    password,
  })

  refreshToken = jwt.sign({ id: admin._id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  })

  admin.refreshToken = refreshToken
  await admin.save()
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Auth Refresh token flow', () => {
  it('should refresh access token with valid refresh tokne', async () => {
    const res = await request(app)
      .post('/api/auth/refresh-token')
      .set('Cookie', `refreshToken=${refreshToken}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Token refreshed')
  })

  it('should fail refresh if no refresh token provided', async () => {
    const res = await request(app).post('/api/auth/refresh-token')

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Unauthorized')
  })

  it('should fail refresh if refresh token is invalid', async () => {
    const res = await request(app)
      .post('/api/auth/refresh-token')
      .set('Cookie', `refreshToken=invalid`)
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Unauthorized')
    
  })

  it('should fail refresh if refresh token does not match DB',async () =>{
    const fakeToken = jwt.sign(
        {
            id:new mongoose.Types.ObjectId()
        },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn:'7d'
        }
    )

    const res = await request(app)
      .post('/api/auth/refresh-token')
      .set('Cookie', `refreshToken=${fakeToken}`)

    expect(res.status).toBe(401)
    expect(res.body.message).toBe("refersh token missmatch")
  })

})
