declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string;
            GUILD_ID: string;
            ENVIROMENT: "dev" | "prod" | "debug";
        }
    }
}

export {};