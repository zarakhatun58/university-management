import express, { Application } from 'express'
import cors from 'cors'
import { UserRoutes } from './App/modules/users/user.route'
import globalErrorHandler from './App/middlewares/globalErrorHandler'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application route
//console.log(process.env)
//console.log(app.get('env'))

app.use('/api/v1/users/', UserRoutes)

//testing

//app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  //throw new Error(400, 'all error')
  // console.log(x)
  // Promise.reject(new Error('unhaled promise rejection '))
  //   //res.send('Working successfully!')
//})
//global error handler
app.use(globalErrorHandler)

export default app
