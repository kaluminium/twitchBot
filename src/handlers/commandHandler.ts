import { Client, ChatUserstate } from "tmi.js";
import { readdirSync } from "fs";
import { join, parse } from "path";
import { prefix } from "../config.json";
import { Command } from "../interfaces/Command";

const commands = new Map<string, Command>();
const commandsPath = join(__dirname, "../commands");
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

for (const file of commandFiles) {
    const commandName = parse(file).name;
    import(`../commands/${file}`).then((commandModule) => {
        const command : Command = commandModule.default;
        if (command && typeof command.execute === "function") {
            commands.set(commandName, command);
            console.log(`✅ Commande chargée : ${commandName}`);
        } else {
            console.warn(`⚠️ Le fichier ${file} ne contient pas de commande valide.`);
        }
    }).catch(err => console.error(`❌ Erreur lors du chargement de ${file}:`, err));
}

export async function handleCommand(client: Client, channel: string, tags: ChatUserstate, message: string, self: boolean) {
    if (self || !message.startsWith(prefix)) return;

    const args = message.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;

    const command : Command | undefined = commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(client, channel, tags, args);
    } catch (error) {
        console.error(`❌ Erreur lors de l'exécution de la commande ${commandName}:`, error);
        client.say(channel, `@${tags.username}, une erreur est survenue lors de l'exécution de la commande.`);
    }
}
