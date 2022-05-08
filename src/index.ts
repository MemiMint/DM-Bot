require("dotenv").config();
import { DirectMessageBot } from "./structures";

const client = new DirectMessageBot();

client.start();