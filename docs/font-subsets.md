# Homepage font subsets

The homepage uses small local variable-font subsets of the exact Inter and JetBrains Mono files previously loaded through `next/font/google`. The full original font families remain available as lazy fallbacks for characters outside the primary subsets, including Latin Extended and other previously supported scripts. No font weights were pinned or removed.

| Font           | Original Latin WOFF2 | Homepage WOFF2 | Primary cmap | Glyphs | Weight axis          |
| -------------- | -------------------: | -------------: | -----------: | -----: | -------------------- |
| Inter          |         48,432 bytes |   21,144 bytes |           76 |    136 | 100–900, default 400 |
| JetBrains Mono |         40,480 bytes |   14,080 bytes |           76 |    122 | 100–800, default 400 |

The initial font bodies total **35,224 bytes**, down from **88,912 bytes**: a reduction of **53,688 bytes (60.4%)**. This is a file-size comparison, not a PageSpeed result. The fallback fonts must not be preloaded alongside the primary fonts.

## Coverage and validation

`public/fonts/homepage-codepoints.txt` records the 76 codepoints extracted from the rendered homepage, including its menu and footer, plus uppercase/lowercase variants for CSS `text-transform`. Both light/dark control labels are covered. Future copy using additional characters continues to use the unchanged full fallback fonts; extend and regenerate the primary subsets when it helps avoid that extra request.

The original preloaded files were already Google Latin subsets: Inter had 230 cmap entries and 518 glyphs; JetBrains Mono had 229 cmap entries and 394 glyphs. The separate lazy Latin Extended sources remain unchanged. Their complete existing coverage is retained through the full fallback family rather than split fallback candidates.

Generation retains all applicable OpenType layout features, hinting, variable axes/interpolation, font line metrics, names, copyright and license URL. Validation checks every primary character's decomposed outline and advance width against the source. HarfBuzz also compares positioning and shaped outlines with default features and each original GSUB feature enabled separately.

Both fonts passed at weights 100, 400, 420, 480, 520, 600, 700 and their maximum weights. This includes the fractional weights used by the current design. `docs/font-subsets.json` records exact file hashes, sizes, axes, feature tags and validation results. Generated timestamps are preserved so output is reproducible.

## Rebuild

Use a temporary Python environment; the site's npm dependencies do not change:

```bash
python3 -m venv /tmp/mediadustry-font-tools
/tmp/mediadustry-font-tools/bin/python -m pip install fonttools==4.66.1 brotli==1.2.0 uharfbuzz==0.56.2
/tmp/mediadustry-font-tools/bin/python scripts/subset-home-fonts.py
```

The script locates the original Latin fonts in a completed `.next/static/media` build using their content prefixes. For another source location, pass `--inter-source /path/to/original-inter.woff2 --mono-source /path/to/original-mono.woff2`. Source hashes in the JSON report identify the exact input files used here. `--output` and `--report` can redirect results to a temporary directory for review.

The script fails if cmap coverage, variable axes/interpolation, outlines, advance widths, line metrics, attribution or sampled OpenType shaping differs. It does not edit the layout or configure fallbacks.

## Licenses

Both fonts use SIL Open Font License 1.1. The local copies retain source attribution in their metadata and are accompanied by `public/fonts/Inter-OFL.txt` and `public/fonts/JetBrainsMono-OFL.txt`. Official sources: [Inter license](https://github.com/rsms/inter/blob/master/LICENSE.txt) and [JetBrains Mono license](https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt).
