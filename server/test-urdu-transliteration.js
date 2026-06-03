// test-urdu-transliteration.js
import { generateTransliteration } from './services/transliterationService.js';

const urduPoem = `دل کی باتیں کہاں کہی جائیں
تیرے خوابوں میں کھو گئی ہیں
محبت کا یہ پیغام
دل سے دل تک جاتا ہے`;

console.log('Testing Urdu to Roman Transliteration\n');
console.log('=' .repeat(60));
console.log('Original (Urdu):');
console.log(urduPoem);
console.log('\n' + '=' .repeat(60));

const result = await generateTransliteration(urduPoem, 'urdu');

console.log('\nTransliterated (Roman):');
console.log(result.transliteration);
console.log('\n' + '=' .repeat(60));
console.log('Method:', result.method);
console.log('Stats:', result.stats);