import express, { Router } from 'express'
import { prismaClient } from '@repo/database/client'

const gen: Router = Router()


gen.post('/generate/vedio' ,async(req,res) => {
    try{
    const {prompt} = req.body
    if(!prompt){
        return res.status(400).json({msg:"prompt is required"})
    }
    const prompted_data = await prismaClient.
    }
    
})

export default gen