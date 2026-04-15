# Design System Documentation

## 1. Overview & Creative North Star
### The Logical Architect
This design system is built for the focused practitioner. It rejects the "cyber-hacker" cliches of the past in favor of a sophisticated, high-performance environment inspired by modern Integrated Development Environments (IDEs). The **Creative North Star** is "The Logical Architect"—a system that prioritizes structural clarity, modularity, and the quiet beauty of a perfectly organized workspace.

We break the standard "template" look by treating the interface as a series of orchestrated panes rather than a flat web page. By utilizing intentional asymmetry—where sidebars and utility panels provide a heavy visual anchor to a sprawling, high-precision content area—we create a layout that feels professional, intentional, and authoritative.

---

## 2. Colors
Our palette is a refined interpretation of syntax highlighting themes. It moves away from pitch black into a deep, nuanced charcoal that reduces eye strain while allowing accent colors to hum with clarity.

### The Palette
- **Primary & Secondary:** Use `primary` (#95ccff) for main actions and `secondary` (#f0b0ff) for supporting logic. These are your "syntax highlights."
- **Surfaces:** Utilize the full spectrum from `surface_container_lowest` (#0e0e0e) for the most recessed "editor" areas to `surface_bright` (#393939) for elevated elements.
- **Accents:** `tertiary` (#a7d387) acts as a success or "green-light" indicator, keeping the developer's mental model of "compiled and ready" intact.

### The "No-Line" Rule
Standard UI relies on borders to separate logic. This design system prohibits the use of 1px solid borders for primary sectioning. Boundaries must be defined through **Background Tonal Shifts**. 
- *Example:* A file explorer sidebar using `surface_container_low` (#1b1b1c) sitting against a main editor area using `surface` (#131313). 
- The contrast should be felt, not seen as a line.

### Glass & Gradient Implementation
To move beyond a "flat" IDE, use Glassmorphism for floating command palettes and overlays. Apply `surface_container_highest` with a 70% opacity and a `20px` backdrop blur. For primary CTAs, a subtle linear gradient from `primary` (#95ccff) to `primary_container` (#61afef) adds a "material" soul to the digital interface.

---

## 3. Typography
The typographic hierarchy is a conversation between the "Chrome" (the UI instruments) and the "Content" (the work).

- **Display & Headlines:** We use **Space Grotesk**. Its technical, slightly eccentric letterforms provide a "high-end editorial" feel that commands attention without being decorative.
- **UI Chrome & Labels:** **Inter** is the workhorse for buttons, tabs, and menus. It is invisible, legible, and efficient.
- **The Monospace Exception:** While not in the primary scale, any data-heavy content or actual code snippets should leverage a high-quality Monospace font. This signals "work mode" to the user immediately.

*Hierarchy Strategy:* Use `display-lg` for impactful entry points, but keep the majority of the UI in the `label-md` and `body-sm` range to mimic the information density of a professional tool.

---

## 4. Elevation & Depth
In this design system, depth is a product of **Tonal Layering**, not shadows.

### The Layering Principle
Think of the UI as physical panels of machined metal. 
- **Recessed (Primary Work Area):** `surface_container_lowest` (#0e0e0e).
- **Base (Navigation/Sidebars):** `surface` (#131313).
- **Elevated (Modals/Popovers):** `surface_container_high` (#2a2a2a).

### Ambient Shadows
Shadows should only be used for "floating" elements like tooltips or context menus. They must be extra-diffused: `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);`. Avoid high-contrast black shadows; let the depth feel like ambient occlusion in a dimly lit room.

### The "Ghost Border" Fallback
If accessibility requirements demand a container border, use a "Ghost Border": the `outline_variant` (#404750) at **15% opacity**. It should be a suggestion of a container, never a hard constraint.

---

## 5. Components

### Buttons
- **Primary:** Filled with `primary` (#95ccff), using `on_primary` (#003352) for text. Shape: `md` (0.375rem).
- **Secondary:** An `outline_variant` Ghost Border with `primary` text.
- **Tertiary:** Purely text-based with `on_surface_variant`. 

### Tabs & Breadcrumbs
- Tabs should feel like physical dividers. The active tab uses a 2px top-border of `primary` and a slightly lighter `surface_container`.
- Breadcrumbs use `label-sm` in `on_surface_variant`. Use a forward slash `/` or a chevron, but keep the opacity low to prioritize the current location.

### Sidebar File Explorers
Use `surface_container_low`. Forbid dividers. Use 8px of horizontal padding and 4px of vertical spacing between items. Active items should use a subtle `surface_container_highest` background with a `primary` vertical "pill" (2px wide) on the far left.

### Status Bar
The anchor of the experience. Use `surface_container_lowest` or a tinted variant like `on_primary_container` if an "Alert" or "Production" state is active. It should be a slim, 24px-32px tall bar at the absolute bottom of the viewport.

### Input Fields
Inputs should never be "white boxes." Use `surface_container_highest` with a `md` radius. The focus state is a 1px `primary` ghost border—no glow, just a sharp, logical change in state.

---

## 6. Do's and Don'ts

### Do
- **Do** use `surface_container` tiers to create hierarchy.
- **Do** embrace density. This is a tool for professionals; don't be afraid of small, crisp typography.
- **Do** use `secondary` and `tertiary` colors for semantic meaning (e.g., Pink for functions, Green for successes).

### Don't
- **Don't** use 1px solid white or high-contrast borders to separate panels.
- **Don't** use large, "bubbly" border radii. Stick to the `DEFAULT` (0.25rem) or `md` (0.375rem) to keep the aesthetic sharp.
- **Don't** use "Hacker" tropes (glowing green text, scrolling code rain). Keep it editorial, clean, and productive.
- **Don't** use dividers in lists. Use vertical whitespace and tonal shifts to imply separation.