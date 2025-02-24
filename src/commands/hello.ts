import { ChatUserstate, Client } from "tmi.js";

export default function (client: Client, channel: string, tags: ChatUserstate, args: string[]) {
    client.say(channel, `@${tags.username}, salut ! 👋`);
}