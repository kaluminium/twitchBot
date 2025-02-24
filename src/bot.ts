import * as tmi from "tmi.js";
import { readdirSync } from "fs";
import { join, parse } from "path";

const client = new tmi.Client({
  options: { debug: true },
  channels: ["kaluminium"],
  identity: {
    username: "kaluminium",
    password: "oauth:2d3f0480fvwhuhgzn54la2r5n385lg",
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

setInterval(() => {
  client.say(
    "#kaluminium",
    "Hey salut à toi ! Tu aimes Pokémon et la shasse ? Alors pose toi tranquillement devant le stream, lâche ton meilleur follow et si tu veux en savoir plus fais un !discord :)"
  );
}, 300000);