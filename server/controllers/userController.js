const User = require("../models/user")
const bcrypt = require("bcryptjs")

const createNewUser = async(req, res) => {
    const { email } = req.body
    console.log(req.body)
    
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
        console.log("user is: ", user)
        const savedUser = await user.save()
        console.log("savedUser: ", savedUser)
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
    //get email and password from client
    const { email, password} = req.body
    try {
        //Search for the user in DB
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({
                message: "User with this email doesn't exist ",
                data: {}
            }) 
        }
        //Check if password is correct
        const isMatch = await bcrypt.compare(
            password,
            user.password
        )
        //if isMatch is false
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid password",
                data: {}
            }) 
        }
        //If email exists and password is correct Generate token
        const token = await user.generateAuthToken()
        
        return res.status(200).json({
            message: "User logged In successfully",
            data: {user, token}
        }) 

    } catch(error) {
        return res.status(500).json({
            message: "Internal server error",
            data: error
        }) 
    }
}

module.exports = {
    createNewUser,
    loginUser
}