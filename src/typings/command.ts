import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, GuildMember, PermissionResolvable } from "discord.js";
import { DirectMessageBot } from "../structures/client";


interface RunOptions {
    client: DirectMessageBot;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;   
}

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
} & ChatInputApplicationCommandData;