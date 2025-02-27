import { Client, ChatUserstate } from "tmi.js";
import { readdirSync } from "fs";
import { join, parse } from "path";
import { prefix } from "../config.json";

const commands = new Map<string, Function>();
const commandsPath = join(__dirname, "../commands");
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

for (const file of commandFiles) {
    const commandName = parse(file).name;
    import(`../commands/${file}`).then((commandModule) => {
        if (typeof commandModule.default === "function") {
            commands.set(commandName, commandModule.default);
            console.log(`✅ Commande chargée : ${commandName}`);
        } else {
            console.warn(`⚠️ Le fichier ${file} ne contient pas de fonction valide.`);
        }
    }).catch(err => console.error(`❌ Erreur lors du chargement de ${file}:`, err));
}

export function handleCommand(client: Client, channel: string, tags: ChatUserstate, message: string, self: boolean) {
    if (self || !message.startsWith(prefix)) return;

    const args = message.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;

    const command = commands.get(commandName);
    if (!command) return;

    command(client, channel, tags, args);
}
