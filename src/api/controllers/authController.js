import { hashPassword } from '../helpers/security.js'
import { generateToken } from '../helpers/security.js'
import User from '../models/User.js'
import { Op } from 'sequelize';
import bcrypt from 'bcrypt'
class AuthController {
    async signup(req, res) {
        try {
            const { public_key, email, password } = req.body;
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { email: email },
                        { public_key: public_key }
                    ]
                }
            });
            if (user) {
                res.status(400).json({
                    StatusCode: 400,
                    data: "User already exist"
                });
                return false;
            }

            const hashedPassword = await hashPassword(password);

            const newUser = await User.create({ public_key, email, password: hashedPassword });
            res.status(201).json({
                StatusCode: 201,
                message: "User Created Successfully"
            });
        } catch (err) {
            res.status(500).json({
                StatusCode: 500,
                message: 'An error occurred ' + err
             
            });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })
            if (!user) {
                res.status(401).json({
                    StatusCode: 401,
                    messsage: "Invalid Credentials"

                })
                return;
            }

            const compare = await bcrypt.compare(password, user.password)
            const token=await generateToken(user.public_key,user.email,user.password);
            if (!compare) {
                res.status(401).json({
                    StatusCode: 401,
                    message: "Invalid Credentials"
                })
            } else {
                res.status(200).json({
                    StatusCode: 200,
                    user: {
                        public_key: user.public_key,
                        email: user.email,
                        token: token
                    }
                })
            }
        } catch (err) {
            throw err;
        }
    }

}
export default new AuthController