const feedback = require('../Models/feedbackSchema')


exports.addFeedback = async (req, res) => {
    console.log("inside add review function")
    const user = req.payload
    const { feedbackText } = req.body
    
    try {
        const newFeedback = new feedback({

            feedbackText, user
        })
        await newFeedback.save()
        res.status(200).json(newFeedback)
    } catch (error) {
        res.status(401).json(`Request failed ${error}`)
    }
}