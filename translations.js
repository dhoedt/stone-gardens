const LANGUAGE_STORAGE_KEY = 'stonegardens-language';
const DEFAULT_LANGUAGE = 'en';

let currentLanguage = DEFAULT_LANGUAGE;
let translations = {};

// Load translations from JSON files
async function loadTranslations() {
    try {
        const langResponse = await fetch(`translations/${currentLanguage}.json`);
        translations = await langResponse.json();
        applyTranslations();
    } catch (error) {
        applyTranslations();
    }
}

// Apply translations to DOM elements with data-i18n attribute
function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = getNestedTranslation(key);
        if (text) {
            element.textContent = text;
        }
    });

    // Update aria-labels for buttons
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    if (prevBtn) {
        prevBtn.setAttribute('aria-label', getNestedTranslation('creations.prevButton'));
    }
    if (nextBtn) {
        nextBtn.setAttribute('aria-label', getNestedTranslation('creations.nextButton'));
    }

    // Update document lang attribute
    document.documentElement.lang = currentLanguage;

    // Update active language button
    updateLanguageButtonStates();
}

// Get nested translation value using dot notation
function getNestedTranslation(key) {
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
        value = value[k];
        if (value === undefined) return null;
    }
    return value;
}

// Update language button states
function updateLanguageButtonStates() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Change language
async function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    await loadTranslations();
}

// Initialize language on page load
function initializeLanguage() {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && ['en', 'fr'].includes(savedLanguage)) {
        currentLanguage = savedLanguage;
    }
}

// Set up language button listeners
function setupLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const lang = btn.getAttribute('data-lang');
            await changeLanguage(lang);
        });
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function () {
    initializeLanguage();
    loadTranslations();
    setupLanguageButtons();
});
