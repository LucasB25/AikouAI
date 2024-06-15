import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

import { type Bot, Command, type Context } from '../../structures/index.js';

export default class Translate extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'translate',
            description: {
                content: 'Translates text from one language to another',
                usage: 'translate <text> <target-language>',
                examples: ['translate Hello world! es'],
            },
            category: 'ai',
            cooldown: 3,
            permissions: {
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: ['SendMessages'],
                dev: false,
            },
            options: [
                {
                    name: 'text',
                    description: 'The text to translate',
                    type: 3,
                    required: true,
                },
                {
                    name: 'target-language',
                    description: 'The target language code (e.g., "es" for Spanish)',
                    type: 3,
                    required: true,
                },
            ],
        });
    }

    async run(client: Bot, ctx: Context, args: string[]): Promise<void> {
        const text = args[0];
        const targetLanguage = args[1];

        if (!(text && targetLanguage)) {
            await ctx.sendMessage({ content: 'Please provide both the text and the target language.' });
            return;
        }

        await ctx.sendDeferMessage('Translating...');

        try {
            const { translatedText, sourceLanguageName } = await this.translateText(text, targetLanguage);
            const targetLanguageName = await this.detectLanguageName(targetLanguage);

            const embed = client
                .embed()
                .setColor(this.client.color)
                .setTitle('Translation')
                .addFields(
                    { name: `Original Text (${sourceLanguageName})`, value: `\`\`\`${text}\`\`\``, inline: true },
                    { name: `Translated Text (${targetLanguageName})`, value: `\`\`\`${translatedText}\`\`\``, inline: true },
                )
                .setTimestamp()
                .setFooter({ text: 'Translation provided by Google Generative AI' });

            const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder().setLabel('Support').setStyle(ButtonStyle.Link).setURL('https://discord.gg/JeaQTqzsJw'),
            );

            await ctx.editMessage({ embeds: [embed], components: [buttonRow] });
        } catch (error) {
            await ctx.editMessage({ content: `An error occurred while translating: ${error.message}` });
        }
    }

    private async translateText(text: string, targetLanguage: string): Promise<{ translatedText: string; sourceLanguageName: string }> {
        const genAI = new GoogleGenerativeAI(this.client.config.geminiKey);
        const model = genAI.getGenerativeModel({
            model: this.client.config.geminiModel,
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.9,
                topK: 1,
                topP: 1,
            },
            safety_settings: [
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ],
        } as any);

        const response = await model
            .startChat({
                history: [
                    {
                        role: 'user',
                        parts: [{ text: `Translate the following text to ${targetLanguage}: ${text}` }],
                    },
                ],
            })
            .sendMessage(text);

        const translatedText = response.response.text();

        const sourceLanguageName = await this.detectLanguageName(text);

        return { translatedText, sourceLanguageName };
    }

    private async detectLanguageName(text: string): Promise<string> {
        const genAI = new GoogleGenerativeAI(this.client.config.geminiKey);
        const model = genAI.getGenerativeModel({
            model: this.client.config.geminiModel,
            generationConfig: {
                maxOutputTokens: 100,
                temperature: 0.9,
                topK: 1,
                topP: 1,
            },
            safety_settings: [
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ],
        } as any);

        const response = await model
            .startChat({
                history: [
                    {
                        role: 'user',
                        parts: [{ text: `Detect the language of the following text: ${text}` }],
                    },
                ],
            })
            .sendMessage(text);

        const detectedLanguageName = response.response.text();

        return detectedLanguageName;
    }
}
