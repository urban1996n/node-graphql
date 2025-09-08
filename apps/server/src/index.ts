import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// --- API ---
app.get(
    '/api/health',
    (_req: Request, res: Response): void => {
      res.status(200).send('ok')
    }
)

const clientDist: string = path.resolve(__dirname, '../../client/dist')

app.use(express.static(clientDist))

// --- SPA fallback ---
app.get(
    '*',
    (req: Request, res: Response, next: NextFunction): void => {
      if (req.path.startsWith('/api')) return next()
      res.sendFile(path.join(clientDist, 'index.html'))
    }
)

app.get('/api/health', (req: Request, response: Response) => {
    response.send(true);
})

const PORT: number = Number(process.env.PORT ?? 3000)

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`)
})
