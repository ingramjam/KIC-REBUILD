/**
 * Kick It California - Calculator Data Bridge
 * Manages data flow between calculator, chatbot, and intake forms
 * 
 * Usage:
 * - saveCalculatorData(data) - Save calculator results
 * - getCalculatorData() - Retrieve last calculation
 * - clearCalculatorData() - Clear stored data
 * - syncToHubSpot(properties) - Send data to HubSpot CRM
 * - getChatbotContext() - Get pre-populated chatbot message
 */

const CalculatorBridge = {
  // LocalStorage keys
  STORAGE_KEY: 'kic_calculator_data',
  CHATBOT_KEY: 'kic_chatbot_context',
  FORM_KEY: 'kic_form_prefill',
  
  /**
   * Save calculator results to localStorage
   * @param {Object} data - Calculator data object
   */
  saveCalculatorData(data) {
    try {
      const timestamp = new Date().toISOString();
      const enrichedData = {
        ...data,
        savedAt: timestamp,
        source: 'calculator'
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(enrichedData));
      
      // Also set form prefill data
      this.setFormPrefill(data);
      
      // Also set chatbot context
      this.setChatbotContext(data);
      
      console.log('Calculator data saved:', enrichedData);
      return true;
    } catch (error) {
      console.error('Error saving calculator data:', error);
      return false;
    }
  },

  /**
   * Get calculator data from localStorage
   * @returns {Object|null} Stored calculator data or null if not found
   */
  getCalculatorData() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving calculator data:', error);
      return null;
    }
  },

  /**
   * Clear all stored calculator data
   */
  clearCalculatorData() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.CHATBOT_KEY);
      localStorage.removeItem(this.FORM_KEY);
      console.log('Calculator data cleared');
      return true;
    } catch (error) {
      console.error('Error clearing calculator data:', error);
      return false;
    }
  },

  /**
   * Check if calculator data exists and is recent (less than 24 hours old)
   * @returns {boolean}
   */
  hasRecentCalculatorData() {
    const data = this.getCalculatorData();
    if (!data || !data.savedAt) return false;
    
    const savedTime = new Date(data.savedAt);
    const now = new Date();
    const hoursAgo = (now - savedTime) / (1000 * 60 * 60);
    
    return hoursAgo < 24;
  },

  /**
   * Prepare form prefill data from calculator results
   * @param {Object} calculatorData
   */
  setFormPrefill(calculatorData) {
    try {
      const formPrefill = {
        product: this.mapProductToFormName(calculatorData.product),
        dailySpend: calculatorData.dailySpend,
        yearsUsing: calculatorData.yearsUsing,
        ageGroup: calculatorData.ageGroup,
        source: 'calculator'
      };
      
      localStorage.setItem(this.FORM_KEY, JSON.stringify(formPrefill));
      return formPrefill;
    } catch (error) {
      console.error('Error setting form prefill:', error);
      return null;
    }
  },

  /**
   * Get form prefill data
   * @returns {Object|null}
   */
  getFormPrefill() {
    try {
      const data = localStorage.getItem(this.FORM_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving form prefill:', error);
      return null;
    }
  },

  /**
   * Prepare chatbot context from calculator results
   * @param {Object} calculatorData
   */
  setChatbotContext(calculatorData) {
    try {
      const context = {
        ageGroup: calculatorData.ageGroup,
        product: calculatorData.product,
        dailySpend: calculatorData.dailySpend,
        yearsUsing: calculatorData.yearsUsing,
        annualCost: calculatorData.annualCost,
        totalCost: calculatorData.totalCost,
        healthRisk: calculatorData.healthRisk,
        userProfile: {
          product: calculatorData.product,
          ageGroup: calculatorData.ageGroup,
          yearsOfUse: calculatorData.yearsUsing,
          dailySpend: calculatorData.dailySpend,
          annualSpend: calculatorData.annualCost,
          healthRiskLevel: calculatorData.healthRisk
        }
      };
      
      localStorage.setItem(this.CHATBOT_KEY, JSON.stringify(context));
      return context;
    } catch (error) {
      console.error('Error setting chatbot context:', error);
      return null;
    }
  },

  /**
   * Get chatbot context for message personalization
   * @returns {Object|null}
   */
  getChatbotContext() {
    try {
      const data = localStorage.getItem(this.CHATBOT_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving chatbot context:', error);
      return null;
    }
  },

  /**
   * Get personalized greeting message based on calculator data
   * @returns {string}
   */
  getPersonalizedGreeting() {
    const context = this.getChatbotContext();
    
    if (!context) {
      return "Welcome! I'm your quit coach. What would you like to work on today? 👋";
    }
    
    const { product, annualCost, healthRisk } = context;
    
    const productNames = {
      'smoking': 'smoking',
      'vaping': 'vaping',
      'marijuana': 'cannabis',
      'nicotine': 'nicotine pouches'
    };
    
    const productName = productNames[product] || 'substance use';
    const costMessage = annualCost ? ` You're spending $${annualCost.toLocaleString()} annually on ${productName}.` : '';
    const riskMessage = healthRisk && healthRisk !== 'Low' ? ` Your health risk is ${healthRisk.toLowerCase()}.` : '';
    
    return `I see you're struggling with ${productName}.${costMessage}${riskMessage} Let's create a personalized plan to help you quit. 🎯`;
  },

  /**
   * Map product name to form field value
   * @param {string} product - Calculator product name
   * @returns {string} - Form-compatible product name
   */
  mapProductToFormName(product) {
    const mapping = {
      'smoking': 'cigarettes',
      'vaping': 'e-cigarettes',
      'marijuana': 'cannabis',
      'nicotine': 'nicotine-pouches'
    };
    
    return mapping[product] || product;
  },

  /**
   * Sync calculator data to HubSpot CRM
   * Should be called after form submission
   * @param {Object} hubspotProperties - HubSpot contact properties
   * @returns {Promise}
   */
  async syncToHubSpot(hubspotProperties = {}) {
    try {
      const data = this.getCalculatorData();
      
      if (!data) {
        console.log('No calculator data to sync');
        return false;
      }
      
      const properties = {
        // HubSpot contact properties for calculator data
        kic_product_type: this.mapProductToFormName(data.product),
        kic_age_group: data.ageGroup,
        kic_daily_spend: data.dailySpend,
        kic_years_using: data.yearsUsing,
        kic_annual_cost: data.annualCost,
        kic_total_cost: data.totalCost,
        kic_health_risk: data.healthRisk,
        kic_calculator_source: 'calculator_module',
        kic_calculator_timestamp: data.savedAt,
        ...hubspotProperties
      };
      
      // If HubSpot form API is available, submit data
      if (window.hbspt && window.hbspt.forms) {
        // This would be called by the form submission handler
        console.log('HubSpot properties ready for submission:', properties);
      }
      
      return properties;
    } catch (error) {
      console.error('Error preparing HubSpot sync:', error);
      return null;
    }
  },

  /**
   * Generate shareable result text
   * @returns {string}
   */
  getShareableText() {
    const data = this.getCalculatorData();
    
    if (!data) return '';
    
    const productNames = {
      'smoking': 'smoking',
      'vaping': 'vaping',
      'marijuana': 'cannabis',
      'nicotine': 'nicotine pouches'
    };
    
    const product = productNames[data.product] || data.product;
    const message = `I'm spending $${data.annualCost.toLocaleString()} annually on ${product}. I'm taking control with Kick It California. Join me! 🚀 https://kickitca.org`;
    
    return message;
  },

  /**
   * Initialize calculator bridge on page load
   * Checks for existing data and prepares chatbot context
   */
  init() {
    const data = this.getCalculatorData();
    
    if (data && this.hasRecentCalculatorData()) {
      console.log('Calculator data found, context ready for chatbot');
      
      // Trigger any initialization hooks if needed
      window.dispatchEvent(new CustomEvent('calculatorDataReady', {
        detail: data
      }));
    }
  }
};

// Auto-initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    CalculatorBridge.init();
  });
} else {
  CalculatorBridge.init();
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.CalculatorBridge = CalculatorBridge;
}
