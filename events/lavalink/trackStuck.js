const { MessageEmbed } = require('discord.js');

module.exports = async (client, player, track, payload) => {
    let channel = await client.channels.cache.get(player.textChannel);
    let embed = new MessageEmbed()
    .setColor(client.color.error)
    .setDescription(`Failed to play specified track, skipping...`)
    await channel.send({embeds: [embed]})
    .catch(() => { });
}
