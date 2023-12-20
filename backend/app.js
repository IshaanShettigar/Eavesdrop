require('dotenv').config()
require('express-async-errors')

const express = require('express')
const mongoose = require("mongoose")
const helmet = require('helmet')
const cors = require('cors')
const { taskRouter } = require('./routes/taskRouter')
const notFound = require('./middleware/notFound')

const app = express()

app.use(helmet())
app.use(cors())

app.use(express.json())

app.use('/api/tasks', taskRouter)


app.use(notFound)
PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`Server listening on port ${PORT}`);
})