#!/usr/bin/env node

/**
 * HubSpot Custom Contact Properties Creator
 * Creates all custom properties needed for Kick It California forms
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Read HubSpot config to get API key
const configPath = path.join(__dirname, 'hubspot.config.yml');
let portalId = '244593765'; // sandboxdev portal
let accessToken = '';

// Try to read config file
try {
  const config = fs.readFileSync(configPath, 'utf8');
  // Look for accessToken in the sandboxdev portal config
  const accessTokenMatch = config.match(/accessToken:\s*>-\s*\n\s*([^\n]+)/);
  if (accessTokenMatch) {
    accessToken = accessTokenMatch[1].trim();
    console.log('✅ Found access token in config file');
  }
} catch (error) {
  console.error('Error reading config:', error.message);
  console.log('Please ensure hubspot.config.yml exists');
  process.exit(1);
}

// Custom properties to create
const properties = [
  {
    name: 'quit_products',
    label: 'Products to Quit',
    description: 'What tobacco/nicotine products the user wants to quit',
    groupName: 'contactinformation',
    type: 'enumeration',
    fieldType: 'checkbox',
    options: [
      { label: 'Cigarettes', value: 'cigarettes', displayOrder: 0, hidden: false },
      { label: 'Vaping / E-Cigarettes', value: 'vaping', displayOrder: 1, hidden: false },
      { label: 'Smokeless Tobacco', value: 'smokeless', displayOrder: 2, hidden: false },
      { label: 'Marijuana / Cannabis', value: 'marijuana', displayOrder: 3, hidden: false }
    ]
  },
  {
    name: 'usage_duration',
    label: 'Usage Duration',
    description: 'How long the user has been using tobacco/nicotine',
    groupName: 'contactinformation',
    type: 'enumeration',
    fieldType: 'select',
    options: [
      { label: 'Less than 1 year', value: 'less_than_1_year', displayOrder: 0, hidden: false },
      { label: '1-3 years', value: '1_3_years', displayOrder: 1, hidden: false },
      { label: '3-5 years', value: '3_5_years', displayOrder: 2, hidden: false },
      { label: '5-10 years', value: '5_10_years', displayOrder: 3, hidden: false },
      { label: '10-20 years', value: '10_20_years', displayOrder: 4, hidden: false },
      { label: 'More than 20 years', value: 'more_than_20_years', displayOrder: 5, hidden: false }
    ]
  },
  {
    name: 'quit_motivation',
    label: 'Quit Motivation',
    description: 'Primary motivation for quitting',
    groupName: 'contactinformation',
    type: 'enumeration',
    fieldType: 'radio',
    options: [
      { label: 'Health concerns', value: 'health', displayOrder: 0, hidden: false },
      { label: 'Family / loved ones', value: 'family', displayOrder: 1, hidden: false },
      { label: 'Save money', value: 'money', displayOrder: 2, hidden: false },
      { label: 'Personal freedom', value: 'freedom', displayOrder: 3, hidden: false },
      { label: 'Work requirements', value: 'work', displayOrder: 4, hidden: false },
      { label: 'Other', value: 'other', displayOrder: 5, hidden: false }
    ]
  },
  {
    name: 'quit_timeline',
    label: 'Quit Timeline',
    description: 'When the user wants to quit',
    groupName: 'contactinformation',
    type: 'enumeration',
    fieldType: 'radio',
    options: [
      { label: 'Immediately', value: 'immediately', displayOrder: 0, hidden: false },
      { label: 'Within 1 week', value: 'within_1_week', displayOrder: 1, hidden: false },
      { label: 'Within 1 month', value: 'within_1_month', displayOrder: 2, hidden: false },
      { label: 'Not sure yet', value: 'not_sure', displayOrder: 3, hidden: false }
    ]
  },
  {
    name: 'contact_method',
    label: 'Preferred Contact Method',
    description: 'How the user prefers to be contacted',
    groupName: 'contactinformation',
    type: 'enumeration',
    fieldType: 'radio',
    options: [
      { label: 'Phone call', value: 'phone', displayOrder: 0, hidden: false },
      { label: 'Text message', value: 'text', displayOrder: 1, hidden: false },
      { label: 'Email', value: 'email', displayOrder: 2, hidden: false },
      { label: 'Live chat', value: 'chat', displayOrder: 3, hidden: false }
    ]
  },
  {
    name: 'contact_time',
    label: 'Best Contact Time',
    description: 'Best time to reach the user',
    groupName: 'contactinformation',
    type: 'enumeration',
    fieldType: 'select',
    options: [
      { label: 'Morning (7am-12pm)', value: 'morning', displayOrder: 0, hidden: false },
      { label: 'Afternoon (12pm-5pm)', value: 'afternoon', displayOrder: 1, hidden: false },
      { label: 'Evening (5pm-9pm)', value: 'evening', displayOrder: 2, hidden: false },
      { label: 'Anytime', value: 'anytime', displayOrder: 3, hidden: false }
    ]
  },
  {
    name: 'cigarettes_per_day',
    label: 'Cigarettes Per Day',
    description: 'Number of cigarettes smoked per day',
    groupName: 'contactinformation',
    type: 'enumeration',
    fieldType: 'radio',
    options: [
      { label: '1-10 cigarettes', value: '1_10', displayOrder: 0, hidden: false },
      { label: '11-20 cigarettes', value: '11_20', displayOrder: 1, hidden: false },
      { label: '21-30 cigarettes', value: '21_30', displayOrder: 2, hidden: false },
      { label: 'More than 30', value: 'more_than_30', displayOrder: 3, hidden: false }
    ]
  },
  {
    name: 'time_to_first_cigarette',
    label: 'Time to First Cigarette',
    description: 'How soon after waking they smoke',
    groupName: 'contactinformation',
    type: 'enumeration',
    fieldType: 'radio',
    options: [
      { label: 'Within 5 minutes', value: 'within_5_min', displayOrder: 0, hidden: false },
      { label: '6-30 minutes', value: '6_to_30_min', displayOrder: 1, hidden: false },
      { label: '31-60 minutes', value: '31_to_60_min', displayOrder: 2, hidden: false },
      { label: 'More than 60 minutes', value: 'more_than_60_min', displayOrder: 3, hidden: false }
    ]
  },
  {
    name: 'motivation_level',
    label: 'Motivation Level',
    description: 'Self-reported motivation to quit (1-10)',
    groupName: 'contactinformation',
    type: 'enumeration',
    fieldType: 'radio',
    options: [
      { label: '1-3 (Not very motivated)', value: '1', displayOrder: 0, hidden: false },
      { label: '4-6 (Somewhat motivated)', value: '5', displayOrder: 1, hidden: false },
      { label: '7-9 (Very motivated)', value: '8', displayOrder: 2, hidden: false },
      { label: '10 (Extremely motivated)', value: '10', displayOrder: 3, hidden: false }
    ]
  },
  {
    name: 'previous_quit_attempts',
    label: 'Previous Quit Attempts',
    description: 'Number of times tried to quit before',
    groupName: 'contactinformation',
    type: 'enumeration',
    fieldType: 'radio',
    options: [
      { label: 'Never tried', value: 'never', displayOrder: 0, hidden: false },
      { label: '1-2 times', value: '1_2', displayOrder: 1, hidden: false },
      { label: '3-5 times', value: '3_5', displayOrder: 2, hidden: false },
      { label: 'More than 5 times', value: 'more_than_5', displayOrder: 3, hidden: false }
    ]
  },
  {
    name: 'addiction_score',
    label: 'Addiction Score',
    description: 'Calculated quiz score (0-30)',
    groupName: 'contactinformation',
    type: 'number',
    fieldType: 'number',
    options: []
  },
  {
    name: 'addiction_level',
    label: 'Addiction Level',
    description: 'Calculated dependency level from quiz',
    groupName: 'contactinformation',
    type: 'enumeration',
    fieldType: 'select',
    options: [
      { label: 'Low Dependency', value: 'low', displayOrder: 0, hidden: false },
      { label: 'Moderate Dependency', value: 'moderate', displayOrder: 1, hidden: false },
      { label: 'High Dependency', value: 'high', displayOrder: 2, hidden: false }
    ]
  }
];

// Function to create a property via API
function createProperty(property) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(property);
    
    const options = {
      hostname: 'api.hubapi.com',
      path: `/properties/v1/contacts/properties`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': `Bearer ${accessToken}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log(`✅ Created property: ${property.name}`);
          resolve(JSON.parse(body));
        } else if (res.statusCode === 409) {
          console.log(`⚠️  Property already exists: ${property.name}`);
          resolve({ exists: true });
        } else {
          console.error(`❌ Error creating ${property.name}:`, body);
          reject(new Error(`Status ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Request error for ${property.name}:`, error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Main execution
async function createAllProperties() {
  console.log('🚀 Creating HubSpot Custom Contact Properties...\n');
  console.log(`Portal ID: ${portalId}`);
  console.log(`Properties to create: ${properties.length}\n`);

  if (!accessToken) {
    console.error('❌ No access token found. Please configure hubspot.config.yml');
    process.exit(1);
  }

  for (const property of properties) {
    try {
      await createProperty(property);
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`Failed to create ${property.name}:`, error.message);
    }
  }

  console.log('\n✅ All custom contact properties created!');
  console.log('\nNext steps:');
  console.log('1. Go to HubSpot → Settings → Properties → Contact Properties');
  console.log('2. Verify all properties are created');
  console.log('3. Create forms in HubSpot and map these properties');
  console.log('4. Get Form GUIDs and add to templates\n');
}

// Run the script
createAllProperties().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
