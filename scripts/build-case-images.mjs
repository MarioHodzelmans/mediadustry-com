import { readdir, mkdir, stat } from "node:fs/promises";
import sharp from "sharp";

const source = "public/img/cases";
const output = `${source}/responsive`;
await mkdir(output, { recursive: true });
for (const file of (await readdir(source)).filter((file) =>
  file.endsWith(".webp"),
)) {
  const stem = file.slice(0, -5);
  const metadata = await sharp(`${source}/${file}`).metadata();
  const widths = stem.endsWith("-mobile")
    ? [128, 256, 390]
    : [384, 720, 1080, 1440];
  for (const width of widths) {
    if (width > metadata.width) continue;
    const destination = `${output}/${stem}-${width}.avif`;
    await sharp(`${source}/${file}`)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 60, effort: 6 })
      .toFile(destination);
    console.log(`${destination}: ${(await stat(destination)).size} bytes`);
  }
}
