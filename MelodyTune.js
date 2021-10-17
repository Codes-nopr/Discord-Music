/**
 * @require Declare global and including all require library's.
 */

const { readdirSync } = require('fs'),
      { Client, Collection, Intents, Options} = require('discord.js'),
      { Manager } = require('erela.js'),
      Spotify = require('better-erela.js-spotify').default;
require('dotenv').config();

/**
 * @Check for anticrash with all process error events.
 */

try {
    require('./util/process');
} catch {
    console.warn('[Warning] Process rejections not specified.');
}

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    makeCache: Options.cacheWithLimits({
        UserManager: 0,
        StageInstanceManager: 0,
        ApplicationCommandManager: 100,
        ThreadManager: 0,
        ThreadMemberManager: 0
    }),
    presence: {
        activities: [
            {
                name: 'What\'s this?'
            }
        ]
    }
});

/**
 * Setting up discord.js collection to cache.
 */

client.slashCommands = new Collection();
client.defcolor = '#1d7ef5';
client.errcolor = '#cf1f3c';
client.config = require('./json/nodes.json');
client.setMaxListeners(0);

/**
 * Setting up lavalink manager class.
 */

client.manager = new Manager({
    nodes: client.config.lavanodes.nodes,

    send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
    autoPlay: true,
    plugins: [
        new Spotify({
            clientID: process.env.SpotifyClientID || new Error('[Error] You need to specify Spotify client ID.'),
            clientSecret: process.env.SpotifyClientSecret || new Error('[Error] You need to specify Spotify client secret.')
        })
    ]
});

/* Send raw data */
client.on('raw', (raw) => client.manager.updateVoiceState(raw));

const djsEvents = readdirSync('./events/client').filter(f => f.endsWith('.js'));

for (const file of djsEvents) {
    console.log(`Loading discord.js event: ${file}`);
    const event = require(`./events/client/${file}`);
    client.on(file.split('.')[0], event.bind(null, client));
};

/**
 * Loading erela.js events
 */

const player = readdirSync('./events/lavalink').filter(f => f.endsWith('.js'));

for (const file of player) {
    console.log(`Loading erela.js event: ${file}`);
    const event = require(`./events/lavalink/${file}`);
    client.manager.on(file.split('.')[0], event.bind(null, client));
};

/* Load and register all slash commands */


client.login(process.env.Token || new Error('[Error] You need to specify bot token.'));
