import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './App/modules/users/users.route'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application route
//console.log(process.env)
//console.log(app.get('env'))

app.use('/api/v1/users/', usersRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Working successfully!')
})

export default app
