require('dotenv').config()
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const router=require('./Router/router')

const MONGO_URI=process.env.database

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

const medicare=express()

medicare.use(cors())
medicare.use(express.json())
medicare.use(router)
const PORT=4000 || process.env.PORT

medicare.listen(PORT,()=>{
    console.log(`Server Running at Port ${PORT}`)
})

medicare.get('/', (req, res) => {
    res.send('<h1>Welcome</h1>');
});
