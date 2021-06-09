function isAuthenticated(req, res, next) {
	if (req.user) next();
	else res.sendStatus(401)
};

function isAdmin(req, res, next) {
	if (req.cookies.isAdmin) next();
	else res.sendStatus(403)
};

function isSameUser(req, res, next){
	const {_id} = req.params;
	if(req.cookies._id && req.cookies._id === _id ) {
		console.log("IS SAME USER")
		next();
	}
	else res.sendStatus(403);
}

module.exports = {
	isAuthenticated,
	isAdmin,
	isSameUser
};