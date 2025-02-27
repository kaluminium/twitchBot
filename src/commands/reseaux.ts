import { ChatUserstate, Client } from "tmi.js";
import { Command } from "../interfaces/Command";
import { Role } from "../enums/Role";


const command : Command = {
    role: Role.DEFAULT,
    execute: async function (client: Client, channel: string, tags: ChatUserstate, args: string[]): Promise<void> {
        client.say(channel, `@${tags.username} tiens, voici la liste de mes réseaux :\n` +
            "Youtube : https://www.youtube.com/@kaluminium\n" +
            "| Instagram : https://www.instagram.com/kaluminium_off\n" +
            "| Tiktok : https://www.tiktok.com/@kaluminiumm")
    }
}

export default command