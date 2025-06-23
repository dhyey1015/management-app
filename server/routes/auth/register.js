import express from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import prisma from '../../prismaClient/prismaClient.js';
import { JWT_SECRET } from '../../config.js';
import { Roles } from '../../constants/roles.js';
import { generateSixDigitPassword } from '../../constants/utils.js';

const router = express.Router();


const registerUserInput = z.object({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
})

const registerAdminInput = z.object({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string()
})

router.post('/user', async function(req, res)  {
    const data = req.body
    if(!data.email || !data.userName || !data.password){
        return res.status(400).json({
            message: "Please provide email, userName, and password."
        }); 
    }
    const { success }  = registerUserInput.safeParse(data)
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
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            role: Roles.USER,
            adminId: 1          //TODO: for QR code
        }
    })

    const token = jwt.sign({id: user.id}, JWT_SECRET)

    res.status(200).json({
        message: 'User created successfully',
        token: token,
    })
});



router.post('/admin', async function(req, res)  {
    const data = req.body
    if(!data.email || !data.userName || !data.password){
        return res.status(400).json({
            message: "Please provide email, userName, and password."
        }); 
    }
    const { success }  = registerAdminInput.safeParse(data)
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
    const password = generateSixDigitPassword()

    const user = await prisma.user.create({
        data:{
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: password,
            role: Roles.ADMIN,
            superAdminId: 1,                    //TODO: 
        }
    })
 
    res.status(200).json({
        message: 'email send Successfully',
        token: token,
    })
});

export default router;