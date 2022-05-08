import { Event } from "../structures";

export default new Event("ready", () => {
    console.log("Bot is online");
})