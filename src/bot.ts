import * as tmi from "tmi.js";
import { readdirSync } from "fs";
import { join, parse } from "path";
import dotenv from 'dotenv';
import * as config from './config.json'

dotenv.config();

const client = new tmi.Client({
    options: { debug: true },
    channels: [process.env.CHANNEL || "default_channel"],
    identity: {
        username: process.env.USERNAME,
        password: process.env.OAUTH_TOKEN,
    },
});

client.connect();

type EventHandler<T extends keyof tmi.Events> = (client: tmi.Client, ...args: Parameters<tmi.Events[T]>) => void;

const eventsPath = join(__dirname, "events");
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

for (const file of eventFiles) {
    const eventName = parse(file).name as keyof tmi.Events;

    import(`./events/${file}`).then((eventModule) => {
        const handler = eventModule.default as EventHandler<typeof eventName>;

        if (typeof handler === "function") {
            client.on(eventName, (...args: Parameters<tmi.Events[typeof eventName]>) => handler(client, ...args));
            console.log(`✅ Event chargé : ${eventName}`);
        } else {
            console.warn(`⚠️ Le fichier ${file} ne contient pas de fonction valide.`);
        }
    }).catch(err => console.error(`❌ Erreur lors du chargement de ${file}:`, err));
}

for(const repeated_message of config.repeated_messages){
    setInterval(() => {
        client.say(
            `#${process.env.CHANNEL}`,
            repeated_message.message
        )
    }, repeated_message.cooldown * 1000)
}
