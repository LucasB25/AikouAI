import { ApplicationCommandOption, PermissionResolvable } from 'discord.js';

import { Bot } from './index.js';

interface CommandDescription {
    content: string;
    usage: string;
    examples: string[];
}

interface CommandOptions {
    name: string;
    nameLocalizations?: Record<string, string>;
    description?: CommandDescription;
    descriptionLocalizations?: Record<string, string>;
    aliases?: string[];
    cooldown?: number;
    permissions?: {
        dev: boolean;
        client: string[] | PermissionResolvable;
        user: string[] | PermissionResolvable;
    };
    options?: ApplicationCommandOption[];
    category?: string;
}

export default class Command {
    public client: Bot;
    public name: string;
    public nameLocalizations: Record<string, string>;
    public description: CommandDescription;
    public descriptionLocalizations: Record<string, string> | null;
    public cooldown: number;
    public permissions: {
        dev: boolean;
        client: string[] | PermissionResolvable;
        user: string[] | PermissionResolvable;
    };
    public options: ApplicationCommandOption[];
    public category: string;

    constructor(client: Bot, options: CommandOptions) {
        this.client = client;
        this.name = options.name;
        this.nameLocalizations = options.nameLocalizations || {};
        this.description = {
            content: options.description?.content || 'No description provided',
            usage: options.description?.usage || 'No usage provided',
            examples: options.description?.examples || [''],
        };
        this.descriptionLocalizations = options.descriptionLocalizations || null;
        this.cooldown = options.cooldown || 3;
        this.permissions = {
            dev: options.permissions?.dev || false,
            client: options.permissions?.client || ['SendMessages', 'ViewChannel', 'EmbedLinks'],
            user: options.permissions?.user || [],
        };
        this.options = options.options || [];
        this.category = options.category || 'general';
    }

    public async run(_client: Bot, _message: any): Promise<any> {
        return await Promise.resolve();
    }
}
