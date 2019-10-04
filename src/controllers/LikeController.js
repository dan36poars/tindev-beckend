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

        if (idLogged.likes.includes( idTarget._id )) {
        	console.log('Já deu like');
        	return res.status(200).json({ "error" : "like user yeat." });
        }

        if (idTarget.likes.includes( idLogged._id )) {
            const loggedSocket = req.connectUsers[idLogged._id];
            const targetSocket = req.connectUsers[idTarget._id];

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', idTarget);
            }

            if (targetSocket) {
                req.io.to(targetSocket).emit('match', idLogged);
            }
        }
	    
        idLogged.likes.push(idTarget._id);      

        await idLogged.save();

        return res.json(idLogged);
    }
};