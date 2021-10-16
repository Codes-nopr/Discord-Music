const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'remove',
    description: 'Restart a track from begin',
    cooldown: 2,
    options: [
        {
            name: 'number',
            description: 'Number of the song which you want to remove',
            type: 'INTEGER',
            required: true
        },
    ],

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

       let position = (Number(args[0]) - 1);
        if (!position) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`You need to specify the track number to remove from queue.`)]});
        if (position < 0 || position > player.queue.size) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`I didn't find the track number in the queue.`)]});
        await player.queue.remove(position);
        return interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`I've removed **${position + 1}** number track.`)]});
    }
}