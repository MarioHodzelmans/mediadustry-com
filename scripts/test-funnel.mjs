import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const output = mkdtempSync(path.join(tmpdir(), "mediadustry-funnel-tests-"));
let exitCode = 1;
try {
  const compiled = spawnSync(
    process.execPath,
    [
      require.resolve("typescript/bin/tsc"),
      "lib/funnel.ts",
      "lib/consent-token.ts",
      "lib/contact-service.ts",
      "--outDir",
      output,
      "--module",
      "commonjs",
      "--target",
      "ES2022",
      "--esModuleInterop",
      "--skipLibCheck",
      "--strict",
    ],
    { cwd: path.resolve(import.meta.dirname, ".."), stdio: "inherit" },
  );
  if (compiled.status === 0) {
    const tested = spawnSync(
      process.execPath,
      ["--test", "tests/contact-service.test.mjs"],
      {
        cwd: path.resolve(import.meta.dirname, ".."),
        stdio: "inherit",
        env: { ...process.env, FUNNEL_TEST_BUILD: output },
      },
    );
    exitCode = tested.status ?? 1;
  }
} finally {
  rmSync(output, { recursive: true, force: true });
}
process.exitCode = exitCode;
