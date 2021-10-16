const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'save',
    description: 'Save current track to DMS',
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
        .setDescription(`Track name: [${player.queue.current.title}](${player.queue.current.uri})`)
        .addField(`Duration`, `\`${format(player.queue.current.duration)}\``, true)
        .addField(`Song by`, `\`${player.queue.current.author}\``, true)
        .addField(`Queue length`, `\`${player.queue.length}\` songs`, true)
        .addField(`Saved from`, `<#${interaction.channel.id}>`, true)
         interaction.user.send({embeds: [embed]})
        .then(() => {
            return interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`I've send you DM! Check it out!`)]});
        }).catch(() => {
            return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`I can't send you DM, make sure your DM's are open.`)]});
        })

        function format(millis) {
            try {
                var h = Math.floor(millis / 3600000),
                    m = Math.floor(millis / 60000),
                    s = ((millis % 60000) / 1000).toFixed(0);
                
                    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
                    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
            } catch {
                return interaction.followUp({embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`This commmand ran into an error, please report it to our support server.`)]});
            }
        }
    }
}
