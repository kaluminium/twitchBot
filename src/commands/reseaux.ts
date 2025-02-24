import { ChatUserstate, Client } from "tmi.js";

export default function (client: Client, channel: string, tags: ChatUserstate, args: string[]) {
    client.say(channel, `@${tags.username} tiens, voici la liste de mes réseaux :\n` +
        "Youtube : https://www.youtube.com/@kaluminium\n" +
        "| Instagram : https://www.instagram.com/kaluminium_off\n" +
        "| Tiktok : https://www.tiktok.com/@kaluminiumm")
}