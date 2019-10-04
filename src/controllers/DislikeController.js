const Dev = require('../models/Dev');

module.exports = {
    async create(req, res) {
        const { userid } = req.headers;
        const { id } = req.params;

        const idLogged = await Dev.findById(userid);
        const idTarget = await Dev.findById(id);

        if (!idTarget) {
            return res.status(400).json({ "error": "user not exist.", "code": "400" });
        }

        if (idLogged.dislike.includes(idTarget._id)) {
            return res.status(200).json({ "error": "dislike user yeat." });
        } else {
            idLogged.dislike.push(idTarget._id);
        }

        await idLogged.save();

        return res.json(idLogged);
    }
};