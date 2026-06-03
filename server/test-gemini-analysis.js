// server/test-gemini-analysis.js
import dotenv from 'dotenv';
dotenv.config();

const poemText = `دِل تنگ ہو مدینے سے جب اٹھ چلا حسینؑ
دِل تنگ ہو مدینے سے جب اٹھ چلا حسینؑ
مضطر تھا یا رسول خدا (ص) کا لعل و غم
جا جا کے رو پڑا تھا جو وادیٔ حرم میں
آخر بنا دیا تھا جسے دینِ مصطفٰیؐ نے
قتلِ حسینؑ اصل میں ہے مرگِ یزید ہے`;

const apiKey = process.env.GEMINI_API_KEY;

// Try these models in order (from your available list)
const MODELS_TO_TRY = [
  'gemini-2.0-flash',           // Stable 2.0 version
  'gemini-flash-latest',        // Latest flash (might auto-resolve)
  'gemini-2.5-pro',             // Pro version (may have capacity)
  'gemini-2.0-flash-lite',      // Lite version (less demand)
  'gemini-2.5-flash-lite',      // Newer lite version
];

async function testGeminiAnalysis() {
  console.log('🟢 Testing Gemini Analysis API...');
  console.log('API Key exists:', !!apiKey);
  
  for (const modelName of MODELS_TO_TRY) {
    console.log(`\n🔄 Trying model: ${modelName}`);
    
    const prompt = `Analyze this Urdu poem and return ONLY valid JSON. Do not include any text outside the JSON object.

Poem: "${poemText}"

Return JSON format:
{
  "themes": ["theme1", "theme2", "theme3"],
  "tone": "emotional tone",
  "sentiment": "positive/negative/neutral",
  "emotions": ["emotion1", "emotion2"],
  "meaning": "Brief explanation in English",
  "literaryDevices": ["device1", "device2"],
  "rhymeScheme": "description",
  "difficulty": "beginner/intermediate/advanced"
}`;

    try {
      const startTime = Date.now();
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 600,
            topP: 0.9
          }
        })
      });
      
      const duration = Date.now() - startTime;
      console.log(`📡 Response status: ${response.status} (${duration}ms)`);
      
      if (!response.ok) {
        const error = await response.text();
        console.error(`❌ Failed: ${response.status} - ${error.substring(0, 150)}`);
        continue; // Try next model
      }
      
      const data = await response.json();
      let content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Parse JSON from response
      let jsonString = content.replace(/```json\s*/g, '').replace(/```\s*/g, '');
      const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        try {
          const analysis = JSON.parse(jsonMatch[0]);
          console.log('\n✅ SUCCESS with model:', modelName);
          console.log('✅ Analysis:', JSON.stringify(analysis, null, 2));
          return; // Exit on success
        } catch (e) {
          console.log('❌ JSON parse error:', e.message);
        }
      } else {
        console.log('❌ No JSON found in response');
      }
      
    } catch (error) {
      console.error('❌ Request failed:', error.message);
    }
  }
  
  console.log('\n❌ All models failed. Please check your API key or try again later.');
}

testGeminiAnalysis();