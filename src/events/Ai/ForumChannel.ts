import { ForumChannel, type ThreadChannel } from "discord.js";
import { type Bot, Event } from "../../structures/index.js";

export default class ThreadCreate extends Event {
    constructor(client: Bot, file: string) {
        super(client, file, {
            name: "threadCreate",
        });
    }

    public async run(thread: ThreadChannel): Promise<void> {
        if (!(thread.parent instanceof ForumChannel)) return;
        try {
            const tagNames = ["open", "close"];

            const availableTags = thread.parent.availableTags;

            const newTagIds = availableTags.filter((tag) => tagNames.includes(tag.name)).map((tag) => tag.id);

            const currentTagIds = thread.appliedTags;

            const combinedTagIds = Array.from(new Set([...currentTagIds, ...newTagIds]));

            await thread.setAppliedTags(combinedTagIds);

            console.log(`Tags added to the thread: ${thread.name}`);
        } catch (error) {
            console.error(`Error while adding tags to the thread: ${thread.name}`, error);
        }
    }
}
