// // ============================================
// // CORPUS LOADER - Lazy loading with caching
// // 10,000+ words loaded efficiently
// // ============================================

// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// class CorpusLoader {
//   constructor() {
//     this.corpora = {
//       core: null,
//       poetry: null,
//       marsiya: null,
//       modern: null
//     };
//     this.frequency = null;
//     this.phrases = null;
//     this.isLoaded = false;
//   }
  
//   // ============================================
//   // Lazy load corpus (only when needed)
//   // ============================================
//   async loadCorpus(type = 'core') {
//     if (this.corpora[type] && this.corpora[type].words) {
//       return this.corpora[type];
//     }
    
//     const filePath = path.join(__dirname, `../data/corpora/${type}.json`);
    
//     try {
//       const data = await fs.promises.readFile(filePath, 'utf8');
//       this.corpora[type] = JSON.parse(data);
//       console.log(`✅ Loaded ${type} corpus: ${Object.keys(this.corpora[type].words).length} words`);
//       return this.corpora[type];
//     } catch (error) {
//       console.error(`Failed to load ${type} corpus:`, error);
//       return { words: {} };
//     }
//   }
  
//   // ============================================
//   // Load frequency data
//   // ============================================
//   async loadFrequency() {
//     if (this.frequency) return this.frequency;
    
//     const filePath = path.join(__dirname, '../data/frequency/wordFreq.json');
    
//     try {
//       const data = await fs.promises.readFile(filePath, 'utf8');
//       this.frequency = JSON.parse(data);
//       console.log(`✅ Loaded frequency data: ${Object.keys(this.frequency).length} entries`);
//       return this.frequency;
//     } catch (error) {
//       console.error('Failed to load frequency:', error);
//       return {};
//     }
//   }
  
//   // ============================================
//   // Load all corpora (async)
//   // ============================================
//   async loadAll() {
//     if (this.isLoaded) return;
    
//     await Promise.all([
//       this.loadCorpus('core'),
//       this.loadCorpus('poetry'),
//       this.loadCorpus('marsiya'),
//       this.loadCorpus('modern'),
//       this.loadFrequency()
//     ]);
    
//     this.isLoaded = true;
//     console.log('✅ All corpora loaded successfully');
//   }
  
//   // ============================================
//   // Search across all corpora
//   // ============================================
//   searchWord(urduWord) {
//     const results = [];
    
//     for (const [type, corpus] of Object.entries(this.corpora)) {
//       if (corpus && corpus.words && corpus.words[urduWord]) {
//         results.push({
//           source: type,
//           data: corpus.words[urduWord]
//         });
//       }
//     }
    
//     return results;
//   }
  
//   // ============================================
//   // Get word with frequency ranking
//   // ============================================
//   getWordWithRank(urduWord) {
//     const matches = this.searchWord(urduWord);
    
//     if (matches.length === 0) return null;
    
//     // Get frequency (default to 0)
//     const freq = this.frequency ? this.frequency[urduWord] || 0 : 0;
    
//     // Return highest frequency match
//     const bestMatch = matches.reduce((best, current) => {
//       const bestFreq = this.frequency ? this.frequency[best.data.roman] || 0 : 0;
//       const currentFreq = this.frequency ? this.frequency[current.data.roman] || 0 : 0;
//       return currentFreq > bestFreq ? current : best;
//     }, matches[0]);
    
//     return {
//       ...bestMatch.data,
//       frequency: freq,
//       rank: this.getFrequencyRank(freq)
//     };
//   }
  
//   // ============================================
//   // Get frequency rank
//   // ============================================
//   getFrequencyRank(freq) {
//     if (freq > 900) return 'very_high';
//     if (freq > 700) return 'high';
//     if (freq > 500) return 'medium';
//     if (freq > 300) return 'low';
//     return 'very_low';
//   }
  
//   // ============================================
//   // Add word to corpus (dynamic)
//   // ============================================
//   async addWord(urduWord, roman, category = 'modern', frequency = 1) {
//     // Ensure corpus is loaded
//     await this.loadCorpus(category);
    
//     if (!this.corpora[category].words[urduWord]) {
//       this.corpora[category].words[urduWord] = {
//         roman,
//         frequency,
//         category: [category],
//         variants: []
//       };
      
//       console.log(`📚 Added word: ${urduWord} → ${roman} (${category})`);
//       return true;
//     }
    
//     return false;
//   }
  
//   // ============================================
//   // Get corpus statistics
//   // ============================================
//   getStats() {
//     const stats = {};
    
//     for (const [type, corpus] of Object.entries(this.corpora)) {
//       if (corpus && corpus.words) {
//         stats[type] = Object.keys(corpus.words).length;
//       }
//     }
    
//     return stats;
//   }
// }

// export default new CorpusLoader();



















// // ============================================
// // CORPUS LOADER - Lazy loading with caching
// // 10,000+ words loaded efficiently
// // ============================================

// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// class CorpusLoader {
//   constructor() {
//     this.corpora = {
//       core: null,
//       poetry: null,
//       marsiya: null,
//       modern: null
//     };
//     this.frequency = null;
//     this.phrases = null;
//     this.isLoaded = false;
//   }
  
//   // ============================================
//   // Lazy load corpus (only when needed)
//   // ============================================
//   async loadCorpus(type = 'core') {
//     if (this.corpora[type] && this.corpora[type].words) {
//       return this.corpora[type];
//     }
    
//     const filePath = path.join(__dirname, `../data/corpora/${type}.json`);
    
//     try {
//       // Check if file exists
//       if (!fs.existsSync(filePath)) {
//         console.log(`⚠️ Corpus file not found: ${filePath}, using default`);
//         return { words: {} };
//       }
      
//       const data = await fs.promises.readFile(filePath, 'utf8');
//       this.corpora[type] = JSON.parse(data);
//       console.log(`✅ Loaded ${type} corpus: ${Object.keys(this.corpora[type].words).length} words`);
//       return this.corpora[type];
//     } catch (error) {
//       console.error(`Failed to load ${type} corpus:`, error.message);
//       return { words: {} };
//     }
//   }
  
//   // ============================================
//   // Load all corpora (async)
//   // ============================================
//   async loadAll() {
//     if (this.isLoaded) return;
    
//     await Promise.all([
//       this.loadCorpus('core'),
//       this.loadCorpus('poetry'),
//       this.loadCorpus('marsiya'),
//       this.loadCorpus('modern')
//     ]);
    
//     this.isLoaded = true;
//     console.log('✅ All corpora loaded successfully');
//   }
  
//   // ============================================
//   // Search across all corpora
//   // ============================================
//   getWordWithRank(urduWord) {
//     for (const [type, corpus] of Object.entries(this.corpora)) {
//       if (corpus && corpus.words && corpus.words[urduWord]) {
//         const wordData = corpus.words[urduWord];
//         return {
//           roman: wordData.roman,
//           frequency: wordData.frequency || 500,
//           category: wordData.category || ['unknown'],
//           source: type
//         };
//       }
//     }
//     return null;
//   }
  
//   // ============================================
//   // Direct word lookup
//   // ============================================
//   lookupWord(urduWord) {
//     return this.getWordWithRank(urduWord);
//   }
  
//   // ============================================
//   // Get corpus statistics
//   // ============================================
//   getStats() {
//     const stats = {};
//     for (const [type, corpus] of Object.entries(this.corpora)) {
//       if (corpus && corpus.words) {
//         stats[type] = Object.keys(corpus.words).length;
//       } else {
//         stats[type] = 0;
//       }
//     }
//     return stats;
//   }
  
//   // ============================================
//   // Add word to corpus (dynamic)
//   // ============================================
//   async addWord(urduWord, roman, category = 'modern', frequency = 1) {
//     await this.loadCorpus('modern');
    
//     if (!this.corpora.modern.words[urduWord]) {
//       this.corpora.modern.words[urduWord] = {
//         roman,
//         frequency,
//         category: [category],
//         variants: []
//       };
//       console.log(`📚 Added word: ${urduWord} → ${roman} (${category})`);
//       return true;
//     }
//     return false;
//   }
// }

// export default new CorpusLoader();



















// ============================================
// CORPUS LOADER - Lazy loading with caching
// 10,000+ words loaded efficiently
// Full support for Poetry, Marsiya, Ghazal, Nazm
// ============================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class CorpusLoader {
  constructor() {
    this.corpora = {
      core: null,
      poetry: null,
      marsiya: null,
      ghazal: null,
      nazm: null,
      modern: null,
      religious: null
    };
    this.frequency = null;
    this.phrases = null;
    this.isLoaded = false;
    
    // Built-in poetry words (fallback if JSON files don't exist)
    this.builtInPoetryWords = this.getBuiltInPoetryWords();
    this.builtInMarsiyaWords = this.getBuiltInMarsiyaWords();
    this.builtInGhazalWords = this.getBuiltInGhazalWords();
  }
  
  // ============================================
  // Built-in Poetry Words (Fallback)
  // ============================================
  getBuiltInPoetryWords() {
    return {
      // Common poetry words
      'دل': { roman: 'dil', frequency: 1000, category: ['poetry', 'common'] },
      'درد': { roman: 'dard', frequency: 900, category: ['poetry', 'emotion'] },
      'غم': { roman: 'gham', frequency: 850, category: ['poetry', 'emotion'] },
      'خوشی': { roman: 'khushi', frequency: 800, category: ['poetry', 'emotion'] },
      'عشق': { roman: 'ishq', frequency: 950, category: ['poetry', 'love'] },
      'محبت': { roman: 'mohabbat', frequency: 900, category: ['poetry', 'love'] },
      'وفا': { roman: 'wafa', frequency: 750, category: ['poetry', 'love'] },
      'جفا': { roman: 'jafa', frequency: 700, category: ['poetry', 'love'] },
      'سچ': { roman: 'sach', frequency: 800, category: ['poetry', 'truth'] },
      'جھوٹ': { roman: 'jhooth', frequency: 600, category: ['poetry', 'truth'] },
      'زندگی': { roman: 'zindagi', frequency: 950, category: ['poetry', 'life'] },
      'موت': { roman: 'maut', frequency: 850, category: ['poetry', 'life'] },
      'دنیا': { roman: 'duniya', frequency: 900, category: ['poetry', 'world'] },
      'آسمان': { roman: 'aasman', frequency: 800, category: ['poetry', 'nature'] },
      'چاند': { roman: 'chaand', frequency: 850, category: ['poetry', 'nature'] },
      'سورج': { roman: 'suraj', frequency: 750, category: ['poetry', 'nature'] },
      'ستارہ': { roman: 'sitarah', frequency: 700, category: ['poetry', 'nature'] },
      'صبح': { roman: 'subah', frequency: 800, category: ['poetry', 'time'] },
      'شام': { roman: 'shaam', frequency: 800, category: ['poetry', 'time'] },
      'رات': { roman: 'raat', frequency: 850, category: ['poetry', 'time'] },
      'بہار': { roman: 'bahaar', frequency: 750, category: ['poetry', 'nature'] },
      'خزاں': { roman: 'khizan', frequency: 700, category: ['poetry', 'nature'] },
      'آنکھ': { roman: 'aankh', frequency: 850, category: ['poetry', 'body'] },
      'نظر': { roman: 'nazar', frequency: 800, category: ['poetry', 'body'] },
      'چہرہ': { roman: 'chehra', frequency: 750, category: ['poetry', 'body'] },
      'ہونٹ': { roman: 'hont', frequency: 700, category: ['poetry', 'body'] },
      'زلف': { roman: 'zulf', frequency: 650, category: ['poetry', 'body'] },
      'آہ': { roman: 'aah', frequency: 700, category: ['poetry', 'emotion'] },
      'نالہ': { roman: 'nalah', frequency: 650, category: ['poetry', 'emotion'] },
      'فریاد': { roman: 'faryaad', frequency: 600, category: ['poetry', 'emotion'] },
      'اشک': { roman: 'ashk', frequency: 700, category: ['poetry', 'emotion'] }
    };
  }
  
  // ============================================
  // Built-in Marsiya Words (Karbala specific)
  // ============================================
  getBuiltInMarsiyaWords() {
    return {
      'کربلا': { roman: 'Karbala', frequency: 900, category: ['marsiya', 'religious'] },
      'حسین': { roman: 'Hussain', frequency: 1000, category: ['marsiya', 'religious'] },
      'عباس': { roman: 'Abbas', frequency: 950, category: ['marsiya', 'religious'] },
      'زینب': { roman: 'Zainab', frequency: 900, category: ['marsiya', 'religious'] },
      'سکینہ': { roman: 'Sakina', frequency: 850, category: ['marsiya', 'religious'] },
      'امام': { roman: 'Imaam', frequency: 900, category: ['marsiya', 'religious'] },
      'شہید': { roman: 'shaheed', frequency: 850, category: ['marsiya', 'religious'] },
      'پیاس': { roman: 'pyaas', frequency: 800, category: ['marsiya', 'suffering'] },
      'خون': { roman: 'khoon', frequency: 800, category: ['marsiya', 'suffering'] },
      'صبر': { roman: 'sabr', frequency: 750, category: ['marsiya', 'virtue'] },
      'علم': { roman: 'alam', frequency: 700, category: ['marsiya', 'symbol'] },
      'خیام': { roman: 'khayam', frequency: 650, category: ['marsiya', 'place'] },
      'فرات': { roman: 'Furaat', frequency: 700, category: ['marsiya', 'river'] },
      'نہر': { roman: 'nehr', frequency: 650, category: ['marsiya', 'river'] },
      'لشکر': { roman: 'lashkar', frequency: 700, category: ['marsiya', 'army'] },
      'میدان': { roman: 'maidaan', frequency: 750, category: ['marsiya', 'place'] },
      'شمشیر': { roman: 'shamshir', frequency: 650, category: ['marsiya', 'weapon'] },
      'نیزہ': { roman: 'neezah', frequency: 600, category: ['marsiya', 'weapon'] },
      'خنجر': { roman: 'khanjar', frequency: 600, category: ['marsiya', 'weapon'] },
      'خیمہ': { roman: 'khaimah', frequency: 650, category: ['marsiya', 'place'] },
      'کارواں': { roman: 'karwaan', frequency: 600, category: ['marsiya', 'caravan'] },
      'قافلہ': { roman: 'qaflah', frequency: 600, category: ['marsiya', 'caravan'] },
      'شمر': { roman: 'Shimr', frequency: 700, category: ['marsiya', 'enemy'] },
      'یزید': { roman: 'Yazeed', frequency: 700, category: ['marsiya', 'enemy'] },
      'سجدہ': { roman: 'sajdah', frequency: 650, category: ['marsiya', 'worship'] },
      'عزاداری': { roman: 'azaadari', frequency: 600, category: ['marsiya', 'ritual'] },
      'سینہ زنی': { roman: 'seenah zani', frequency: 550, category: ['marsiya', 'ritual'] },
      'زنجیر زنی': { roman: 'zanjeer zani', frequency: 550, category: ['marsiya', 'ritual'] },
      'ماتم': { roman: 'maatam', frequency: 650, category: ['marsiya', 'ritual'] },
      'نوحہ': { roman: 'noha', frequency: 700, category: ['marsiya', 'poetry'] },
      'مرثیہ': { roman: 'marsiya', frequency: 750, category: ['marsiya', 'poetry'] },
      'غازی': { roman: 'Ghazi', frequency: 600, category: ['marsiya', 'title'] },
      'علمدار': { roman: 'Alamdar', frequency: 600, category: ['marsiya', 'title'] }
    };
  }
  
  // ============================================
  // Built-in Ghazal Words
  // ============================================
  getBuiltInGhazalWords() {
    return {
      'غزل': { roman: 'ghazal', frequency: 800, category: ['ghazal', 'poetry'] },
      'شعر': { roman: 'sher', frequency: 750, category: ['ghazal', 'poetry'] },
      'مطلع': { roman: 'matla', frequency: 650, category: ['ghazal', 'structure'] },
      'مقطع': { roman: 'maqta', frequency: 600, category: ['ghazal', 'structure'] },
      'قافیہ': { roman: 'qafiyah', frequency: 650, category: ['ghazal', 'structure'] },
      'ردیف': { roman: 'radeef', frequency: 600, category: ['ghazal', 'structure'] },
      'بحر': { roman: 'bahr', frequency: 600, category: ['ghazal', 'meter'] },
      'وزن': { roman: 'wazan', frequency: 550, category: ['ghazal', 'meter'] },
      'تشبیہ': { roman: 'tashbeeh', frequency: 550, category: ['ghazal', 'device'] },
      'استعارہ': { roman: 'isteaarah', frequency: 550, category: ['ghazal', 'device'] },
      'کنایہ': { roman: 'kinayah', frequency: 500, category: ['ghazal', 'device'] },
      'تجنیس': { roman: 'tajnees', frequency: 500, category: ['ghazal', 'device'] },
      'تضاد': { roman: 'tazaad', frequency: 500, category: ['ghazal', 'device'] }
    };
  }
  
  // ============================================
  // Lazy load corpus (only when needed)
  // ============================================
  async loadCorpus(type = 'core') {
    if (this.corpora[type] && this.corpora[type].words) {
      return this.corpora[type];
    }
    
    const filePath = path.join(__dirname, `../data/corpora/${type}.json`);
    
    try {
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️ Corpus file not found: ${filePath}, using built-in ${type} words`);
        return this.getBuiltInCorpus(type);
      }
      
      const data = await fs.promises.readFile(filePath, 'utf8');
      this.corpora[type] = JSON.parse(data);
      console.log(`✅ Loaded ${type} corpus: ${Object.keys(this.corpora[type].words).length} words`);
      return this.corpora[type];
    } catch (error) {
      console.error(`Failed to load ${type} corpus:`, error.message);
      return this.getBuiltInCorpus(type);
    }
  }
  
  // ============================================
  // Get built-in corpus by type
  // ============================================
  getBuiltInCorpus(type) {
    let words = {};
    
    switch(type) {
      case 'poetry':
        words = this.builtInPoetryWords;
        break;
      case 'marsiya':
        words = this.builtInMarsiyaWords;
        break;
      case 'ghazal':
        words = this.builtInGhazalWords;
        break;
      case 'core':
      case 'modern':
      default:
        words = {
          ...this.builtInPoetryWords,
          'ہم': { roman: 'hum', frequency: 1000, category: ['pronoun'] },
          'تم': { roman: 'tum', frequency: 950, category: ['pronoun'] },
          'آپ': { roman: 'aap', frequency: 900, category: ['pronoun'] },
          'وہ': { roman: 'woh', frequency: 950, category: ['pronoun'] },
          'یہ': { roman: 'yeh', frequency: 900, category: ['pronoun'] },
          'میں': { roman: 'mein', frequency: 1000, category: ['postposition'] },
          'ہے': { roman: 'hai', frequency: 1000, category: ['verb'] },
          'ہیں': { roman: 'hain', frequency: 950, category: ['verb'] },
          'تھا': { roman: 'tha', frequency: 900, category: ['verb'] },
          'تھی': { roman: 'thi', frequency: 850, category: ['verb'] },
          'کرنا': { roman: 'karna', frequency: 950, category: ['verb'] },
          'جانا': { roman: 'jana', frequency: 900, category: ['verb'] },
          'آنا': { roman: 'aana', frequency: 850, category: ['verb'] },
          'دیکھنا': { roman: 'dekhna', frequency: 800, category: ['verb'] }
        };
        break;
    }
    
    console.log(`📚 Using built-in ${type} corpus: ${Object.keys(words).length} words`);
    return { words, version: 'built-in' };
  }
  
  // ============================================
  // Load all corpora (async)
  // ============================================
  async loadAll() {
    if (this.isLoaded) return;
    
    await Promise.all([
      this.loadCorpus('core'),
      this.loadCorpus('poetry'),
      this.loadCorpus('marsiya'),
      this.loadCorpus('ghazal'),
      this.loadCorpus('nazm'),
      this.loadCorpus('modern'),
      this.loadCorpus('religious')
    ]);
    
    this.isLoaded = true;
    console.log('✅ All corpora loaded successfully');
    console.log('📊 Total words:', this.getTotalWordCount());
  }
  
  // ============================================
  // Get total word count across all corpora
  // ============================================
  getTotalWordCount() {
    let total = 0;
    for (const corpus of Object.values(this.corpora)) {
      if (corpus && corpus.words) {
        total += Object.keys(corpus.words).length;
      }
    }
    return total;
  }
  
  // ============================================
  // Search across all corpora with priority
  // ============================================
  getWordWithRank(urduWord) {
    // Priority order: marsiya > poetry > ghazal > core > modern
    const priorityOrder = ['marsiya', 'poetry', 'ghazal', 'core', 'modern', 'religious', 'nazm'];
    
    for (const type of priorityOrder) {
      const corpus = this.corpora[type];
      if (corpus && corpus.words && corpus.words[urduWord]) {
        const wordData = corpus.words[urduWord];
        console.log(`📚 Found "${urduWord}" in ${type} corpus`);
        return {
          roman: wordData.roman,
          frequency: wordData.frequency || 500,
          category: wordData.category || ['unknown'],
          source: type
        };
      }
    }
    
    return null;
  }
  
  // ============================================
  // Search for poetry-specific words
  // ============================================
  getPoetryWord(urduWord) {
    const poetryCorpus = this.corpora.poetry || { words: {} };
    return poetryCorpus.words[urduWord] || null;
  }
  
  // ============================================
  // Search for marsiya-specific words
  // ============================================
  getMarsiyaWord(urduWord) {
    const marsiyaCorpus = this.corpora.marsiya || { words: {} };
    return marsiyaCorpus.words[urduWord] || null;
  }
  
  // ============================================
  // Direct word lookup
  // ============================================
  lookupWord(urduWord) {
    return this.getWordWithRank(urduWord);
  }
  
  // ============================================
  // Bulk word lookup
  // ============================================
  bulkLookup(urduWords) {
    const results = {};
    for (const word of urduWords) {
      results[word] = this.getWordWithRank(word);
    }
    return results;
  }
  
  // ============================================
  // Get corpus statistics
  // ============================================
  getStats() {
    const stats = {};
    for (const [type, corpus] of Object.entries(this.corpora)) {
      if (corpus && corpus.words) {
        stats[type] = Object.keys(corpus.words).length;
      } else {
        stats[type] = 0;
      }
    }
    stats.total = this.getTotalWordCount();
    return stats;
  }
  
  // ============================================
  // Add word to corpus (dynamic)
  // ============================================
  async addWord(urduWord, roman, category = 'modern', frequency = 1) {
    await this.loadCorpus('modern');
    
    if (!this.corpora.modern.words[urduWord]) {
      this.corpora.modern.words[urduWord] = {
        roman,
        frequency,
        category: Array.isArray(category) ? category : [category],
        variants: [],
        addedAt: new Date().toISOString()
      };
      console.log(`📚 Added word: ${urduWord} → ${roman} (${category})`);
      return true;
    }
    return false;
  }
  
  // ============================================
  // Add multiple words to corpus
  // ============================================
  async addWords(words) {
    let added = 0;
    for (const [urduWord, data] of Object.entries(words)) {
      const success = await this.addWord(urduWord, data.roman, data.category, data.frequency);
      if (success) added++;
    }
    console.log(`📚 Added ${added} words to corpus`);
    return added;
  }
  
  // ============================================
  // Search words by category
  // ============================================
  searchByCategory(category) {
    const results = [];
    for (const corpus of Object.values(this.corpora)) {
      if (corpus && corpus.words) {
        for (const [word, data] of Object.entries(corpus.words)) {
          if (data.category && data.category.includes(category)) {
            results.push({ word, ...data });
          }
        }
      }
    }
    return results;
  }
  
  // ============================================
  // Get high frequency words
  // ============================================
  getHighFrequencyWords(minFrequency = 800) {
    const results = [];
    for (const corpus of Object.values(this.corpora)) {
      if (corpus && corpus.words) {
        for (const [word, data] of Object.entries(corpus.words)) {
          if (data.frequency >= minFrequency) {
            results.push({ word, ...data });
          }
        }
      }
    }
    return results.sort((a, b) => b.frequency - a.frequency);
  }
  
  // ============================================
  // Get all Marsiya words
  // ============================================
  getAllMarsiyaWords() {
    return this.searchByCategory('marsiya');
  }
  
  // ============================================
  // Get all Poetry words
  // ============================================
  getAllPoetryWords() {
    return this.searchByCategory('poetry');
  }
  
  // ============================================
  // Export corpus to JSON
  // ============================================
  exportCorpus() {
    const exportData = {};
    for (const [type, corpus] of Object.entries(this.corpora)) {
      if (corpus && corpus.words) {
        exportData[type] = corpus.words;
      }
    }
    return exportData;
  }
}

export default new CorpusLoader();