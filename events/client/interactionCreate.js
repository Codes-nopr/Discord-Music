const { Collection, MessageEmbed } = require('discord.js')
const cooldowns = new Map();

module.exports = async (client, interaction) => {
	 if (interaction.isCommand()) {
        await interaction.deferReply().catch(() => {});

        const command = client.slashCommands.get(interaction.commandName);
        if (!command)
            return interaction.followUp({ embeds: [new MessageEmbed().setColor(client.errcolor).setDescription(`Interaction command error occurred, please try again.`)]});

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
		
		if(!cooldowns.has(command.name.toLowerCase())) {
			cooldowns.set(command.name.toLowerCase(), new Collection());
		}

		const current_time = Date.now();
		const time_stamps = cooldowns.get(command.name);
		const cooldown_amount = (command.cooldown) * 1000;

		if(time_stamps.has(interaction.user.id)) {
			const expiration_time = time_stamps.get(interaction.user.id) + cooldown_amount;

			if(current_time < expiration_time) {
				const time_left = (expiration_time - current_time) / 1000;
				return interaction.followUp({embeds: [new MessageEmbed().setColor(client.defcolor).setDescription(`Wooah, please wait **${time_left.toFixed(2)}** seconds before using this command.`)]});
			}
		}

		time_stamps.set(interaction.user.id, current_time);
		setTimeout(() => time_stamps.delete(interaction.user.id), cooldown_amount);

		try {
        	command.run(client, interaction, args);
        } catch {

        }
	 }
};
