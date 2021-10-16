const { MessageEmbed } = require('discord.js');

module.exports = async (client, oldState, newState) => {
    const channel = newState.guild.channels.cache.get(newState.channel?.id ?? newState.channelId);
    let player = client.manager.get(oldState.guild.id);
    let embed = new MessageEmbed()
    .setColor(client.defcolor)
    .setDescription(`Left the voice channel, as there are no more users.`)
    	
    setTimeout(async () => {
    if (newState.id == client.user.id && channel?.type == 'GUILD_STAGE_VOICE') {
        if (!oldState.channelId) {
            try {
                await newState.guild.me.voice.setSuppressed(false).then(() => { }).catch(() => { });
            } catch {
                await player.pause(true);
            }
        } else if (oldState.suppress !== newState.suppress) {
            await player.pause(newState.suppress);
        }
    }
    }, 1000);
    
    setTimeout(async () => {
        if (!player) return;
        let voice = oldState.guild.channels.cache.get(player.voiceChannel);
        let vc = player.voiceChannel; 
        if (!voice || voice === undefined) return;
 
        if (player && vc && voice.members.filter(f => !f.user.bot).size === 0) {
            try {
                let lChannel = client.channels.cache.get(player.textChannel);
                lChannel.send({embeds: [embed]});
                await player.destroy();
            } catch {

            }
        } else {

        }
    }, 5000);

	if (oldState.id === client.user.id) return;
	if (!oldState.guild.members.cache.get(client.user.id).voice.channelId) return;
}