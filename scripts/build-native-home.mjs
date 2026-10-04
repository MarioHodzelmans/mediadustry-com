import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = resolve(projectRoot, ".next/server/app/index.html");
const outputPath = resolve(projectRoot, "public/native-home.html");
const source = await readFile(sourcePath, "utf8");
// With scripting enabled, noscript stays raw text: its fallback pictures must not
// become live images/styles while building a page that uses JavaScript.
const $ = load(source, { scriptingEnabled: true });

function assert(condition, message) {
  if (!condition) throw new Error(`Native homepage: ${message}`);
}

function normalizedText(element) {
  return element.text().replace(/\s+/g, " ").trim();
}

assert($("h1").length === 1, "expected exactly one H1 in the built homepage");
assert(
  $('template[id^="B:"], [id^="S:"]').length === 0,
  "unresolved React stream segments need materializing before scripts are removed",
);
for (const id of [
  "header",
  "site-menu",
  "site-menu-toggle",
  "color-switcher",
  "site-content",
  "main-content",
  "home-title",
  "werk",
  "diensten",
]) {
  assert($(`[id="${id}"]`).length === 1, `missing or duplicate #${id}`);
}
assert(
  $("#werk picture > img").length === 5,
  "expected all five portfolio case images",
);
assert(
  $("#werk img[data-deferred-case-image]").length === 5,
  "portfolio images must keep their near-viewport loading markers",
);
assert(
  $("#werk img")
    .toArray()
    .every((image) => $(image).attr("alt")?.trim()),
  "a portfolio image is missing its alt text",
);
assert($("head title").text().trim(), "missing title");
assert(
  $('meta[name="description"]').attr("content")?.trim(),
  "missing description",
);
assert(
  $('meta[property="og:title"]').attr("content")?.trim(),
  "missing Open Graph title",
);
assert(
  $('meta[name="twitter:card"]').attr("content")?.trim(),
  "missing Twitter card",
);
assert(
  $('link[rel="canonical"]').attr("href") === "https://www.mediadustry.com",
  "unexpected canonical URL",
);

const originalContent = normalizedText($("#site-content"));
const originalLinks = $("a[href]").length;
const originalImages = $("#main-content picture img").length;
const originalFallbacks = $("#main-content noscript").length;
let themeScripts = 0;
let jsonLdScripts = 0;

$("script").each((_index, element) => {
  const script = $(element);
  const code = script.html() ?? "";
  if (script.attr("type") === "application/ld+json") {
    JSON.parse(code);
    jsonLdScripts += 1;
    return;
  }
  if (
    !script.attr("src") &&
    element.parent?.name === "head" &&
    /^\s*\(function\(\)\{/.test(code) &&
    /localStorage\.getItem\(['"]template\.theme['"]\)/.test(code) &&
    code.includes("document.documentElement.setAttribute") &&
    !code.includes("__next_")
  ) {
    themeScripts += 1;
    return;
  }
  script.remove();
});
assert(themeScripts === 1, "expected the single early theme script");
assert(jsonLdScripts > 0, "missing JSON-LD");
$('link[rel="preload"][as="script"], link[rel="modulepreload"]').remove();

function removeReactComments(parent) {
  for (const child of [...(parent.children ?? [])]) {
    if (
      child.type === "comment" &&
      /^(?:\/?\$[!?]?|)$/.test(child.data.trim())
    ) {
      $(child).remove();
    } else {
      removeReactComments(child);
    }
  }
}
removeReactComments($.root()[0]);

// The open state must survive CSS-module hash changes without editing source CSS.
$("head").append(
  '<style id="native-home-state">#site-menu[data-native-open="true"]{visibility:visible;opacity:1;pointer-events:auto;transition:opacity .22s ease}@media(prefers-reduced-motion:reduce){#site-menu[data-native-open="true"]{transition:none}}</style>',
);
$("body").append('<script src="/js/native-home.js" defer></script>');

assert($("h1").length === 1, "H1 changed during generation");
assert(
  normalizedText($("#site-content")) === originalContent,
  "homepage content changed",
);
assert($("a[href]").length === originalLinks, "homepage links changed");
assert(
  $("#main-content picture img").length === originalImages,
  "homepage pictures changed",
);
assert(
  $("#main-content noscript").length === originalFallbacks,
  "no-JS image fallbacks changed",
);
assert(
  $("script[src]").length === 1 &&
    $("script[src]").attr("src") === "/js/native-home.js",
  "framework scripts remain in generated homepage",
);
assert(
  $('link[rel="preload"][as="script"], link[rel="modulepreload"]').length === 0,
  "framework script preloads remain",
);
const output = $.html();
assert(
  !output.includes("__next_f") && !output.includes("$RC("),
  "React payload remains",
);
const noJsDocument = load(output, { scriptingEnabled: false });
assert(
  noJsDocument("#main-content noscript picture img").length ===
    originalFallbacks,
  "serialized no-JS pictures are missing",
);
assert(
  noJsDocument("#main-content noscript style").length === originalFallbacks,
  "serialized no-JS placeholder guards are missing",
);
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, output, "utf8");
console.log(
  `Generated native homepage: ${Buffer.byteLength(source)} → ${Buffer.byteLength(output)} bytes; five cases, metadata, CSS, theme and no-JS pictures preserved.`,
);
