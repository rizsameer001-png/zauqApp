// ============================================
// ZAUQ RULES - شعری قواعد
// Professional Urdu transliteration rules
// Named after the legendary poet Zauq
// ============================================

class ZauqRules {
  constructor() {
    this.rules = {
      // Izafat rules (possessive/construct state) - اضافت
      izafat: [
        { pattern: /(\w+)\s+ے\s+(\w+)/gi, replacement: '$1-e-$2' },
        { pattern: /(\w+)\s+ی\s+(\w+)/gi, replacement: '$1-e-$2' },
        { pattern: /(\w+)\s+ء\s+(\w+)/gi, replacement: '$1-$2' },
        { pattern: /(\w+)\s+ئے\s+(\w+)/gi, replacement: '$1-e-$2' },
        { pattern: /(\w+)\s+اے\s+(\w+)/gi, replacement: '$1-e-$2' }
      ],
      
      // Compound word rules - مرکب الفاظ
      compound: [
        { pattern: /(\w+)\s+(\w+)\s+گے/gi, replacement: '$1$2ge' },
        { pattern: /(\w+)\s+(\w+)\s+گی/gi, replacement: '$1$2gi' },
        { pattern: /(\w+)\s+(\w+)\s+گا/gi, replacement: '$1$2ga' },
        { pattern: /(\w+)\s+(\w+)\s+تھا/gi, replacement: '$1$2tha' },
        { pattern: /(\w+)\s+(\w+)\s+تھی/gi, replacement: '$1$2thi' }
      ],
      
      // Vowel length rules - حرف علت
      vowelLength: [
        { pattern: /aa([^a])/gi, replacement: 'a$1' },
        { pattern: /([^a])aa/gi, replacement: '$1a' },
        { pattern: /ee([^e])/gi, replacement: 'e$1' },
        { pattern: /([^e])ee/gi, replacement: '$1e' },
        { pattern: /oo([^o])/gi, replacement: 'o$1' },
        { pattern: /([^o])oo/gi, replacement: '$1o' },
        { pattern: /ii([^i])/gi, replacement: 'i$1' },
        { pattern: /uu([^u])/gi, replacement: 'u$1' }
      ],
      
      // Nasal sounds - غنہ
      nasal: [
        { pattern: /(\w+)n\b/g, replacement: (match, p1) => {
          const nasalWords = {
            'ho': 'hoon',
            'hain': 'hain',
            'mei': 'mein',
            'thei': 'thin',
            'hai': 'hain'
          };
          return nasalWords[p1] || match;
        }},
        { pattern: /(\w+)ں/g, replacement: '$1n' }
      ],
      
      // Poetry-specific rules - شاعری
      poetry: [
        { pattern: /\bham\b/gi, replacement: 'hum' },
        { pattern: /\btum\b/gi, replacement: 'tum' },
        { pattern: /\bap\b/gi, replacement: 'aap' },
        { pattern: /\bhe\b(?!\s+hai)/gi, replacement: 'woh' },
        { pattern: /\bmain\b/gi, replacement: 'main' },
        { pattern: /\bmei\b/gi, replacement: 'mein' }
      ],
      
      // Marsiya/Noha specific - مرثیہ
      marsiya: [
        { pattern: /\bhussain\b/gi, replacement: 'Hussain' },
        { pattern: /\babbas\b/gi, replacement: 'Abbas' },
        { pattern: /\bzainab\b/gi, replacement: 'Zainab' },
        { pattern: /\bsakina\b/gi, replacement: 'Sakina' },
        { pattern: /\bkarbala\b/gi, replacement: 'Karbala' },
        { pattern: /\bshaheed\b/gi, replacement: 'shaheed' },
        { pattern: /\bpyaas\b/gi, replacement: 'pyaas' },
        { pattern: /\bkhoon\b/gi, replacement: 'khoon' }
      ],
      
      // Ghazal specific - غزل
      ghazal: [
        { pattern: /\bishq\b/gi, replacement: 'ishq' },
        { pattern: /\bmohabbat\b/gi, replacement: 'mohabbat' },
        { pattern: /\bgham\b/gi, replacement: 'gham' },
        { pattern: /\bdard\b/gi, replacement: 'dard' },
        { pattern: /\bdil\b/gi, replacement: 'dil' },
        { pattern: /\bjaan\b/gi, replacement: 'jaan' }
      ],
      
      // Nazm specific - نظم
      nazm: [
        { pattern: /\bzindagi\b/gi, replacement: 'zindagi' },
        { pattern: /\bwatan\b/gi, replacement: 'watan' },
        { pattern: /\bqaum\b/gi, replacement: 'qaum' },
        { pattern: /\bmulk\b/gi, replacement: 'mulk' }
      ],
      
      // Hamd & Naat specific - حمد و نعت
      hamdNaat: [
        { pattern: /\ballah\b/gi, replacement: 'Allah' },
        { pattern: /\bkhuda\b/gi, replacement: 'Khuda' },
        { pattern: /\brabb\b/gi, replacement: 'Rabb' },
        { pattern: /\brahman\b/gi, replacement: 'Rehman' },
        { pattern: /\braheem\b/gi, replacement: 'Raheem' },
        { pattern: /\bmuhammad\b/gi, replacement: 'Muhammad' },
        { pattern: /\brasool\b/gi, replacement: 'Rasool' },
        { pattern: /\bnabi\b/gi, replacement: 'Nabi' }
      ]
    };
    
    // Exception dictionary (override rules) - مستثنیات
    this.exceptions = {
      // Basic words
      'ہے': 'hai',
      'ہیں': 'hain',
      'ہوں': 'hoon',
      'میں': 'mein',
      'تمھیں': 'tumhein',
      'انھیں': 'unhein',
      'انہیں': 'unhein',
      'اسے': 'use',
      'اس نے': 'usne',
      'انہوں نے': 'unhon ne',
      
      // Poetry exceptions
      'دل': 'dil',
      'درد': 'dard',
      'غم': 'gham',
      'عشق': 'ishq',
      'محبت': 'mohabbat',
      'وفا': 'wafa',
      'جفا': 'jafa',
      
      // Marsiya exceptions
      'کربلا': 'Karbala',
      'حسین': 'Hussain',
      'عباس': 'Abbas',
      'زینب': 'Zainab',
      'سکینہ': 'Sakina',
      'پیاس': 'pyaas',
      'خون': 'khoon',
      
      // Compound exceptions
      'دیکھیں گے': 'dekheinge',
      'کریں گے': 'kareinge',
      'جائیں گے': 'jayeinge',
      'آئیں گے': 'aayeinge',
      'رہیں گے': 'raheinge'
    };
    
    // Poetic meter rules - بحر
    this.meterRules = {
      'bahr-e-mutaqarab': {
        pattern: /فعولن فعولن فعولن فعولن/g,
        replacement: 'faoolun faoolun faoolun faoolun'
      },
      'bahr-e-hazaj': {
        pattern: /مفاعیلن مفاعیلن مفاعیلن/g,
        replacement: 'mafaeelun mafaeelun mafaeelun'
      }
    };
    
    // Qafiya & Radeef rules - قافیہ و ردیف
    this.qafiyaRules = {
      patterns: [
        { pattern: /(\w+)(ہے|hai)$/gi, replacement: '$1$2' },
        { pattern: /(\w+)(کر|kar)$/gi, replacement: '$1$2' }
      ]
    };
    
    // Takhti (verse) rules - تختی
    this.takhtiRules = {
      misraPatterns: [
        { pattern: /(\.\s+)([a-z])/g, replacement: (match, p1, p2) => p1 + p2.toUpperCase() },
        { pattern: /(۔\s+)([a-z])/g, replacement: (match, p1, p2) => p1 + p2.toUpperCase() }
      ]
    };
  }
  
  // ============================================
  // Apply all rules to text
  // ============================================
  applyAllRules(text, context = {}) {
    let result = text;
    
    // Apply exceptions first (highest priority)
    for (const [urdu, roman] of Object.entries(this.exceptions)) {
      const regex = new RegExp(`\\b${urdu}\\b`, 'g');
      result = result.replace(regex, roman);
    }
    
    // Apply rule categories based on context
    const ruleCategories = ['izafat', 'compound', 'vowelLength', 'nasal'];
    
    if (context.isPoetry) {
      ruleCategories.push('poetry');
    }
    
    if (context.isMarsiya) {
      ruleCategories.push('marsiya');
    }
    
    if (context.isGhazal) {
      ruleCategories.push('ghazal');
    }
    
    if (context.isNazm) {
      ruleCategories.push('nazm');
    }
    
    if (context.isHamd || context.isNaat) {
      ruleCategories.push('hamdNaat');
    }
    
    for (const category of ruleCategories) {
      if (this.rules[category]) {
        for (const rule of this.rules[category]) {
          result = result.replace(rule.pattern, rule.replacement);
        }
      }
    }
    
    // Apply Qafiya rules
    for (const rule of this.qafiyaRules.patterns) {
      result = result.replace(rule.pattern, rule.replacement);
    }
    
    // Apply Takhti rules
    for (const rule of this.takhtiRules.misraPatterns) {
      result = result.replace(rule.pattern, rule.replacement);
    }
    
    return result;
  }
  
  // ============================================
  // Detect context (poetry, marsiya, etc.)
  // ============================================
  detectContext(text) {
    const context = {
      isPoetry: false,
      isMarsiya: false,
      isGhazal: false,
      isNazm: false,
      isHamd: false,
      isNaat: false,
      isNoha: false,
      confidence: 0
    };
    
    let confidenceScore = 0;
    
    // Poetry indicators
    const poetryWords = ['دل', 'عشق', 'غم', 'محبت', 'اشک', 'نالہ', 'فریاد', 'شکایت'];
    for (const word of poetryWords) {
      if (text.includes(word)) {
        context.isPoetry = true;
        confidenceScore += 10;
      }
    }
    
    // Ghazal indicators
    const ghazalWords = ['غزل', 'شعر', 'شیر', 'مطلع', 'مقطع', 'قافیہ', 'ردیف', 'بحر'];
    let ghazalCount = 0;
    for (const word of ghazalWords) {
      if (text.includes(word)) {
        ghazalCount++;
        confidenceScore += 15;
      }
    }
    context.isGhazal = ghazalCount >= 2;
    
    // Marsiya/Noha indicators
    const marsiyaWords = ['کربلا', 'حسین', 'عباس', 'شہید', 'پیاس', 'خون', 'علم', 'خیام'];
    let marsiyaCount = 0;
    for (const word of marsiyaWords) {
      if (text.includes(word)) {
        marsiyaCount++;
        confidenceScore += 20;
      }
    }
    context.isMarsiya = marsiyaCount >= 2;
    context.isNoha = context.isMarsiya && text.includes('نوحہ');
    
    // Nazm indicators
    const nazmWords = ['نظم', 'معاشرہ', 'انقلاب', 'جدید', 'ترقی'];
    let nazmCount = 0;
    for (const word of nazmWords) {
      if (text.includes(word)) {
        nazmCount++;
        confidenceScore += 10;
      }
    }
    context.isNazm = nazmCount >= 1;
    
    // Hamd/Naat indicators
    const hamdWords = ['اللہ', 'خدا', 'رب', 'رحمٰن', 'رحیم', 'محمد', 'رسول'];
    let hamdCount = 0;
    for (const word of hamdWords) {
      if (text.includes(word)) {
        hamdCount++;
        confidenceScore += 15;
      }
    }
    context.isHamd = hamdCount >= 1 && text.includes('حمد');
    context.isNaat = hamdCount >= 1 && (text.includes('نعت') || text.includes('مدح'));
    
    context.confidence = Math.min(confidenceScore, 100);
    
    return context;
  }
  
  // ============================================
  // Apply specific poetic meter
  // ============================================
  applyMeter(text, meterName) {
    if (!this.meterRules[meterName]) {
      return text;
    }
    
    const meter = this.meterRules[meterName];
    return text.replace(meter.pattern, meter.replacement);
  }
  
  // ============================================
  // Format verse (misra) properly
  // ============================================
  formatVerse(text) {
    let result = text;
    
    // Split into lines (verses)
    const lines = result.split('\n');
    const formattedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Each line is a misra (hemistich)
      // Capitalize first letter of each misra
      line = line.replace(/^[a-z]/, match => match.toUpperCase());
      
      // Add proper spacing for poetry
      line = line.replace(/\s+/g, ' ');
      line = line.trim();
      
      formattedLines.push(line);
    }
    
    return formattedLines.join('\n');
  }
  
  // ============================================
  // Get rule explanation for debugging
  // ============================================
  explainRules() {
    const totalRules = Object.values(this.rules).reduce((sum, arr) => sum + arr.length, 0);
    
    return {
      totalRules,
      exceptions: Object.keys(this.exceptions).length,
      categories: Object.keys(this.rules),
      meters: Object.keys(this.meterRules),
      categoryCounts: Object.fromEntries(
        Object.entries(this.rules).map(([key, arr]) => [key, arr.length])
      )
    };
  }
  
  // ============================================
  // Add custom rule dynamically
  // ============================================
  addRule(category, pattern, replacement) {
    if (!this.rules[category]) {
      this.rules[category] = [];
    }
    
    this.rules[category].push({ pattern, replacement });
    console.log(`📜 Added rule to ${category}: ${pattern} → ${replacement}`);
  }
  
  // ============================================
  // Add exception dynamically
  // ============================================
  addException(urdu, roman) {
    this.exceptions[urdu] = roman;
    console.log(`📜 Added exception: ${urdu} → ${roman}`);
  }
  
  // ============================================
  // Get all rules for a specific category
  // ============================================
  getRulesByCategory(category) {
    return this.rules[category] || [];
  }
}

export default new ZauqRules();