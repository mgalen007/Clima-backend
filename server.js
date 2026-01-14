import express from 'express'
import cors from 'cors'
import homeRouter from './routes/home.routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/home', homeRouter)

app.listen(3000, () => console.log('Listening on port 3000'))