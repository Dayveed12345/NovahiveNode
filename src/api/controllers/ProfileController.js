import { Op } from 'sequelize';
import db from '../models/index.js';

const { User, Profile } = db;

class ProfileController {
    async index(req, res) {
        try {
            const users = await User.findAll({
                attributes: ['public_key', 'email'],
                include: [{
                    model: Profile,
                    attributes: ['experience', 'rating'],
                    as: 'profile'
                }]
            });

            console.log(`This is the ${JSON.stringify(users)}`);

            const response = users.map(user => ({
                email: user.email,
                public_key: user.public_key,
                experience: user.profile ? user.profile.experience : 0,
                rating: user.profile ? user.profile.rating : 0,
            }));

            res.status(200).json({
                StatusCode: 200,
                data: response
            });
        } catch (err) {
            console.error('Error fetching users with Profiles:', err);
            res.status(500).json({
                StatusCode: 500,
                message: "Server Error: " + err.message
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
                attributes: ['public_key', 'email'],
                include: [{
                    model: Profile,
                    attributes: ['experience', 'rating', 'picture', 'role', 'skill'],
                    as: 'profile'
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
                public_key: user.public_key,
                experience: user.profile ? user.profile.experience : null,
                skill: user.profile ? user.profile.skill : null,
                rating: user.profile ? user.profile.rating : null,
                picture: user.profile ? user.profile.picture : null,
                role: user.profile ? user.profile.role : null,
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
            const { user_id, experience, rating, picture, role, skill } = req.body;
            if (!user_id || !experience || !skill || !role) {
                return res.status(422).json({
                    StatusCode: 422,
                    message: "user_id, experience, skill, and role are required."
                });
            }

            const profile = await Profile.create({
                user_id,
                experience,
                rating,
                picture,
                role,
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
        const public_key = req.params.public_key;
        try {
            const [updated] = await Profile.update(req.body, { where: { public_key: public_key } });
            if (updated) {
                const updatedProfile = await Profile.findOne({ where: { public_key: public_key} });
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

export default new ProfileController();
