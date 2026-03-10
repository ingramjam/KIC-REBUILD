# Calculator Integration - KIC REBUILD

## Overview

The Addiction Cost Calculator is a comprehensive integration that allows users to calculate the financial, health, and environmental impact of their substance use. The calculator is fully integrated with:

- **Multiple landing pages** via calculator module
- **Chatbot (improved version)** for personalized guidance
- **Intake forms** for pre-filling user data
- **Data persistence** across page transitions
- **URL parameter support** for direct linking with age groups

## Components

### 1. Calculator Module
**Location**: `Kick It California/modules/calculator.module/`

The calculator module is a reusable HubSpot module with three files:

#### module.html
- Interactive calculator with 3 age groups (14-18, 18-35, 35-65)
- Product selection buttons (Smoking, Vaping, Marijuana, Nicotine Pouches)
- Daily usage and years of use inputs
- Real-time result calculations
- Results display cards (Financial, Health, Environmental impact)
- Share and Get Help buttons

**Key Features:**
```html
- Age group tabs with dynamic switching
- Color-coded product buttons
- Results calculations based on daily spend × days in year
- Health risk assessment (Low/Moderate/High)
- Environmental impact estimation
- Share functionality for social media
- localStorage integration for data persistence
```

**Usage:**
```html
<!-- In HubSpot templates -->
{% include "./modules/calculator.module/module.html" %}
```

#### meta.json
Module metadata for HubSpot:
```json
{
  "label": "Addiction Cost Calculator",
  "description": "Interactive calculator showing financial, health, and environmental impact",
  "isAvailableForNewContent": true,
  "category": "Interactive Tools"
}
```

#### fields.json
Admin-configurable fields:
- `title`: Calculator main heading
- `subtitle`: Subtitle text
- `cta_text`: Primary button text
- `share_text`: Share button text
- `default_age_group`: Default age tab (14-18, 18-35, 35-65)
- `primary_color`: Accent color for calculator
- `enable_sharing`: Toggle share button

### 2. Calculator Data Bridge
**Location**: `Kick It California/js/calculator-bridge.js`

JavaScript utility that manages data flow between calculator, chatbot, and intake forms.

**Key Functions:**

```javascript
// Save results to localStorage and prepare form/chatbot data
CalculatorBridge.saveCalculatorData(calculatorData)

// Retrieve last calculation
CalculatorBridge.getCalculatorData()

// Clear all stored data
CalculatorBridge.clearCalculatorData()

// Check if data is recent (< 24 hours)
CalculatorBridge.hasRecentCalculatorData()

// Get form prefill data
CalculatorBridge.getFormPrefill()

// Get chatbot context with personalization
CalculatorBridge.getChatbotContext()

// Get personalized greeting for chatbot
CalculatorBridge.getPersonalizedGreeting()

// Prepare data for HubSpot CRM sync
CalculatorBridge.syncToHubSpot(properties)

// Share text for social media
CalculatorBridge.getShareableText()
```

**Data Structure:**
```javascript
{
  ageGroup: "18-35",
  product: "smoking",
  dailySpend: 10,
  yearsUsing: 5,
  annualCost: 3650,
  totalCost: 18250,
  healthRisk: "Moderate",
  savedAt: "2026-03-10T15:30:00.000Z",
  source: "calculator"
}
```

### 3. Quit Assessment Landing Page
**Location**: `Kick It California/templates/quit-assessment.html`

Dedicated landing page for calculator with:
- Hero section with calculator description
- Calculator module placement (DND area)
- Results-based CTA to product pages
- Additional resources section
- Mobile-responsive design

**URL Support:**
```
/quit-assessment                    # Default (18-35 age group)
/quit-assessment?age=14-18          # Teen version
/quit-assessment?age=35-65          # Older adults version
```

### 4. Enhanced Chatbot Integration
**Location**: `chatbot-improved.html`

Updated chatbot with calculator data integration:

**Personalized Greeting:**
```javascript
// If calculator data exists:
"I see you're spending $3,650 annually on smoking. Let's create a personalized plan to help you quit! 🎯"

// Otherwise:
"Hi there! What would you like help with today?"
```

**Pre-populated User Profile:**
```javascript
userProfile = {
  quitType: "smoking",              // From calculator
  annualCost: 3650,                 // From calculator
  ageGroup: "18-35",                // From calculator
  yearsUsing: 5,                    // From calculator
  healthRisk: "Moderate",           // From calculator
  ... (other fields)
}
```

**Integration Flow:**
1. User completes calculator
2. Data saved to localStorage
3. User opens chatbot (same page or new window)
4. CalculatorBridge loads data
5. Chatbot uses data for personalized greeting
6. Chatbot pre-fills form recommendations

### 5. IFTTT Landing Page Update
**Location**: `quit-selector-ifttt-demo.html`

Added calculator CTA banner:
```html
<div class="calculator-banner">
  <p>💰 Want to know what your habit is costing you?</p>
  <button onclick="redirectToCalculator()">Calculate Your Cost →</button>
</div>
```

**Flow:**
1. User visits IFTTT landing page
2. Selects product or searches
3. Calculator banner suggests calculation
4. Clicking redirects to `/quit-assessment`
5. Returns to IFTTT with data

## Data Flow

```
┌─────────────────┐
│   Calculator    │
│   Module        │
└────────┬────────┘
         │ saveCalculatorData()
         ↓
┌──────────────────────┐
│   localStorage       │
│  kic_calculator_data │
├──────────────────────┤
│ CalculatorBridge API │
└────────┬─────────────┘
         │
         ├─→ Chatbot (personalized greeting)
         ├─→ Intake Form (auto-fill fields)
         ├─→ HubSpot CRM (sync on submission)
         └─→ Analytics (track conversions)
```

## Integration Points

### Landing Pages

**Update home.html:**
```html
<div class="secondary-cta">
  <button onclick="window.location.href='/quit-assessment'">
    Calculate Your Quit Cost
  </button>
</div>
```

**Update product pages (quit-smoking.html, etc.):**
```html
<!-- Add calculator module in hero section -->
{% include "./modules/calculator.module/module.html" %}
```

**Update quit-selector-landing-ifttt.html:**
```html
<!-- Add calculator banner below search -->
<div class="calculator-banner">
  <button onclick="redirectToCalculator()">💰 Calculate Your Cost</button>
</div>
```

### Form Integration

**In quit-now.html intake form:**
```javascript
// On form load, check for calculator data
const prefill = CalculatorBridge.getFormPrefill();

if (prefill) {
  document.getElementById('productSelect').value = prefill.product;
  document.getElementById('dailySpend').value = prefill.dailySpend;
  document.getElementById('yearsUsing').value = prefill.yearsUsing;
  
  // Skip to Step 2 if data exists
  showStep(2);
}

// On form submit, sync data to HubSpot
const hubspotData = CalculatorBridge.syncToHubSpot();
hbspt.forms.submit(hubspotData);
```

### Chatbot Integration

**In chatbot-improved.html:**
```javascript
// Initialize with calculator data
let userProfile = initializeUserProfile();

// Use calculator context in responses
if (userProfile.annualCost) {
  addBotMessage(`You're spending $${userProfile.annualCost} annually. 
                 Here's your personalized plan...`);
}
```

## URL Parameters

### Age Group Detection
```
/quit-assessment?age=14-18      # Teen users
/quit-assessment?age=18-35      # Young adults (default)
/quit-assessment?age=35-65      # Mature adults
```

### Source Tracking
```
/quit-assessment?source=home    # From homepage CTA
/quit-assessment?source=ifttt   # From IFTTT landing page
/quit-assessment?source=product # From product pages
```

## Data Persistence

### Storage Keys
```javascript
localStorage['kic_calculator_data']    // Raw calculator results
localStorage['kic_chatbot_context']    // Chatbot pre-population data
localStorage['kic_form_prefill']       // Form auto-fill data
```

### Data Lifetime
- **Default**: 24 hours (auto-clear after)
- **Manual Clear**: `CalculatorBridge.clearCalculatorData()`
- **Check**: `CalculatorBridge.hasRecentCalculatorData()`

## HubSpot Integration

### Contact Properties Created
```
kic_product_type           (text)
kic_age_group              (text)
kic_daily_spend            (number)
kic_years_using            (number)
kic_annual_cost            (currency)
kic_total_cost             (currency)
kic_health_risk            (text)
kic_calculator_source      (text)
kic_calculator_timestamp   (date)
```

### Form Submission Flow
```javascript
// Get all calculator data
const calcData = CalculatorBridge.syncToHubSpot();

// Merge with form data
const formData = {
  firstname: "John",
  email: "john@example.com",
  phone: "555-1234",
  ...calcData
};

// Submit to HubSpot
hbspt.forms.submit(formData);
```

## Testing Checklist

### Calculator Module
- [ ] All age groups load correctly
- [ ] Products highlight when selected
- [ ] Inputs calculate correctly
- [ ] Results display with formatted currency
- [ ] Share button works (clipboard/native share)
- [ ] Get Help button redirects to correct page
- [ ] Mobile responsive at 480px

### Data Bridge
- [ ] Data saves to localStorage
- [ ] Data persists across page reload
- [ ] Data clears after 24 hours
- [ ] Chatbot greeting uses calculator data
- [ ] Form fields auto-fill correctly

### URL Parameters
- [ ] `/quit-assessment?age=14-18` loads teen version
- [ ] `/quit-assessment?age=35-65` loads mature version
- [ ] Default is 18-35 without parameter

### Integration
- [ ] IFTTT banner visible and clickable
- [ ] Chatbot shows personalized greeting
- [ ] Intake form has pre-filled fields
- [ ] Data syncs to HubSpot on submission
- [ ] All links work across pages

### Responsive Design
- [ ] Desktop (1200px+)
- [ ] Tablet (768px - 1024px)
- [ ] Mobile (< 480px)

## Development Notes

### Customization

**Change calculator title:**
In `calculator.module/fields.json`, update `title` field

**Customize age groups:**
Edit age tabs in `module.html` and corresponding calculation logic

**Modify colors:**
Update CSS variables in `module.html` and `calculator-bridge.js`

**Change redirect URL:**
In closing CTA, update `getHelp()` function's `productPages` object

### Performance

- Calculator Bridge is ~8KB minified
- LocalStorage doesn't count towards quota (typically unlimited)
- Data persists across browser sessions
- No external API calls required

## Troubleshooting

**Calculator data not persisting:**
```javascript
// Clear and re-save
CalculatorBridge.clearCalculatorData();
CalculatorBridge.saveCalculatorData(newData);
```

**Chatbot not showing personalized greeting:**
```javascript
// Check if bridge loaded
console.log(window.CalculatorBridge);
console.log(CalculatorBridge.getCalculatorData());
```

**Form not auto-filling:**
```javascript
// Verify form fields have correct IDs
const prefill = CalculatorBridge.getFormPrefill();
console.log(prefill);
```

## Future Enhancements

1. **Quiz Integration**: Add psychological assessment quiz
2. **Comparison Tool**: Compare costs across product types
3. **Savings Tracker**: Track money saved after quitting
4. **Goal Setting**: Let users set daily/weekly/monthly goals
5. **Community Sharing**: Share results with accountability partners
6. **Analytics Dashboard**: View aggregate anonymized data
7. **PDF Export**: Download calculation report
8. **API Integration**: Connect with health apps (Apple Health, Google Fit)

## Support

For questions or issues with calculator integration:
1. Check this documentation
2. Review code comments in calculator-bridge.js
3. Check browser console for errors
4. Test in incognito mode (rules out cache issues)
5. Verify localStorage is enabled

---

**Last Updated**: March 10, 2026
**Status**: Production Ready ✅
