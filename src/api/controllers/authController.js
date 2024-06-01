import express from 'express'
import hashPassword from 'security.js'
class Auth {
    async signup(req, res) {
        try {

            const { public_key, email, password } = req.body
            const pword = hashPassword(password);
            const newUser = await User.create({ public_key: public_key, email: email, password: pword });
            res.json(newUser);
            res.json([
                {
                    StatusCode: 201,
                    data: newUser.toJson()
                }
            ])
        } catch (err) {
            const error = [
                {
                    message: "An error occurred",
                    StatusCode: 500
                }
            ]
            res.json(error)
        }
    }
    // I don't think this  is necessary 
    // login(req,res){

    // }

}
export default new Auth