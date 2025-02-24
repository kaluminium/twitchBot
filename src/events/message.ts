import { ChatUserstate, Client } from "tmi.js";

export default function (client: Client, channel: string, tags: ChatUserstate, message: string, self: boolean) {
  if (self) return;
  if (channel !== "#kaluminium") return;
  if (message.toLowerCase() === "!hello") {
    client.say(channel, `@${tags.username}, salut ! 👋`);
  }
}