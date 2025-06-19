import express from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import prisma from '../../prismaClient/prismaClient.js';
import { JWT_SECRET } from '../../config.js';

const router = express.Router();


const registerInput = z.object({
    email: z.string(),
    userName: z.string(),
    password: z.string()
})

router.post('/', async function(req, res)  {
    const data = req.body
    if(!data){
        return res.status(400).json({
            message: "Please provide email, userName, and password."
        }); 
    }
    const { success }  = registerInput.safeParse(data)
    if(!success){
        return res.status(400).json({
            message: "Please provide proper inputs."
        })
    } 

    const existUser = await prisma.user.findUnique({
        where:{
            email: data.email
        }
    })

    if(existUser){
        return res.status(411).json({
            message: "A user already exist with this email."
        })
    }

    const user = await prisma.user.create({
        data:{
            email: data.email,
            userName: data.userName,
            password: data.password
        }
    })

    const token = jwt.sign({id: user.id}, JWT_SECRET)

    res.status(200).json({
        message: 'User created successfully',
        token: token,
    })
});

export default router;