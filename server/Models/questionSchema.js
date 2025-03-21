const mongoose =  require('mongoose')

const questionSchema = new mongoose.Schema( {
    question: 
    { type: String, required: true },

    options: 
    { type: Array,  required: true },

    answer: 
    { type: String, required: true }
  });

const questions = mongoose.model('questions',questionSchema)
module.exports=questions