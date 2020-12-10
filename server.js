const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')
const cors = require('cors')
var cookieParser = require('cookie-parser')
var connectDB = require('./Config/db')
const authRouter = require('./routes/auth')
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(cookieParser())
    //Loading up the environment variable file
dotenv.config({ path: './Config/config.env' })

//Loading Up the Static Files
app.use(express.static(path.join(__dirname, "client", "build")))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
    //Using our Routes
app.use('/', authRouter)
    //Firing up our database
connectDB();

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
//Firing up our server
app.listen(PORT, () => {
    console.log('The server is running succesfully')
})