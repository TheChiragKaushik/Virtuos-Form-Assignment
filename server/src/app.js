import express from 'express'
import cors from 'cors'


const app = express();

app.use(cors({
    credentials: true
}))

app.use(express.json());

import userRoute from './routes/user.routes.js'

app.use('/users', userRoute, () => {
    console.log('user route is working')
})


console.log("App is working!")
export default app 
