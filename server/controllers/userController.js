const User = require("../models/user")

const createNewUser = async(req, res) => {
    const { email} = req.body
    
    let user = await User.find({email})
    console.log("user: ", user)
    if(user.length !== 0) {
        return res.status(409).json({
            message: "Conflict: data with these information already exist",
            data: {}
        })
    }
    try {
        user = new User(req.body)
        const savedUser = await user.save()

        return res.status(201).json({
            message: "User saved successfully",
            data: savedUser
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            data: error
        })
    }

}

const loginUser = async(req, res) => {

}

module.exports = {
    createNewUser,
    loginUser
}