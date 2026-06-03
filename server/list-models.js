// server/list-models.js
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
  console.log('🔍 Fetching available models...');
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    if (!response.ok) {
      console.error('❌ Error:', response.status);
      const error = await response.text();
      console.error(error);
      return;
    }
    
    const data = await response.json();
    console.log('✅ Available models:');
    data.models.forEach(model => {
      console.log(`  - ${model.name} (${model.displayName})`);
      console.log(`    Supported methods: ${model.supportedGenerationMethods?.join(', ')}`);
    });
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

listModels();