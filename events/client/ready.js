const { glob } = require('glob'),
      { promisify } = require("util"),
      globPromise = promisify(glob),
      { Collection } = require('discord.js');

module.exports = async (client) => {
    client.slashCommands = new Collection();
    const slashCommands = await globPromise(
        `${process.cwd()}/slashcommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map(async (value) => {
        const file = require(value);
        if (!file?.name) return;
        console.log(`Pushed all slash commands, registering to guilds may take a while.`);
        client.slashCommands.set(file.name, file);
        arrayOfSlashCommands.push(file);
    });
    await client.guilds.cache.get("896720311733616640")
    .commands.set(arrayOfSlashCommands);

    await client.manager.init(client.user.id);
    console.log(`[Logged] Username: ${client.user.username}. Servers: ${client.guilds.cache.size}`);
}
