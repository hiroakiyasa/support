class I18n {
  constructor() {
    this.currentLanguage = 'ja';
    this.translations = {};
    this.supportedLanguages = {
      'ja': '日本語',
      'en': 'English', 
      'zh': '中文'
    };
    
    this.init();
  }

  async init() {
    // Load language from localStorage or default to Japanese
    this.currentLanguage = localStorage.getItem('language') || 'ja';
    
    // Load translations for current language
    await this.loadTranslations(this.currentLanguage);
    
    // Update UI
    this.updateLanguageUI();
    this.translatePage();
    
    // Setup event listeners
    this.setupEventListeners();
  }

  async loadTranslations(language) {
    try {
      const response = await fetch(`locales/${language}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${language} translations`);
      }
      this.translations[language] = await response.json();
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to Japanese if load fails
      if (language !== 'ja') {
        await this.loadTranslations('ja');
      }
    }
  }

  setupEventListeners() {
    // Language switcher button
    const languageBtn = document.getElementById('language-btn');
    const languageDropdown = document.getElementById('language-dropdown');
    
    if (languageBtn && languageDropdown) {
      languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        languageDropdown.classList.remove('active');
      });

      // Language option clicks
      const languageOptions = document.querySelectorAll('.language-option');
      languageOptions.forEach(option => {
        option.addEventListener('click', async (e) => {
          e.preventDefault();
          const language = option.getAttribute('data-lang');
          if (language && language !== this.currentLanguage) {
            await this.changeLanguage(language);
          }
          languageDropdown.classList.remove('active');
        });
      });
    }
  }

  async changeLanguage(language) {
    if (this.supportedLanguages[language]) {
      this.currentLanguage = language;
      
      // Save to localStorage
      localStorage.setItem('language', language);
      
      // Load translations if not already loaded
      if (!this.translations[language]) {
        await this.loadTranslations(language);
      }
      
      // Update UI
      this.updateLanguageUI();
      this.translatePage();
    }
  }

  updateLanguageUI() {
    const currentLanguageSpan = document.getElementById('current-language');
    if (currentLanguageSpan) {
      currentLanguageSpan.textContent = this.supportedLanguages[this.currentLanguage];
    }

    // Update language options active state
    document.querySelectorAll('.language-option').forEach(option => {
      const optionLang = option.getAttribute('data-lang');
      if (optionLang === this.currentLanguage) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }

  translatePage() {
    const translations = this.translations[this.currentLanguage];
    if (!translations) return;

    // Translate elements with data-i18n-key attribute
    document.querySelectorAll('[data-i18n-key]').forEach(element => {
      const key = element.getAttribute('data-i18n-key');
      if (translations[key]) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translations[key];
        } else if (element.tagName === 'META') {
          element.setAttribute('content', translations[key]);
        } else if (element.tagName === 'TITLE') {
          element.textContent = translations[key];
        } else {
          element.textContent = translations[key];
        }
      }
    });

    // Translate alt attributes
    document.querySelectorAll('[data-i18n-alt-key]').forEach(element => {
      const key = element.getAttribute('data-i18n-alt-key');
      if (translations[key]) {
        element.setAttribute('alt', translations[key]);
      }
    });

    // Handle special array translations (like lists)
    document.querySelectorAll('[data-i18n-list-key]').forEach(element => {
      const key = element.getAttribute('data-i18n-list-key');
      if (translations[key] && Array.isArray(translations[key])) {
        const listItems = element.querySelectorAll('li');
        translations[key].forEach((text, index) => {
          if (listItems[index]) {
            listItems[index].textContent = text;
          }
        });
      }
    });

    console.log(`Page translated to ${this.currentLanguage}`);
  }

  t(key) {
    const translations = this.translations[this.currentLanguage];
    return translations && translations[key] ? translations[key] : key;
  }
}

// Initialize internationalization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new I18n();
});

// Export for use in other scripts
window.I18n = I18n; 