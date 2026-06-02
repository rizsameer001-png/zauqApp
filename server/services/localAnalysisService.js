// server/services/localAnalysisService.js
import natural from 'natural';

// Comprehensive theme keywords for Urdu/Hindi/English poetry
const themeKeywords = {
  love: ['ishq', 'mohabbat', 'pyar', 'love', 'dil', 'jaan', 'sanam', 'yaar', 'mehboob', 'aashiq', 'mashooq', 'ulfat', 'visal', 'prem', 'pyaar'],
  separation: ['judai', 'bichar', 'firaq', 'hijr', 'doori', 'tanhai', 'alone', 'separate', 'miss', 'yaad', 'viraha'],
  nature: ['bahar', 'gul', 'phool', 'sabz', 'dariya', 'samandar', 'chand', 'suraj', 'tara', 'hawa', 'barsat', 'spring', 'flower', 'garden', 'tree', 'mausam', 'bagh'],
  spirituality: ['khuda', 'allah', 'ram', 'bhagwan', 'ibadat', 'dua', 'roza', 'namaz', 'sajda', 'god', 'divine', 'sufi', 'murshid', 'haq', 'noor', 'rooh', 'mola'],
  sorrow: ['gham', 'dard', 'aansu', 'roona', 'sog', 'ranj', 'alam', 'karb', 'bebasi', 'sad', 'pain', 'cry', 'tear', 'sorrow', 'afsos', 'dil', 'toota'],
  hope: ['umeed', 'raushni', 'roshni', 'sahar', 'subah', 'future', 'bright', 'hope', 'dream', 'khwab', 'manzil', 'naya', 'sawaera'],
  sacrifice: ['qurbani', 'shaheed', 'balidan', 'tyag', 'sacrifice', 'kurban', 'shahadat', 'wafa'],
  justice: ['adalat', 'insaf', 'justice', 'haq', 'sach', 'truth', 'mukadma'],
  resistance: ['inqilab', 'bagawat', 'jung', 'lalkar', 'mukadma', 'haq', 'justice', 'fight', 'struggle', 'azadi', 'mazboot', 'karbala'],
  philosophy: ['zindagi', 'maut', 'waqt', 'safar', 'dunya', 'fikr', 'thought', 'life', 'death', 'time', 'exist', 'insaan', 'falsafa'],
  karbala: ['karbala', 'hussain', 'hazrat', 'imam', 'shaheed', 'qasim', 'abbas', 'sakina', 'aali', 'muharram', 'ashura', 'matam', 'nauha']
};

// Emotional intensity markers
const emotionMarkers = {
  joy: ['khushi', 'happy', 'joy', 'anand', 'muskurahat', 'jashn', 'celebration'],
  sadness: ['gham', 'dard', 'sorrow', 'cry', 'tear', 'aansu', 'ranj', 'alam'],
  love: ['ishq', 'love', 'mohabbat', 'pyar', 'dil', 'jaan'],
  anger: ['ghussa', 'anger', 'rage', 'fury', 'gussa', 'naraaz'],
  fear: ['dar', 'fear', 'anxiety', 'worry', 'khauf', 'dread'],
  hope: ['umeed', 'hope', 'dream', 'khwab', 'roshni']
};

// Detect language of text
const detectLanguage = (text) => {
  const urduPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  if (urduPattern.test(text)) return 'urdu';
  
  const hindiPattern = /[\u0900-\u097F]/;
  if (hindiPattern.test(text)) return 'hindi';
  
  return 'english';
};

// Extract themes from text
const extractThemes = (text) => {
  const lowerText = text.toLowerCase();
  const scores = {};
  
  Object.entries(themeKeywords).forEach(([theme, keywords]) => {
    let score = 0;
    keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = (text.match(regex) || []).length;
      score += matches;
    });
    scores[theme] = score;
  });
  
  const detectedThemes = Object.entries(scores)
    .filter(([_, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([theme]) => theme);
  
  if (detectedThemes.length === 0) {
    return ['poetry', 'expression', 'emotion'];
  }
  
  return detectedThemes;
};

// Detect sentiment and emotions
const detectSentiment = (text) => {
  const lowerText = text.toLowerCase();
  let positiveScore = 0;
  let negativeScore = 0;
  let emotions = {};
  
  // Initialize emotion scores
  Object.keys(emotionMarkers).forEach(emotion => {
    emotions[emotion] = 0;
  });
  
  // Simple positive/negative word lists
  const positiveWords = ['love', 'beauty', 'peace', 'hope', 'joy', 'happy', 'khushi', 'umeed', 'beautiful', 'wonderful', 'great'];
  const negativeWords = ['pain', 'sad', 'grief', 'tear', 'cry', 'death', 'dark', 'dard', 'gham', 'sorrow', 'sadness'];
  
  positiveWords.forEach(word => {
    const regex = new RegExp(word, 'gi');
    const matches = (text.match(regex) || []).length;
    positiveScore += matches;
  });
  
  negativeWords.forEach(word => {
    const regex = new RegExp(word, 'gi');
    const matches = (text.match(regex) || []).length;
    negativeScore += matches;
  });
  
  // Detect emotions
  Object.entries(emotionMarkers).forEach(([emotion, keywords]) => {
    keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = (text.match(regex) || []).length;
      emotions[emotion] += matches;
    });
  });
  
  const total = positiveScore + negativeScore;
  let sentiment = 'neutral';
  if (positiveScore > negativeScore * 1.5) sentiment = 'positive';
  if (negativeScore > positiveScore * 1.5) sentiment = 'negative';
  
  // Get dominant emotions
  const dominantEmotions = Object.entries(emotions)
    .filter(([_, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([emotion]) => emotion);
  
  return {
    sentiment,
    score: total > 0 ? (positiveScore - negativeScore) / total : 0,
    emotions: dominantEmotions.length > 0 ? dominantEmotions : ['thoughtful']
  };
};

// Detect tone
const detectTone = (text, themes, sentiment) => {
  const loveKeywords = ['love', 'ishq', 'mohabbat', 'romantic', 'beloved'];
  const sadKeywords = ['sad', 'grief', 'pain', 'sorrow', 'dard', 'gham'];
  const hopefulKeywords = ['hope', 'dream', 'future', 'bright', 'umeed'];
  const patrioticKeywords = ['watan', 'nation', 'country', 'desh', 'azadi'];
  const spiritualKeywords = ['god', 'divine', 'khuda', 'allah', 'sufi', 'rooh'];
  
  const lowerText = text.toLowerCase();
  
  if (themes.includes('karbala') || themes.includes('sacrifice')) {
    return 'tragic and heroic';
  }
  
  if (themes.includes('spirituality')) {
    return 'devotional and spiritual';
  }
  
  if (themes.includes('love')) {
    return 'romantic and passionate';
  }
  
  if (themes.includes('sorrow')) {
    return 'melancholic and sorrowful';
  }
  
  if (themes.includes('hope')) {
    return 'hopeful and optimistic';
  }
  
  if (themes.includes('resistance')) {
    return 'rebellious and determined';
  }
  
  if (sentiment === 'positive') return 'uplifting and joyful';
  if (sentiment === 'negative') return 'somber and reflective';
  
  return 'contemplative and expressive';
};

// Detect literary devices (simple detection)
const detectLiteraryDevices = (text) => {
  const devices = [];
  const lowerText = text.toLowerCase();
  
  // Check for repetition (alliteration/anaphora)
  const lines = text.split('\n');
  const firstWords = lines.map(line => line.trim().split(' ')[0]);
  const repeatedFirstWords = firstWords.filter((word, i) => firstWords.indexOf(word) !== i);
  if (repeatedFirstWords.length > 0) devices.push('repetition/anaphora');
  
  // Check for metaphors (indicated by 'is', 'are', 'was')
  if ((text.match(/\bis\b/gi) || []).length > 2) devices.push('metaphor');
  
  // Check for imagery (descriptive words)
  const imageryWords = ['like', 'as', 'beautiful', 'lovely', 'dark', 'bright', 'soft', 'hard'];
  const hasImagery = imageryWords.some(word => lowerText.includes(word));
  if (hasImagery) devices.push('imagery');
  
  // Check for personification
  const personificationWords = ['whisper', 'dance', 'sing', 'cry', 'smile', 'weep'];
  const hasPersonification = personificationWords.some(word => lowerText.includes(word));
  if (hasPersonification) devices.push('personification');
  
  // Check for rhetorical questions
  if (text.includes('?') || text.includes('؟')) devices.push('rhetorical question');
  
  // Default devices if none found
  if (devices.length === 0) {
    devices.push('rhyme', 'meter', 'poetic expression');
  }
  
  return [...new Set(devices)].slice(0, 5);
};

// Detect rhyme scheme (basic)
const detectRhymeScheme = (text) => {
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  if (lines.length < 2) return 'Free verse';
  
  // Get last words of each line
  const lastWords = lines.map(line => {
    const words = line.trim().split(/\s+/);
    return words[words.length - 1].toLowerCase().replace(/[^\w]/g, '');
  });
  
  // Check for couplets (AABB)
  let isAABB = true;
  for (let i = 0; i < lastWords.length - 1; i += 2) {
    if (lastWords[i] !== lastWords[i + 1]) {
      isAABB = false;
      break;
    }
  }
  if (isAABB && lastWords.length >= 2) return 'AABB (couplets)';
  
  // Check for alternate rhyme (ABAB)
  let isABAB = true;
  for (let i = 0; i < lastWords.length - 2; i++) {
    if (lastWords[i] !== lastWords[i + 2]) {
      isABAB = false;
      break;
    }
  }
  if (isABAB && lastWords.length >= 4) return 'ABAB (alternate rhyme)';
  
  return 'Rhythmic pattern with internal rhymes';
};

// Generate meaning summary
const generateMeaning = (text, themes, tone) => {
  const themesStr = themes.join(', ');
  const language = detectLanguage(text);
  
  const summaries = {
    urdu: `یہ نظم ${themesStr} جیسے موضوعات کو بڑے خوبصورت انداز میں پیش کرتی ہے۔ شاعر نے اپنے جذبات کو پُراثر طریقے سے بیان کیا ہے۔`,
    hindi: `यह कविता ${themesStr} जैसे विषयों को बहुत खूबसूरत तरीके से प्रस्तुत करती है। कवि ने अपनी भावनाओं को प्रभावशाली ढंग से व्यक्त किया है।`,
    english: `This poem beautifully presents themes of ${themesStr}. The poet expresses their emotions with powerful imagery and heartfelt words.`
  };
  
  return summaries[language] || summaries.english;
};

// Determine difficulty level
const getDifficulty = (text) => {
  const wordCount = text.split(/\s+/).length;
  const uniqueWords = new Set(text.toLowerCase().split(/\s+/)).size;
  const lexicalDensity = uniqueWords / wordCount;
  
  if (lexicalDensity > 0.7 && wordCount > 100) return 'advanced';
  if (lexicalDensity > 0.5 || wordCount > 50) return 'intermediate';
  return 'beginner';
};

// Main analysis function
export const analyzePoemLocally = (poemText) => {
  console.log('🔍 Performing local AI analysis on poem...');
  
  const themes = extractThemes(poemText);
  const sentimentData = detectSentiment(poemText);
  const tone = detectTone(poemText, themes, sentimentData.sentiment);
  const literaryDevices = detectLiteraryDevices(poemText);
  const rhymeScheme = detectRhymeScheme(poemText);
  const meaning = generateMeaning(poemText, themes, tone);
  const difficulty = getDifficulty(poemText);
  
  const analysis = {
    themes: themes,
    tone: tone,
    sentiment: sentimentData.sentiment,
    emotions: sentimentData.emotions,
    meaning: meaning,
    literaryDevices: literaryDevices,
    rhymeScheme: rhymeScheme,
    difficulty: difficulty,
    confidence: sentimentData.score ? Math.abs(sentimentData.score) : 0.5,
    analyzedAt: new Date().toISOString(),
    provider: 'local-ai'
  };
  
  console.log('✅ Local analysis complete:', { themes, tone, sentiment: sentimentData.sentiment });
  
  return analysis;
};