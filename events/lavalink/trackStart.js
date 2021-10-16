 const { MessageEmbed } = require('discord.js');

module.exports = async (client, player, track, payload) => {
      let channel = await client.channels.cache.get(player.textChannel);
      let embed = new MessageEmbed()
      .setColor(client.defcolor)
	.setTitle('Now Playing')
	.setThumbnail(`https://img.youtube.com/vi/${track?.identifier}/mqdefault.jpg`)
      .setDescription(`[${track.title ?? 'Unknown'}](${track?.uri}) [<@${track.requester.id}>]`)
      await channel.send({embeds: [embed]})
      .catch(() => { });
}