import { ChatUserstate, Client } from 'tmi.js';
import { handleCommand } from '../handlers/commandHandler';
import { prefix } from '../config.json';

export default function (client: Client, channel: string, tags: ChatUserstate, message: string, self: boolean) {
    if (self || !message.startsWith(prefix)) return;
    handleCommand(client, channel, tags, message, self);
}
