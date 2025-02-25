import * as tmi from "tmi.js";
import dotenv from 'dotenv';
import * as config from './config.json'
import eventHandler from "./handlers/eventHandler";

dotenv.config();

const client = new tmi.Client({
    options: { debug: true },
    channels: [process.env.CHANNEL || "default_channel"],
    identity: {
        username: process.env.USERNAME,
        password: process.env.OAUTH_TOKEN,
    },
});

eventHandler(client);

client.connect();

for(const repeated_message of config.repeated_messages){
    setInterval(() => {
        client.say(
            `#${process.env.CHANNEL}`,
            repeated_message.message
        )
    }, repeated_message.cooldown * 1000)
}
