// test-hindi-transliteration.js
import { hindiToRoman } from './services/transliterationService.js';

const hindiPoem = `कर्बला की रेत पे खून की लकीर है,
हर कदम पे सब्र की एक नई तस्वीर है।
प्यास की तपिश में भी लब पे दुआ रही,
हुसैन का ये ही अंदाज़-ए-तक़दीर है।
सर कटा मगर कभी झुका नहीं हक़ के लिए,
ये वफ़ा की इंतिहा, ये इश्क़ की ताबीर है।
ज़ुल्म के अंधेरों में रौशनी जली यहां,
हर तरफ़ हुसैनियत की एक तामीर है।
ज़ैनब की सदा से कांप उठा था दरबार भी,
ये हक़ की आवाज़ हर दौर की तफ़सीर है।
इंसान को सिखाता है ये पैग़ाम-ए-कर्बला,
सच और सब्र ही असल में तक़दीर है।`;

const result = hindiToRoman(hindiPoem);
console.log('Original (Hindi/Devanagari):');
console.log(hindiPoem);
console.log('\nTransliterated (Roman):');
console.log(result);