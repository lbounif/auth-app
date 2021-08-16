const express = require("express")
const cors = require("cors")
require("./db/mongoose")
const userRouter = require("./routes/userRouter")

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)

const PORT = 4000

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})