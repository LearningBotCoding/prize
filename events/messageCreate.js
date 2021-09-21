const Guild = require('../models/guildSchema');

module.exports = async(client, message) => {
  if (message.author.bot || !message.guild) return;

  const guildConf = await Guild.findOne({guildId: message.guild.id});

  if (message.content.indexOf(guildConf.prefix) !== 0) return;

  const args = message.content
    .slice(guildConf.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  if (!cmd) return;

  try {
    cmd.exec(client, message, args);
  } catch(err) {
    console.error(err);
    message.reply({content: "Seems like some error occured! Please contact <@!777236834064531467> "});
  }
};
