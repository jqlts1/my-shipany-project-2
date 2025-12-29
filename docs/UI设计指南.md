# Design System & Style Guide: Wim Hof Inspired Clean Theme [Light Mode]

## 1. Overview
This design system establishes a **"Clean, Fresh, and Breathable"** light theme. The core philosophy is **Wellness & Clarity**. The interface should feel like a breath of fresh air—using ample whitespace, soft shadows, and a distinct lack of visual clutter. All elements must be clearly visible against the predominantly white/light background.

## 2. Color Palette
The palette shifts from dark indigos to crisp whites and soft pastels.

### Primary Backgrounds
- **Canvas White**: `#FFFFFF` (Main background)
- **Off-White / Surface**: `#F8FAFC` (Secondary backgrounds, cards if needed)
- **Warm Grey**: `#F1F5F9` (Subtle separation)

### Text & Content (CRITICAL RULE: NO WHITE TEXT ON LIGHT BACKGROUNDS)
- **Primary Text**: `#1E293B` (Slate 800 - Soft Black) - Used for Headings, Body
- **Secondary Text**: `#64748B` (Slate 500 - Muted) - Used for Subtitles, Captions
- **Accent Text**: `#0F172A` (Slate 900) - Heavy emphasis
- **Inverted Text**: `#FFFFFF` (White) - **ONLY** used on top of dark/saturated buttons or heavy gradients. Never on pale backgrounds.

### Functional & Brand Colors (Wellness Tones)
- **Teal (Breathing / Calm)**: `#2A9D8F` / Light bg: `#E0F2F1`
- **Blue (Cold / Fresh)**: `#64B5F6` / Light bg: `#E3F2FD`
- **Amber (Energy / Focus)**: `#F4A261` / Light bg: `#FFF3E0`
- **Red (Stop / Alert)**: `#EF4444` / Light bg: `#FEE2E2`

### Progress Bars & Indicators
- **Track (Background)**: `#E2E8F0` (Slate 200) - Light grey, visible on white.
- **Fill (Foreground)**: Brand Color (e.g., `#2A9D8F` or `#EF4444`)
- **Keycap Style**: White circle with shadow, icon in dark grey `#1E293B`.

## 3. Typography
Uses the system font (SF Pro) but with specific weight adjustments.

- **Display**: `Font.system(size: 34, weight: .bold, design: .rounded)` - Large Headers
- **Heading**: `Font.system(size: 20, weight: .semibold, design: .default)` - Section Titles
- **Body**: `Font.system(size: 16, weight: .regular)` - Main content
- **Caption**: `Font.system(size: 14, weight: .medium)` - Secondary info
- **Button Text**: `Font.system(size: 17, weight: .semibold)`

## 4. Spacing System
Generous spacing to create the "breathable" feel.

- **Standard Padding**: `20px` (Container edges)
- **Section Gap**: `32px`
- **Internal Card Padding**: `24px`

## 5. Component Styles

### Cards & Surfaces
Using **Soft Elevation** (Neumorphism-lite).
- **Background**: `#FFFFFF`
- **Border**: `Color.black.opacity(0.05)` (Subtle definition)
- **Shadow**: `Color.black.opacity(0.08), radius: 12, x: 0, y: 4`
- **Corner Radius**: `24px`

### Buttons
- **Primary**: Brand Color Background + White Text. Shadow: Brand color opacity.
- **Secondary/Utility**: White Background + Dark Icon/Text + Soft Shadow.

### Icons
- **Color**: `#1E293B` (Slate 800) or Brand Color. **Avoid White** unless on a dark fill.
- **Size**: Large (40pt+) in features, Medium (24pt) in utility.

## 6. Shadows & Elevation
- **Level 1 (Subtle)**: `radius: 4, y: 2, opacity: 0.05`
- **Level 2 (Card)**: `radius: 12, y: 6, opacity: 0.08`
- **Level 3 (Float)**: `radius: 20, y: 10, opacity: 0.12`

## 7. Border Radius
- **Cards**: `24px`
- **Buttons**: `16px` or `Capsule`

## 8. Animations
- **Hover/Press**: Scale down `0.95` + Shadow reduction.
- **Transitions**: `opacity` + `scale` (Light & airy movement).

## 9. Example Component Code (SwiftUI)

```swift
struct CleanFeatureCard: View {
    let title: String
    let icon: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 32))
                .foregroundColor(color) // Colored icon on white
                .frame(width: 64, height: 64)
                .background(color.opacity(0.1)) // Tinted background
                .clipShape(Circle())
            
            Text(title)
                .font(.system(size: 16, weight: .semibold))
                .foregroundColor(Color(hex: "#1E293B")) // Dark text
        }
        .padding(24)
        .frame(maxWidth: .infinity)
        .background(Color.white)
        .cornerRadius(24)
        .shadow(color: Color.black.opacity(0.08), radius: 12, x: 0, y: 4)
    }
}
```
