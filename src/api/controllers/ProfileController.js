import { Op } from 'sequelize';
import User from '../models/User.js';
import Profile from '../models/Profile.js';

class ProfileController {
    async index(req, res) {
        try {
            const users = await User.findAll({
                attributes: ['public_key', 'email'],
                include: [{
                    model: Profile,
                    attributes: ['experience', 'rating']
                }]
            });

            console.log(`This is the ${JSON.stringify(users)}`); // Adjusted logging

            const response = users.map(user => ({
                email: user.email,
                public_key: user.public_key,
                experience: user.Profile ? user.Profile.experience : 0,
                rating: user.Profile ? user.Profile.rating : 0,
            }));

            res.status(200).json({
                StatusCode: 200,
                data: response
            });
        } catch (err) {
            console.error('Error fetching users with Profiles:', err);
            res.status(500).json({
                StatusCode: 500,
                message: "Server Error: " + err.message // Adjusted error message
            });
        }
    }

    async show(req, res) {
        const publicKey = req.params.public_key;

        if (!publicKey || publicKey.trim() === '') {
            return res.status(422).json({
                StatusCode: 422,
                data: "Invalid User"
            });
        }

        try {
            const user = await User.findOne({
                where: { public_key: publicKey },
                attributes: ['id', 'email', 'public_key'],
                include: [{
                    model: Profile,
                    attributes: ['experience', 'rating', 'picture', 'role', 'skill', 'active_status']
                }]
            });

            if (!user) {
                return res.status(404).json({
                    StatusCode: 404,
                    data: "User not found"
                });
            }

            const response = {
                email: user.email,
                publicKey: user.public_key,
                experience: user.Profile ? user.Profile.experience : null,
                skill: user.Profile ? user.Profile.skill : null,
                active_status: user.Profile ? user.Profile.active_status : null,
                rating: user.Profile ? user.Profile.rating : null,
                picture: user.Profile ? user.Profile.picture : null,
                role: user.Profile ? user.Profile.role : null,
            };

            res.status(200).json({
                StatusCode: 200,
                data: response
            });
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({
                StatusCode: 500,
                message: "Server Error"
            });
        }
    }

    async create(req, res) {
        try {
            const { public_key, name, role, picture, experience, skill } = req.body;
            if (!public_key || !name || !role || !experience || !skill) {
                return res.status(422).json({
                    StatusCode: 422,
                    message: "public_key, name, role, experience and skill are required."
                });
            }

            const profile = await Profile.create({
                public_key,
                name,
                role,
                picture,
                experience,
                skill,
            });

            res.status(201).json({
                StatusCode: 201,
                message: "Profile created successfully.",
                data: profile
            });
        } catch (error) {
            console.error('Error creating profile:', error);
            res.status(500).json({
                StatusCode: 500,
                message: "Server Error"
            });
        }
    }

    async update(req, res) {
        const publicKey = req.params.public_key;
        try {
            const [updated] = await Profile.update(req.body, { where: { public_key: publicKey } });
            if (updated) {
                const updatedProfile = await Profile.findOne({ where: { public_key: publicKey } });
                res.status(200).json({
                    StatusCode: 200,
                    message: "Profile updated successfully.",
                    data: updatedProfile
                });
            } else {
                res.status(404).json({
                    StatusCode: 404,
                    message: "Profile not found."
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({
                StatusCode: 500,
                message: "Server Error: " + error.message
            });
        }
    }
}

export default new ProfileController;
