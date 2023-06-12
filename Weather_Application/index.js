const express=require('express')
require('dotenv').config()
const {connection}=require('./db')
const {validateCity}=require('./middlewere/validcity')
const {getCurrentWeather}=require('./middlewere/weather')
const {errorLogger}=require('./middlewere/errorlogger')
const rateLimit = require('express-rate-limit');
const app=express()
app.use(express.json())
const limiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 1,
  });
app.use(limiter);
app.get("/",async(req,res)=>{
    try {
        res.status(200).send('welcome to Weather Application')
    } catch (error) {
        console.log(error)
    }
})
app.use(errorLogger)
app.get("/:city",validateCity,getCurrentWeather)

app.listen(8080,async()=>{
    try {
        await connection
        console.log('connected to the db')
    } catch (error) {
        console.log(error)
    }
    console.log('server is running')
})