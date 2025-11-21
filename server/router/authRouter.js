import express from 'express'
import { prisma } from "../prismaClient.js";
const authRouter = express.Router()

authRouter.get('/', (req, res) => {
    res.send('check')
})

authRouter.get('/sign-up', async (req, res) => {
    res.send(req.body)
})

export default authRouter; 