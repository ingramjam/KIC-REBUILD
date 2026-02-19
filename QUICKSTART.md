# Quick Start Guide - Kick It California HubSpot Build

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd "/Users/James/KIC REBUILD"
npm install
```
✅ **Status:** Complete!

### Step 2: Configure HubSpot
```bash
npx hs init
```

Follow the prompts:
1. Choose "Personal Access Key" authentication
2. Log into your HubSpot account
3. Enter your Portal ID
4. Generate and save your access key

### Step 3: Upload Theme to HubSpot
```bash
npm run upload
```

This uploads all files to your HubSpot portal.

### Step 4: Activate Theme in HubSpot

1. Log into HubSpot
2. Go to **Marketing > Files and Templates > Design Tools**
3. Find "Kick It California Theme" in the left sidebar
4. Right-click and select "Set as default theme" (optional)

### Step 5: Create Your First Page

1. Go to **Marketing > Website > Website Pages**
2. Click **Create > Website Page**
3. Choose "Kick It California Theme"
4. Select a template:
   - **Landing Page** - For main content pages
   - **Contact Page** - For contact forms
   - **Quit Plan** - For interactive quit plan builder
   - **Search Results** - For search functionality

## 📝 Development Workflow

### Watch Mode (Recommended)
```bash
npm run watch
```
This automatically uploads changes as you edit files locally.

### Manual Upload
```bash
npm run upload
```
Upload all files manually.

### Fetch from HubSpot
```bash
npm run fetch
```
Download files from HubSpot to your local machine.

## 🎨 Customizing Your Site

### Edit Theme Colors & Fonts

1. In HubSpot, go to **Design Tools**
2. Find your theme in the left sidebar
3. Click the **Edit theme settings** button (gear icon)
4. Customize:
   - **Colors:** Primary, Secondary, Accent, Text, Background
   - **Typography:** Heading and Body fonts
   - **Features:** Enable/disable animations and parallax

### Add/Edit Content

All modules are drag-and-drop:
- Click **Edit** on any page
- Drag modules from the left sidebar
- Click any module to customize its content
- Click **Publish** to make changes live

## 📦 Available Modules

### Hero Section
- **Use For:** Page headers with large images
- **Features:** Title, subtitle, CTA button, parallax background
- **Best For:** Landing pages, homepage

### Content Cards Grid
- **Use For:** Displaying multiple items in a grid
- **Features:** Images, titles, descriptions, links
- **Options:** 2, 3, or 4 columns
- **Best For:** Services, resources, team members

### Contact Form
- **Use For:** Contact pages
- **Features:** Name, email, phone, message fields
- **Validation:** Built-in form validation
- **Best For:** Contact us, support requests

### Quit Plan Builder
- **Use For:** Interactive quit plan creation
- **Features:** Multi-step form, progress bar, personalization
- **Best For:** Quit plan pages, interactive tools

## 🔧 Common Customizations

### Change Site Logo
1. Edit any template
2. Click on the header area
3. Upload your logo image
4. Save and publish

### Update Footer
1. Edit any template
2. Scroll to footer section
3. Click to edit text, links, or add modules
4. Save and publish

### Add New Pages
1. **Marketing > Website > Website Pages**
2. **Create > Website Page**
3. Choose your template
4. Add content using modules
5. Set URL and meta description
6. **Publish**

## 📱 Mobile Optimization

All templates are mobile-responsive automatically!

To preview mobile:
- In the page editor, click the **Preview** button
- Select different device sizes
- Check that content looks good on all screens

## 🎯 Next Steps

### Recommended Setup Order:

1. ✅ **Homepage** - Create using Landing Page template
2. ✅ **About Page** - Create using Landing Page template
3. ✅ **Quit Plan** - Create using Quit Plan template
4. ✅ **Resources** - Create using Landing Page template
5. ✅ **Contact Us** - Create using Contact Page template
6. ✅ **Blog** - Set up blog if needed

### Content Migration from kickitca.org:

1. **Copy Content:** Grab text and images from existing site
2. **Paste into Modules:** Use rich text editors in each module
3. **Style Match:** Adjust colors/fonts to match kicform.org/kick-it-2
4. **Review:** Check each page on mobile and desktop
5. **Publish:** Make pages live one by one

## 🆘 Troubleshooting

### Files Not Uploading?
```bash
# Re-authenticate
npx hs auth

# Try uploading again
npm run upload
```

### Changes Not Appearing?
- Clear browser cache (Cmd+Shift+R on Mac)
- In HubSpot, click "Preview" to see latest version
- Check if you're in draft vs. published mode

### Module Not Showing?
- Make sure `meta.json` and `module.html` both exist
- Check for syntax errors in JSON
- Re-upload: `npm run upload`

### Styles Not Working?
- Check that `main.css` is linked in `base.html`
- Clear HubSpot CDN cache (takes 5-10 minutes)
- Hard refresh browser (Cmd+Shift+R)

## 📞 Support Resources

- **HubSpot Academy:** [academy.hubspot.com](https://academy.hubspot.com)
- **HubSpot Docs:** [developers.hubspot.com/docs/cms](https://developers.hubspot.com/docs/cms)
- **HubSpot Support:** In-app chat or support@hubspot.com
- **Community:** [community.hubspot.com](https://community.hubspot.com)

## ✅ Pre-Launch Checklist

- [ ] All pages created and content added
- [ ] Forms tested and working
- [ ] Mobile responsive checked on all pages
- [ ] Images optimized and loading fast
- [ ] Meta descriptions added to all pages
- [ ] Navigation menu configured
- [ ] Footer links working
- [ ] Contact information updated
- [ ] 404 page customized
- [ ] Analytics tracking added
- [ ] SEO settings configured

## 🎉 Ready to Launch!

Once everything is tested:
1. Set all pages to **Published**
2. Update DNS settings (if custom domain)
3. Enable SSL certificate
4. Test live site thoroughly
5. Announce launch! 🚀

---

**Questions?** Contact info@kickitca.org or call 1-800-NO-BUTTS
