---
name: Obsedian Noir
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#cec6ab'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#979177'
  outline-variant: '#4c4732'
  surface-tint: '#e2c600'
  primary: '#fffcff'
  on-primary: '#383000'
  primary-container: '#ffe000'
  on-primary-container: '#716300'
  inverse-primary: '#6c5e00'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#f3ffff'
  on-tertiary: '#003738'
  tertiary-container: '#13f8ff'
  on-tertiary-container: '#006e72'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe33b'
  primary-fixed-dim: '#e2c600'
  on-primary-fixed: '#211b00'
  on-primary-fixed-variant: '#524700'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#4bf9ff'
  tertiary-fixed-dim: '#00dce2'
  on-tertiary-fixed: '#002021'
  on-tertiary-fixed-variant: '#004f52'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
  error-red: '#FF3B3B'
  electric-cyan: '#00C8E0'
  surface-grey: '#1A1A1A'
typography:
  headline-display:
    fontFamily: Oswald
    fontSize: 80px
    fontWeight: '700'
    lineHeight: 90px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Oswald
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Oswald
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 42px
  headline-md:
    fontFamily: Oswald
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The brand identity is defined by a high-octane, "Digital Industrial" aesthetic. It targets SMEs and forward-thinking creators who value speed, raw power, and professional edge. The design narrative is built on the concept of "unfiltered impact"—stripping away soft gradients and subtle shadows in favor of aggressive contrast and structural clarity.

The visual style is **High-Contrast / Bold** mixed with **Brutalism**. It utilizes expansive black voids, punctuated by a piercing electric yellow to guide the eye toward "superpowers" and calls to action. The interface should feel like a high-performance terminal: urgent, precise, and unapologetically loud.

**Design Principles:**
- **Kinetic Energy:** Use sharp transitions and high-contrast color blocks to create a sense of movement.
- **Structural Integrity:** Elements are bounded by heavy borders or strict grid alignments.
- **Impact-First:** Headlines should dominate the visual field, demanding immediate attention.

## Colors

This design system utilizes a "Deep Dark" color palette to maximize the vibrance of the brand's signature yellow. 

- **Primary (Yellow):** Used exclusively for high-priority actions, interactive states, and highlighting "Superpowers." It is the core energy source of the UI.
- **Secondary (White):** Reserved for high-readability body text and striking header accents against black backgrounds.
- **Neutral (Black):** The foundation of the system. Use true black (#000000) for backgrounds to create a sense of infinite depth.
- **Accent (Cyan/Red):** These are "utility accents." Cyan is used for community insights and data visualization, while Red is strictly for destructive actions or critical errors.

## Typography

The typography strategy leverages **Oswald** to provide a condensed, architectural feel for all structural headings. To maintain professional utility without the playfulness of the reference comic fonts, **Hanken Grotesk** is used for body copy to ensure clean, high-performance readability. **JetBrains Mono** is introduced for labels and technical data to reinforce the "studio" and "technical" nature of the brand.

**Usage Rules:**
- **Headers:** Always uppercase. Use tight letter-spacing on display sizes to create a "wall of text" impact.
- **Body:** Keep line heights generous (1.5x+) to provide breathing room amidst the high-contrast color scheme.
- **Emphasis:** Use the Primary Yellow for bolded words within body paragraphs to draw attention to value propositions.

## Layout & Spacing

The layout is based on a **12-column fixed grid** for desktop, transitioning to a **4-column fluid grid** for mobile. The spacing rhythm is strictly mathematical, using an 8px base unit.

**Key Layout Features:**
- **The "Power Block":** Sections like "Superpowers" should use a CSS Grid layout with equal-height cards and heavy gutters (32px) to emphasize the modular, rugged construction.
- **Asymmetric Balance:** Use large internal padding (80px+) within sections to prevent the heavy typography from feeling cluttered.
- **Edge-to-Edge Sections:** Background color blocks (switching between Black and Surface Grey) should span the full viewport width to create clear horizontal rhythmic breaks.

## Elevation & Depth

This design system avoids traditional shadows. Depth is achieved through **Tonal Layering** and **High-Contrast Outlines**.

- **Level 0 (Base):** True Black (#000000) for the main application background.
- **Level 1 (Surface):** Surface Grey (#1A1A1A) for cards and containers to create a subtle lift without using light.
- **Interactive Depth:** When an element is hovered, do not use a shadow. Instead, use a "Hard Stroke" (2px solid Primary Yellow) or a background color shift.
- **Glassmorphism:** Use sparingly for navigation overlays. A subtle backdrop-blur (12px) with a 10% white opacity fill keeps the content legible while maintaining the dark aesthetic.

## Shapes

The shape language is **Sharp**. In line with the Brutalist and Industrial narrative, 0px border radii are used for almost all components.

- **Primary Elements:** Buttons, cards, and input fields must have 90-degree corners.
- **Exceptions:** Very small badges or "Community Insight" tags may use a 2px radius (Soft) to provide a minor visual distinction from structural UI, but the default should always be sharp.
- **Iconography:** Use thick, 2px stroke-weight icons with square caps and joins to match the typography's weight.

## Components

### Buttons
- **Primary:** Background: Yellow; Text: Black; Font: Oswald Bold; Transform: Uppercase. No border. On hover, background shifts to White.
- **Secondary:** Background: Transparent; Border: 2px White; Text: White. On hover, background becomes White and text becomes Black.

### Cards (Superpowers)
- **Style:** Background: Surface Grey; Border: 1px solid #333333.
- **Interaction:** On hover, the border changes to 2px solid Yellow, and the icon/heading inside scales slightly (1.05x).

### Input Fields
- **Style:** Background: Black; Border-bottom: 2px solid White. No side or top borders.
- **Focus State:** Border-bottom changes to Yellow; Label (using Mono font) floats above and changes to Yellow.

### Chips & Tags
- **Style:** Background: Transparent; Border: 1px solid Cyan; Text: Cyan; Font: JetBrains Mono.
- **Usage:** Used for "Community Insights" or category filtering.

### Lists
- Use custom bullet points (small Yellow squares) instead of standard circles. List items should have a bottom border of 1px #1A1A1A to maintain the grid structure.