import { Client, Events} from "tmi.js";
import { readdirSync } from "fs";
import { join, parse } from "path";

export default function(client : Client){
    type EventHandler<T extends keyof Events> = (client: Client, ...args: Parameters<Events[T]>) => void;
    const eventsPath = join(__dirname, "../events");
    const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of eventFiles) {
        const eventName = parse(file).name as keyof Events;

        import(`${eventsPath}/${file}`).then((eventModule) => {
            const handler = eventModule.default as EventHandler<typeof eventName>;

            if (typeof handler === "function") {
                client.on(eventName, (...args: Parameters<Events[typeof eventName]>) => handler(client, ...args));
                console.log(`✅ Event chargé : ${eventName}`);
            } else {
                console.warn(`⚠️ Le fichier ${file} ne contient pas de fonction valide.`);
            }
        }).catch(err => console.error(`❌ Erreur lors du chargement de ${file}:`, err));
    }
}