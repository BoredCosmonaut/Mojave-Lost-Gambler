import express from 'express'
import pkg from 'pg'
import cors from 'cors'
import { configDotenv } from 'dotenv'

const {Pool} = pkg
const app = express();

app.use(cors())
app.use(express.json())

const pool = new Pool({
    connectionString: process.env.DATABASEURL
})