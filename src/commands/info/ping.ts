import { Command } from "../../structures";

export default new Command({
    name: "ping",
    description: "replies with pong",
    run: ({ interaction }) => {
        interaction.followUp("pong3");
    }
})