import express from 'express'
import cors from 'cors'
import homeRouter from './routes/home.routes.js'
import 'dotenv/config'
import logger from './middleware/logger.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api/home', homeRouter)
app.use(logger)

app.listen(PORT, () => console.log('Listening on port ' + PORT))