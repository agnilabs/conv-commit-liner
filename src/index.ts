import simpleGit from "simple-git";
import type { CommitMessage, CommitType } from "./types";

export async function getStagedChanges(): Promise<string> {
  const git = simpleGit();
  const diff = await git.diff(["--cached", "--name-only"]);
  return diff;
}

export function generateCommitMessage(message: CommitMessage): string {
  const { type, scope, description, breaking } = message;
  const scopePart = scope ? `(${scope})` : "";
  const breakingPart = breaking ? "!" : "";

  return `${type}${scopePart}${breakingPart}: ${description}`;
}

export function analyzeChanges(diff: string): CommitMessage {
  const files = diff.split("\n").filter(Boolean);
  const type = determineCommitType(files);

  return {
    type,
    description: generateDescription(files, type),
  };
}

function determineCommitType(files: string[]): CommitType {
  if (files.some((f) => f.startsWith("test/"))) return "test";
  if (files.some((f) => f.startsWith("docs/") || f.endsWith(".md")))
    return "docs";
  if (files.some((f) => f.includes("package.json") || f.includes("bun.lockb")))
    return "chore";
  if (files.some((f) => f.startsWith(".github/"))) return "ci";

  return "feat";
}

function generateDescription(files: string[], type: CommitType): string {
  if (files.length === 0) return "empty commit";

  // Special handling for common types
  if (type === "docs") return "update docs";
  if (type === "test") return "update test";

  // Default file-based description
  if (files.length === 1) return `update ${files[0]}`;
  const commonPath = findCommonPath(files);
  return commonPath ? `update ${commonPath}` : `update ${files.length} files`;
}

function findCommonPath(files: string[]): string {
  if (files.length === 0) return "";

  const parts = files[0].split("/");
  const commonParts: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (files.every((f) => f.split("/")[i] === part)) {
      commonParts.push(part);
    } else {
      break;
    }
  }

  return commonParts.join("/");
}
