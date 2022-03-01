const userModel = require('../models/userModel')
const validator = require('../utils/validator')


const createUser = async function (req, res) {
    try {
        const requestBody = req.body
        
        let { user_name } = requestBody
        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide author details' })
        }
        if (!validator.isValid(user_name)) {
            return res.status(400).send({ status: false, message: 'user name is required' })
        }
        const userData={user_name}
        const user=await userModel.create(userData)
        return res.status(201).send({ status: true, message:`user created successfully`,data:user })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
const getUser=async function(req,res){
    try{
        const userName=req.params.userName
        const user=await userModel.findOne({user_name:userName})
        if(!user){
            return res.status(400).send({ status: false, message: 'no user found' })
        }
        return res.status(200).send({ status: true, message: 'user details are', data: user })

    }
    catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = {
    createUser,
    getUser
}