import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message, TextChannel } from 'discord.js';

import { Bot, Event, EventsTypes } from '../../structures/index.js';

function truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
}

export default class MessageCreate extends Event {
    constructor(client: Bot, file: string) {
        super(client, file, {
            name: EventsTypes.MessageCreate,
        });
    }

    public async run(message: Message): Promise<void> {
        if (message.channel instanceof TextChannel) {
            if (message.content.endsWith('?')) {
                try {
                    const threadName = truncateText(message.content, 100);
                    const thread = await message.startThread({
                        name: threadName,
                        autoArchiveDuration: 60,
                    });

                    const generationConfig = {
                        maxOutputTokens: 1900,
                        temperature: 0.9,
                        topK: 1,
                        topP: 1,
                    };

                    const genAI = new GoogleGenerativeAI(this.client.config.geminiKey);
                    const model = genAI.getGenerativeModel({
                        model: this.client.config.geminiModel,
                        generationConfig,
                    } as any);

                    let chat = model.startChat({
                        history: [
                            {
                                role: 'user',
                                parts: [{ text: message.content }],
                            },
                        ],
                    });

                    let result = await chat.sendMessage(message.content);
                    let response = result.response;

                    let generatedText = response.text();

                    while (generatedText.length > 1500) {
                        await thread.send(generatedText.substring(0, 1500));
                        generatedText = generatedText.substring(1500);

                        result = await chat.sendMessage(generatedText);
                        response = result.response;
                        generatedText = response.text();
                    }

                    await thread.send(generatedText);
                } catch (error) {
                    throw new Error(`An error occurred while generating the response: ${error}`);
                }
            }
        }
    }
}
