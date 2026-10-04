#!/usr/bin/env python3
"""Rebuild homepage font subsets without changing outlines or variable weights.

Run in a temporary venv with fonttools==4.66.1 brotli==1.2.0
uharfbuzz==0.56.2. See docs/font-subsets.md. Other characters continue to use
the complete original fonts through the site's separate fallback family.
"""
from argparse import ArgumentParser
from functools import lru_cache
from io import BytesIO
from pathlib import Path
import hashlib
import json

from fontTools import subset
from fontTools.pens.recordingPen import DecomposingRecordingPen
from fontTools.ttLib import TTFont
import uharfbuzz as hb

ROOT = Path(__file__).resolve().parent.parent


def load_harfbuzz(font):
    data = BytesIO()
    font.flavor = None
    font.save(data)
    result = hb.Font(hb.Face(data.getvalue()))
    result.scale = (font['head'].unitsPerEm, font['head'].unitsPerEm)
    hb.ot_font_set_funcs(result)
    return result


def validate(source, destination, codepoints):
    old = TTFont(source, recalcTimestamp=False)
    new = TTFont(destination, recalcTimestamp=False)
    old_cmap, new_cmap = old.getBestCmap(), new.getBestCmap()
    expected = set(old_cmap) & codepoints
    assert set(new_cmap) == expected, 'Unexpected cmap coverage'
    old_axes = [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in old['fvar'].axes]
    new_axes = [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in new['fvar'].axes]
    assert old_axes == new_axes, 'Variable axes changed'
    assert old['avar'].compile(old) == new['avar'].compile(new), 'Axis interpolation changed'
    for key in ['ascent', 'descent', 'lineGap']:
        assert getattr(old['hhea'], key) == getattr(new['hhea'], key), 'Font line metrics changed'
    assert old['head'].unitsPerEm == new['head'].unitsPerEm, 'Units per em changed'
    for name_id in [0, 1, 2, 4, 6, 13, 14, 16, 17]:
        assert sorted(n.toUnicode() for n in old['name'].names if n.nameID == name_id) == sorted(n.toUnicode() for n in new['name'].names if n.nameID == name_id), 'Font attribution changed'
    weights = sorted(set([100, 400, 420, 480, 520, 600, 700, int(old['fvar'].axes[0].maxValue)]))
    old_hb, new_hb = load_harfbuzz(old), load_harfbuzz(new)
    tags = sorted(set(r.FeatureTag for r in old['GSUB'].table.FeatureList.FeatureRecord))
    samples = [''.join(chr(cp) for cp in sorted(expected))]
    for text in [
        'MEDIADUSTRY Night Day Menu Websitevoorstel Contact Werk Diensten',
        'Websites die beter worden gevonden én gekozen.',
        'Coördinaten 50.8824° N · 5.9241° E © 2026 / 01',
    ]:
        samples.extend([''.join(c for c in variant if ord(c) in expected) for variant in [text, text.upper(), text.lower()]])
    for weight in weights:
        old_glyphs = old.getGlyphSet(location={'wght': weight})
        new_glyphs = new.getGlyphSet(location={'wght': weight})

        @lru_cache(maxsize=None)
        def outline(which, name):
            glyphs = old_glyphs if which == 'old' else new_glyphs
            pen = DecomposingRecordingPen(glyphs)
            glyphs[name].draw(pen)
            return glyphs[name].width, repr(pen.value)

        for cp in expected:
            assert outline('old', old_cmap[cp]) == outline('new', new_cmap[cp]), f'Outline/advance changed at U+{cp:04X}/{weight}'
        old_hb.set_variations({'wght': weight})
        new_hb.set_variations({'wght': weight})
        for flags in [{}] + [{tag: True} for tag in tags]:
            for text in samples:
                if not text:
                    continue
                values = []
                for font, font_hb, which in [(old, old_hb, 'old'), (new, new_hb, 'new')]:
                    buffer = hb.Buffer()
                    buffer.add_str(text)
                    buffer.guess_segment_properties()
                    hb.shape(font_hb, buffer, flags)
                    names = font.getGlyphOrder()
                    values.append([(info.cluster, pos.x_advance, pos.y_advance, pos.x_offset, pos.y_offset, outline(which, names[info.codepoint])) for info, pos in zip(buffer.glyph_infos, buffer.glyph_positions)])
                assert values[0] == values[1], f'Shaping changed at {weight}/{flags}'
    return {'cmapEqualToRequestedSourceCoverage': True, 'outlinesAndAdvancesEqual': True, 'harfbuzzShapingEqual': True, 'axesAndInterpolationEqual': True, 'lineMetricsAndAttributionEqual': True, 'weightsChecked': weights, 'featureTagsChecked': tags}


def main():
    parser = ArgumentParser(description=__doc__)
    parser.add_argument('--inter-source', type=Path)
    parser.add_argument('--mono-source', type=Path)
    parser.add_argument('--output', type=Path, default=ROOT / 'public/fonts')
    parser.add_argument('--report', type=Path, default=ROOT / 'docs/font-subsets.json')
    parser.add_argument('--codepoints', type=Path, default=ROOT / 'public/fonts/homepage-codepoints.txt')
    args = parser.parse_args()
    chars = {int(value.removeprefix('U+'), 16) for value in args.codepoints.read_text().strip().split(',')}
    fonts = [
        ('Inter', args.inter_source, '83afe278b6a6bb3c*.woff2', 'inter-home-latin.woff2'),
        ('JetBrains Mono', args.mono_source, '70bc3e132a0a741e*.woff2', 'jetbrains-mono-home-latin.woff2'),
    ]
    args.output.mkdir(parents=True, exist_ok=True)
    report = []
    for family, source, pattern, name in fonts:
        if source is None:
            matches = list((ROOT / '.next/static/media').glob(pattern))
            if len(matches) != 1:
                parser.error(f'Supply explicit source for {family}; build source not uniquely found')
            source = matches[0]
        original = TTFont(source, recalcTimestamp=False)
        assert original['name'].getDebugName(1) == family, 'Wrong original font'
        wanted = set(original.getBestCmap()) & chars
        options = subset.Options()
        options.layout_features = ['*']
        options.hinting = True
        options.name_IDs = ['*']
        options.name_languages = ['*']
        options.name_legacy = True
        options.notdef_glyph = True
        options.notdef_outline = True
        options.recommended_glyphs = True
        options.recalc_timestamp = False
        processor = subset.Subsetter(options=options)
        processor.populate(unicodes=sorted(wanted))
        processor.subset(original)
        destination = args.output / name
        original.flavor = 'woff2'
        original.recalcTimestamp = False
        original.save(destination)
        result = {'family': family, 'file': name, 'sourceBytes': source.stat().st_size, 'bytes': destination.stat().st_size, 'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'sha256': hashlib.sha256(destination.read_bytes()).hexdigest(), 'cmap': len(wanted), 'glyphs': len(original.getGlyphOrder()), 'axes': [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in original['fvar'].axes], 'validation': validate(source, destination, chars)}
        report.append(result)
        print(json.dumps(result))
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps(report, indent=2) + '\n')


if __name__ == '__main__':
    main()
