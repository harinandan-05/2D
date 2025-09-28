import express, { Router } from 'express'
import auth from './Routes/auth'

const app = express()

app.use(express.json())
app.use('/api/v1/',auth)

app.listen(3001,() => {
    console.log("express server up")
})