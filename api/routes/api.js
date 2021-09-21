module.exports = {
	path: "/api",
	route: (req, res, client) => {
		res.send("Welcome to the API page of " + client.user.tag);
	}
}
