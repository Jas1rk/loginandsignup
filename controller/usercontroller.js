const User = require('../model/usermodel')
const bcrypt = require('bcrypt')

module.exports = {

 homePage: async(req,res)=>{
    try{
        res.render('user/home')
    }catch(err){
        console.error(err.message)
    }
},

 userLoginPage: async(req,res)=>{
    try{
        res.render('user/login')

    }catch(err){
        console.log(err.message)
    }
},

 userLoginPost : async(req,res)=>{
    try{

    }catch(err){
        console.error(err.message)
    }
},

 userRegisterPage : async(req,res)=>{
    try{
        res.render('user/register')
    }catch(error){
        console.error(error.message)
    }
},


   userRegisterPost : async(req,res)=>{
        try {
            const {username,email,mobile,password,confimPassword} = req.body
            const existUser = await User.findOne({email:email})
           
            if(existUser){
                res.json({status:'exist'})
                console.log('this is exist',existUser)
            }else{
                const [passwordHash,confirmpassHash] = await Promise.all([
                    bcrypt.hash(password,10),
                    bcrypt.hash(confimPassword,10)
                ])
                const newUser = new User({
                    username:username,
                    email:email,
                    mobile:mobile,
                    password:passwordHash,
                    confirmPassword:confirmpassHash
                })
                console.log('created new user',newUser)
                await newUser.save()
                res.json({status:'createdNewUser'})
            }
        } catch (error) {
            console.error(err.message)
        }
    } 

    
}