import * as tmi from "tmi.js";

const client = new tmi.Client({
  options: { debug: true },
  channels: ['kaluminium'],
  identity: {
    username: 'kaluminium',
    password: 'oauth:2d3f0480fvwhuhgzn54la2r5n385lg'
    }
});

client.connect();

setInterval(() => {
  client.say("#kaluminium", "Hey salut à toi ! Tu aimes Pokémon et la shasse ? Alors pose toi tranquillement devant le stream, lâche ton meilleur follow et si tu veux en savoir plus fais un !discord :)")
}, 300000)

client.on("message", (channel, tags, message, self) => {
  if (self) return;
  console.log(channel);
  if (channel != "#kaluminium") return;
  if (message.toLowerCase() === "!hello") {
    client.say(channel, `@${tags.username}, salut ! 👋`);
  }
});