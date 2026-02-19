# Kick It California - HubSpot CMS Build

A modern, mobile-friendly HubSpot CMS website redesign for Kick It California, featuring custom modules, interactive elements, and a clean design system inspired by kicform.org/kick-it-2.

## 🚀 Project Overview

This project is a complete redesign of kickitca.org built on HubSpot CMS, featuring:

- **Mobile-First Responsive Design** - Optimized for all devices
- **Custom HubSpot Modules** - Easy content editing for marketers
- **Modern UI/UX** - Clean, contemporary design with animations
- **Multiple Templates** - Landing pages, contact forms, search results
- **Interactive Features** - Parallax effects, smooth scrolling, animated elements
- **Performance Optimized** - Fast loading, lazy loading images, optimized assets

## 📁 Project Structure

```
KIC REBUILD/
├── .github/
│   └── copilot-instructions.md    # Project-specific instructions
├── src/
│   └── kickit-california-theme/
│       ├── css/
│       │   └── main.css           # Main stylesheet with animations
│       ├── js/
│       │   └── main.js            # JavaScript functionality
│       ├── modules/
│       │   ├── hero-section.module/
│       │   │   ├── meta.json      # Module configuration
│       │   │   └── module.html    # Module template
│       │   ├── content-cards.module/
│       │   │   ├── meta.json
│       │   │   └── module.html
│       │   └── contact-form.module/
│       │       ├── meta.json
│       │       └── module.html
│       ├── templates/
│       │   ├── base.html          # Base template
│       │   ├── landing-page.html  # Landing page template
│       │   ├── contact-page.html  # Contact page template
│       │   └── search-results.html # Search results template
│       ├── theme.json             # Theme configuration
│       └── fields.json            # Theme settings fields
├── hubspot.config.yml             # HubSpot CLI configuration
├── package.json                   # Project dependencies
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- HubSpot account with CMS Hub
- HubSpot CLI

### Installation

1. **Clone the repository**
   ```bash
   cd "/Users/James/KIC REBUILD"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure HubSpot CLI**
   ```bash
   npx hs init
   ```
   
   This will guide you through:
   - Logging into your HubSpot account
   - Selecting your portal
   - Creating authentication tokens

4. **Update `hubspot.config.yml`**
   - Replace `YOUR_PORTAL_ID_HERE` with your actual portal ID
   - Configure your authentication settings

5. **Upload the theme to HubSpot**
   ```bash
   npm run upload
   ```

## 📝 Usage

### Development Workflow

1. **Watch for changes (recommended for development)**
   ```bash
   npm run watch
   ```
   This automatically uploads files as you edit them.

2. **Manual upload**
   ```bash
   npm run upload
   ```

3. **Fetch files from HubSpot**
   ```bash
   npm run fetch
   ```

4. **Create new modules**
   ```bash
   npm run create-module
   ```

5. **Create new templates**
   ```bash
   npm run create-template
   ```

### For Marketers & Content Editors

#### Editing Content

1. **Log into HubSpot CMS**
   - Navigate to Marketing > Website > Website Pages

2. **Edit Existing Pages**
   - Click on the page you want to edit
   - Use the drag-and-drop editor
   - All modules are fully customizable

3. **Module Customization**

   **Hero Section Module:**
   - Change title and subtitle
   - Upload custom background images
   - Enable/disable parallax effect
   - Customize CTA button text and link

   **Content Cards Module:**
   - Add/remove cards (up to 12)
   - Upload images for each card
   - Edit titles and descriptions
   - Set card links
   - Choose 2, 3, or 4 column layouts

   **Contact Form Module:**
   - Toggle form fields on/off
   - Customize form labels
   - Set success messages
   - Style submit button

4. **Creating New Pages**
   - Click "Create" > "Website Page"
   - Choose from available templates:
     - Landing Page (for main content pages)
     - Contact Page (for contact forms)
     - Search Results (for search functionality)

#### Theme Customization

Access theme settings in HubSpot:
1. Go to Design Manager
2. Select your theme
3. Click "Edit theme settings"

**Customizable Settings:**
- **Colors:** Primary, secondary, accent, text, background
- **Typography:** Heading and body fonts
- **Features:** Enable/disable animations and parallax effects

## 🎨 Custom Modules

### Hero Section
Modern hero banner with:
- Customizable title and subtitle
- Background image support
- Optional parallax scrolling
- Configurable CTA button
- Multiple button styles (primary, secondary, outline)

### Content Cards Grid
Flexible card layout with:
- Responsive grid (2, 3, or 4 columns)
- Image support for each card
- Rich text descriptions
- Clickable card links
- Hover animations

### Contact Form
Validated contact form with:
- Toggle-able form fields (name, email, phone, message)
- Built-in validation
- Custom success messages
- Responsive design
- Error handling

## 🎭 Features

### Animations & Effects
- **Fade In:** Elements animate as they scroll into view
- **Slide In:** Left and right slide animations
- **Parallax Scrolling:** Background images move at different speeds
- **Hover Effects:** Cards and buttons respond to user interaction
- **Smooth Scrolling:** Anchor links scroll smoothly
- **Progress Indicator:** Shows scroll progress at top of page

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px, 1440px
- Optimized touch targets for mobile
- Collapsible navigation on small screens

### Performance
- Lazy loading images
- Optimized CSS and JavaScript
- Minimal external dependencies
- Fast loading times

## 🔧 Customization Guide

### Adding New Colors
Edit `src/kickit-california-theme/fields.json`:
```json
{
  "id": "new_color",
  "name": "new_color",
  "label": "New Color",
  "type": "color",
  "default": {
    "color": "#000000",
    "opacity": 100
  }
}
```

### Creating Custom Modules
```bash
npm run create-module
```
Follow the prompts to create a new module with:
- `meta.json` - Module configuration
- `module.html` - Module template
- `module.css` (optional) - Module styles
- `module.js` (optional) - Module scripts

### Modifying Existing Styles
Edit `src/kickit-california-theme/css/main.css` to update:
- CSS variables
- Component styles
- Animations
- Responsive breakpoints

## 📱 Mobile Optimization

The theme is fully responsive with:
- Fluid typography
- Flexible grids
- Touch-friendly interactions
- Optimized images
- Mobile navigation menu

## 🚀 Deployment

### To Staging
```bash
npm run upload
```

### To Production
1. Test thoroughly on staging
2. Use HubSpot's publishing tools
3. Review all pages before going live
4. Check mobile responsiveness

## 🐛 Troubleshooting

### Common Issues

**Issue:** Files not uploading
- **Solution:** Check `hubspot.config.yml` is properly configured
- Verify you're authenticated: `npx hs auth`

**Issue:** Modules not appearing
- **Solution:** Ensure `meta.json` and `module.html` exist
- Check for syntax errors in JSON files

**Issue:** Styles not applying
- **Solution:** Clear HubSpot cache
- Check CSS file paths in templates

**Issue:** JavaScript not working
- **Solution:** Check browser console for errors
- Verify JS file is properly linked in template

## 📚 Resources

- [HubSpot CMS Documentation](https://developers.hubspot.com/docs/cms)
- [HubSpot CLI Documentation](https://developers.hubspot.com/docs/cms/developer-reference/local-development-cli)
- [HubL Documentation](https://developers.hubspot.com/docs/cms/hubl)
- [HubSpot Design Tools](https://developers.hubspot.com/docs/cms/building-blocks)

## 🤝 Support

For questions or issues:
- **Email:** info@kickitca.org
- **Phone:** 1-800-NO-BUTTS
- **HubSpot Support:** support@hubspot.com

## 📝 License

Copyright © 2026 Kick It California. All rights reserved.

## 🎯 Roadmap

### Completed ✅
- [x] Project structure setup
- [x] Base theme and templates
- [x] Custom modules (Hero, Cards, Contact Form)
- [x] Responsive design system
- [x] Animations and effects
- [x] Mobile optimization

### In Progress 🚧
- [ ] Additional custom modules
- [ ] Quit plan interactive tool
- [ ] Resource library template
- [ ] Blog template

### Planned 📋
- [ ] Multi-language support
- [ ] Advanced form integrations
- [ ] A/B testing setup
- [ ] Analytics dashboard
- [ ] Additional page templates
- [ ] Video integration modules

## 👥 Contributors

- **Development Team:** Kick It California
- **Design Inspiration:** kicform.org/kick-it-2
- **Content Source:** kickitca.org

---

**Built with ❤️ for a healthier California**
