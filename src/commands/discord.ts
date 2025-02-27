import { ChatUserstate, Client } from "tmi.js";
import { Command } from "../interfaces/Command";
import { Role } from "../enums/Role";


const command : Command = {
    role: Role.DEFAULT,
    execute: async function (client: Client, channel: string, tags: ChatUserstate, args: string[]): Promise<void> {
        client.say(channel, `@${tags.username}, tiens voici le meilleur discord : https://discord.gg/PyuCs7aJwh`);
    }
}

export default command