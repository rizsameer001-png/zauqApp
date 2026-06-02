// server/services/sentimentService.js
import natural from 'natural';

// Comprehensive sentiment lexicon for Urdu poetry
const sentimentLexicon = {
  // Positive emotions (love, joy, hope)
  'ishq': 0.8, 'mohabbat': 0.7, 'pyar': 0.7, 'ulfat': 0.6,
  'khushi': 0.9, 'anand': 0.8, 'rahat': 0.6, 'sukoon': 0.5,
  'umeed': 0.7, 'falah': 0.6, 'kamyaabi': 0.7, 'jeet': 0.6,
  'husn': 0.5, 'jamal': 0.5, 'rang': 0.4, 'bahar': 0.6,
  'saba': 0.4, 'gulshan': 0.5, 'chaman': 0.5,
  
  // Negative emotions (sadness, pain, grief)
  'dard': -0.8, 'gham': -0.9, 'sog': -0.8, 'aansu': -0.7,
  'roona': -0.6, 'fariyaad': -0.7, 'bichar': -0.8, 'judai': -0.9,
  'tanhai': -0.7, 'vehshat': -0.6, 'shiddat': -0.5, 'karb': -0.8,
  'azab': -0.7, 'zaher': -0.6, 'ghurbat': -0.5, 'museebat': -0.6,
  'ranj': -0.8, 'alam': -0.7, 'bebasi': -0.6,
  
  // Love words
  'dil': 0.3, 'jaan': 0.4, 'sanam': 0.6, 'yaar': 0.5,
  'mehboob': 0.6, 'aashiq': 0.5, 'mashooq': 0.5,
  
  // Intensifiers
  'bohat': 0, 'bht': 0, 'zyada': 0, 'kafi': 0,
  'intihai': 0, 'nihaayat': 0, 'beshumar': 0
};

// English sentiment lexicon
const englishLexicon = {
  'love': 0.8, 'happy': 0.9, 'joy': 0.9, 'peace': 0.6,
  'sad': -0.8, 'pain': -0.7, 'hurt': -0.7, 'alone': -0.6,
  'hope': 0.7, 'dream': 0.5, 'beautiful': 0.6, 'wonderful': 0.7,
  'cry': -0.6, 'tears': -0.6, 'broken': -0.7, 'lost': -0.5,
  'grateful': 0.7, 'blessed': 0.6, 'amazing': 0.8
};

// Detect language of text
const detectLanguage = (text) => {
  const urduPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  if (urduPattern.test(text)) return 'urdu';
  return 'english';
};

// Extract emotions from text
const extractEmotions = (tokens, scores) => {
  const emotions = {
    joy: 0, sadness: 0, anger: 0, fear: 0, love: 0, neutral: 0
  };
  
  const joyWords = ['khushi', 'happiness', 'joy', 'anand', 'happy', 'sukoon', 'umeed'];
  const sadWords = ['gham', 'sorrow', 'sad', 'dard', 'pain', 'ranj', 'alam', 'aansu'];
  const loveWords = ['ishq', 'love', 'mohabbat', 'pyar', 'sanam', 'yaar', 'mehboob'];
  const angerWords = ['ghussa', 'anger', 'rage', 'fury', 'gussa'];
  const fearWords = ['dar', 'fear', 'anxiety', 'worry', 'khauf'];
  
  tokens.forEach(token => {
    if (joyWords.some(w => token.includes(w))) emotions.joy += Math.abs(scores[token] || 0.3);
    if (sadWords.some(w => token.includes(w))) emotions.sadness += Math.abs(scores[token] || 0.3);
    if (loveWords.some(w => token.includes(w))) emotions.love += Math.abs(scores[token] || 0.3);
    if (angerWords.some(w => token.includes(w))) emotions.anger += 0.5;
    if (fearWords.some(w => token.includes(w))) emotions.fear += 0.4;
  });
  
  // Normalize
  const max = Math.max(...Object.values(emotions));
  if (max > 0) {
    Object.keys(emotions).forEach(key => {
      emotions[key] = Math.round((emotions[key] / max) * 100);
    });
  }
  
  const dominant = Object.entries(emotions).sort((a, b) => b[1] - a[1])[0][0];
  
  return { emotions, dominant };
};

// Main sentiment analysis function
export const analyzeSentiment = (text) => {
  if (!text || text.trim().length === 0) {
    return {
      sentiment: 'neutral',
      score: 0,
      confidence: 0,
      emotions: { joy: 0, sadness: 0, anger: 0, fear: 0, love: 0, neutral: 100 },
      dominantEmotion: 'neutral',
      summary: 'No text to analyze'
    };
  }
  
  const language = detectLanguage(text);
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text.toLowerCase());
  
  const lexicon = language === 'urdu' ? sentimentLexicon : englishLexicon;
  
  let totalScore = 0;
  let scoredWords = 0;
  const wordScores = {};
  
  tokens.forEach(token => {
    const cleanToken = token.replace(/[^\w]/g, '');
    if (lexicon[cleanToken] !== undefined) {
      totalScore += lexicon[cleanToken];
      wordScores[cleanToken] = lexicon[cleanToken];
      scoredWords++;
    }
  });
  
  const sentimentScore = scoredWords > 0 ? totalScore / scoredWords : 0;
  
  let sentiment = 'neutral';
  if (sentimentScore > 0.2) sentiment = 'positive';
  else if (sentimentScore < -0.2) sentiment = 'negative';
  
  const confidence = Math.min(100, Math.round((scoredWords / Math.max(tokens.length, 1)) * 100));
  const { emotions, dominant } = extractEmotions(tokens, lexicon);
  
  const getSummary = () => {
    if (sentiment === 'positive') {
      if (emotions.love > 50) return 'This poem expresses deep love and affection';
      if (emotions.joy > 50) return 'A joyful and uplifting poem celebrating happiness';
      return 'The poem has a positive and optimistic tone';
    }
    if (sentiment === 'negative') {
      if (emotions.sadness > 50) return 'A melancholic poem filled with sorrow and longing';
      if (emotions.anger > 50) return 'The poem conveys anger and frustration';
      return 'The poem explores themes of pain and suffering';
    }
    return 'The poem maintains a balanced, contemplative tone';
  };
  
  return {
    sentiment,
    score: parseFloat(sentimentScore.toFixed(3)),
    confidence,
    language,
    wordCount: tokens.length,
    sentimentWordsFound: scoredWords,
    emotions,
    dominantEmotion: dominant,
    summary: getSummary(),
    intensity: Math.abs(sentimentScore),
    analyzedAt: new Date().toISOString()
  };
};