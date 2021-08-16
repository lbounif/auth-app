const mongoose = require("mongoose")

const mongoDbURL = 'mongodb://localhost:27017/register-db'

mongoose.connect(mongoDbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})