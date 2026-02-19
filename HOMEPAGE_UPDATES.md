# Homepage & Navigation Updates

## Changes Made - January 7, 2026

### 1. Navigation Titles Shortened
**Old → New:**
- "Quit Smoking" → "Smoking"
- "Quit Vaping" → "Vaping"  
- "Quit Smokeless" → "Smokeless"
- "Quit Marijuana" → "Marijuana"

**Updated in:**
- Main navigation (kickit-home.html)
- Footer navigation (kickit-home.html)

### 2. Logo Spacing Reduced
**File:** `css/components/_header.css`
- Changed `margin-right: auto` to `margin-right: 1.5rem`
- Reduced logo max-width from `200px` to `180px`
- Reduced top padding from `1rem` to `0.75rem`

### 3. Stats Updated
**Changed:**
- "500K+ Californians Helped" → "1M+ CA Residents Helped"
- Updated stat card in stats section
- Updated text reference from "500,000" to "1 million"

### 4. Hero Section - Background Media Support
**Added to kickit-home.html:**
- Support for background images/videos (`.hero-background-media`)
- Subtle dot pattern overlay (24px grid)
- Low opacity (30%) for readability
- Dark gradient overlay (85% opacity)
- Proper z-index layering (media: 0, dots: 1, gradient: 1, content: 2)

**CSS Changes:**
```css
/* Background image/video */
.hero-section .hero-background-media {
  position: absolute;
  opacity: 0.3;
  object-fit: cover;
}

/* Dot pattern */
.hero-section::before {
  background-image: radial-gradient(...);
  background-size: 20px 20px;
}

/* Dark overlay */
.hero-section::after {
  background: linear-gradient(rgba(10,15,30,0.85), rgba(26,35,50,0.75));
}
```

### 5. "How Coaching Works" Section - Background Support
**Added to section-dark:**
- Support for background images/videos (`.section-background-media`)
- Dot pattern overlay (24px grid)
- Low opacity (25%) for media
- Dark gradient overlay (80-85% opacity)
- Proper z-index layering

**CSS Changes:**
```css
.section-dark .section-background-media {
  opacity: 0.25;
}

.section-dark::before {
  /* Dot pattern */
  background-image: radial-gradient(...);
  background-size: 24px 24px;
}

.section-dark::after {
  /* Dark overlay */
  background: linear-gradient(...);
}

.section-dark .container {
  z-index: 2; /* Above overlays */
}
```

## Usage Instructions

### Adding Background Images
```html
<!-- In Hero Section -->
<section class="hero-section">
  <img src="your-image.jpg" alt="" class="hero-background-media">
  <div class="hero-content">
    ...
  </div>
</section>

<!-- In Coaching Section -->
<section class="section section-dark">
  <img src="your-image.jpg" alt="" class="section-background-media">
  <div class="container">
    ...
  </div>
</section>
```

### Adding Background Videos
```html
<section class="hero-section">
  <video class="hero-background-media" autoplay muted loop playsinline>
    <source src="your-video.mp4" type="video/mp4">
  </video>
  <div class="hero-content">
    ...
  </div>
</section>
```

## Benefits
✅ Shorter nav = more space, cleaner look  
✅ Tighter logo spacing = improved visual hierarchy  
✅ 1M+ stat = accurate, impressive impact  
✅ Background media support = visual depth & storytelling  
✅ Dot pattern = subtle texture without distraction  
✅ Low opacity + overlays = maintained readability  

## Files Modified
1. `/Kick It California/templates/kickit-home.html` - Navigation, stats, CSS for backgrounds
2. `/Kick It California/css/components/_header.css` - Logo spacing

## Next Steps
- Add actual background images/videos via HubSpot
- Test readability with different media
- Consider similar treatment for other page templates
