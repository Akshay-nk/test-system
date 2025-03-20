const mongoose =  require('mongoose')

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    feedbackText: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

const feedback = mongoose.model('feedback',feedbackSchema)

module.exports=feedback;