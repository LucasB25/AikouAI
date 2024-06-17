import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

import { type Bot, Command, type Context } from '../../structures/index.js';

export default class Calculate extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'calculate',
            description: {
                content: 'Solves a mathematical expression',
                usage: 'calculate <expression>',
                examples: [
                    'calculate sum of first 100 terms of arithmetic series with first term 1 and common difference 3',
                    'calculate solve for x: x^2 - 5x + 6 = 0',
                ],
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
                    name: 'expression',
                    description: 'The mathematical expression to solve',
                    type: 3,
                    required: true,
                },
            ],
        });
    }

    async run(client: Bot, ctx: Context, args: string[]): Promise<void> {
        const expression = args.join(' ');

        if (!expression) {
            await ctx.sendMessage({ content: 'Please provide a mathematical expression to solve.' });
            return;
        }

        await ctx.sendDeferMessage('Calculating...');

        try {
            const result = await this.solveMathExpression(expression);

            if (!this.isValidMathResult(result)) {
                throw new Error('Invalid mathematical result.');
            }

            const embed = client
                .embed()
                .setTitle('Calculation Result')
                .addFields(
                    { name: 'Expression', value: `\`\`\`${expression}\`\`\``, inline: true },
                    { name: 'Result', value: `\`\`\`${result}\`\`\``, inline: true },
                )
                .setTimestamp()
                .setFooter({ text: 'Calculation provided by Google Generative AI' });

            const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder().setLabel('Support').setStyle(ButtonStyle.Link).setURL('https://discord.gg/JeaQTqzsJw'),
            );

            await ctx.editMessage({ embeds: [embed], components: [buttonRow] });
        } catch (error) {
            console.error('Calculation Error:', error);
            await ctx.editMessage({ content: `An error occurred while calculating: ${error.message}` });
        }
    }

    private async solveMathExpression(expression: string): Promise<string> {
        const genAI = new GoogleGenerativeAI(this.client.config.geminiKey);
        const model = genAI.getGenerativeModel({
            model: this.client.config.geminiModel,
            generationConfig: {
                maxOutputTokens: 100,
                temperature: 0.7,
                topK: 1,
                topP: 0.95,
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
                        parts: [
                            {
                                text: `Solve the following mathematical expression: ${expression}. Provide only the result. If you determine that the requested mathematical expression has no relevance to mathematics, indicate that the posed expression is incorrect.`,
                            },
                        ],
                    },
                ],
            })
            .sendMessage(expression);

        const result = response.response.text().trim();
        return result;
    }
    private isValidMathResult(result: string): boolean {
        // Implement validation logic to check if the result is a valid mathematical expression
        // Here you can add specific checks based on the expected format of a mathematical result
        // For simplicity, this example checks if the result contains digits or basic operators
        return /[0-9+\-*/^()=.]/.test(result); // Example: Checks if the result contains digits or operators
    }
}
