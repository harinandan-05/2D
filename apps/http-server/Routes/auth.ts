import express, { Router } from 'express'


const auth:Router = express.Router()


auth.post('/signup',async (req,res) => {
     // signup logic
})

auth.post('/signin',async (req,res) => {
    // signin logic
    // returns token middleware we have to write
})

export default auth