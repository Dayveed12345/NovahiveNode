import express from 'express'
import authentication from '../controllers/authController.js'
import authmiddleware from '../middlewares/authMiddleware.js'
// import payment from '../controllers/paymentController.js.js'
import profile from '../controllers/ProfileController.js'
const router=express.Router()
router.post('/login',authentication.login)
router.post('/signup',authentication.signup)
router.get('/',function(req,res){
    res.send("Yes the server is live!!!!!!!!")
})
router.post('/profile',authmiddleware,profile.create);
router.patch('/profile/:public_key',authmiddleware,profile.update);
router.get('/profile/',authmiddleware,profile.index);
router.get('/profile/:public_key',authmiddleware,profile.show);


// router.get('/profile/:publicKey',{},payment.show);
export default router;