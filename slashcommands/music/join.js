const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'join',
    description: `Join your voice channel`,
    cooldown: 2,

    run: async(client, interaction) => {
         /* Permissions */
         if (!interaction.guild.me.permissions.has(Permissions.FLAGS.CONNECT)) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`I am unable to join your voice channel. (Permission require: Connect)`)]});
         if (!interaction.guild.me.permissions.has(Permissions.FLAGS.SPEAK)) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`I am unable to speak your voice channel. (Permission require: Speak)`)]});
         if (!interaction.guild.me.permissions.has(Permissions.FLAGS.REQUEST_TO_SPEAK)) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`I am unable to request to speak to your voice channel. (Permission require: Request to speak)`)]});
        
         /* Check users voice channel */
         if (!interaction.member.voice.channel) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`You need to be in a voice channel to run this command.`)]});
         if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`You are not connected to the same voice channel.`)]});
         if (interaction.member.voice.channel.userLimit === interaction.member.voice.channel.members.size) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`I can't connect your voice channel since there are no more space.`)]});

        const { channel } = interaction.member.voice;

        var player = interaction.client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: channel.id,
            textChannel: interaction.channel.id,
            volume: 100,
            selfDeafen: true
        });
        await player.connect();
        return interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`Alright, I've join <#${interaction.member.voice.channel.id}> voice channel.`)]});
    }
}
