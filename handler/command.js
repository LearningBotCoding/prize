const { Client } = require("discord.js");
const { readdirSync, readdir } = require("fs");

/*
 * @param {Client} client
 */

module.exports = async (client) => {
  let cmdFolders = readdirSync("./commands");
  cmdFolders.forEach((f) => {
    let cmdFiles = readdirSync(`./commands/${f}`).filter((file) =>
      file.endsWith(".js")
    );

    for (let file of cmdFiles) {
      const command = require(`../commands/${f}/${file}`);

      client.commands.set(command.name, command);

      console.log("Loaded " + command.name);
    }
  });

  readdir("./events", (err, data) => {
    if (err) throw err;
    else
      data.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`../events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`../events/${file}`)];
      });
  });
};
