const users=require('../Models/userSchema')
const jwt=require("jsonwebtoken")

//register

exports.register= async (req,res)=>{
    console.log("inside register controller function");
    const {email,password,name,status,phone} = req.body

   try {
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json("user already exists ...please login!!!")
    }else{
        const newUser = new users({
            name,email,password,status,phone
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
}
catch(err){
    res.status(401).json(`Register API failed, Error :${err}`)
}

   
}

// login

exports.login=async (req,res)=>{
    console.log("inside login controller function");
    const {phone,password} = req.body
    try{
        const exisitingUser = await users.findOne({phone,password})
        if(exisitingUser){
            const token= jwt.sign({userId:exisitingUser._id},"secret123")
            const userRole=exisitingUser.role
            res.status(200).json({
                exisitingUser,token,userRole
            });
        }else{
            res.status(404).json("incorrect phone/password")
        }
    }
    catch(err){
        res.status(401).json(`login API Failed , Error:${err}`)
    }
}
