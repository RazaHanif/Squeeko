import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './auth'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import config from './config/index'
import authRoutes from './routes/auth'
import { messageSocketHandler } from './socket/message.socket'

const app = express()

// This might need to be changed to 'api/auth/{*any}'
app.all("/api/auth/*", toNodeHandler(auth))

// Middleware

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// Routes 
app.get('/', (req, res) => {
    res.status(200).send('Squeeko Status: OK')
})

app.use('/auth', authRoutes)

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('oopsypoopsy')
})

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*', // FIX THIS FOR PROD
        methods: ['GET', 'POST']
    }
})

messageSocketHandler(io)

const PORT = config.PORT

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})