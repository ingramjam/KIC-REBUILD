# Quick Start: HubSpot Forms Integration

## ✅ What's Been Created

### 1. Form Modules (Uploaded to HubSpot)
- **quit-now-intake.module** - Full intake form with CRM tracking
- **quiz-form.module** - Interactive quiz with scoring

### 2. Form Definitions (JSON templates)
- `quit-now-intake-form.json` - Field definitions for intake form
- `quit-smoking-quiz.json` - Field definitions for quiz

### 3. Documentation
- `HUBSPOT_FORMS_SETUP.md` - Complete setup guide with workflows

---

## 🚀 Next Steps to Make Forms Live

### Step 1: Create Forms in HubSpot (5 minutes)

1. Log into HubSpot → Marketing → Forms
2. Click "Create form" → "Regular form"
3. Name it: **"Quit Now Intake Form"**
4. Add fields from the JSON file (`quit-now-intake-form.json`)
5. Copy the Form GUID (looks like: `abc123-def456-ghi789`)
6. Repeat for **"Quit Smoking Quiz"** using `quit-smoking-quiz.json`

### Step 2: Add Forms to Pages (2 minutes)

**For quit-now.html:**
Replace the current form HTML (around line 436) with:

```html
{% module "quit_now_form" 
   path="@hubspot/form",
   form_id="YOUR_FORM_GUID_HERE"
%}
```

**For quit-smoking.html:**
Replace the quiz HTML (around line 570) with:

```html
{% module "smoking_quiz"
   path="/forms/quiz-form.module",
   form_guid="YOUR_QUIZ_FORM_GUID_HERE"
%}
```

### Step 3: Upload & Test (3 minutes)

```bash
cd "/Users/James/KIC REBUILD"
npx hs upload --portal=sandboxdev "Kick It California/templates" "Kick It California/templates"
```

Then test by submitting the forms and checking HubSpot Contacts.

---

## 🎯 What the Forms Do

### Quit Now Intake Form:
✅ Captures: Name, email, phone, ZIP, products to quit, motivation, timeline
✅ Creates contact in CRM
✅ Triggers follow-up workflows
✅ Pre-fills for returning visitors
✅ Stores data in localStorage for session persistence

### Quiz Form:
✅ Calculates addiction score (0-30)
✅ Determines dependency level (Low/Moderate/High)
✅ Shows personalized recommendations
✅ Saves results to contact properties
✅ Welcomes returning users with previous scores
✅ CTA to quit-now page after completion

---

## 💡 Key Features

**User Recognition:**
- HubSpot tracking cookie (`hubspotutk`) identifies returning visitors
- Forms auto-populate with saved data
- Welcome messages show user's name and progress

**CRM Integration:**
- All submissions create/update contacts
- Custom properties store quit-specific data
- Lifecycle stages auto-update (Subscriber → Lead)
- Tasks created for team follow-up

**Personalization:**
- Quiz results stored and displayed on return visits
- Different messaging based on addiction level
- Progress tracking across multiple visits

---

## 📊 Custom Contact Properties Needed

Create these in HubSpot (Settings → Properties → Contact):

1. `quit_products` - Multiple checkboxes
2. `usage_duration` - Dropdown
3. `quit_motivation` - Radio
4. `quit_timeline` - Radio
5. `contact_method` - Radio
6. `contact_time` - Dropdown
7. `cigarettes_per_day` - Radio
8. `time_to_first_cigarette` - Radio
9. `motivation_level` - Radio
10. `addiction_score` - Number
11. `addiction_level` - Text

**See `HUBSPOT_FORMS_SETUP.md` for detailed property configurations.**

---

## 🔧 Troubleshooting

**Forms not showing?**
- Check form GUID is correct in module
- Verify form is published in HubSpot
- Check browser console for JavaScript errors

**Data not saving?**
- Verify custom properties are created
- Check property internal names match form fields
- Look at form submission history in HubSpot

**Pre-fill not working?**
- Enable "Pre-populate fields for known contacts" in form settings
- Check tracking code is installed on pages
- Clear cookies and test as new user first

---

## 📞 Support

- Full guide: `/HUBSPOT_FORMS_SETUP.md`
- HubSpot Forms API: https://developers.hubspot.com/docs/api/marketing/forms
- Module locations in HubSpot: Design Manager → `@hubspot/forms/`

**Ready to go live? Create the forms in HubSpot and add the GUIDs to your templates!**
