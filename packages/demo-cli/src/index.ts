import './appenv.js'
import {Command} from "commander";
import {mainPrompt} from "./main.js";

const program = new Command();
program
.name("starfish-cli")
.description("CLI to interact with starfish")
.version("0.0.1")
.exitOverride(() => process.exit(0));

program
.action(mainPrompt);

// this parses the process.argv array
program.parse();