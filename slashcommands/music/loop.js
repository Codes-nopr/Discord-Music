const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'loop',
    description: `Loop current track or queue`,
    cooldown: 2,
    options: [
        {
            name: 'mode',
            description: 'Mode to loop the music',
            type: 'STRING',
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

        let mode = interaction.options.getString('mode');

        switch (mode) {
            case 'track':
                await player.setTrackRepeat(!player.trackRepeat);
                let trackRepeat = await player.trackRepeat ? 'enabled' : 'disabled';
                interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`Current track loop has been **${trackRepeat}**.`)]});
            break;

            case 'queue':
                await player.setTrackRepeat(!player.queueRepeat);
                let queueRepeat = await player.queueRepeat ? 'enabled' : 'disabled';
                interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`Current track loop has been **${queueRepeat}**.`)]});
            break;

            default:
                interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`Specified option is invalid.`)]});
            break;
        }
    }
}