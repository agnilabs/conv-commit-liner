#!/usr/bin/env bun
import { Command } from "commander";
import {
  analyzeChanges,
  generateCommitMessage,
  getStagedChanges,
} from "./index";

const program = new Command();

program
  .name("ccl")
  .description("Generate conventional commit messages from staged changes")
  .option("-s, --scope <scope>", "specify commit scope")
  .option("-b, --breaking", "mark as breaking change", false)
  .option("-t, --type <type>", "override commit type")
  .action(async (options) => {
    try {
      const diff = await getStagedChanges();
      if (!diff) {
        console.error("No staged changes found");
        process.exit(1);
      }

      const baseMessage = analyzeChanges(diff);
      const message = generateCommitMessage({
        ...baseMessage,
        type: options.type || baseMessage.type,
        scope: options.scope,
        breaking: options.breaking,
      });

      console.log(message);
    } catch (error: unknown) {
      console.error(
        "Error:",
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      process.exit(1);
    }
  });

program.parse();
