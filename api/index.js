const express = require('express');
const bodyparser = require('body-parser');
const passport = require('passport');
const dpassport = require('passport-discord');
const Discord = require('discord.js');
const morgan = require('morgan');
const fs = require('fs');
const handler = require('./handler');
const api = express();

module.exports = {
	dashboard: (client) => {

		api.set("view engine", "ejs");

		api.use(morgan("dev"));

		api.use(bodyparser.json());

		api.use(bodyparser.urlencoded({
			extended: true,
		}));

		api.listen(process.env.port, () => {
			console.log("Listening to port: " + process.env.port);
		});

		handler.build(api, client);
	}
}
