import app from './app.js'
import connectDB from './db/index.js'
import dotenv from 'dotenv'

dotenv.config()
connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERRR: ", error);
       })
    app.listen( 8000, () => {
        console.log(`Server is running on port ${8000}...`)
    })
})
.catch((err) => {
    console.log("MongoDB connection failed: ",err);
})
