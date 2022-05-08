import { CommandInteractionOptionResolver } from "discord.js";
import { Event, DirectMessageBot as Client } from "../structures";
import { ExtendedInteraction } from "../typings";


export default new Event("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply();
        
        const client = new Client();
        const command = client.commands.get(interaction.commandName);

        if (!command) {
            return interaction.followUp("You have used a non existing command");
        }

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        })
    }
})