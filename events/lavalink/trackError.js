const { MessageEmbed } = require('discord.js');

module.exports = async (client, player, track, payload) => {
    let channel = await client.channels.cache.get(player.textChannel);
    let embed = new MessageEmbed()
    .setColor(client.errcolor)
    .setDescription(`Something broke while loading this track.`)
    await channel.send({embeds: [embed]}).catch(() => { });
    if (!player.voiceChannel) await player.destroy().catch(() => { });
}