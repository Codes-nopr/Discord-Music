const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'volume',
    description: `Set volume of the queue`,
    cooldown: 2,
    options: [
        {
            name: 'level',
            description: `Volume level in integer`,
            type: 'INTEGER',
            required: true
        },
    ],

    async execute(client, interaction) {
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

        let vol = interaction.options.getInteger('level');
        let volume = Number(vol);
        if (volume > 150 || volume < 0) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.color.error).setDescription(`Volume must be lower than 150 and higher than 0.`)]});

        try {
            await player.setVolume(volume);
            return interaction.followUp({embeds: [new MessageEmbed().setColor(client.color.color).setDescription(`I've set volume to **${volume}**%.`)]});
        } catch {
            return interaction.followUp({embeds: [new MessageEmbed().setColor(client.color.error).setDescription(`This commmand ran into an error, please report it to our support server.`)]});
        }
    }
}