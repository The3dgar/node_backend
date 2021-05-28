require('dotenv').config()
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import db from './config/db'

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

// routes
app.use('/api', require('./routes/index').default)

const bootstrap = async () => {
  const port = process.env.PORT || 3000
  await db.initConnection()
  app.listen(port, () => console.log(`Server on port ${port}`))
}

export default bootstrap
