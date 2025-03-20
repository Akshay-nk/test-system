const questions=require('../Models/questionSchema')

exports.getQuestions=async(req,res)=>{
    console.log("inside get question");
     try {
        const getQuestions=await questions.find()
        res.status(200).json(getQuestions)
        
        
    } catch (error) {
        res.status(401).json(error)
    }
}