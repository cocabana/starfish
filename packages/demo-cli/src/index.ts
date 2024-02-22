import './appenv.js'
import {Command} from "commander";
import {generateCard} from "./commands/generateCard.js";
import {selectDid} from "./commands/selectDid.js";
import {setAttributeDid} from "./commands/setAttributeDid.js";
import {issueRoleCredential} from "./commands/issueRoleCredential.js";
import {walletApi} from "@starfish/artifacts";

const program = new Command();
program
.name("starfish-cli")
.description("CLI to interact with starfish")
.version("0.0.1")
.exitOverride(() => process.exit(0));

program
.command("did.select")
.description("Select DID account by index to use with the other commands")
.requiredOption("-i, --index <index>", "index of the account (1-4)")
.action(selectDid);

program
.command("sc.set")
.description("Set DID Linked Resource on contract")
.requiredOption("-v, --value <value>", "attribute value")
.action(setAttributeDid);

program
.command("profile")
.description("Generate a profile")
.requiredOption("-n, --name <name>", "member name")
.option("-t, --title <title>", "member title")
.action(generateCard);

program
.command("vc.issue")
.description("Issue a role credential")
.requiredOption("-a, --address <name>", "address")
.requiredOption("-r, --role <title>", "member role")
.action(issueRoleCredential);

// this parses the process.argv array
program.parse();