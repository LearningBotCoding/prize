module.exports = (client, message) => {
  if (message.author.bot) return;

  if (message.content.indexOf(client.config.prefix) !== 0) return;

  const args = message.content
    .slice(client.config.prefix.length)
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
