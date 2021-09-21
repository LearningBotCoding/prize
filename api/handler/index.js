const express = require('express')
const api = express.Router();
const { readdir } = require('fs');
const chalk = require('chalk');
const ascii = require('ascii-table');
const table = new ascii('Routes');
const { Client } = require('discord.js');

/* 
@param {Client} client
@param {api} api
*/

module.exports = {
	build: (api, client) => {
		readdir("./api/routes", (err, data) => {
		if (err) throw err;
		else
			data.forEach(f => {
				const file = require(`../routes/${f}`);

				api.get(file.path, (req, res) => {
					file.route(req, res, client);
				});


				table.setHeading('Path');
				table.addRow(file.path);
			});

		console.log(chalk.green(table.toString()));
		console.log(chalk.bgGreen("Loaded " + data.length + " routes"))
	})
	}
}
