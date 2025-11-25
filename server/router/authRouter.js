import express from 'express'
import { prisma } from "../prismaClient.js";
const authRouter = express.Router()

authRouter.get('/', (req, res) => {
    res.send('check')
})

authRouter.post('/sign-up', async (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

export default authRouter; 