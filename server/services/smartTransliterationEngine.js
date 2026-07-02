// // ============================================
// // PRODUCTION SMART TRANSLITERATION ENGINE
// // Hybrid: Corpus (10K) + Rules + Frequency + Morphology
// // ============================================

// import corpusLoader from './corpusLoader.js';
// import vowelEngine from './vowelEngine.js';
// import zauqRules from './zauqRules.js';  // Changed from zauqRules
// import frequencyRanker from './frequencyRanker.js';
// import NodeCache from 'node-cache';

// class SmartTransliterationEngine {
//   constructor() {
//     this.cache = new NodeCache({ stdTTL: 3600 }); // 1 hour cache
//     this.stats = {
//       cacheHits: 0,
//       cacheMisses: 0,
//       totalRequests: 0
//     };
//   }
  
//   // ============================================
//   // Initialize engine (load all data)
//   // ============================================
//   async initialize() {
//     await corpusLoader.loadAll();
//     console.log('🚀 SmartTransliterationEngine initialized');
//     console.log('📊 Corpus stats:', corpusLoader.getStats());
//   }
  
//   // ============================================
//   // MAIN TRANSLITERATION FUNCTION
//   // ============================================
//   async smartTransliterate(text, options = {}) {
//     const startTime = Date.now();
//     this.stats.totalRequests++;
    
//     if (!text || text.trim().length === 0) {
//       return {
//         success: false,
//         error: 'No text provided',
//         transliteration: ''
//       };
//     }
    
//     // Check cache
//     const cacheKey = `${text}_${JSON.stringify(options)}`;
//     const cached = this.cache.get(cacheKey);
//     if (cached) {
//       this.stats.cacheHits++;
//       return { ...cached, fromCache: true };
//     }
//     this.stats.cacheMisses++;
    
//     console.log('🔄 Smart Transliteration Engine (Production)');
//     console.log(`📝 Input length: ${text.length} chars`);
    
//     // Step 1: Detect context
//     const context = zauqRules.detectContext(text);
//     console.log('📌 Context:', context);
    
//     // Step 2: Tokenize and process
//     const tokens = this.tokenize(text);
//     const processedTokens = [];
    
//     for (const token of tokens) {
//       if (token.type === 'word') {
//         const result = await this.processWord(token.value, context);
//         processedTokens.push(result);
//       } else {
//         processedTokens.push(token.value);
//       }
//     }
    
//     // Step 3: Join and apply rules
//     let result = processedTokens.join('');
//     result = zauqRules.applyAllRules(result, context);
    
//     // Step 4: Clean and format
//     result = this.cleanup(result);
    
//     const duration = Date.now() - startTime;
//     const output = {
//       success: true,
//       transliteration: result,
//       method: 'production-hybrid',
//       context,
//       stats: {
//         originalLength: text.length,
//         resultLength: result.length,
//         durationMs: duration,
//         wordCount: tokens.filter(t => t.type === 'word').length,
//         cacheHit: false
//       }
//     };
    
//     // Cache result
//     this.cache.set(cacheKey, output);
    
//     console.log(`✅ Complete in ${duration}ms`);
//     return output;
//   }
  
//   // ============================================
//   // Process individual word
//   // ============================================
//   async processWord(word, context) {
//     // Step 1: Check corpus
//     const corpusMatch = corpusLoader.getWordWithRank(word);
//     if (corpusMatch) {
//       return corpusMatch.roman;
//     }
    
//     // Step 2: Use vowel inference engine
//     const vowelResult = vowelEngine.inferVowels(word);
//     if (vowelResult) {
//       return vowelResult;
//     }
    
//     // Step 3: Fallback to character mapping
//     return this.fallbackTransliterate(word);
//   }
  
//   // ============================================
//   // Fallback transliteration (character-based)
//   // ============================================
//   fallbackTransliterate(word) {
//     const charMap = {
//       'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
//       'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
//       'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
//       'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
//       'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g',
//       'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h',
//       'ھ': 'h', 'ی': 'y', 'ے': 'e'
//     };
    
//     let result = '';
//     for (let char of word) {
//       result += charMap[char] || char;
//     }
    
//     return result;
//   }
  
//   // ============================================
//   // Tokenization with punctuation
//   // ============================================
//   tokenize(text) {
//     const tokens = [];
//     let currentWord = '';
    
//     for (let i = 0; i < text.length; i++) {
//       const char = text[i];
//       const isSpace = /\s/.test(char);
//       const isPunctuation = /[,.;:!?۔॥،؟]/.test(char);
      
//       if (isSpace || isPunctuation) {
//         if (currentWord) {
//           tokens.push({ type: 'word', value: currentWord });
//           currentWord = '';
//         }
//         tokens.push({ type: 'separator', value: char });
//       } else {
//         currentWord += char;
//       }
//     }
    
//     if (currentWord) {
//       tokens.push({ type: 'word', value: currentWord });
//     }
    
//     return tokens;
//   }
  
//   // ============================================
//   // Cleanup and formatting
//   // ============================================
//   cleanup(text) {
//     let result = text;
    
//     // Fix spacing
//     result = result.replace(/\s+/g, ' ');
//     result = result.replace(/\s+([,.;:!?])/g, '$1');
//     result = result.trim();
    
//     // Capitalize sentences
//     result = result.replace(/(^|\.\s+|\n)([a-z])/g, (match, p1, p2) => {
//       return p1 + p2.toUpperCase();
//     });
    
//     // Handle poetry line breaks
//     result = result.replace(/\n/g, '\n');
    
//     return result;
//   }
  
//   // ============================================
//   // Batch transliteration
//   // ============================================
//   async batchTransliterate(texts, options = {}, onProgress = null) {
//     const results = [];
//     const total = texts.length;
    
//     for (let i = 0; i < total; i++) {
//       const result = await this.smartTransliterate(texts[i], options);
//       results.push(result);
      
//       if (onProgress) {
//         onProgress(i + 1, total);
//       }
//     }
    
//     return results;
//   }
  
//   // ============================================
//   // Get engine statistics
//   // ============================================
//   getStats() {
//     return {
//       cache: {
//         hits: this.stats.cacheHits,
//         misses: this.stats.cacheMisses,
//         hitRate: (this.stats.cacheHits / this.stats.totalRequests * 100).toFixed(1) + '%',
//         size: this.cache.keys().length
//       },
//       corpus: corpusLoader.getStats(),
//       rules: zauqRules.explainRules(),
//       totalRequests: this.stats.totalRequests
//     };
//   }
  
//   // ============================================
//   // Clear cache
//   // ============================================
//   clearCache() {
//     this.cache.flushAll();
//     console.log('🧹 Cache cleared');
//   }
// }

// // Create singleton instance
// const engine = new SmartTransliterationEngine();

// // Auto-initialize
// engine.initialize().catch(console.error);

// export default engine;





















// // ============================================
// // SMART TRANSLITERATION ENGINE
// // ============================================

// import corpusLoader from './corpusLoader.js';
// import vowelEngine from './vowelEngine.js';
// import zauqRules from './zauqRules.js';
// import NodeCache from 'node-cache';

// class SmartTransliterationEngine {
//   constructor() {
//     this.cache = new NodeCache({ stdTTL: 3600 });
//     this.stats = {
//       cacheHits: 0,
//       cacheMisses: 0,
//       totalRequests: 0
//     };
//   }
  
//   async initialize() {
//     await corpusLoader.loadAll();
//     console.log('🚀 SmartTransliterationEngine initialized');
//   }
  
//   // ============================================
//   // MAIN TRANSLITERATION FUNCTION
//   // ============================================
//   async smartTransliterate(text, options = {}) {
//     const startTime = Date.now();
//     this.stats.totalRequests++;
    
//     if (!text || text.trim().length === 0) {
//       return {
//         success: false,
//         error: 'No text provided',
//         transliteration: ''
//       };
//     }
    
//     // Check cache
//     const cacheKey = `${text}_${JSON.stringify(options)}`;
//     const cached = this.cache.get(cacheKey);
//     if (cached) {
//       this.stats.cacheHits++;
//       return { ...cached, fromCache: true };
//     }
//     this.stats.cacheMisses++;
    
//     console.log('🔄 Smart Transliteration Engine');
    
//     // Step 1: Detect context
//     const context = zauqRules.detectContext(text);
    
//     // Step 2: Process the text
//     let result = await this.processText(text, context);
    
//     // Step 3: Apply Zauq rules
//     result = zauqRules.applyAllRules(result, context);
    
//     // Step 4: Clean up
//     result = this.cleanup(result);
    
//     const duration = Date.now() - startTime;
//     const output = {
//       success: true,
//       transliteration: result,
//       method: 'smart-engine',
//       stats: {
//         originalLength: text.length,
//         resultLength: result.length,
//         durationMs: duration
//       }
//     };
    
//     this.cache.set(cacheKey, output);
//     console.log(`✅ Complete in ${duration}ms`);
//     return output;
//   }
  
//   // ============================================
//   // Process text - Returns STRING
//   // ============================================
//   async processText(text, context) {
//     // Split into words
//     const words = text.split(/(\s+)/);
//     const processed = [];
    
//     for (let i = 0; i < words.length; i++) {
//       const word = words[i];
      
//       // Skip whitespace
//       if (word.trim().length === 0 || /^\s+$/.test(word)) {
//         processed.push(word);
//         continue;
//       }
      
//       // Process the word - MUST return STRING
//       const transliterated = await this.processWord(word, context);
//       processed.push(transliterated);
//     }
    
//     return processed.join(''); // Returns STRING
//   }
  
//   // ============================================
//   // Process single word - Returns STRING
//   // ============================================
//   async processWord(word, context) {
//     // Step 1: Check corpus
//     const corpusMatch = corpusLoader.getWordWithRank(word);
//     if (corpusMatch && corpusMatch.roman) {
//       return corpusMatch.roman; // Returns STRING
//     }
    
//     // Step 2: Use vowel inference
//     const vowelResult = vowelEngine.inferVowels(word);
//     if (vowelResult && typeof vowelResult === 'string') {
//       return vowelResult; // Returns STRING
//     }
    
//     // Step 3: Fallback to character mapping
//     return this.fallbackTransliterate(word); // Returns STRING
//   }
  
//   // ============================================
//   // Fallback transliteration - Returns STRING
//   // ============================================
//   fallbackTransliterate(word) {
//     const charMap = {
//       'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
//       'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
//       'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
//       'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
//       'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g',
//       'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h',
//       'ھ': 'h', 'ی': 'y', 'ے': 'e'
//     };
    
//     let result = '';
//     for (let char of word) {
//       result += charMap[char] || char;
//     }
//     return result;
//   }
  
//   // ============================================
//   // Cleanup - Returns STRING
//   // ============================================
//   cleanup(text) {
//     let result = text;
    
//     // Fix common issues
//     const fixes = [
//       { from: /dikhiein/gi, to: 'dekhein' },
//       { from: /dekhenge/gi, to: 'dekheinge' },
//       { from: /lazm/gi, to: 'laazim' },
//       { from: /wada/gi, to: 'waada' },
//       { from: /pyas/gi, to: 'pyaas' },
//       { from: /loh/gi, to: 'lauh' },
//       { from: /paon/gi, to: 'paaon' },
//       { from: /dhrti/gi, to: 'dharti' },
//       { from: /ahl_i/gi, to: 'ahl-e' },
//       { from: /aopr/gi, to: 'oopar' },
//       { from: /bjly/gi, to: 'bijli' },
//       { from: /koh/gi, to: 'pahaar' },
//       { from: /gran/gi, to: 'giraan' },
//       { from: /roiy/gi, to: 'reet' },
//       { from: /trh/gi, to: 'tarah' },
//       { from: /\bkh\b/gi, to: 'ke' },
//       { from: /\bhe\b/gi, to: 'hai' },
//       { from: /\bbe\b/gi, to: 'bhi' },
//       { from: /\bhm\b/gi, to: 'hum' },
//       { from: /\boh\b/gi, to: 'woh' },
//       { from: /\bih\b/gi, to: 'yeh' },
//       { from: /\bhon\b/gi, to: 'hoon' },
//       { from: /\bmen\b/gi, to: 'mein' },
//       { from: /\bhen\b/gi, to: 'hain' },
//       { from: /\bie\b/gi, to: 'ye' },
//       { from: /\bieh\b/gi, to: 'yeh' },
//       { from: /dhr dhr dhr/gi, to: 'dharak dharak dharak' },
//       { from: /kr kr kr/gi, to: 'karak karak karak' }
//     ];
    
//     for (const fix of fixes) {
//       result = result.replace(fix.from, fix.to);
//     }
    
//     // Fix spacing
//     result = result.replace(/\s+/g, ' ');
//     result = result.trim();
    
//     // Capitalize first letter of each line
//     result = result.replace(/^[a-z]/gm, match => match.toUpperCase());
    
//     return result;
//   }
  
//   getStats() {
//     return {
//       cache: {
//         hits: this.stats.cacheHits,
//         misses: this.stats.cacheMisses,
//         size: this.cache.keys().length
//       },
//       totalRequests: this.stats.totalRequests
//     };
//   }
  
//   clearCache() {
//     this.cache.flushAll();
//     console.log('🧹 Cache cleared');
//   }
// }

// const engine = new SmartTransliterationEngine();
// engine.initialize().catch(console.error);
// export default engine;
























// // ============================================
// // SMART TRANSLITERATION ENGINE - With Marsiya Support
// // ============================================

// import corpusLoader from './corpusLoader.js';
// import vowelEngine from './vowelEngine.js';
// import zauqRules from './zauqRules.js';
// import NodeCache from 'node-cache';

// class SmartTransliterationEngine {
//   constructor() {
//     this.cache = new NodeCache({ stdTTL: 3600 });
//     this.stats = {
//       cacheHits: 0,
//       cacheMisses: 0,
//       totalRequests: 0
//     };
//   }
  
//   async initialize() {
//     await corpusLoader.loadAll();
//     console.log('🚀 SmartTransliterationEngine initialized');
//     console.log('📊 Corpus stats:', corpusLoader.getStats());
    
//     // Log Marsiya words count
//     const marsiyaWords = corpusLoader.getAllMarsiyaWords();
//     console.log(`📖 Marsiya corpus loaded: ${Object.keys(marsiyaWords).length} words`);
//   }
  
//   async smartTransliterate(text, options = {}) {
//     const startTime = Date.now();
//     this.stats.totalRequests++;
    
//     if (!text || text.trim().length === 0) {
//       return { success: false, error: 'No text provided', transliteration: '' };
//     }
    
//     const cacheKey = `${text}_${JSON.stringify(options)}`;
//     const cached = this.cache.get(cacheKey);
//     if (cached) {
//       this.stats.cacheHits++;
//       return { ...cached, fromCache: true };
//     }
//     this.stats.cacheMisses++;
    
//     console.log('🔄 Transliterating Urdu text...');
    
//     // Detect if this is Marsiya text
//     const isMarsiya = this.isMarsiyaText(text);
//     console.log(`📌 Context: ${isMarsiya ? 'Marsiya/Noha' : 'General Poetry'}`);
    
//     // Process the text with context
//     let result = await this.processText(text, { isMarsiya });
    
//     // Clean up
//     result = this.cleanup(result);
    
//     const duration = Date.now() - startTime;
//     const output = {
//       success: true,
//       transliteration: result,
//       method: 'smart-engine',
//       context: { isMarsiya },
//       stats: {
//         originalLength: text.length,
//         resultLength: result.length,
//         durationMs: duration
//       }
//     };
    
//     this.cache.set(cacheKey, output);
//     console.log(`✅ Done in ${duration}ms`);
//     return output;
//   }
  
//   // ============================================
//   // Detect Marsiya text
//   // ============================================
//   isMarsiyaText(text) {
//     const marsiyaKeywords = ['کربلا', 'حسین', 'عباس', 'زینب', 'شہید', 'پیاس', 'خون', 'نوحہ', 'مرثیہ'];
//     let count = 0;
//     for (const keyword of marsiyaKeywords) {
//       if (text.includes(keyword)) count++;
//       if (count >= 2) return true;
//     }
//     return false;
//   }
  
//   async processText(text, context = {}) {
//     const words = text.split(/(\s+)/);
//     const processed = [];
    
//     for (const word of words) {
//       if (word.trim().length === 0 || /^\s+$/.test(word)) {
//         processed.push(word);
//         continue;
//       }
      
//       const transliterated = await this.transliterateWord(word, context);
//       processed.push(transliterated);
//     }
    
//     return processed.join('');
//   }
  
//   async transliterateWord(word, context = {}) {
//     // 1. Try corpus with context (Marsija gets priority)
//     const corpusMatch = corpusLoader.getWordWithRank(word, context);
//     if (corpusMatch && corpusMatch.roman) {
//       return corpusMatch.roman;
//     }
    
//     // 2. Try vowel engine
//     const vowelResult = vowelEngine.inferVowels(word);
//     if (vowelResult && typeof vowelResult === 'string') {
//       return vowelResult;
//     }
    
//     // 3. Fallback
//     return this.fallbackTransliterate(word);
//   }
  
//   fallbackTransliterate(word) {
//     const charMap = {
//       'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
//       'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
//       'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
//       'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
//       'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g',
//       'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h',
//       'ھ': 'h', 'ی': 'y', 'ے': 'e'
//     };
    
//     let result = '';
//     for (const char of word) {
//       result += charMap[char] || char;
//     }
//     return result;
//   }
  
//   cleanup(text) {
//     let result = text;
    
//     // Critical fixes for Marsiya and poetry
//     const fixes = [
//       { from: /dykhyn/gi, to: 'dekhein' },
//       { from: /bhy/gi, to: 'bhi' },
//       { from: /oadh/gi, to: 'waada' },
//       { from: /myn/gi, to: 'mein' },
//       { from: /lkea/gi, to: 'likha' },
//       { from: /roئy/gi, to: 'reet' },
//       { from: /jaئyn/gi, to: 'jayein' },
//       { from: /mhkomon/gi, to: 'mahkumon' },
//       { from: /paؤn/gi, to: 'paaon' },
//       { from: /dhrty/gi, to: 'dharti' },
//       { from: /dharakke/gi, to: 'dharakey' },
//       { from: /ahl_ِ/gi, to: 'ahl-e' },
//       { from: /bjli/gi, to: 'bijli' },
//       { from: /karakke/gi, to: 'karakey' },
      
//       // Fix pronouns
//       { from: /\bhm\b/gi, to: 'hum' },
//       { from: /\boh\b/gi, to: 'woh' },
//       { from: /\byh\b/gi, to: 'yeh' },
//       { from: /\bkh\b/gi, to: 'ke' },
//       { from: /\bhe\b/gi, to: 'hai' },
//       { from: /\bbe\b/gi, to: 'bhi' },
      
//       // Fix Marsiya specific
//       { from: /\bhussain\b/gi, to: 'Hussain' },
//       { from: /\babbas\b/gi, to: 'Abbas' },
//       { from: /\bzainab\b/gi, to: 'Zainab' },
//       { from: /\bkarbala\b/gi, to: 'Karbala' }
//     ];
    
//     for (const fix of fixes) {
//       result = result.replace(fix.from, fix.to);
//     }
    
//     // Fix spacing
//     result = result.replace(/\s+/g, ' ');
//     result = result.trim();
    
//     // Capitalize first letter of each line
//     result = result.replace(/^[a-z]/gm, match => match.toUpperCase());
    
//     return result;
//   }
  
//   getStats() {
//     return {
//       cache: {
//         hits: this.stats.cacheHits,
//         misses: this.stats.cacheMisses,
//         size: this.cache.keys().length
//       },
//       corpus: corpusLoader.getStats(),
//       totalRequests: this.stats.totalRequests
//     };
//   }
  
//   clearCache() {
//     this.cache.flushAll();
//     console.log('🧹 Cache cleared');
//   }
// }

// const engine = new SmartTransliterationEngine();
// engine.initialize().catch(console.error);
// export default engine;



















// ============================================
// SMART TRANSLITERATION ENGINE - PRODUCTION
// Full support for: Poetry, Marsiya, Ghazal, Nazm, Sher
// ============================================

import corpusLoader from './corpusLoader.js';
import vowelEngine from './vowelEngine.js';
import zauqRules from './zauqRules.js';
import NodeCache from 'node-cache';

class SmartTransliterationEngine {
  constructor() {
    this.cache = new NodeCache({ stdTTL: 3600 });
    this.stats = {
      cacheHits: 0,
      cacheMisses: 0,
      totalRequests: 0
    };
  }
  
  async initialize() {
    await corpusLoader.loadAll();
    console.log('🚀 SmartTransliterationEngine initialized');
    console.log('📊 Corpus stats:', corpusLoader.getStats());
    
    // Log corpus breakdown
    const marsiyaWords = corpusLoader.getAllMarsiyaWords();
    const poetryWords = corpusLoader.getAllPoetryWords();
    console.log(`📖 Marsiya corpus: ${marsiyaWords.length} words`);
    console.log(`📖 Poetry corpus: ${poetryWords.length} words`);
  }
  
  // ============================================
  // MAIN TRANSLITERATION FUNCTION
  // ============================================
  async smartTransliterate(text, options = {}) {
    const startTime = Date.now();
    this.stats.totalRequests++;
    
    if (!text || text.trim().length === 0) {
      return {
        success: false,
        error: 'No text provided',
        transliteration: ''
      };
    }
    
    // Check cache
    const cacheKey = `${text}_${JSON.stringify(options)}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      this.stats.cacheHits++;
      return { ...cached, fromCache: true };
    }
    this.stats.cacheMisses++;
    
    console.log('🔄 Transliterating Urdu text...');
    console.log(`📝 Input: ${text.substring(0, 100)}...`);
    
    // Detect literary context
    const context = this.detectLiteraryContext(text);
    console.log('📌 Context:', context);
    
    // Process the text with context
    let result = await this.processText(text, context);
    
    // Apply Zauq rules
    result = zauqRules.applyAllRules(result, context);
    
    // Clean up
    result = this.cleanup(result, context);
    
    const duration = Date.now() - startTime;
    const output = {
      success: true,
      transliteration: result,
      method: 'smart-engine',
      context: context,
      stats: {
        originalLength: text.length,
        resultLength: result.length,
        durationMs: duration,
        corpusHits: this.stats.cacheHits + this.stats.cacheMisses
      }
    };
    
    this.cache.set(cacheKey, output);
    console.log(`✅ Done in ${duration}ms`);
    console.log(`📝 Output: ${result.substring(0, 100)}...`);
    return output;
  }
  
  // ============================================
  // Detect literary context (Poetry, Marsiya, Ghazal, Nazm, Sher)
  // ============================================
  detectLiteraryContext(text) {
    const context = {
      isPoetry: false,
      isMarsiya: false,
      isGhazal: false,
      isNazm: false,
      isSher: false,
      isHamd: false,
      isNaat: false,
      confidence: 0,
      detectedPoet: null
    };
    
    // Marsiya keywords (Karbala specific)
    const marsiyaKeywords = ['کربلا', 'حسین', 'عباس', 'زینب', 'سکینہ', 'امام', 'شہید', 'پیاس', 'خون', 'نوحہ', 'مرثیہ', 'علم', 'خیام', 'فرات'];
    let marsiyaCount = 0;
    for (const keyword of marsiyaKeywords) {
      if (text.includes(keyword)) {
        marsiyaCount++;
        context.confidence += 10;
      }
    }
    context.isMarsiya = marsiyaCount >= 2;
    
    // Ghazal keywords
    const ghazalKeywords = ['غزل', 'شعر', 'مطلع', 'مقطع', 'قافیہ', 'ردیف', 'بحر', 'وزن'];
    let ghazalCount = 0;
    for (const keyword of ghazalKeywords) {
      if (text.includes(keyword)) {
        ghazalCount++;
        context.confidence += 8;
      }
    }
    context.isGhazal = ghazalCount >= 2;
    
    // Sher (couplet) indicators
    if (text.includes('شعر') || (text.split('\n').length === 2 && text.length < 500)) {
      context.isSher = true;
      context.confidence += 15;
    }
    
    // Nazm indicators
    const nazmKeywords = ['نظم', 'ترنم', 'تال', 'لے'];
    for (const keyword of nazmKeywords) {
      if (text.includes(keyword)) {
        context.isNazm = true;
        context.confidence += 5;
      }
    }
    
    // Hamd/Naat indicators
    const religiousKeywords = ['اللہ', 'خدا', 'رب', 'محمد', 'رسول', 'حمد', 'نعت'];
    for (const keyword of religiousKeywords) {
      if (text.includes(keyword)) {
        if (keyword === 'حمد') context.isHamd = true;
        if (keyword === 'نعت') context.isNaat = true;
        context.confidence += 10;
      }
    }
    
    // General poetry (if enough poetic words)
    const poetryWords = ['دل', 'عشق', 'غم', 'محبت', 'اشک', 'نالہ', 'فریاد'];
    let poetryCount = 0;
    for (const word of poetryWords) {
      if (text.includes(word)) poetryCount++;
    }
    context.isPoetry = poetryCount >= 2 || context.isGhazal || context.isMarsiya;
    
    // Detect poet style
    if (text.includes('غالب') || text.includes('Ghalib')) context.detectedPoet = 'ghalib';
    else if (text.includes('اقبال') || text.includes('Iqbal')) context.detectedPoet = 'iqbal';
    else if (text.includes('فیض') || text.includes('Faiz')) context.detectedPoet = 'faiz';
    else if (text.includes('انیس') || text.includes('Anis')) context.detectedPoet = 'anis';
    else if (text.includes('دبیر') || text.includes('Dabir')) context.detectedPoet = 'dabir';
    else if (text.includes('میر') || text.includes('Mir')) context.detectedPoet = 'mir';
    
    context.confidence = Math.min(context.confidence, 100);
    return context;
  }
  
  // ============================================
  // Process text with context awareness
  // ============================================
  async processText(text, context) {
    const words = text.split(/(\s+)/);
    const processed = [];
    
    for (const word of words) {
      if (word.trim().length === 0 || /^\s+$/.test(word)) {
        processed.push(word);
        continue;
      }
      
      const transliterated = await this.transliterateWord(word, context);
      processed.push(transliterated);
    }
    
    return processed.join('');
  }
  
  // ============================================
  // Transliterate single word with context priority
  // ============================================
  async transliterateWord(word, context) {
    // 1. Check corpus with context priority
    const corpusMatch = corpusLoader.getWordWithRank(word);
    if (corpusMatch && corpusMatch.roman) {
      // If Marsiya context, ensure proper capitalization
      if (context.isMarsiya && corpusMatch.source === 'marsiya') {
        const roman = corpusMatch.roman;
        // Capitalize names in Marsiya
        if (['Hussain', 'Abbas', 'Zainab', 'Sakina', 'Karbala', 'Shimr', 'Yazeed'].includes(roman)) {
          return roman;
        }
      }
      return corpusMatch.roman;
    }
    
    // 2. Try vowel engine
    const vowelResult = vowelEngine.inferVowels(word);
    if (vowelResult && typeof vowelResult === 'string') {
      return vowelResult;
    }
    
    // 3. Fallback to character mapping
    return this.fallbackTransliterate(word);
  }
  
  // ============================================
  // Fallback transliteration (character-based)
  // ============================================
  fallbackTransliterate(word) {
    const charMap = {
      'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
      'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
      'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
      'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
      'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g',
      'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h',
      'ھ': 'h', 'ی': 'y', 'ے': 'e', 'ء': '', 'ؤ': 'o', 'ئ': 'y'
    };
    
    let result = '';
    for (const char of word) {
      result += charMap[char] || char;
    }
    return result;
  }
  
  // ============================================
  // Cleanup and formatting with context awareness
  // ============================================
  cleanup(text, context = {}) {
    let result = text;
    
    // Common fixes for all text
    const commonFixes = [
      { from: /dykhyn/gi, to: 'dekhein' },
      { from: /dykhein/gi, to: 'dekhein' },
      { from: /bhy/gi, to: 'bhi' },
      { from: /oadh/gi, to: 'waada' },
      { from: /myn/gi, to: 'mein' },
      { from: /lkea/gi, to: 'likha' },
      { from: /roئy/gi, to: 'reet' },
      { from: /jaئyn/gi, to: 'jayein' },
      { from: /mhkomon/gi, to: 'mahkumon' },
      { from: /paؤn/gi, to: 'paaon' },
      { from: /dhrty/gi, to: 'dharti' },
      { from: /dharakke/gi, to: 'dharakey' },
      { from: /ahl_ِ/gi, to: 'ahl-e' },
      { from: /bjli/gi, to: 'bijli' },
      { from: /karakke/gi, to: 'karakey' },
      { from: /\bhm\b/gi, to: 'hum' },
      { from: /\boh\b/gi, to: 'woh' },
      { from: /\byh\b/gi, to: 'yeh' },
      { from: /\bkh\b/gi, to: 'ke' },
      { from: /\bhe\b/gi, to: 'hai' },
      { from: /\bbe\b/gi, to: 'bhi' },
      { from: /\bap\b/gi, to: 'aap' },
      { from: /\bhon\b/gi, to: 'hoon' },
      { from: /\bmen\b/gi, to: 'mein' },
      { from: /\bhen\b/gi, to: 'hain' },
      { from: /\bie\b/gi, to: 'ye' },
      { from: /\bieh\b/gi, to: 'yeh' },
      { from: /dhr dhr dhr/gi, to: 'dharak dharak dharak' },
      { from: /kr kr kr/gi, to: 'karak karak karak' }
    ];
    
    // Marsiya-specific fixes
    const marsiyaFixes = [
      { from: /hussain/gi, to: 'Hussain' },
      { from: /abbas/gi, to: 'Abbas' },
      { from: /zainab/gi, to: 'Zainab' },
      { from: /sakina/gi, to: 'Sakina' },
      { from: /karbala/gi, to: 'Karbala' },
      { from: /shimr/gi, to: 'Shimr' },
      { from: /yazeed/gi, to: 'Yazeed' },
      { from: /alamdar/gi, to: 'Alamdar' },
      { from: /ghazi/gi, to: 'Ghazi' }
    ];
    
    // Ghazal-specific fixes
    const ghazalFixes = [
      { from: /ghazal/gi, to: 'Ghazal' },
      { from: /sher/gi, to: 'Sher' },
      { from: /matla/gi, to: 'Matla' },
      { from: /maqta/gi, to: 'Maqta' }
    ];
    
    // Apply common fixes
    for (const fix of commonFixes) {
      result = result.replace(fix.from, fix.to);
    }
    
    // Apply context-specific fixes
    if (context.isMarsiya) {
      for (const fix of marsiyaFixes) {
        result = result.replace(fix.from, fix.to);
      }
    }
    
    if (context.isGhazal) {
      for (const fix of ghazalFixes) {
        result = result.replace(fix.from, fix.to);
      }
    }
    
    // Fix spacing
    result = result.replace(/\s+/g, ' ');
    result = result.trim();
    
    // Handle izafat
    result = result.replace(/\s+-/g, '-');
    result = result.replace(/-\s+/g, '-');
    
    // Capitalize first letter of each line (poetry style)
    result = result.replace(/^[a-z]/gm, match => match.toUpperCase());
    
    // Capitalize after line breaks
    result = result.replace(/\n([a-z])/g, (match, p1) => '\n' + p1.toUpperCase());
    
    return result;
  }
  
  // ============================================
  // Batch transliteration
  // ============================================
  async batchTransliterate(texts, options = {}, onProgress = null) {
    const results = [];
    const total = texts.length;
    
    for (let i = 0; i < total; i++) {
      const result = await this.smartTransliterate(texts[i], options);
      results.push(result);
      
      if (onProgress) {
        onProgress(i + 1, total);
      }
    }
    
    return results;
  }
  
  // ============================================
  // Get engine statistics
  // ============================================
  getStats() {
    return {
      cache: {
        hits: this.stats.cacheHits,
        misses: this.stats.cacheMisses,
        hitRate: (this.stats.cacheHits / (this.stats.totalRequests || 1) * 100).toFixed(1) + '%',
        size: this.cache.keys().length
      },
      corpus: corpusLoader.getStats(),
      totalRequests: this.stats.totalRequests
    };
  }
  
  // ============================================
  // Clear cache
  // ============================================
  clearCache() {
    this.cache.flushAll();
    console.log('🧹 Cache cleared');
  }
  
  // ============================================
  // Add custom word to corpus
  // ============================================
  async addCustomWord(urduWord, roman, category = 'custom', frequency = 100) {
    return await corpusLoader.addWord(urduWord, roman, category, frequency);
  }
}

// Create singleton instance
const engine = new SmartTransliterationEngine();

// Auto-initialize
engine.initialize().catch(console.error);

export default engine;