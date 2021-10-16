const { MessageEmbed } = require('discord.js');
const prettyMilliseconds = require('pretty-ms');
const { createProgressBar, format } = require('../../util/util');

module.exports = {
    name: 'nowplaying',
    description: `Shows which track currently playing`,
    cooldown: 2,

    run: async(client, interaction) => {
         /* Check users voice channel */
         if (!interaction.member.voice.channel) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`You need to be in a voice channel to run this command.`)]});
         if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`You are not connected to the same voice channel.`)]});
         if (interaction.member.voice.channel.userLimit === interaction.member.voice.channel.members.size) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`I can't connect your voice channel since there are no more space.`)]});
         
         let player = interaction.client.manager.get(interaction.guild.id);
        
        try {
            if (!player.queue.current) {
                let embed = new MessageEmbed()
                .setColor(client.errcolor)
                .setDescription(`No music is playing`)
                return interaction.followUp({embeds: [embed]});
            }
        } catch {
            let embed = new MessageEmbed()
            .setColor(client.errcolor)
            .setDescription(`No music is linked`)
            return interaction.followUp({embeds: [embed]});
        }

        let embed = new MessageEmbed()
        .setColor(client.defcolor)
        .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
        .setDescription(`Currently playing: [${player.queue.current.title}](${player.queue.current.uri})`)
        .addField(`Duration`, `\`${format(player.queue.current.duration)}\``, true)
        .addField(`Song by`, `\`${player.queue.current.author}\``, true)
        .addField(`Queue length`, `\`${player.queue.length} songs\``, true)
        .addField(`Duration`,`${createProgressBar(player.position, player.queue.current.duration, 15).Bar} [\`${prettyMilliseconds(player.position, { colonNotation: false })} / ${prettyMilliseconds(player.queue.current.duration, { colonNotation: false })}\`]`)
        return interaction.followUp({embeds: [embed]});
    }
}