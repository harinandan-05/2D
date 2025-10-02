import express, { Router } from 'express'
import auth from './Routes/auth'
import gen from './Routes/generate'

const app = express()

app.use(express.json())
app.use('/api/v1/',auth)
app.use('/api/v1',gen)

app.listen(3001,() => {
    console.log("express server up")
})