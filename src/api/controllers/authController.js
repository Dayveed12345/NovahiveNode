import { hashPassword, generateToken } from '../helpers/security.js';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
class AuthController {
    async signup(req, res) {
        try {
            const { public_key, email, password } = req.body;

            // Check if user already exists
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { email },
                        { public_key }
                    ]
                }
            });

            if (user) {
                return res.status(400).json({
                    StatusCode: 400,
                    message: "User already exists"
                });
            }

            // Hash the password and create new user
            const hashedPassword = await hashPassword(password);
            await User.create({
                public_key,
                email,
                password: hashedPassword
            });

            res.status(201).json({
                StatusCode: 201,
                message: "User Created Successfully"
            });
        } catch (err) {
            console.error('Error during signup:', err);
            res.status(500).json({
                StatusCode: 500,
                message: 'An error occurred: ' + err.message
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Find the user by email
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({
                    StatusCode: 401,
                    message: "Invalid Credentials"
                });
            }

            // Compare the provided password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    StatusCode: 401,
                    message: "Invalid Credentials"
                });
            }

            // Generate a token
            const token = await generateToken(user.public_key, user.email, user.password);

            res.status(200).json({
                StatusCode: 200,
                user: {
                    public_key: user.public_key,
                    email: user.email,
                    token
                }
            });
        } catch (err) {
            console.error('Error during login:', err);
            res.status(500).json({
                StatusCode: 500,
                message: 'An error occurred: ' + err.message
            });
        }
    }
}

export default new AuthController();
