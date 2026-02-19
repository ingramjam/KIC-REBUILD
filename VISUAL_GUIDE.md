# Visual Guide - Kick It California HubSpot Theme

This guide shows you what each component looks like and how to use it.

---

## 🎨 Color Palette

### Default Colors (Customizable in Theme Settings)

```
Primary Color:   #0066CC (Blue)    - Main brand color
Secondary Color: #FF6B35 (Orange)  - Accent highlights
Accent Color:    #00B4D8 (Cyan)    - Hover states, links
Text Color:      #333333 (Dark)    - Body text
Background:      #FFFFFF (White)   - Page background
```

**How to Change:** 
HubSpot Design Tools → Theme Settings → Colors

---

## 📐 Typography

### Heading Font: **Montserrat**
```
Bold, modern, professional
Used for: Headings, buttons, important text
```

### Body Font: **Open Sans**
```
Clean, readable, friendly
Used for: Paragraphs, descriptions, forms
```

**Sizes:**
- H1: 2.5rem (40px)
- H2: 2rem (32px)
- H3: 1.75rem (28px)
- Body: 1rem (16px)

---

## 🧩 Module Gallery

### 1. Hero Section Module

**Appearance:**
```
╔════════════════════════════════════════╗
║  [Full-width background image]          ║
║                                          ║
║       LARGE HEADING TEXT                 ║
║       Compelling subtitle text           ║
║                                          ║
║         [Call to Action Button]          ║
║                                          ║
╚════════════════════════════════════════╝
```

**Features:**
- ✅ Full-width background image
- ✅ Optional parallax scrolling
- ✅ Gradient overlay
- ✅ Customizable CTA button
- ✅ Animated text entrance

**Best Used For:**
- Homepage hero
- Landing page headers
- Campaign pages

**Customization Options:**
- Title text
- Subtitle (rich text)
- Background image
- Button text, URL, and style
- Enable/disable parallax

---

### 2. Content Cards Grid Module

**Appearance (3-column layout):**
```
╔══════════╗  ╔══════════╗  ╔══════════╗
║  [Img]   ║  ║  [Img]   ║  ║  [Img]   ║
║          ║  ║          ║  ║          ║
║  Title   ║  ║  Title   ║  ║  Title   ║
║  Text... ║  ║  Text... ║  ║  Text... ║
║  [Link]  ║  ║  [Link]  ║  ║  [Link]  ║
╚══════════╝  ╚══════════╝  ╚══════════╝
```

**Features:**
- ✅ Flexible grid (2, 3, or 4 columns)
- ✅ Image support for each card
- ✅ Rich text descriptions
- ✅ Hover animations
- ✅ Responsive (stacks on mobile)

**Best Used For:**
- Service offerings
- Resource listings
- Team members
- Program highlights

**Customization Options:**
- Section title
- Number of columns (2/3/4)
- Per card:
  - Image
  - Title
  - Description
  - Link URL
- Add/remove up to 12 cards

---

### 3. Contact Form Module

**Appearance:**
```
╔═══════════════════════════════════╗
║    Contact Us                      ║
║    Get in touch with us today     ║
║                                    ║
║    Name: [____________]            ║
║    Email: [____________]           ║
║    Phone: [____________]           ║
║    Message:                        ║
║    [______________________]       ║
║    [______________________]       ║
║                                    ║
║    [   Send Message   ]            ║
╚═══════════════════════════════════╝
```

**Features:**
- ✅ Toggle fields on/off
- ✅ Built-in validation
- ✅ Error messages
- ✅ Success notification
- ✅ Mobile-optimized

**Best Used For:**
- Contact pages
- Support requests
- General inquiries

**Customization Options:**
- Form title
- Description text
- Enable/disable fields:
  - Name
  - Email
  - Phone
  - Message
- Submit button text
- Success message

---

### 4. Quit Plan Builder Module

**Appearance:**
```
╔═══════════════════════════════════╗
║   Build Your Quit Plan             ║
║                                    ║
║   [■■■■■■□□□] 1 / 3                ║
║                                    ║
║   When do you want to quit?        ║
║                                    ║
║   ┌─────────┐  ┌─────────┐        ║
║   │ 📅 Today│  │ 🗓️ Week │        ║
║   │  I'm    │  │  Need   │        ║
║   │  Ready  │  │  Prep   │        ║
║   └─────────┘  └─────────┘        ║
║                                    ║
║        [Next Step →]               ║
╚═══════════════════════════════════╝
```

**Features:**
- ✅ Multi-step form (3 steps)
- ✅ Progress bar
- ✅ Interactive cards
- ✅ Step validation
- ✅ Personalization

**Best Used For:**
- Quit plan pages
- Interactive assessments
- Multi-step forms

**Customization Options:**
- Section title
- Intro text
- Step titles (3 steps)
- Form action URL

---

## 📄 Template Layouts

### Landing Page Template

**Structure:**
```
┌─────────────────────────────────┐
│         HEADER / NAV             │
├─────────────────────────────────┤
│                                  │
│       HERO AREA (DND)            │
│                                  │
├─────────────────────────────────┤
│                                  │
│    MAIN CONTENT AREA (DND)       │
│    [Drag modules here]           │
│                                  │
├─────────────────────────────────┤
│                                  │
│   ADDITIONAL CONTENT (DND)       │
│                                  │
├─────────────────────────────────┤
│          FOOTER                  │
└─────────────────────────────────┘
```

**Use For:** Homepage, about pages, resource pages

---

### Contact Page Template

**Structure:**
```
┌─────────────────────────────────┐
│         HEADER / NAV             │
├─────────────────────────────────┤
│      PAGE HEADER                 │
│      Contact Us                  │
├─────────────────────────────────┤
│                                  │
│    CONTACT FORM (DND)            │
│                                  │
├─────────────────────────────────┤
│   CONTACT INFO CARDS             │
│   📞 Phone  ✉️ Email  💬 Chat    │
├─────────────────────────────────┤
│   ADDITIONAL CONTENT (DND)       │
├─────────────────────────────────┤
│          FOOTER                  │
└─────────────────────────────────┘
```

**Use For:** Contact pages, support pages

---

### Quit Plan Template

**Structure:**
```
┌─────────────────────────────────┐
│         HEADER / NAV             │
├─────────────────────────────────┤
│       PLAN HERO                  │
│   Build Your Quit Plan           │
├─────────────────────────────────┤
│                                  │
│    QUIT PLAN BUILDER (DND)       │
│    [Interactive form]            │
│                                  │
├─────────────────────────────────┤
│    BENEFITS SECTION              │
│    Why Create a Quit Plan?       │
├─────────────────────────────────┤
│   ADDITIONAL CONTENT (DND)       │
├─────────────────────────────────┤
│          FOOTER                  │
└─────────────────────────────────┘
```

**Use For:** Quit plan creation, interactive tools

---

### Search Results Template

**Structure:**
```
┌─────────────────────────────────┐
│         HEADER / NAV             │
├─────────────────────────────────┤
│      SEARCH HEADER               │
│   [Search box]                   │
├─────────────────────────────────┤
│   SEARCH RESULTS                 │
│   ┌─────────────────────┐        │
│   │ Result Title        │        │
│   │ URL                 │        │
│   │ Description...      │        │
│   └─────────────────────┘        │
│   ┌─────────────────────┐        │
│   │ Result Title        │        │
│   └─────────────────────┘        │
├─────────────────────────────────┤
│   SUGGESTED RESOURCES            │
├─────────────────────────────────┤
│          FOOTER                  │
└─────────────────────────────────┘
```

**Use For:** Site search functionality

---

## 🎬 Animations

### Fade In
```
Opacity: 0 → 1
Y-Position: +20px → 0
Duration: 0.8s
```
**Trigger:** Element enters viewport

### Slide In Left
```
Opacity: 0 → 1
X-Position: -40px → 0
Duration: 0.8s
```
**Use For:** Titles, left-aligned content

### Slide In Right
```
Opacity: 0 → 1
X-Position: +40px → 0
Duration: 0.8s
```
**Use For:** Subtitles, right-aligned content

### Parallax Effect
```
Background moves slower than scroll
Speed: 0.5x scroll speed
```
**Use For:** Hero sections, large images

---

## 📱 Responsive Behavior

### Desktop (1024px+)
```
┌─────┬─────┬─────┐
│ [1] │ [2] │ [3] │  ← 3-column grid
├─────┼─────┼─────┤
│ [4] │ [5] │ [6] │
└─────┴─────┴─────┘
```

### Tablet (768px)
```
┌──────┬──────┐
│ [1]  │ [2]  │      ← 2-column grid
├──────┼──────┤
│ [3]  │ [4]  │
└──────┴──────┘
```

### Mobile (< 480px)
```
┌──────────┐
│   [1]    │          ← Single column
├──────────┤
│   [2]    │
├──────────┤
│   [3]    │
└──────────┘
```

---

## 🎯 Button Styles

### Primary Button
```
Background: Primary Color (#0066CC)
Text: White
Hover: Accent Color + lift effect
Use: Main CTAs
```

### Secondary Button
```
Background: Secondary Color (#FF6B35)
Text: White
Hover: Accent Color + lift effect
Use: Alternative CTAs
```

### Outline Button
```
Background: Transparent
Border: Primary Color
Text: Primary Color
Hover: Filled with Primary Color
Use: Less important actions
```

---

## 💡 Usage Examples

### Homepage Layout
```
1. Hero Section Module
   - Welcome message
   - "Get Started" CTA
   
2. Content Cards (3 columns)
   - Quit Plan
   - Resources
   - Support
   
3. Content Cards (3 columns)
   - Success stories
   - Statistics
   - Testimonials
   
4. Contact Form Module
   - Simple signup
```

### About Page Layout
```
1. Hero Section Module
   - "About Us" heading
   - Mission statement
   
2. Rich Text Module
   - Organization history
   - Team info
   
3. Content Cards (4 columns)
   - Team members with photos
```

### Resources Page Layout
```
1. Hero Section Module
   - "Resources" heading
   
2. Content Cards (4 columns)
   - All resource cards
   - Each links to detail page
```

---

## 🔄 Common Workflows

### Creating a New Page

1. **Marketing → Website → Website Pages**
2. Click **Create → Website Page**
3. Choose template
4. Add modules by dragging
5. Customize content
6. Preview
7. Set URL and meta
8. Publish

### Editing Content

1. Navigate to page
2. Click **Edit**
3. Click module to edit
4. Change text/images
5. Preview changes
6. Click **Publish**

### Changing Colors

1. **Design Tools**
2. Find theme
3. Click gear icon
4. **Edit theme settings**
5. **Colors tab**
6. Select new colors
7. **Publish changes**

---

## 🎨 Design Tips

### Do's ✅
- Use high-quality images (1920px wide minimum)
- Keep headlines short and impactful
- Use plenty of white space
- Test on mobile devices
- Keep loading times fast
- Use consistent button styles
- Add alt text to all images

### Don'ts ❌
- Don't use too many fonts
- Don't make text too small (min 16px)
- Don't use low-resolution images
- Don't overuse animations
- Don't forget mobile testing
- Don't skip accessibility

---

## 📊 Performance Targets

- **Page Load:** < 3 seconds
- **First Contentful Paint:** < 1.5s
- **Lighthouse Score:** > 85
- **Mobile Usability:** 100%
- **Accessibility:** > 90

---

**Need Help?** Refer to README.md or QUICKSTART.md for detailed instructions.

**Ready to customize?** Log into HubSpot and start creating! 🎨
