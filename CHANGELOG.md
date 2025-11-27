# Changelog

2025-11-26
- restructured repository as personal starter kit, removing NYT-specific assets - deleted Cheltenham, Franklin, Karnak, Imperial, and all NYT font families to focus on personal/experimental typefaces only
- removed NYT design tokens (color primitives, semantic colors, typography tokens) and Tachyons framework - simplified CSS to custom.css and tachyons-ext.css for more flexible styling approach
- removed prompts directory and strategy cards - consolidated cursor rules into .cursor/rules/ directory for better organization
- updated README to describe project as personal starter kit for Cursor-based prototyping rather than NYT-focused generative design context
- removed v0 references from documentation, focusing exclusively on Cursor workflow
- removed Quick Access section from README for cleaner, more streamlined documentation
- moved strategies.md from prompts/ to misc/ directory to preserve creative thinking framework outside of main workflow

2024-12-20
- upscaled entire HyperCard graphics library (852 images) using nearest-neighbor filtering to preserve crisp pixel art quality - created HYPERCARD GRAPHICS PACK UPSCALED directory with 300% scaled versions
- updated README to use upscaled HyperCard graphics for better display quality without blur
- added HyperCard graphics to README for visual interest - placed Odds41.png at the top and Odds22.png in the Design Tokens section
- simplified README by removing verbose sections and making disclaimer more direct - removed Usage and Contributing sections
- updated disclaimer to reflect experimental nature of generative design tools and clarify usage for sketches and prototypes only
- added working draft disclaimer to README warning users about repository instability and continuous revisions
- added Cursor rules (.cursorrules) with comprehensive design system guidelines for consistent prototyping and development
- created cursor-rules-examples.txt with detailed component-specific rules covering typography, accessibility, and performance standards
- added prompts folder with example prompts for generative design tools like Cursor - includes 5 component examples with specific asset references
- updated README file structure to include prompts directory
- simplified README documentation by removing emojis and reducing verbose language for cleaner presentation
- initialized git repository and created comprehensive design system context repository for NYT
- added complete font collection with all NYT typefaces including Cheltenham, Franklin, Karnak, Imperial, and specialized variants
- included design tokens for colors, typography, and sizing with both light and dark theme support
- added brand assets including NYT logo and brand guidelines documentation  
- integrated NYT Tachyons atomic CSS framework for rapid prototyping
- created repository structure with proper .gitignore and README documentation
- pushed repository to nytimes/generative-pd-context as private repository for design system workflows
