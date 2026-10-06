import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = resolve(projectRoot, "content/homepage/index.html");
const outputPath = resolve(projectRoot, "public/native-home.html");
const source = await readFile(sourcePath, "utf8");
const $ = load(source);

function assert(condition, message) {
  if (!condition) throw new Error(`Native homepage: ${message}`);
}

assert($("html").attr("lang") === "nl", "expected Dutch language metadata");
assert($("h1").length === 1, "expected exactly one H1");
assert($("h1").text().trim(), "H1 must contain descriptive text");
assert(
  $("meta[name=robots]").attr("content")?.includes("index"),
  "homepage must be indexable",
);
assert(
  !$("meta[name=robots]").attr("content")?.includes("noindex"),
  "homepage must not be noindex",
);
assert($("head title").text().trim().length >= 20, "missing descriptive title");
assert(
  $("meta[name=description]").attr("content")?.length >= 70,
  "missing useful meta description",
);
assert(
  $("link[rel=canonical]").attr("href") === "https://www.mediadustry.com/",
  "unexpected canonical URL",
);
assert(
  $("meta[property='og:title']").attr("content"),
  "missing Open Graph title",
);
assert(
  $("meta[property='og:description']").attr("content"),
  "missing Open Graph description",
);
assert(
  $("meta[property='og:image']").attr("content"),
  "missing Open Graph image",
);
assert(
  $("meta[name='twitter:card']").attr("content") === "summary_large_image",
  "missing large Twitter card",
);
assert($("main").length === 1, "expected one main landmark");
assert(
  $("nav[aria-label]").length >= 1,
  "expected labelled primary navigation",
);
const homepageCss = $("style").text();
for (const selector of [
  ".cover-copy {",
  ".statement-grid {",
  ".solutions-grid {",
  ".image-story-inner {",
  ".expertise {",
  ".quality-grid {",
  ".menu-toggle,",
  ".menu-panel {",
  '.menu-panel[data-open="true"]',
  ".menu-panel nav > a {",
  ".menu-close {",
  ".menu-contact {",
]) {
  assert(
    homepageCss.includes(selector),
    `missing essential menu style ${selector}`,
  );
}
assert($("#werk img").length === 5, "expected five project examples");
assert(
  $("#werk img")
    .toArray()
    .every((image) => $(image).attr("alt")?.trim()),
  "every project example needs descriptive alternative text",
);

const jsonLd = $("script[type='application/ld+json']");
assert(jsonLd.length === 1, "expected one JSON-LD graph");
const structuredData = JSON.parse(jsonLd.text());
assert(
  structuredData["@context"] === "https://schema.org",
  "invalid JSON-LD context",
);
assert(Array.isArray(structuredData["@graph"]), "expected JSON-LD graph");

const assetRefs = new Set();
$("[src], [href]").each((_index, element) => {
  for (const attribute of ["src", "href"]) {
    const value = $(element).attr(attribute);
    if (value?.startsWith("/homepage-assets/")) assetRefs.add(value);
  }
});
for (const asset of assetRefs) {
  await access(resolve(projectRoot, "public", asset.slice(1)));
}

// Keep framework scripts out of the production homepage. Inline authored scripts
// are retained; the original light/dark and accessible menu behavior lives here.
$("script:not([type='application/ld+json'])").each((_index, element) => {
  const script = $(element);
  if (script.attr("src")) script.remove();
});

const output = $.html();
assert(
  !output.includes("__next_f") && !output.includes("$RC("),
  "unexpected framework payload",
);
assert($("a[href]").length > 15, "homepage links were unexpectedly removed");
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, output, "utf8");

// The adapter has already collected public assets, so add the generated HTML there too.
const adapterStatic = resolve(projectRoot, ".vercel/output/static");
try {
  await access(adapterStatic);
  await writeFile(resolve(adapterStatic, "native-home.html"), output, "utf8");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

console.log(
  `Generated native homepage from ${sourcePath}: ${Buffer.byteLength(output)} bytes; SEO metadata, structured data, five project images and ${assetRefs.size} local assets verified.`,
);
