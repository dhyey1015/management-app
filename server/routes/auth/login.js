import express from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import prisma from '../../prismaClient/prismaClient.js';
import { JWT_SECRET } from '../../config.js';

const router = express.Router()

const loginInput = z.object({
    email: z.string(),
    password: z.string()
})

router.post('/', async function(req, res){
    const data = req.body;
    if(!data.email || !data.password){
        return res.status(400).json({
            message: "Please provide email, and password."
        });
    }

    const { success } = loginInput.safeParse(data)
    if(!success){
        return res.status(400).json({
            message: "Please provide proper inputs."
        })
    }
    const user = await prisma.user.findFirst({
        where:{
            email: data.email,
            password: data.password
        }
    })
    if(!user){
        return res.status(400).json({
            message: "Wrong email or password."
        })
    } else {
        const token = jwt.sign({
            id: user.id
        }, JWT_SECRET) 
        res.json({
            message: "Logged in successfully",
            token:  token
        })
    }
})

export default router;
