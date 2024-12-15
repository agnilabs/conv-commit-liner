import { describe, expect, it } from "bun:test";
import { analyzeChanges, generateCommitMessage } from "../src";
import type { CommitMessage } from "../src/types";

describe("generateCommitMessage", () => {
  it("should generate basic commit message", () => {
    const message: CommitMessage = {
      type: "feat",
      description: "add new feature",
    };
    expect(generateCommitMessage(message)).toBe("feat: add new feature");
  });

  it("should include scope when provided", () => {
    const message: CommitMessage = {
      type: "fix",
      scope: "api",
      description: "fix endpoint",
    };
    expect(generateCommitMessage(message)).toBe("fix(api): fix endpoint");
  });

  it("should mark breaking changes", () => {
    const message: CommitMessage = {
      type: "feat",
      description: "change api",
      breaking: true,
    };
    expect(generateCommitMessage(message)).toBe("feat!: change api");
  });
});

describe("analyzeChanges", () => {
  it("should detect test changes", () => {
    const diff = "test/index.test.ts\ntest/utils.test.ts";
    const result = analyzeChanges(diff);
    expect(result.type).toBe("test");
    expect(result.description).toBe("update test");
  });

  it("should detect documentation changes", () => {
    const diff = "docs/api.md\nREADME.md";
    const result = analyzeChanges(diff);
    expect(result.type).toBe("docs");
    expect(result.description).toBe("update docs");
  });

  it("should use feat as default type", () => {
    const diff = "src/index.ts";
    const result = analyzeChanges(diff);
    expect(result.type).toBe("feat");
    expect(result.description).toBe("update src/index.ts");
  });
});
