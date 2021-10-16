const { MessageEmbed } = require("discord.js");

module.exports = async (client, player) => { 
    let channel = await client.channel.cache.get(player?.textChannel);
    let embed = new MessageEmbed()
    .setColor(client.defcolor)
    .setDescription(`Queue has been ended, *there are no track to play*.`)
    await channel.send({embeds: [embed]})
    .catch(() => { }); 
};