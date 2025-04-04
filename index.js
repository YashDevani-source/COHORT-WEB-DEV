import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js";

// import all routs 

import userRoutes from "./routes/User.routes.js"

dotenv.config()

const app = express()
app.use(cors({
  origin: process.env.BASE_URl,
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Cohort!')
})

app.get('/yash', (req, res) => {
    res.send('Yash!')
})

app.get('/piyush', (req,res) => {
    res.send('Piyush!')
})

// connect to db 
db();

//  User Routs

app.use( "/api/v1/users/" , userRoutes )
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})