2025-09-11
- created human-readable filenames for both svg and png assets using emojibase-data mappings; now all files have searchable names like "grinning-face.svg/png" instead of unicode codepoints
- removed all non-human readable emoji files to create a clean, browsable collection with only named assets
- final structure: 1,869 svg files and 1,868 png files, all with descriptive names in `/svg` and `/png` directories
- added `scripts/name-svgs.js` and `scripts/name-pngs.js` for automated naming using emojibase-data
- applied web-safe compression (pngquant + oxipng) to png files for optimal file sizes
- breaking change: removed codepoint-named files; only human-readable filenames remain

2025-09-10
- converted all svg assets to 1200px-wide pngs while preserving transparency; outputs stored under `png-1200/` mirroring the original directory structure
- applied web-safe png compression (pngquant + oxipng) to reduce file sizes without visible quality loss
- no breaking changes; original svg sources retained for reference

