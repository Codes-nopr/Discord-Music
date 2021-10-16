const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',
    description: `Play a desire song with query`,
    cooldown: 2,
    options: [
        {
            name: 'query',
            description: `Query of the music which you want to play`,
            type: 'STRING',
            required: true
        },
    ],

    run: async (client, interaction) => {
         /* Check users voice channel */
         if (!interaction.member.voice.channel) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`You need to be in a voice channel to run this command.`)]});
         if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`You are not connected to the same voice channel.`)]});
         if (interaction.member.voice.channel.userLimit === interaction.member.voice.channel.members.size) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`I can't connect your voice channel since there are no more space.`)]});
         
        let name = interaction.options.getString('query');
        if (name.length > 200) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`Music title must be lower than 200 words.`)]});

        const { channel } = interaction.member.voice;
        var player = interaction.client.manager.get(interaction.guild.id);

        if (player && interaction.member.voice.channel !== interaction.guild.me.voice.channel) {
            return interaction.channel.send({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`You are not connected to the same voice channel.`)]});
        } else if (!player) {
            var player = interaction.client.manager.create({
                guild: interaction.guild.id,
                voiceChannel: channel.id,
                textChannel: interaction.channel.id,
                volume: 100,
                selfDeafen: true
            });
        }

        if (player.state !== 'CONNECTED') await player.connect();
        await player.set('autoplay', false);
        let search = name;
        let res;

        try {
            res = await player.search(search, interaction.user);
            if (res.loadType === 'LOAD_FAILED') {
                if (!player.queue.current) await player.destroy();
                throw res.exception;
            }
        } catch {
            return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`An unexpected errcolor occurred, please try again.`)]});
        }


        switch (res.loadType) {
            case 'NO_MATCHES':
                if (!player.queue.current) await player.destroy();
                interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`There are no results found about this query.`)]});
            break;

            case 'TRACK_LOADED':
                var track = res.tracks[0];
                await player.queue.add(track);
				interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`Queued [${track.title}](${track.uri}) [<@${track.requester.id}>]`)]});
                if (!player.playing && !player.paused && !player.queue.size) {
                    try {
                        await player.play();
                    } catch {
                        return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`This commmand ran into an errcolor, please report it to our support server.`)]});
                    }
                } else {
                
                }
            break;

            case 'PLAYLIST_LOADED':
                await player.queue.add(res.tracks);
                interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`Queued playlist **${res.tracks.length}** songs of ${res.playlist.name}`)]});
				if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) {
                    try {
					    await player.play();
                    } catch {
                        return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`This commmand ran into an errcolor, please report it to our support server.`)]});
                    }
                }
            break;

            case 'SEARCH_RESULT':
                var track = res.tracks[0];
                await player.queue.add(track);
				interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`Queued [${track.title}](${track.uri}) [<@${track.requester.id}>]`)]});
                if (!player.playing && !player.paused && !player.queue.size) {
                    try {
                        await player.play();
                    } catch {
                        return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`This commmand ran into an errcolor, please report it to our support server.`)]});
                    }
                } else {
                }
            break;
        }
    }
}
