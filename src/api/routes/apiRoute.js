import express from 'express'
import authentication from '../controllers/authController.js'
// import payment from '../controllers/paymentController.js.js'
// import profile from '../controllers/ProfileController.js'
const router=express.Router()
router.post('/login',authentication.login)
router.post('/signup',authentication.signup)
router.get('/',function(req,res){
    res.send("Yes the server is live!!!!!!!!")
})
// router.post('/profile/edit',{},profile.edit);
// router.get('/profile',{},profile.index);
// router.get('/profile/:id',{},profile.show);
// router.get('/payment',{},payment.show);
export default router;