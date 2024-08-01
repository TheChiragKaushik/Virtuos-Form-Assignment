import app from './src/app.js'
import connectDB from './src/db/index.js'

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
