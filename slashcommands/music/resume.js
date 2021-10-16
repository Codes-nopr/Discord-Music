const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resume',
    description: `Resume paused track`,
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

        if (!player.paused) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`Music has already playing in this server.`)]});
        await player.pause(false);
        return interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`I've resumed current track.`)]});
    }
}