import { ChatUserstate, Client } from "tmi.js";
import { handleCommand } from "../handlers/commandHandler";

export default function (client: Client, channel: string, tags: ChatUserstate, message: string, self: boolean) {
    handleCommand(client, channel, tags, message, self);
}
