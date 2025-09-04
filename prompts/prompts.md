# Design System Prompts

These are component-specific prompts for building with the NYT design system. Each prompt includes specific asset references and implementation guidelines.

## Article Layout Component

```
Create a React component for article layout that uses NYT design system assets from this repository.

Requirements:
- Use Cheltenham typeface for headlines (fonts/cheltenham/cheltenham-normal-700.woff2)
- Use Franklin for body text (fonts/franklin/franklin-normal-400.woff2)
- Apply color tokens from misc tokens/tpl-color-tokens-light.css for light theme
- Reference typography tokens from misc tokens/tpl-typography.css for consistent spacing
- Include NYT logo from logos/New_York_Times_T_icon.svg
- Follow brand guidelines from misc context/brand-book.html
- Use Tachyons utility classes from nyt-tachyons/ for responsive layout
- Ensure accessibility compliance per UX tenets in misc context/ux-tenents.md

Component should be mobile-first responsive with proper semantic HTML structure.
```

## Card Grid System

```
Design a flexible card grid system component for article previews using NYT design tokens.

Design system references:
- Headlines: Karnak condensed (fonts/karnak-cond/karnak-cond-normal-600.woff2)
- Metadata text: Franklin small (fonts/franklin-small/franklin-small-normal-500.woff2)
- Body preview: Imperial regular (fonts/imperial/imperial-normal-400.woff2)
- Color scheme: Light theme tokens (misc tokens/tpl-color-tokens-light.css)
- Typography scale: Reference misc tokens/tpl-typography.css for consistent sizing
- Spacing: Use size tokens from misc tokens/tpl-size-tokens.css

Grid requirements:
- Responsive breakpoints using NYT Tachyons grid system
- Cards should have consistent aspect ratios and spacing
- Hover effects that maintain brand consistency
- Support for featured articles with larger card sizes
- Accessible focus states and semantic markup
- Follow UX principles outlined in misc context/ux-tenents.md
```

## Navigation Header

```
Build a navigation header component using NYT design system standards.

Assets to reference:
- Franklin font family for navigation items (fonts/franklin/franklin-normal-500.woff2 and franklin-normal-600.woff2)
- NYT T logo (logos/New_York_Times_T_icon.svg) positioned according to brand guidelines
- Dark theme color tokens from misc tokens/tpl-color-tokens-dark.css
- Size tokens from misc tokens/tpl-size-tokens.css for consistent spacing
- Semantic colors from misc tokens/ink_semantic-colors-inverse-(dark).css

Implementation notes:
- Header should be sticky with proper z-index layering
- Use NYT Tachyons classes for layout and spacing consistency
- Include hover states and focus indicators for accessibility
- Reference brand book guidelines for logo placement and sizing
- Implement responsive behavior that works across device sizes
```

## Form Input Components

```
Create form input components that align with NYT design standards.

Design system requirements:
- Use Franklin font family for labels and input text (fonts/franklin/franklin-normal-400.woff2)
- Apply semantic color tokens for states (misc tokens/ink_semantic-colors-default-(light).css)
- Reference size tokens for consistent spacing and sizing (misc tokens/tpl-size-tokens.css)
- Follow accessibility guidelines from misc context/ux-tenents.md

Component specifications:
- Text inputs, textareas, select dropdowns, and checkboxes
- Clear focus states with proper contrast ratios
- Error and success state styling using semantic color tokens
- Consistent padding and margin using NYT Tachyons spacing classes
- Mobile-optimized touch targets and responsive behavior
```

## Data Visualization Styles

```
Develop data visualization components using NYT visual design principles.

Typography and color references:
- Chart labels: Franklin medium (fonts/franklin/franklin-normal-500.woff2)
- Data callouts: Karnak bold (fonts/karnak/karnak-normal-700.woff2)
- Color palette: Use light theme tokens (misc tokens/tpl-color-tokens-light.css)
- Ensure accessibility with proper contrast ratios

Visualization requirements:
- Clean, minimal aesthetic consistent with NYT editorial style
- Responsive design that works across screen sizes
- Interactive elements with appropriate hover and focus states
- Color blind friendly palette using semantic color definitions
- Typography hierarchy that guides reader attention effectively
```

## Cursor Rules Examples

```
Reference implementation examples for .cursorrules configuration.

This file contains detailed component-specific rules covering:
- Typography usage patterns with specific font file references
- Color token application for consistent theming
- Accessibility requirements and ARIA implementation
- Performance standards including font loading optimization
- Code quality guidelines for React components
- Design system compliance patterns

Use these examples to configure Cursor for automatic NYT design system compliance in your projects.
```
