# Goldvale Studios — Color System

**Version:** 1.0 · **Palette:** Option A "Jewel" · **Mode:** Dark (anthracite base)

This is the single source of truth for Goldvale Studios colors. Use these tokens verbatim. Do not introduce colors outside this file; if a new need arises, extend the chart or neutral ramps rather than inventing ad-hoc values.

---

## 1. Usage principles

- **Background is always the anthracite ramp.** `--bg` (#14161A) is the app base. Raise surfaces with `--bg-raised` and `--bg-elevated`; separate with `--border`.
- **Gold is the primary brand accent** — headlines' emphasis, key lines, active/premium states, primary icons. Use it sparingly so it stays special.
- **Magenta is the single "pop"** — the main call-to-action, active/selected states, one highlighted data series, focus rings. Never use gold and magenta as large adjacent fills; let magenta punctuate.
- **Text uses the warm-white tiers**, never pure white (#FFFFFF).
- **Semantics** (success/warning/error/info) are for status only — never decorative. Each has a `-bg` tint (for badges/alerts on dark) and a `-fg` light tint (for colored text on dark).
- **Chart colors** follow a fixed order (`--chart-1` … `--chart-8`). Always start at 1 and go in sequence so charts stay consistent across the product. `--chart-1` is gold, `--chart-2` is magenta.
- All chart hues are tuned as **fills on `--bg`**. For colored **text** on dark, use a `-fg`/`-hi` tint instead of the raw fill.

---

## 2. Foundation (shared, locked)

### Surfaces & borders
| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0E1013` | wells, deepest shadow |
| `--bg` | `#14161A` | app background |
| `--bg-raised` | `#1B1E23` | raised sections |
| `--bg-elevated` | `#22262C` | cards, popovers |
| `--border` | `#2C313A` | hairlines, dividers |
| `--border-strong` | `#3A4049` | hover borders, emphasis |

### Text
| Token | Hex | Role |
|---|---|---|
| `--text` | `#F5F2EA` | primary text (warm white) |
| `--text-secondary` | `#9AA0AA` | secondary text |
| `--text-muted` | `#6C727C` | muted / captions |
| `--text-disabled` | `#565D68` | disabled |

### Brand
| Token | Hex | Role |
|---|---|---|
| `--gold` | `#CBA45C` | primary brand accent |
| `--gold-hi` | `#E8CE92` | gold text on dark / highlight |
| `--gold-deep` | `#8A6D34` | gold shadow / pressed |
| `--magenta` | `#FF3E7F` | pop accent / primary CTA |
| `--magenta-hi` | `#FF6E9C` | magenta text on dark / hover |
| `--magenta-deep` | `#C42862` | magenta shadow / pressed |
| `--white` | `#F5F2EA` | alias of `--text` |

---

## 3. Semantic (Option A)

| Token | Hex | `-bg` tint (badges/alerts) | `-fg` (text on dark) |
|---|---|---|---|
| `--success` | `#4CC38A` | `rgba(76,195,138,0.14)` | `#7BD9AE` |
| `--warning` | `#E8973C` | `rgba(232,151,60,0.14)` | `#EDB575` |
| `--error` | `#F05656` | `rgba(240,86,86,0.14)` | `#F58585` |
| `--info` | `#4CA6E8` | `rgba(76,166,232,0.14)` | `#7FC0EF` |

> Warning `#E8973C` is intentionally orange-leaning so it never reads as the brand gold.

---

## 4. Infographic / chart palette (Option A)

Categorical — use in order:

| Token | Hex | Note |
|---|---|---|
| `--chart-1` | `#CBA45C` | gold (brand) |
| `--chart-2` | `#FF3E7F` | magenta (brand) |
| `--chart-3` | `#2FB6A8` | teal |
| `--chart-4` | `#4C8DF0` | blue |
| `--chart-5` | `#9B6CF0` | violet |
| `--chart-6` | `#5CC98A` | green |
| `--chart-7` | `#F0894C` | coral/amber |
| `--chart-8` | `#46C6E0` | cyan |

### Sequential — Gold (low → high, e.g. heatmaps)
`#3A2E17` → `#6E5828` → `#A07E3D` → `#CBA45C` → `#E8CE92`

### Sequential — Magenta (low → high)
`#3A1424` → `#7A2148` → `#C42862` → `#FF3E7F` → `#FF8FB4`

### Diverging — Magenta ↔ Teal (negative → neutral → positive)
`#FF3E7F` → `#C4718C` → `#2C313A` → `#6FB3AA` → `#2FB6A8`

---

## 5. CSS custom properties

```css
:root {
  /* ---- Foundation ---- */
  --ink: #0E1013;
  --bg: #14161A;
  --bg-raised: #1B1E23;
  --bg-elevated: #22262C;
  --border: #2C313A;
  --border-strong: #3A4049;

  --text: #F5F2EA;
  --text-secondary: #9AA0AA;
  --text-muted: #6C727C;
  --text-disabled: #565D68;

  --gold: #CBA45C;
  --gold-hi: #E8CE92;
  --gold-deep: #8A6D34;
  --magenta: #FF3E7F;
  --magenta-hi: #FF6E9C;
  --magenta-deep: #C42862;
  --white: #F5F2EA;

  /* ---- Semantic ---- */
  --success: #4CC38A;  --success-bg: rgba(76,195,138,0.14);  --success-fg: #7BD9AE;
  --warning: #E8973C;  --warning-bg: rgba(232,151,60,0.14);  --warning-fg: #EDB575;
  --error:   #F05656;  --error-bg:   rgba(240,86,86,0.14);   --error-fg:   #F58585;
  --info:    #4CA6E8;  --info-bg:    rgba(76,166,232,0.14);  --info-fg:    #7FC0EF;

  /* ---- Chart · categorical ---- */
  --chart-1: #CBA45C;
  --chart-2: #FF3E7F;
  --chart-3: #2FB6A8;
  --chart-4: #4C8DF0;
  --chart-5: #9B6CF0;
  --chart-6: #5CC98A;
  --chart-7: #F0894C;
  --chart-8: #46C6E0;

  /* ---- Chart · sequential (gold) ---- */
  --seq-gold-1: #3A2E17;
  --seq-gold-2: #6E5828;
  --seq-gold-3: #A07E3D;
  --seq-gold-4: #CBA45C;
  --seq-gold-5: #E8CE92;

  /* ---- Chart · sequential (magenta) ---- */
  --seq-magenta-1: #3A1424;
  --seq-magenta-2: #7A2148;
  --seq-magenta-3: #C42862;
  --seq-magenta-4: #FF3E7F;
  --seq-magenta-5: #FF8FB4;

  /* ---- Chart · diverging (magenta ↔ teal) ---- */
  --div-1: #FF3E7F;
  --div-2: #C4718C;
  --div-3: #2C313A;
  --div-4: #6FB3AA;
  --div-5: #2FB6A8;
}
```

---

## 6. Tailwind config

```js
// tailwind.config.js — theme.extend.colors
module.exports = {
  theme: {
    extend: {
      colors: {
        ink: '#0E1013',
        bg: { DEFAULT: '#14161A', raised: '#1B1E23', elevated: '#22262C' },
        border: { DEFAULT: '#2C313A', strong: '#3A4049' },
        text: {
          DEFAULT: '#F5F2EA', secondary: '#9AA0AA',
          muted: '#6C727C', disabled: '#565D68',
        },
        gold: { DEFAULT: '#CBA45C', hi: '#E8CE92', deep: '#8A6D34' },
        magenta: { DEFAULT: '#FF3E7F', hi: '#FF6E9C', deep: '#C42862' },
        success: { DEFAULT: '#4CC38A', fg: '#7BD9AE' },
        warning: { DEFAULT: '#E8973C', fg: '#EDB575' },
        error: { DEFAULT: '#F05656', fg: '#F58585' },
        info: { DEFAULT: '#4CA6E8', fg: '#7FC0EF' },
        chart: {
          1: '#CBA45C', 2: '#FF3E7F', 3: '#2FB6A8', 4: '#4C8DF0',
          5: '#9B6CF0', 6: '#5CC98A', 7: '#F0894C', 8: '#46C6E0',
        },
      },
    },
  },
};
```

---

## 7. JSON tokens

```json
{
  "color": {
    "foundation": {
      "ink": "#0E1013",
      "bg": "#14161A",
      "bg-raised": "#1B1E23",
      "bg-elevated": "#22262C",
      "border": "#2C313A",
      "border-strong": "#3A4049",
      "text": "#F5F2EA",
      "text-secondary": "#9AA0AA",
      "text-muted": "#6C727C",
      "text-disabled": "#565D68",
      "gold": "#CBA45C",
      "gold-hi": "#E8CE92",
      "gold-deep": "#8A6D34",
      "magenta": "#FF3E7F",
      "magenta-hi": "#FF6E9C",
      "magenta-deep": "#C42862"
    },
    "semantic": {
      "success": "#4CC38A", "success-bg": "rgba(76,195,138,0.14)", "success-fg": "#7BD9AE",
      "warning": "#E8973C", "warning-bg": "rgba(232,151,60,0.14)", "warning-fg": "#EDB575",
      "error":   "#F05656", "error-bg":   "rgba(240,86,86,0.14)",  "error-fg":   "#F58585",
      "info":    "#4CA6E8", "info-bg":    "rgba(76,166,232,0.14)", "info-fg":    "#7FC0EF"
    },
    "chart": {
      "categorical": ["#CBA45C","#FF3E7F","#2FB6A8","#4C8DF0","#9B6CF0","#5CC98A","#F0894C","#46C6E0"],
      "sequential-gold": ["#3A2E17","#6E5828","#A07E3D","#CBA45C","#E8CE92"],
      "sequential-magenta": ["#3A1424","#7A2148","#C42862","#FF3E7F","#FF8FB4"],
      "diverging": ["#FF3E7F","#C4718C","#2C313A","#6FB3AA","#2FB6A8"]
    }
  }
}
```

---

## 8. Accessibility

- **Body text:** `--text` on `--bg` is high-contrast. `--text-secondary` is fine for secondary copy; `--text-muted` for non-essential captions only.
- **Colored text on dark:** do not use raw chart/semantic fills as text. Use `-fg`/`-hi` tints (e.g. `--success-fg`, `--gold-hi`) to keep contrast readable.
- **Chart fills:** the 8 categorical hues are tuned to be distinguishable as fills on `--bg`. When adjacent series must be separable for color-blind users, prefer non-adjacent indices (1,3,5,7) or add patterns/labels.
- **Focus states:** use `--magenta` for focus rings on dark; ensure a visible outline, not color alone.

## 9. Do / Don't

- ✅ Use `--magenta` for the single primary CTA per view.
- ✅ Start chart series at `--chart-1` and proceed in order.
- ✅ Use `-bg` tints for status backgrounds, `-fg` for status text.
- ❌ Don't place large gold and magenta fills directly adjacent.
- ❌ Don't use `#FFFFFF` — use `--text`.
- ❌ Don't recolor semantics for decoration or invent new hues.
