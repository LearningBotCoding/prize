module.exports = {
  name: "sudo",
  run: async (client, message, args) => {
    let wb = await message.channel.createWebhook(message.author.username, {
      avatar: message.author.displayAvatarURL({ dynamic: true }),
    });
    wb.send(args.join(" ") ? args.join(" ") : "No message provided!");
    setTimeout(() => {
      wb.delete();
    }, 3000);
  },
};
