// test-smart-engine.js
import { smartTransliterate, testSmartEngine } from './services/smartTransliterationEngine.js';

console.log('\n🔬 SMART TRANSLITERATION ENGINE TEST\n');
console.log('='.repeat(60));

// Test with Hindi poem
const hindiPoem = `कर्बला की रेत पे खून की लकीर है,
हर कदम पे सब्र की एक नई तस्वीर है।
प्यास की तपिश में भी लब पे दुआ रही,
हुसैन का ये ही अंदाज़-ए-तक़दीर है।`;

console.log('Original Hindi:');
console.log(hindiPoem);
console.log('\n' + '='.repeat(60));

const result = smartTransliterate(hindiPoem, 'hindi');

console.log('\nTransliterated Roman:');
console.log(result.transliteration);
console.log('\n' + '='.repeat(60));
console.log(`Method: ${result.method}`);
console.log(`Language: ${result.language}`);
console.log(`Stats:`, result.stats);