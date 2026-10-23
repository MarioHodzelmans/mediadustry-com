import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import esbuild from "esbuild";

const projectRoot = resolve(import.meta.dirname, "..");
const chatDir = resolve(projectRoot, "public/chat");
const enabled = process.env.NEXT_PUBLIC_CHAT_ENABLED !== "false";

await mkdir(chatDir, { recursive: true });
await writeFile(
  resolve(chatDir, "config.js"),
  `window.__MD_CHAT_ENABLED=${enabled ? "true" : "false"};\n`,
  "utf8",
);

await esbuild.build({
  absWorkingDir: projectRoot,
  entryPoints: ["components/chat/standalone.tsx"],
  outfile: "public/chat/widget.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  jsx: "automatic",
  minify: true,
  legalComments: "none",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});

console.log(
  `Chat widget bundle ready. NEXT_PUBLIC_CHAT_ENABLED=${enabled ? "on" : "off"}.`,
);
