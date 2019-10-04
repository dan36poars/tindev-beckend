const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async create(req, res) {
        const { username, email, tel, languages } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if (userExists) {
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            email,
            user: username,
            tel,
            bio,
            languages,
            avatar
        });
        return res.json(dev);
    },

    async index(req, res) {
        const { userid } = req.headers;

        const LoggedDev = await Dev.findById( userid );

        const users = await Dev.find({
            $and: [
                { _id: { $ne: userid } },
                { _id: { $nin: LoggedDev.likes } },
                { _id: { $nin: LoggedDev.dislike } }
            ]
        });

        return res.json(users);
    } 
};