import { Client, Collection, ApplicationCommandDataResolvable, ClientEvents } from "discord.js";
import { CommandType, RegisterCommandsOptions } from "../typings"
import { Event } from "./event";
import { globPromise } from "../utils";

export class DirectMessageBot extends Client {
    public commands: Collection<string, CommandType> = new Collection();

    constructor() {
        super({ intents: 32767 });
    }

    public start() {
        this.RegisterModules();
        this.login(process.env.BOT_TOKEN);
    }

    private async importFile(filepath: string) {
        return (await import(filepath))?.default;
    }

    async RegisterCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (!guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Register commands to ${guildId}`);
        }

        else {
            this.application?.commands.set(commands);
            console.log(`Registered in global commands`);
        }
    }

    private async RegisterModules() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(`${__dirname}/../commands/*/*{.ts,.js}`);

        commandFiles.forEach(async (filepath) => {
            const command: CommandType = await this.importFile(filepath);

            if (!command.name) {
                return;
            }

            console.log(command);

            this.commands.set(command.name, command);
            slashCommands.push(command);
        })

        this.on("ready", () => {
            this.RegisterCommands({
                commands: slashCommands,
                guildId: process.env.GUILD_ID as string
            });
        });

        const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);

        eventFiles.forEach(async (filepath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(filepath);
            
            this.on(event.event, event.run);
        })
    }
}
