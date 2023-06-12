const express=require('express')
require('dotenv').config()
const userRoute=express.Router()
const {connection}=require('../db')
const {userModel}=require('../model/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const client=require('redis')
const client=redis.createClient({
    host:'localhost',
    port:6379
})


client.connect()

userRoute.post("/register",async(req,res)=>{
    const {name,email,password,preferredCity,searches}=req.body
   
    try {
        let data=await userModel.find({email})
        if(data.length!=0){
            console.log(data)
            res.status(200).send({meassage:"user already exists!!"})
        }
       else{
        bcrypt.hash(password, 5, async(err, hash)=> {
            const adddata=new userModel({name,age,email,password:hash,city})
            await adddata.save()
            res.status(200).send({msg:`Hello ${req.body.name} registration is successfully done!!`})
        }); 
       }
    } catch (error) {
        console.log("error")
    }

})
userRoute.post("/login",async(req,res)=>{
    try {
        let {email,password}=req.body
        let data=await userModel.findOne({email})
        if(data){
            bcrypt.compare(req.body.password,data.password,(err,result)=>{
                if(result){
                    console.log({user:data.name,userID:data._id})
                    let token = jwt.sign({ user:data.name,userID:data._id}, 'raxita')
                    client.on('connect',()=>{
                        {
                            client.set('token',token)
                            
                        }
                    })
                    res.status(200).send({message:`Hello ${data.name} login successfully`})

                }else{
                    res.status(200).send({message:`Invalid Credintails!!!!!!!`})
                }
            })
        }
        else{
            res.status(200).send({message:`Invalid Credintails!!!!!!!`})
        }
    } catch (error) {
        console.log(error)
    }

})

module.exports={
    userRoute
}