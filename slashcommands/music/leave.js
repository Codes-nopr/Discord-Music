const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leave',
    description: `Stop current track and leave voice channel`,
    cooldown: 2,

    run: async(client, interaction) => {
         /* No perms required */
         /* Check users voice channel */
         if (!interaction.member.voice.channel) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`You need to be in a voice channel to run this command.`)]});
         if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`You are not connected to the same voice channel.`)]});
         
         let player = interaction.client.manager.get(interaction.guild.id);
        await player.destroy();
        return interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`Okay, I left <#${interaction.member.voice.channel.id}> voice channel.`)]})
    }
}
