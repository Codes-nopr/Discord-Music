const { MessageEmbed } = require('discord.js');
const { convertTime } = require('../../util/util');

module.exports = {
    name: 'queue',
    description: 'Restart a track from begin',
    cooldown: 2,
    options: [
        {
            name: 'page',
            description: 'Page number of queue',
            type: 'INTEGER',
            required: false
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

       try {
            if (!player.queue.length) return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`There are no tracks in the queue.`)]});
            let queue = player.queue;
            let embed = new MessageEmbed().setColor(client.defcolor);
            let multiple = 10;
            let p = interaction.options.getInteger('page');
            let page = Number(p) ? Number(p) : 1;
            let end = page * multiple;
            let start = end - multiple;
            let tracks = queue.slice(start, end);
            
            if (queue.current) embed.addField(`Now playing`, `[${queue.current.title ? queue.current.title : '*Playing something*'}](${queue.current?.uri})`);
            if (!tracks.length) embed.addField(`No tracks in ${page > 1 ? `page ${page}` : 'the queue'}.`);
            else embed.setDescription(`__Queue List__\n\n` + tracks.map((track, i) => `**${start + (++i)}.** [${track.title ? track.title : '*something cool*'}](${track?.uri}) | \`[${convertTime(track.duration ? track.duration : 'Unknown')}]\``).join('\n'));

            embed.addField(`Info`, `Songs queued: \`${queue.length ?? 'Unknown'}\`\nTrack loop: \`${player.trackRepeat ? 'Enabled' : 'Disabled'}\`\nQueue loop: \`${player.queueRepeat ? 'Enabled' : 'Disabled'}\``);
            let maxPages = Math.ceil(queue.length / multiple);
            embed.addField(`\u200b`, `Page ${page > maxPages ? maxPages : page} of ${maxPages}`);
            return interaction.followUp({embeds: [embed]});
        } catch {
            let p = interaction.options.getInteger('page');
            return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`No page number **${p}** found in the queue.`)]});
        }
    }
}