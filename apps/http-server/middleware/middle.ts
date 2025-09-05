import { NextFunction } from "express";
import jwt from 'jsonwebtoken'

export async function authMiddleware(req:Request,res:Response,next:NextFunction){

    // middlware token generation logic
    next()
}