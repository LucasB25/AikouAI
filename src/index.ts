import { ClientOptions, Partials } from 'discord.js';

import config from './config.js';
import Bot from './structures/Client.js';

const clientOptions: ClientOptions = {
    intents: 131059,
    allowedMentions: {
        parse: ['users', 'roles', 'everyone'],
        repliedUser: false,
    },
    partials: [
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
        Partials.ThreadMember,
        Partials.Channel,
        Partials.GuildScheduledEvent,
    ],
};

const client = new Bot(clientOptions);

client.start(config.token);

function setupEventListeners(client: Bot): void {
    process.on('unhandledRejection', (error: Error) => client.logger.error(error));
    process.on('uncaughtException', (error: Error) => client.logger.error(error));
    process.on('warning', (warning: Error) => client.logger.warn(warning));
    process.on('exit', () => client.logger.warn('Process exited!'));
}

setupEventListeners(client);
