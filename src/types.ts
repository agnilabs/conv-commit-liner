export type CommitType =
  | "feat"
  | "fix"
  | "docs"
  | "style"
  | "refactor"
  | "perf"
  | "test"
  | "build"
  | "ci"
  | "chore"
  | "revert";

export interface CommitMessage {
  type: CommitType;
  scope?: string;
  description: string;
  breaking?: boolean;
}
