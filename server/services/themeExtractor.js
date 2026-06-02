// server/services/themeExtractor.js
import natural from 'natural';

// Pre-defined theme keywords
const themeKeywords = {
  love: ['ishq', 'mohabbat', 'pyar', 'love', 'dil', 'jaan', 'sanam', 'yaar', 'mehboob', 'aashiq', 'mashooq', 'ulfat', 'visal'],
  separation: ['judai', 'bichar', 'firaq', 'hijr', 'doori', 'tanhai', 'alone', 'separate', 'miss', 'yaad'],
  nature: ['bahar', 'gul', 'phool', 'sabz', 'dariya', 'samandar', 'chand', 'suraj', 'tara', 'hawa', 'barsat', 'spring', 'flower', 'garden', 'tree', 'mausam'],
  spirituality: ['khuda', 'allah', 'ram', 'bhagwan', 'ibadat', 'dua', 'roza', 'namaz', 'sajda', 'god', 'divine', 'sufi', 'murshid', 'haq', 'noor', 'rooh'],
  sorrow: ['gham', 'dard', 'aansu', 'roona', 'sog', 'ranj', 'alam', 'karb', 'bebasi', 'sad', 'pain', 'cry', 'tear', 'sorrow'],
  hope: ['umeed', 'raushni', 'roshni', 'sahar', 'subah', 'future', 'bright', 'hope', 'dream', 'khwab', 'manzil', 'naya'],
  patriotism: ['watan', 'mulk', 'qaum', 'desh', 'flag', 'azadi', 'freedom', 'qurbani', 'shaheed', 'country', 'nation', 'hind', 'pak'],
  resistance: ['inqilab', 'bagawat', 'jung', 'lalkar', 'mukadma', 'haq', 'justice', 'fight', 'struggle', 'azadi', 'mazboot'],
  philosophy: ['zindagi', 'maut', 'waqt', 'safar', 'dunya', 'fikr', 'thought', 'life', 'death', 'time', 'exist', 'insaan'],
  celebration: ['khushi', 'eid', 'diwali', 'tehwar', 'jashn', 'mehfil', 'party', 'celebrate', 'enjoy', 'milad'],
  wisdom: ['aql', 'danai', 'hikmat', 'ilm', 'knowledge', 'wise', 'gyaan', 'buddhi', 'learn', 'sikhna', 'samajh'],
  friendship: ['dosti', 'yaari', 'friend', 'rafeeq', 'humdum', 'humrahi', 'companion', 'sathi', 'dildaar']
};

// Cache extracted themes
const themeCache = new Map();

// Extract themes from text
export const extractThemes = (text, options = {}) => {
  const { minConfidence = 0.05, maxThemes = 5 } = options;
  
  const textHash = text.substring(0, 200);
  if (themeCache.has(textHash)) {
    return themeCache.get(textHash);
  }
  
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text.toLowerCase());
  
  const themeScores = {};
  
  Object.entries(themeKeywords).forEach(([theme, keywords]) => {
    let score = 0;
    keywords.forEach(keyword => {
      const count = tokens.filter(t => t.includes(keyword)).length;
      score += count;
    });
    const normalizedScore = score / Math.max(tokens.length, 1);
    themeScores[theme] = parseFloat(normalizedScore.toFixed(4));
  });
  
  const activeThemes = Object.entries(themeScores)
    .filter(([_, score]) => score >= minConfidence)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxThemes);
  
  const dominantTheme = activeThemes.length > 0 ? activeThemes[0][0] : 'neutral';
  
  const totalScore = activeThemes.reduce((sum, [_, score]) => sum + score, 0);
  const themesWithPercentage = activeThemes.map(([theme, score]) => ({
    theme,
    score,
    percentage: totalScore > 0 ? Math.round((score / totalScore) * 100) : 0
  }));
  
  const themeTags = themesWithPercentage.map(t => ({
    name: t.theme,
    confidence: t.percentage,
    icon: getThemeIcon(t.theme)
  }));
  
  const result = {
    dominant: dominantTheme,
    themes: themesWithPercentage,
    tags: themeTags,
    allScores: themeScores,
    confidence: activeThemes.length > 0 ? activeThemes[0][1] : 0,
    themeCount: activeThemes.length,
    analyzedAt: new Date().toISOString()
  };
  
  themeCache.set(textHash, result);
  return result;
};

const getThemeIcon = (theme) => {
  const icons = {
    love: '💕', separation: '💔', nature: '🌿', spirituality: '🕌',
    sorrow: '😢', hope: '🌟', patriotism: '🇮🇳', resistance: '✊',
    philosophy: '📖', celebration: '🎉', wisdom: '🧠', friendship: '🤝',
    neutral: '📝'
  };
  return icons[theme] || '📖';
};