import { CommandInteraction } from 'discord.js';

import { Bot, Event, EventsTypes } from '../../structures/index.js';

export default class InteractionCreate extends Event {
    constructor(client: Bot, file: string) {
        super(client, file, {
            name: EventsTypes.InteractionCreate,
        });
    }

    public async run(interaction: CommandInteraction): Promise<void> {
        if (interaction.isCommand()) {
            const commandName = interaction.commandName;
            const command = this.client.commands.get(commandName);
            if (!command) return;

            try {
                await command.run(this.client, interaction);
            } catch (error) {
                if (this.isNSFWError(error)) {
                    await this.handleNSFWError(interaction);
                } else {
                    this.client.logger.error(error);
                    await this.replyWithError(
                        interaction,
                        'There was an error while executing this command!'
                    );
                }
            }
        }
    }

    private isNSFWError(error: any): boolean {
        return (
            error instanceof Error &&
            error.message ===
                'Prediction failed: NSFW content detected. Try running it again, or try a different prompt.'
        );
    }

    private async handleNSFWError(interaction: CommandInteraction): Promise<void> {
        await interaction[interaction.replied ? 'editReply' : 'reply']({
            content: 'NSFW content detected. You can\'t generate NSFW images!',
            ephemeral: true,
        });
    }

    private async replyWithError(interaction: CommandInteraction, message: string): Promise<void> {
        await interaction[interaction.replied ? 'editReply' : 'reply']({
            content: message,
            ephemeral: true,
        });
    }
}
