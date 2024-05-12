import { CommandInteraction } from 'discord.js';

import { Bot, Command } from '../../structures/index.js';

export default class Ping extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'ping',
            nameLocalizations: {
                fr: 'ping',
                'es-ES': 'ping',
                de: 'ping',
                it: 'ping',
                ja: 'ピン',
                ko: '핑',
                'zh-CN': 'ping',
                ru: 'пинг',
            },
            description: {
                content: '🏓 | Get the bot latency',
                usage: 'ping',
                examples: ['ping'],
            },
            descriptionLocalizations: {
                fr: '🏓 | Obtiens la latence du bot.',
                'es-ES': '🏓 | Obtén la latencia del bot',
                de: '🏓 | Erhalte die Bot-Latenz',
                it: '🏓 | Ottieni la latenza del bot',
                ja: '🏓 | ボットのレイテンシを取得します。',
                ko: '🏓 | 봇의 대기 시간 가져오기',
                'zh-CN': '🏓 | 获取机器人延迟',
                ru: '🏓 | Получить задержку бота',
            },
            category: 'general',
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            cooldown: 3,
            options: [],
        });
    }
    async run(client: Bot, interaction: CommandInteraction): Promise<void> {
        const embed = client
            .embed()
            .setColor(this.client.color)
            .setDescription(`**Pong:** \`${Math.round(client.ws.ping)}ms\``);

        await interaction.reply({ embeds: [embed] });
    }
}
