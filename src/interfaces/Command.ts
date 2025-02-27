import { Role } from "../enums/Role";
import { ChatUserstate, Client } from "tmi.js";

export interface Command {
    role: Role;
    execute: (client: Client, channel: string, tags: ChatUserstate, args: string[]) => Promise<void>;
}
