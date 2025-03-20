const expres = require('express')
const router=new expres.Router()
const userController =require('../controllers/userController')
const questionController =require('../controllers/questionController')
const jwtMiddleware=require('../Middleware/middleware')
const feedbackController =require('../controllers/feedbackController')



router.post('/user/register',userController.register )

//login

router.post('/user/login',userController.login )

router.get('/questions/all',questionController.getQuestions)

router.post('/feedback/add',jwtMiddleware,feedbackController.addFeedback)

module.exports=router