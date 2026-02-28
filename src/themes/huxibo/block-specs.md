# ShipAny Block Specifications

This reference defines the schema and usage for all supported page builder blocks.
When creating dynamic pages, **strictly follow** these JSON structures.

## Table of Contents

- [Hero](#hero)
- [Logos](#logos)
- [Features](#features)
- [Features List](#features-list)
- [Features Accordion](#features-accordion)
- [Features Flow](#features-flow)
- [Features Media](#features-media)
- [Features Step](#features-step)
- [Showcases](#showcases)
- [Showcases Flow](#showcases-flow)
- [Stats](#stats)
- [Testimonials](#testimonials)
- [FAQ](#faq)
- [CTA (Call to Action)](#cta-call-to-action)
- [Subscribe](#subscribe)
- [Header](#header)
- [Footer](#footer)

---

## Hero PSEO

`block: "hero-pseo"`

A clean, text-heavy Hero block designed specifically for Programmatic SEO. Prioritizes readability and high-conversion intent over complex visuals.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"hero-pseo"` |
| `eyebrow_text` | `string` | Small overline text |
| `title` | `string` | Main H1 title |
| `description` | `string` | Subtitle/description (HTML allowed) |
| `announcement` | `object` | Small text pill below buttons `{ title }` |
| `buttons` | `array` | List of `{ title, url, variant, size, icon }` |

### Example

```json
{
  "hero-pseo": {
    "block": "hero-pseo",
    "eyebrow_text": "PSEO Infrastructure",
    "title": "ShipAny vs Notion",
    "description": "Why modern growth teams are switching to ShipAny for generating thousands of <strong>Programmatic SEO pages</strong> at scale without worrying about Vercel timeouts or missing metadata.",
    "buttons": [
      {
        "title": "Start modernizing your SEO",
        "primary": true,
        "url": "/pricing"
      }
    ],
    "announcement": {
      "title": "Trusted by 200+ Growth Hackers"
    }
  }
}
```

---

## Comparison Table

`block: "comparison-table"`

A hard feature comparison matrix typically used for Competitor vs Competitor SEO pages.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"comparison-table"` |
| `title` | `string` | Section Title |
| `description` | `string` | Subtitle |
| `features` | `array` | Rows of `{ name, us, them }`. The `us` and `them` fields can be `boolean` (Check/X icon) or `string` for text values. |
| `usName` | `string` | Header for your product column (defaults to "Us") |
| `themName` | `string` | Header for the competitor column (defaults to "Them") |
| `usIcon` | `string` | Custom Lucide icon for your product |
| `themIcon` | `string` | Custom Lucide icon for the competitor |

### Example

```json
{
  "comparison": {
    "block": "comparison-table",
    "title": "A smarter choice for HRV optimization",
    "description": "See why thousands are switching to BreathWave for science-backed breathing protocols.",
    "usName": "BreathWave",
    "themName": "Other Apps",
    "usIcon": "Activity",
    "themIcon": "Dumbbell",
    "features": [
      {
        "name": "HRV Real-time Biofeedback",
        "us": true,
        "them": false
      },
      {
        "name": "Apple Health Native Sync",
        "us": true,
        "them": "Partial"
      }
    ]
  }
}
```

---

## Pros & Cons

`block: "pros-cons"`

Displays a side-by-side list of advantages and disadvantages. Ideal for highlighting switching costs or addressing detailed feature sets in PSEO articles.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"pros-cons"` |
| `title` | `string` | Main section Title |
| `description` | `string` | Supporting subtitle |
| `prosTitle` | `string` | Left column title (defaults to "Pros") |
| `consTitle` | `string` | Right column title (defaults to "Cons") |
| `pros` | `array` | List of string advantages (rendered with green checks) |
| `cons` | `array` | List of string disadvantages (rendered with red info/X icons) |

### Example

```json
{
  "switching-cost": {
    "block": "pros-cons",
    "title": "The true cost of ignoring your nervous system",
    "description": "Compare the benefits of daily HRV breathing vs traditional meditation.",
    "prosTitle": "With BreathWave",
    "consTitle": "Traditional Meditation",
    "pros": [
      "Immediate, measurable HRV increase",
      "Syncs instantly with Apple Watch data",
      "Scientifically proven protocols"
    ],
    "cons": [
      "Hard to measure actual physiological impact",
      "No real-time biofeedback",
      "Takes longer to see stress-reduction results"
    ]
  }
}
```

---

## Hero

`block: "hero"`

Hero 区块通常位于页面顶部，用于展示最核心的价值主张。

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"hero"` |
| `title` | `string` | Main title |
| `highlight_text` | `string` | Text within title to highlight (underlined) |
| `description` | `string` | Subtitle/description (HTML allowed) |
| `announcement` | `object` | Top pill announcement `{ title, url, target }` |
| `buttons` | `array` | List of `{ title, url, variant, size, icon }` |
| `tip` | `string` | Small text below buttons (HTML allowed) |
| `show_avatars` | `boolean` | Show social proof avatars |
| `avatars_tip` | `string` | Text next to avatars |
| `image` | `object` | Main image `{ src, alt, width, height }` |
| `image_invert` | `object` | Dark mode image (optional) |
| `background_image` | `object` | Background cover image `{ src, alt }` |

### Example

```json
{
  "hero": {
    "block": "hero",
    "title": "Movie-grade AI Wallpapers",
    "highlight_text": "Instantly",
    "description": "Prompt -> style -> 4K wallpaper. <br/>Built for creators.",
    "announcement": {
      "title": "New v2 is live",
      "url": "/updates",
      "target": "_self"
    },
    "buttons": [
      {
        "title": "Start Generating",
        "url": "#generator",
        "icon": "Wand2",
        "variant": "default"
      },
      {
        "title": "View Gallery",
        "url": "#showcases",
        "variant": "outline"
      }
    ],
    "tip": "No credit card required.",
    "show_avatars": true,
    "avatars_tip": "10k+ creators",
    "image": {
      "src": "https://picsum.photos/seed/hero/1200/630",
      "alt": "Dashboard",
      "width": 1200,
      "height": 630
    }
  }
}
```

---

## Logos

`block: "logos"`

Exhibits partner logos for social proof. Images invert in dark mode by default.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"logos"` |
| `title` | `string` | Title (e.g., "Trusted by") |
| `items` | `array` | List of items, each with `image: { src, alt }` |

### Example

```json
{
  "logos": {
    "block": "logos",
    "title": "Trusted by teams at",
    "items": [
      { "image": { "src": "/imgs/logos/nextjs.svg", "alt": "Next.js" } },
      { "image": { "src": "/imgs/logos/vercel.svg", "alt": "Vercel" } }
    ]
  }
}
```

---

## Features

`block: "features"`

Grid layout of standard feature items.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"features"` |
| `title` | `string` | Main title |
| `description` | `string` | Subtitle |
| `items` | `array` | List of `{ title, description, icon }` |

### Example

```json
{
  "features": {
    "block": "features",
    "title": "Why choose us?",
    "description": "Powerful features for your workflow.",
    "items": [
      {
        "title": "High Performance",
        "description": "Optimized for speed.",
        "icon": "Zap"
      },
      {
        "title": "Secure",
        "description": "Enterprise-grade security.",
        "icon": "Shield"
      }
    ]
  }
}
```

---

## Features List

`block: "features-list"`

Left-side large image, right-side list of feature items.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"features-list"` |
| `title` | `string` | Main title |
| `description` | `string` | Subtitle |
| `image` | `object` | Left side image `{ src, alt }` |
| `buttons` | `array` | Action buttons |
| `items` | `array` | Feature items `{ title, description, icon }` |

### Example

```json
{
  "features-list": {
    "block": "features-list",
    "title": "Complete Design System",
    "description": "Everything you need to build.",
    "image": { "src": "https://picsum.photos/seed/featlist/800/600", "alt": "Preview" },
    "buttons": [
      { "title": "Get Started", "url": "/login", "variant": "default" }
    ],
    "items": [
      { "title": "Responsive", "description": "Mobile first", "icon": "Smartphone" },
      { "title": "Accessible", "description": "WAI-ARIA", "icon": "Accessibility" }
    ]
  }
}
```

---

## Features Accordion

`block: "features-accordion"`

Interactive accordion. Clicking an item updates the right-side image.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"features-accordion"` |
| `title` | `string` | Main title |
| `description` | `string` | Subtitle |
| `items` | `array` | List of items with **image** |

**Item Props**:
- `title`: Accordion header
- `description`: Accordion content
- `icon`: Icon name
- `image`: `{ src, alt }` (Displayed when active)

### Example

```json
{
  "features-accordion": {
    "block": "features-accordion",
    "title": "Interactive Features",
    "description": "Click to explore.",
    "items": [
      {
        "title": "Analytics",
        "description": "Real-time data.",
        "icon": "BarChart",
        "image": { "src": "https://picsum.photos/seed/acc1/800/600", "alt": "Analytics" }
      },
      {
        "title": "Collaboration",
        "description": "Work together.",
        "icon": "Users",
        "image": { "src": "https://picsum.photos/seed/acc2/800/600", "alt": "Team" }
      }
    ]
  }
}
```

---

## Features Flow

`block: "features-flow"`

Zig-zag layout (Text+Image / Image+Text) for steps or detailed feature walkthroughs.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"features-flow"` |
| `title` | `string` | Main title |
| `description` | `string` | Subtitle |
| `items` | `array` | List of flow items |

**Item Props**:
- `title`, `description`
- `image`: `{ src, alt }`
- `image_position`: `"left"` or `"right"`

### Example

```json
{
  "features-flow": {
    "block": "features-flow",
    "title": "How it works",
    "description": "Simple 3-step process.",
    "items": [
      {
        "title": "Step 1: Upload",
        "description": "Upload data.",
        "image": { "src": "https://picsum.photos/seed/step1/800/600", "alt": "Upload" },
        "image_position": "right"
      },
      {
        "title": "Step 2: Process",
        "description": "AI processing.",
        "image": { "src": "https://picsum.photos/seed/step2/800/600", "alt": "Process" },
        "image_position": "left"
      }
    ]
  }
}
```

---

## Features Media

`block: "features-media"`

One large image with a list of features next to it. (Similar to features-list but usually more media-focused).

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"features-media"` |
| `title`, `description` | `string` | Header info |
| `image` | `object` | Main media `{ src, alt }` |
| `image_position` | `string` | `"left"` (default) or `"right"` |
| `items` | `array` | List of `{ title, description, icon }` |

### Example

```json
{
  "features-media": {
    "block": "features-media",
    "title": "Advanced Editor",
    "image": { "src": "https://picsum.photos/seed/media/800/600", "alt": "Editor" },
    "items": [
      { "title": "Smart Crop", "description": "Auto detect.", "icon": "Crop" }
    ]
  }
}
```

---

## Features Step

`block: "features-step"`

Numbered steps with connecting lines.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"features-step"` |
| `label` | `string` | Overline label (e.g. "PROCESS") |
| `title`, `description` | `string` | Header info |
| `items` | `array` | List of `{ title, description, icon }` |

### Example

```json
{
  "features-step": {
    "block": "features-step",
    "label": "Process",
    "title": "Idea to Launch",
    "items": [
      { "title": "Discovery", "description": "Research.", "icon": "Search" },
      { "title": "Launch", "description": "Go live.", "icon": "Rocket" }
    ]
  }
}
```

---

## Showcases

`block: "showcases"`

Grid of cards (projects, templates). Supports tab filtering.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"showcases"` |
| `title`, `description` | `string` | Header |
| `groups` | `array` | Filters `{ name, title }`. e.g. `{name: "all", title: "All"}` |
| `items` | `array` | List of items |

**Item Props**:
- `title`, `description`
- `image`: `{ src, alt }`
- `group`: match group name
- `url`: Link URL
- `button`: Optional internal button `{ title, url, icon }`

### Example

```json
{
  "showcases": {
    "block": "showcases",
    "title": "Built with ShipAny",
    "groups": [
      { "name": "all", "title": "All" },
      { "name": "saas", "title": "SaaS" }
    ],
    "items": [
      {
        "title": "Project Alpha",
        "description": "SaaS Platform",
        "image": { "src": "https://picsum.photos/seed/p1/600/400", "alt": "Alpha" },
        "group": "saas",
        "url": "https://example.com"
      }
    ]
  }
}
```

---

## Showcases Flow

`block: "showcases-flow"`

Masonry/Waterfall layout. Supports lightbox preview.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"showcases-flow"` |
| `title`, `description` | `string` | Header |
| `groups` | `array` | Filters |
| `items` | `array` | List of items `{ title, description, image, group, button }` |

### Example

```json
{
  "showcases-flow": {
    "block": "showcases-flow",
    "title": "Design Gallery",
    "items": [
      {
        "title": "Mobile UI",
        "description": "Modern app",
        "image": { "src": "https://picsum.photos/seed/ui1/600/800", "alt": "Mobile" },
        "group": "mobile"
      }
    ]
  }
}
```

---

## Stats

`block: "stats"`

Big number statistics.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"stats"` |
| `title`, `description` | `string` | Header |
| `items` | `array` | List of `{ title (value), description (label) }` |

### Example

```json
{
  "stats": {
    "block": "stats",
    "title": "By the numbers",
    "items": [
      { "title": "100k+", "description": "Users" },
      { "title": "99.9%", "description": "Uptime" }
    ]
  }
}
```

---

## Testimonials

`block: "testimonials"`

User reviews/quotes grid.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"testimonials"` |
| `title`, `description` | `string` | Header |
| `items` | `array` | List of review items |

**Item Props**:
- `name`: User name
- `role`: Job title
- `quote`: Review text
- `image`: User avatar `{ src, alt }`

### Example

```json
{
  "testimonials": {
    "block": "testimonials",
    "title": "Community Love",
    "items": [
      {
        "name": "Alice",
        "role": "Designer",
        "quote": "Amazing tool!",
        "image": { "src": "https://picsum.photos/seed/alice/100/100", "alt": "Alice" }
      }
    ]
  }
}
```

---

## FAQ

`block: "faq"`

Frequently Asked Questions accordion.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"faq"` |
| `title`, `description` | `string` | Header |
| `items` | `array` | List of `{ question, answer }` |
| `tip` | `string` | Bottom tip (HTML allowed) |

### Example

```json
{
  "faq": {
    "block": "faq",
    "title": "FAQ",
    "items": [
      { "question": "Is it free?", "answer": "Yes, with a trial." }
    ],
    "tip": "Contact us for more."
  }
}
```

---

## CTA (Call to Action)

`block: "cta"`

Final conversion block.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"cta"` |
| `title` | `string` | Impulse text |
| `description` | `string` | Supporting text |
| `buttons` | `array` | List of `{ title, url, variant, size, icon }` |

### Example

```json
{
  "cta": {
    "block": "cta",
    "title": "Ready to launch?",
    "description": "Get started today.",
    "buttons": [
      { "title": "Get Started", "url": "/signup", "variant": "default" }
    ]
  }
}
```

---

## Subscribe

`block: "subscribe"`

Email subscription form.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | Fixed: `"subscribe"` |
| `title`, `description` | `string` | Header |
| `submit` | `object` | Form config |

**Submit Props**:
- `action`: API URL config
- `input`: `{ placeholder }`
- `button`: `{ title }`

### Example

```json
{
  "subscribe": {
    "block": "subscribe",
    "title": "Newsletter",
    "submit": {
      "action": "/api/sub",
      "input": { "placeholder": "Email" },
      "button": { "title": "Join" }
    }
  }
}
```

---

## Header

`block: "header"`

Can be used as a section or top-level config.

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | `"header"` |
| `brand` | `object` | `{ title, logo: {src, alt}, url }` |
| `nav` | `object` | `{ items: [{ title, url, icon, children }] }` |
| `buttons` | `array` | Right side actions |
| `user_nav` | `object` | User menu config |
| `show_sign`, `show_theme`, `show_locale` | `boolean` | Toggles |

### Example

```json
{
  "header": {
    "block": "header",
    "brand": { "title": "App", "logo": {"src":"/logo.png", "alt":"Logo"} },
    "nav": { "items": [{ "title": "Features", "url": "/#features" }] }
  }
}
```

---

## Footer

`block: "footer"`

### Props

| Field | Type | Description |
| :--- | :--- | :--- |
| `block` | `string` | `"footer"` |
| `brand` | `object` | `{ title, description }` |
| `nav` | `object` | `{ items: [{ title, children: [{title, url}] }] }` |
| `social` | `object` | `{ items: [{ title, url, icon }] }` |
| `copyright` | `string` | Copyright text |

### Example

```json
{
  "footer": {
    "block": "footer",
    "brand": { "title": "App", "description": "Awesome." },
    "copyright": "© 2024 App."
  }
}
```
