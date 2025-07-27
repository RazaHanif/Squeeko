import express from 'express'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './auth'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import config from './config/index'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'


const app = express()

// This might need to be changed to 'api/auth/{*any}'
app.all("/api/auth/*", toNodeHandler(auth))

// Middleware

app.use(express.json())
app.use(cors())
app.use(helemt())
app.use(morgan('dev'))
app.use(cookieParser())

// Routes 
app.get('/', (req, res) => {
    res.status(200).send('Squeeko Status: OK')
})

app.use('/auth', authRoutes)

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('oopsypoopsy')
})

const PORT = config.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})