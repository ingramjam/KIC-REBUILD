# HubSpot Forms Setup Guide with CRM Integration

## Overview
This guide explains how to create and integrate HubSpot forms with full CRM functionality including:
- User recognition and prefilling
- Contact property mapping
- Personalized experiences for returning visitors
- Quiz scoring and recommendations
- Automated workflows

---

## Step 1: Create Forms in HubSpot Portal

### Option A: Manual Creation (Recommended for First Time)

1. **Log into HubSpot**
   - Navigate to: Marketing → Lead Capture → Forms
   - Click "Create form" → "Regular form"

2. **Create "Quit Now Intake Form"**
   - Form name: `Quit Now Intake Form`
   - Form fields (in order):
     - First Name (`firstname`) - Required
     - Last Name (`lastname`) - Required  
     - Email (`email`) - Required
     - Phone (`phone`) - Required
     - ZIP Code (`zip`) - Required
     - **Custom Property:** Quit Products (`quit_products`) - Checkbox, Multiple values allowed
       - Options: Cigarettes, Vaping, Smokeless, Marijuana
     - **Custom Property:** Usage Duration (`usage_duration`) - Dropdown
       - Options: Less than 1 year, 1-3 years, 3-5 years, etc.
     - **Custom Property:** Quit Motivation (`quit_motivation`) - Radio
       - Options: Health, Family, Money, Freedom, Work, Other
     - **Custom Property:** Quit Timeline (`quit_timeline`) - Radio
       - Options: Immediately, Within 1 week, Within 1 month, Not sure
     - **Custom Property:** Contact Method (`contact_method`) - Radio
       - Options: Phone call, Text message, Email, Live chat
     - **Custom Property:** Best Contact Time (`contact_time`) - Dropdown
       - Options: Morning, Afternoon, Evening, Anytime
     - Message (`message`) - Textarea, Optional

3. **Create "Quit Smoking Quiz"**
   - Form name: `Quit Smoking Addiction Quiz`
   - Form fields:
     - Email (`email`) - Optional (for saving results)
     - **Custom Property:** Cigarettes Per Day (`cigarettes_per_day`) - Radio
       - Options: 1-10, 11-20, 21-30, More than 30
     - **Custom Property:** Time to First Cigarette (`time_to_first_cigarette`) - Radio
       - Options: Within 5 min, 6-30 min, 31-60 min, More than 60 min
     - **Custom Property:** Motivation Level (`motivation_level`) - Radio
       - Options: 1-3, 4-6, 7-9, 10
     - **Custom Property:** Previous Quit Attempts (`previous_quit_attempts`) - Radio
       - Options: Never, 1-2 times, 3-5 times, More than 5 times

4. **Get Form GUIDs**
   - After creating forms, go to form settings
   - Copy the Form GUID (long alphanumeric string)
   - Save these GUIDs - you'll need them for integration

---

## Step 2: Create Custom Contact Properties

In HubSpot, navigate to: Settings → Properties → Contact Properties

Create these custom properties:

### Quit-Related Properties:
1. **quit_products** 
   - Type: Multiple checkboxes
   - Options: Cigarettes, Vaping, Smokeless Tobacco, Marijuana

2. **usage_duration**
   - Type: Dropdown
   - Options: Less than 1 year, 1-3 years, 3-5 years, 5-10 years, 10-20 years, More than 20 years

3. **quit_motivation**
   - Type: Radio select
   - Options: Health, Family, Money, Freedom, Work, Other

4. **quit_timeline**
   - Type: Radio select
   - Options: Immediately, Within 1 week, Within 1 month, Not sure

5. **contact_method**
   - Type: Radio select
   - Options: Phone call, Text message, Email, Live chat

6. **contact_time**
   - Type: Dropdown
   - Options: Morning (7am-12pm), Afternoon (12pm-5pm), Evening (5pm-9pm), Anytime

### Quiz Properties:
7. **cigarettes_per_day**
   - Type: Radio select
   - Options: 1-10, 11-20, 21-30, More than 30

8. **time_to_first_cigarette**
   - Type: Radio select
   - Options: Within 5 min, 6-30 min, 31-60 min, More than 60 min

9. **motivation_level**
   - Type: Radio select
   - Options: 1-3, 4-6, 7-9, 10

10. **previous_quit_attempts**
    - Type: Radio select
    - Options: Never, 1-2 times, 3-5 times, More than 5 times

11. **addiction_score**
    - Type: Number
    - Description: Calculated quiz score (0-30)

12. **addiction_level**
    - Type: Single-line text
    - Description: Low Dependency / Moderate Dependency / High Dependency

---

## Step 3: Integrate Forms into Templates

### Update quit-now.html Template

Replace the current form HTML with:

```html
<!-- HubSpot Form Module -->
{% module "quit_now_form" 
   path="@hubspot/form",
   form_id="YOUR_FORM_GUID_HERE",
   title="Start Your Quit Journey",
   response_type="redirect",
   redirect_url="/thank-you"
%}
```

Or use our custom module:

```html
{% module "quit_now_intake"
   path="/forms/quit-now-intake.module",
   form_guid="YOUR_FORM_GUID_HERE",
   form_title="Start Your Quit Journey",
   form_description="Complete this form to get connected with a Quit Coach",
   show_welcome_message=true,
   redirect_url="/thank-you"
%}
```

### Update quit-smoking.html Template

Add the quiz module where the current quiz HTML is:

```html
{% module "smoking_quiz"
   path="/forms/quiz-form.module",
   form_guid="YOUR_QUIZ_FORM_GUID_HERE",
   quiz_title="How Addicted Are You?",
   quiz_description="Take this 3-minute quiz to understand your nicotine dependence level",
   show_previous_results=true
%}
```

---

## Step 4: Enable CRM Tracking

### A. HubSpot Tracking Code (Already in place if using HubSpot)
The tracking code automatically:
- Sets the `hubspotutk` cookie to identify returning visitors
- Tracks page views and form submissions
- Associates form submissions with contact records

### B. Form Pre-fill Settings
1. Go to each form's settings
2. Enable "Pre-populate fields for known contacts"
3. This will auto-fill forms for returning visitors

### C. Contact Association
Forms automatically create or update contacts when submitted. Configure:
1. Form Settings → Options
2. Set "Create contact" or "Update existing contact"
3. Map form fields to contact properties

---

## Step 5: Create Automated Workflows

### Workflow 1: Quit Now Intake Follow-Up

**Trigger:** Contact submits "Quit Now Intake Form"

**Actions:**
1. Send immediate email: "Thanks for reaching out - A Quit Coach will contact you soon"
2. Create task for Quit Coach team: "Contact new lead within 2 hours"
3. Set contact property: `hs_lead_status` = "NEW"
4. Set lifecycle stage: "Lead"
5. Wait 2 hours → If not contacted, send reminder email
6. Enroll in nurture campaign based on `quit_products` selected

### Workflow 2: Quiz Completion Follow-Up

**Trigger:** Contact submits "Quit Smoking Quiz"

**Actions:**
1. Calculate and set `addiction_score` based on responses
2. Set `addiction_level` property:
   - Score 0-10: "Low Dependency"
   - Score 11-20: "Moderate Dependency"
   - Score 21-30: "High Dependency"
3. Send personalized email with results and recommendations
4. Wait 24 hours → Send follow-up email with link to /quit-now
5. If no form submission after 7 days, send reminder

### Workflow 3: Returning Visitor Personalization

**Trigger:** Contact visits site (pageview)

**Actions:**
1. Check if contact has previous quiz results
2. If yes, show personalized banner with previous score
3. Check if contact submitted intake form but hasn't been contacted
4. If yes, create high-priority task for team

---

## Step 6: Test CRM Integration

### Test User Recognition:
1. Submit a form with your email
2. Clear cookies and close browser
3. Return to site
4. Form should pre-fill your information
5. Check HubSpot Contacts to see submission recorded

### Test Personalization:
1. Submit quiz as a test user
2. Return to quiz page
3. Should see "Welcome back" message with previous results
4. Check localStorage in browser dev tools for saved data

### Test Workflow:
1. Submit intake form
2. Check contact record in HubSpot for:
   - All form fields populated
   - Lead status updated
   - Tasks created for team
   - Emails sent

---

## Step 7: Upload Form Modules to HubSpot

```bash
# Upload form modules
cd "/Users/James/KIC REBUILD"
npx hs upload --portal=sandboxdev "Kick It California/forms" "Kick It California/forms"
```

---

## Advanced: Personalization Examples

### Show Different Content Based on Quiz Results

```html
{% if contact.addiction_level == "High Dependency" %}
  <div class="high-dependency-message">
    <h3>We're here to help with intensive support</h3>
    <p>Based on your quiz results, we recommend daily check-ins with a Quit Coach.</p>
    <a href="/quit-now">Get Started Today →</a>
  </div>
{% elif contact.addiction_level == "Moderate Dependency" %}
  <div class="moderate-dependency-message">
    <h3>You can do this with the right support</h3>
    <p>Weekly coaching sessions will significantly increase your success rate.</p>
  </div>
{% else %}
  <div class="low-dependency-message">
    <h3>You're in a great position to quit!</h3>
    <p>With behavior change techniques and support, you can be smoke-free soon.</p>
  </div>
{% endif %}
```

### Returning Visitor Welcome

```html
{% if contact.firstname %}
  <div class="welcome-back">
    <h2>Welcome back, {{ contact.firstname }}! 👋</h2>
    {% if contact.quit_products %}
      <p>You're working on quitting: {{ contact.quit_products }}</p>
    {% endif %}
  </div>
{% endif %}
```

---

## Troubleshooting

### Forms not pre-filling:
- Check that tracking code is installed
- Verify cookie consent is enabled
- Check form settings have pre-populate enabled

### Data not saving to CRM:
- Verify custom properties are created and internal names match
- Check form field mappings in form settings
- Look at form submission history in HubSpot

### Personalization not working:
- Clear localStorage and cookies to test fresh user experience
- Check that form GUIDs are correct in module code
- Verify JavaScript has no errors in browser console

---

## Next Steps

1. ✅ Create forms in HubSpot portal and get GUIDs
2. ✅ Create all custom contact properties
3. ✅ Update templates with form module codes and GUIDs
4. ✅ Upload form modules to HubSpot
5. ✅ Test form submissions and CRM data flow
6. ✅ Create automated workflows
7. ✅ Train team on using contact data for personalized outreach

---

## Support Resources

- **HubSpot Forms API:** https://developers.hubspot.com/docs/api/marketing/forms
- **HubSpot Contact Properties:** https://developers.hubspot.com/docs/api/crm/properties
- **HubSpot Workflows:** https://knowledge.hubspot.com/workflows/create-workflows
- **Form Pre-fill:** https://knowledge.hubspot.com/forms/use-progressive-form-fields

---

**Ready to implement? Start with Step 1 and create the forms in your HubSpot portal!**
