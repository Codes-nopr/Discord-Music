const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'filter',
    description: 'Provide filters on the queue',
    options: [
        {
            name: 'bass',
            description: 'Bass filter',
            type: 'SUB_COMMAND'
        },
        {
            name: 'bassboost',
            description: 'Bass Boost filter',
            type: 'SUB_COMMAND'
        },
        {
            name: 'errape',
            description: 'Errape filter',
            type: 'SUB_COMMAND'
        },
        {
            name: 'party',
            description: 'Party filter',
            type: 'SUB_COMMAND'
        },
        {
            name: 'pop',
            description: 'Pop filter',
            type: 'SUB_COMMAND'
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

       var cmd = interaction.options.getSubcommand();

       switch (cmd) {
           case 'bass':
                var bands = [
                    { band: 0, gain: 0.6 },
                    { band: 1, gain: 0.7 },
                    { band: 2, gain: 0.8 },
                    { band: 3, gain: 0.55 },
                    { band: 4, gain: 0.25 },
                    { band: 5, gain: 0 },
                    { band: 6, gain: -0.25},
                    { band: 7, gain: -0.45 },
                    { band: 8, gain: -0.55 },
                    { band: 9, gain: -0.7 },
                    { band: 10, gain: -0.3 },
                    { band: 11, gain: -0.25 },
                    { band: 12, gain: 0 },
                    { band: 13, gain: 0 },
                    { band: 14, gain: 0 }
                ];

                await player.setEQ(...bands);
                interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`Adding bass filter`)]});
            break;

            case 'bassboost':
                var bands = new Array(7).fill(null).map((_, i) => (
                    { band: i, gain: 0.25 }
                ));
                await player.setEQ(...bands);
                interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`Adding bass filter`)]});
            break;

            case 'errape':
                var bands = [
                    { band: 0, gain: 0.25 },
                    { band: 1, gain: 0.5 },
                    { band: 2, gain: -0.5 },
                    { band: 3, gain: -0.25 },
                    { band: 4, gain: 0 },
                    { band: 5, gain: 0 },
                    { band: 6, gain: -0.025 },
                    { band: 7, gain: -0.0175 },
                    { band: 8, gain: 0 },
                    { band: 9, gain: 0 },
                    { band: 10, gain: 0.0125 },
                    { band: 11, gain: 0.025 },
                    { band: 12, gain: 0.375 },
                    { band: 13, gain: 0.125 },
                    { band: 14, gain: 0.125 }
                ];
                await player.setEQ(...bands);
                interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`Adding bass filter`)]});
            break;

            case 'party':
                var bands = [
                    { band: 0, gain: -1.16 },
                    { band: 1, gain: 0.28 },
                    { band: 2, gain: 0.42 },
                    { band: 3, gain: 0.5 },
                    { band: 4, gain: 0.36 },
                    { band: 5, gain: 0 },
                    { band: 6, gain: -0.3},
                    { band: 7, gain: -0.21 },
                    { band: 8, gain: -0.21 }
                ];
                await player.setEQ(...bands);
                interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`Adding bass filter`)]});
            break;

            case 'pop':
                var bands = [
                    { band: 0, gain: -0.25 },
                    { band: 1, gain: 0.48 },
                    { band: 2, gain: 0.59 },
                    { band: 3, gain: 0.72 },
                    { band: 4, gain: 0.56 },
                    { band: 5, gain: 0.15 },
                    { band: 6, gain: -0.24},
                    { band: 7, gain: -0.24 },
                    { band: 8, gain: -0.16 },
                    { band: 9, gain: -0.16 },
                    { band: 10, gain: 0 },
                    { band: 11, gain: 0 },
                    { band: 12, gain: 0 },
                    { band: 13, gain: 0 },
                    { band: 14, gain: 0 }
                ];
                await player.setEQ(...bands);
                interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`Adding bass filter`)]});
            break;
       }
    }
}