// ============================================
// VOWEL INFERENCE ENGINE (NO AI)
// Rule-based vowel detection for Urdu
// ============================================

class VowelEngine {
  constructor() {
    // Vowel patterns based on word structure
    this.vowelPatterns = {
      // Pattern: consonant + vowel rules
      'CVC': { default: 'a', exceptions: {} },
      'CVCC': { default: 'a', exceptions: {} },
      'CCV': { default: 'i', exceptions: {} },
      
      // Specific patterns
      'م_ی': { vowel: 'ei', position: 'middle' },    // میں → mein
      'و_ہ': { vowel: 'oo', position: 'middle' },    // وہ → woh
      'ی_ہ': { vowel: 'e', position: 'end' },        // یہ → yeh
    };
    
    // Vowel harmony rules
    this.harmonyRules = {
      // Front vowels (ی, ے) affect surrounding
      'front': { triggers: ['ی', 'ے'], effect: 'e' },
      // Back vowels (و, ا) affect surrounding  
      'back': { triggers: ['و', 'ا'], effect: 'o' },
      // Nasal vowels (ں, ن)
      'nasal': { triggers: ['ں', 'ن'], effect: 'n' }
    };
    
    // Word structure analyzer
    this.structurePatterns = {
      'mein': { pattern: /م[\u064E-\u0656]?ی[\u064E-\u0656]?ن/, output: 'mein' },
      'hoon': { pattern: /ہ[\u064E-\u0656]?و[\u064E-\u0656]?ں/, output: 'hoon' },
      'hain': { pattern: /ہ[\u064E-\u0656]?ی[\u064E-\u0656]?ں/, output: 'hain' },
    };
  }
  
  // ============================================
  // Infer vowels from word structure
  // ============================================
  inferVowels(word, context = {}) {
    // Check for known patterns first
    for (const [key, pattern] of Object.entries(this.structurePatterns)) {
      if (pattern.pattern.test(word)) {
        return pattern.output;
      }
    }
    
    // Analyze consonant-vowel structure
    const structure = this.analyzeStructure(word);
    
    // Apply vowel harmony
    const harmony = this.applyHarmony(word);
    
    // Generate vowel suggestions
    const suggestions = this.generateSuggestions(word, structure, harmony);
    
    // Return highest confidence suggestion
    return suggestions[0] || this.defaultVowel(word);
  }
  
  // ============================================
  // Analyze word structure (consonant/vowel pattern)
  // ============================================
  analyzeStructure(word) {
    const consonants = 'بپتٹثجچحخدڈذرڑزژسشصضطظعغفقکگلمنہھوی';
    const vowels = 'اآئیےؤ';
    const nasal = 'ںن';
    
    let pattern = '';
    let structure = [];
    
    for (let char of word) {
      if (consonants.includes(char)) {
        pattern += 'C';
        structure.push({ type: 'consonant', char });
      } else if (vowels.includes(char)) {
        pattern += 'V';
        structure.push({ type: 'vowel', char });
      } else if (nasal.includes(char)) {
        pattern += 'N';
        structure.push({ type: 'nasal', char });
      } else {
        pattern += '?';
        structure.push({ type: 'unknown', char });
      }
    }
    
    return { pattern, structure };
  }
  
  // ============================================
  // Apply vowel harmony rules
  // ============================================
  applyHarmony(word) {
    let harmony = 'neutral';
    let lastVowel = null;
    
    for (let char of word) {
      if (this.harmonyRules.front.triggers.includes(char)) {
        harmony = 'front';
        lastVowel = 'e';
      } else if (this.harmonyRules.back.triggers.includes(char)) {
        harmony = 'back';
        lastVowel = 'o';
      } else if (this.harmonyRules.nasal.triggers.includes(char)) {
        harmony = 'nasal';
        lastVowel = 'n';
      }
    }
    
    return { harmony, lastVowel };
  }
  
  // ============================================
  // Generate vowel suggestions
  // ============================================
  generateSuggestions(word, structure, harmony) {
    const suggestions = [];
    
    // Rule 1: Words ending with ں (nasal)
    if (word.endsWith('ں')) {
      const base = word.slice(0, -1);
      suggestions.push({
        vowel: 'oo',
        confidence: 0.95,
        output: this.transliterateWithVowel(base, 'oo') + 'n'
      });
      suggestions.push({
        vowel: 'ei',
        confidence: 0.85,
        output: this.transliterateWithVowel(base, 'ei') + 'n'
      });
    }
    
    // Rule 2: Words with و (waw)
    if (word.includes('و')) {
      if (word.includes('ہ')) {
        suggestions.push({
          vowel: 'oo',
          confidence: 0.9,
          output: this.transliterateWithVowel(word, 'oo')
        });
      } else {
        suggestions.push({
          vowel: 'o',
          confidence: 0.8,
          output: this.transliterateWithVowel(word, 'o')
        });
      }
    }
    
    // Rule 3: Words with ی (ye)
    if (word.includes('ی')) {
      if (word.endsWith('ی')) {
        suggestions.push({
          vowel: 'e',
          confidence: 0.85,
          output: this.transliterateWithVowel(word, 'e')
        });
      } else {
        suggestions.push({
          vowel: 'i',
          confidence: 0.75,
          output: this.transliterateWithVowel(word, 'i')
        });
      }
    }
    
    // Rule 4: Apply harmony
    if (harmony.harmony === 'front') {
      suggestions.push({
        vowel: 'e',
        confidence: 0.7,
        output: this.transliterateWithVowel(word, 'e')
      });
    } else if (harmony.harmony === 'back') {
      suggestions.push({
        vowel: 'o',
        confidence: 0.7,
        output: this.transliterateWithVowel(word, 'o')
      });
    }
    
    // Sort by confidence
    suggestions.sort((a, b) => b.confidence - a.confidence);
    
    return suggestions;
  }
  
  // ============================================
  // Transliterate with specific vowel
  // ============================================
  transliterateWithVowel(word, vowel) {
    const charMap = {
      'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
      'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh',
      'د': 'd', 'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r',
      'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's',
      'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh',
      'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l',
      'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h',
      'ھ': 'h', 'ی': 'y', 'ے': 'e'
    };
    
    let result = '';
    for (let char of word) {
      if (charMap[char]) {
        result += charMap[char];
      } else {
        result += char;
      }
    }
    
    // Apply vowel substitution
    result = result.replace(/o/g, vowel);
    result = result.replace(/y/g, 'i');
    
    return result;
  }
  
  // ============================================
  // Default vowel inference
  // ============================================
  defaultVowel(word) {
    // Default to 'a' for most words
    return this.transliterateWithVowel(word, 'a');
  }
  
  // ============================================
  // Batch infer vowels
  // ============================================
  batchInfer(words) {
    return words.map(word => ({
      word,
      suggestion: this.inferVowels(word)
    }));
  }
}

export default new VowelEngine();