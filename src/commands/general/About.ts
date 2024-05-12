import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction } from 'discord.js';

import { Bot, Command } from '../../structures/index.js';

export default class About extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'about',
            nameLocalizations: {
                fr: 'à-propos',
                'es-ES': 'acerca-de',
                de: 'über',
                it: 'riguardo',
                ja: '約',
                ko: '약',
                'zh-CN': '关于',
                ru: 'о',
            },
            description: {
                content: '📨 | Shows information about the bot',
                usage: 'about',
                examples: ['about'],
            },
            descriptionLocalizations: {
                fr: '📨 | Affiche des informations sur le bot',
                'es-ES': '📨 | Muestra información sobre el bot',
                de: '📨 | Zeigt Informationen über den Bot an',
                it: '📨 | Mostra informazioni sul bot',
                ja: '📨 | ボットの情報を表示します。',
                ko: '📨 | 봇에 대한 정보를 표시합니다.',
                'zh-CN': '📨 | 显示有关机器人的信息',
                ru: '📨 | Показывает информацию о боте',
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
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setLabel('Invite AikouBot')
                .setURL(
                    `https://discord.com/oauth2/authorize?client_id=${this.client.user?.id}&scope=bot%20applications.commands&permissions=8`
                )
                .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
                .setLabel('Support Server')
                .setURL('https://discord.gg/JeaQTqzsJw')
                .setStyle(ButtonStyle.Link)
        );

        const embed = client
            .embed()
            .setColor(this.client.color)
            .setAuthor({ name: 'AikouBot' })
            .addFields(
                { name: 'Creator', value: '[LucasB25](https://github.com/lucasb25)', inline: true },
                {
                    name: 'Repository',
                    value: '[Here](https://github.com/lucasb25/AikouBot)',
                    inline: true,
                },
                { name: 'Support', value: '[Here](https://discord.gg/AhUJa2kdAr)', inline: true }
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
}
