import type { BasePlugin } from 'blinko';
import plugin from '../plugin.json';
import { RTLDetector } from './utils/rtlDetector';
import { RTLStyler } from './utils/rtlStyler';
import en from './locales/en.json';
import zh from './locales/zh.json';
import he from './locales/he.json';
import ar from './locales/ar.json';

// RTL CSS styles
const rtlCSS = `
*:lang(he), *:lang(ar), *:lang(fa), *:lang(ur), *[dir="rtl"] {
    text-align: right !important;
    direction: rtl !important;
}

.markdown-body div, .markdown-body p, .markdown-body span {
    unicode-bidi: plaintext !important;
}

*:dir(rtl) input[type="text"], *:dir(rtl) textarea, [lang="he"] input[type="text"], [lang="he"] textarea {
    text-align: right !important;
    direction: rtl !important;
}

.rtl-toggle-btn {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
}

.rtl-toggle-btn:hover {
    background: #0056b3;
    transform: scale(1.1);
}

.rtl-toggle-btn.active {
    background: #28a745;
}
`;

const detector = new RTLDetector();
const styler = new RTLStyler(detector);
let isRTLEnabled = false;
let styleElement: HTMLStyleElement | null = null;
let toggleButton: HTMLButtonElement | null = null;

function injectCSS() {
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'blinko-rtl-styles';
    styleElement.textContent = rtlCSS;
    document.head.appendChild(styleElement);
  }
}

function removeCSS() {
  if (styleElement) {
    styleElement.remove();
    styleElement = null;
  }
}

function createToggleButton() {
  if (toggleButton) return;
  
  toggleButton = document.createElement('button');
  toggleButton.className = 'rtl-toggle-btn';
  toggleButton.innerHTML = 'ع/א';
  toggleButton.title = 'Toggle RTL Support';
  
  toggleButton.addEventListener('click', toggleRTL);
  document.body.appendChild(toggleButton);
  
  // Load saved state
  const savedState = localStorage.getItem('blinko-rtl-enabled');
  if (savedState === 'true') {
    enableRTL();
  }
}

function removeToggleButton() {
  if (toggleButton) {
    toggleButton.remove();
    toggleButton = null;
  }
}

function enableRTL() {
  isRTLEnabled = true;
  injectCSS();
  styler.startObserving();
  if (toggleButton) {
    toggleButton.classList.add('active');
  }
  localStorage.setItem('blinko-rtl-enabled', 'true');
  
  // Apply RTL to existing content
  document.querySelectorAll('.markdown-body, textarea, input[type="text"]').forEach(el => {
    const text = (el as HTMLElement).textContent || (el as HTMLInputElement).value || '';
    if (detector.detectRTL(text)) {
      (el as HTMLElement).setAttribute('dir', 'rtl');
      (el as HTMLElement).setAttribute('lang', 'he');
    }
  });
}

function disableRTL() {
  isRTLEnabled = false;
  removeCSS();
  styler.stopObserving();
  if (toggleButton) {
    toggleButton.classList.remove('active');
  }
  localStorage.setItem('blinko-rtl-enabled', 'false');
  
  // Remove RTL attributes
  document.querySelectorAll('[dir="rtl"]').forEach(el => {
    el.removeAttribute('dir');
    el.removeAttribute('lang');
  });
}

function toggleRTL() {
  if (isRTLEnabled) {
    disableRTL();
  } else {
    enableRTL();
  }
}

function initializeRTLPlugin() {
  console.log('Initializing Blinko RTL Plugin...');
  
  createToggleButton();
  
  // Load saved settings
  const savedSettings = localStorage.getItem('blinko-rtl-settings');
  if (savedSettings) {
    try {
      const settings = JSON.parse(savedSettings);
      detector.updateConfig({
        sensitivity: settings.sensitivity || 'medium',
        minRTLChars: settings.minRTLChars || 3
      });
      
      styler.updateConfig({
        autoDetect: settings.autoDetect !== false,
        forceDirection: settings.forceDirection || 'auto',
        applyToSelectors: settings.customSelectors || [
          '.note-content',
          '.note-editor', 
          'textarea',
          '.markdown-content',
          '.note-text'
        ]
      });
    } catch (error) {
      console.error('Failed to load RTL plugin settings:', error);
    }
  }

  // Listen for settings changes
  window.addEventListener('rtl-settings-changed', (event: any) => {
    const settings = event.detail;
    
    detector.updateConfig({
      sensitivity: settings.sensitivity,
      minRTLChars: settings.minRTLChars || 3
    });

    styler.updateConfig({
      autoDetect: settings.autoDetect,
      forceDirection: settings.forceDirection,
      applyToSelectors: settings.customSelectors
    });
  });

  // Expose RTL functionality globally
  (window as any).blinkoRTL = {
    detector,
    styler,
    toggle: toggleRTL,
    enable: enableRTL,
    disable: disableRTL,
    isEnabled: () => isRTLEnabled,
    test: (text: string) => {
      const isRTL = detector.detectRTL(text);
      console.log(`Text "${text}" is ${isRTL ? 'RTL' : 'LTR'}`);
      return isRTL;
    }
  };

  console.log('Blinko RTL Plugin initialized successfully');
}

export default class Plugin implements BasePlugin {
  constructor() {
    Object.assign(this, plugin);
  }

  withSettingPanel = true;

  renderSettingPanel = () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div style="padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <h2>RTL Language Support Settings</h2>
        <p>Use the floating button (ع/א) to toggle RTL support on/off.</p>
        <div style="margin: 20px 0;">
          <button onclick="window.blinkoRTL?.toggle()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
            Toggle RTL Support
          </button>
        </div>
        <div style="margin: 20px 0;">
          <h3>Test RTL Detection</h3>
          <textarea id="rtl-test-input" placeholder="Enter text to test..." style="width: 100%; height: 80px; padding: 10px; border: 1px solid #ccc; border-radius: 4px;"></textarea>
          <button onclick="
            const text = document.getElementById('rtl-test-input').value;
            const result = window.blinkoRTL?.test(text);
            alert('Text is ' + (result ? 'RTL' : 'LTR'));
          " style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 10px;">
            Test
          </button>
          <div style="margin-top: 10px; font-size: 14px; color: #666;">
            <strong>Examples:</strong><br/>
            Hebrew: שלום עולם<br/>
            Arabic: مرحبا بالعالم<br/>
            English: Hello world
          </div>
        </div>
      </div>
    `;
    return container;
  }

  async init() {
    this.initI18n();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeRTLPlugin);
    } else {
      initializeRTLPlugin();
    }

    window.Blinko.addToolBarIcon({
      name: "rtl-support",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",
      placement: 'top',
      tooltip: 'RTL Support Settings',
      content: () => this.renderSettingPanel()
    });
  }

  initI18n() {
    window.Blinko.i18n.addResourceBundle('en', 'translation', en);
    window.Blinko.i18n.addResourceBundle('zh', 'translation', zh);
    window.Blinko.i18n.addResourceBundle('he', 'translation', he);
    window.Blinko.i18n.addResourceBundle('ar', 'translation', ar);
  }

  destroy() {
    disableRTL();
    removeToggleButton();
    styler.destroy();
    console.log('RTL Plugin destroyed');
  }
}