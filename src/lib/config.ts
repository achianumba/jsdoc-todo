import { ToDoPluginConfig } from "./types";
import { resolve } from "path";

export function getConfig(): ToDoPluginConfig {
  const argv = process.argv;
  const configArg = argv.find((arg: string) => ["-c", "--configure"].includes(arg));

  const defaultConfig = {
    heading: "To Do",
    headingLevel: 2,
    outFile: resolve(process.cwd(), "README.md"),
    tag: "<!-- @todolist",
    endTag: "<!-- @endtodolist -->",
  };

  if (!configArg) {
    return defaultConfig;
  }

  const configFilename = resolve(process.cwd(), argv[argv.indexOf(configArg) + 1]);
  // eslint-disable-next-line
  const jsdocConfig = require(configFilename);

  if (!jsdocConfig || !("todoPlugin" in jsdocConfig)) {
    return defaultConfig;
  }

  const userConfig = jsdocConfig.todoPlugin;

  if ("endTag" in userConfig) {
    delete userConfig.endTag;
  }

  if ("tag" in userConfig) {
    userConfig.endTag = `<!-- @end${userConfig.tag} -->`;
    userConfig.tag = `<!-- ${userConfig.tag}`;
  }

  if (userConfig.outFile) {
    userConfig.outFile = resolve(userConfig.outFile);
  }

  return Object.assign(defaultConfig, userConfig);
}

export default getConfig;