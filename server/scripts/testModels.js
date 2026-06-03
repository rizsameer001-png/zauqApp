// server/scripts/testModels.js
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// API Keys
const HF_TOKEN = process.env.HUGGING_FACE_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;

// Hugging Face models to test (free tier accessible)
const HUGGING_FACE_MODELS = [
  { 
    name: 'microsoft/phi-2', 
    endpoint: 'https://api-inference.huggingface.co/models/microsoft/phi-2', 
    size: '2.7B',
    type: 'text-generation'
  },
  { 
    name: 'mistralai/Mistral-7B-Instruct-v0.3', 
    endpoint: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3', 
    size: '7B',
    type: 'text-generation'
  },
  { 
    name: 'meta-llama/Llama-3.2-1B-Instruct', 
    endpoint: 'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct', 
    size: '1B',
    type: 'text-generation'
  },
  { 
    name: 'google/flan-t5-large', 
    endpoint: 'https://api-inference.huggingface.co/models/google/flan-t5-large', 
    size: '780M',
    type: 'text-generation'
  },
  { 
    name: 'tiiuae/falcon-7b-instruct', 
    endpoint: 'https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct', 
    size: '7B',
    type: 'text-generation'
  },
  { 
    name: 'HuggingFaceH4/zephyr-7b-beta', 
    endpoint: 'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta', 
    size: '7B',
    type: 'text-generation'
  },
  { 
    name: 'bigscience/bloom-3b', 
    endpoint: 'https://api-inference.huggingface.co/models/bigscience/bloom-3b', 
    size: '3B',
    type: 'text-generation'
  },
  { 
    name: 'EleutherAI/gpt-neo-2.7B', 
    endpoint: 'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B', 
    size: '2.7B',
    type: 'text-generation'
  },
  { 
    name: 'microsoft/DialoGPT-medium', 
    endpoint: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', 
    size: '345M',
    type: 'conversational'
  },
  { 
    name: 'gpt2', 
    endpoint: 'https://api-inference.huggingface.co/models/gpt2', 
    size: '124M',
    type: 'text-generation'
  }
];

// Test prompt for poetry analysis (short to stay within free limits)
const TEST_PROMPT = `Analyze this short poem and respond with JSON only (no other text):

Poem: "The moon shines bright in the dark night sky, Guiding lost souls as time passes by."

Respond with this exact JSON format:
{"themes": ["Nature", "Hope", "Guidance"], "tone": "Peaceful", "sentiment": "positive", "emotions": ["Peace", "Hope"], "meaning": "The moon provides guidance in darkness", "literaryDevices": ["Imagery", "Personification"], "rhymeScheme": "AABB", "difficulty": "beginner"}`;

// ============================================
// TEST GEMINI API
// ============================================
export async function testGemini() {
  console.log('\n🔍 TESTING GEMINI API\n');
  console.log('='.repeat(60));
  
  if (!GEMINI_KEY) {
    console.log('⚠️  Gemini API key not configured in .env file');
    console.log('   Add: GEMINI_API_KEY=your_key_here');
    return { working: false, error: 'No API key' };
  }
  
  console.log(`📡 API Key: ${GEMINI_KEY.substring(0, 15)}...`);
  
  try {
    const startTime = Date.now();
    const response = await axios({
      method: 'post',
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_KEY}`,
      data: {
        contents: [{
          parts: [{ text: "Respond with JSON only: {\"status\": \"ok\"}" }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 50
        }
      },
      timeout: 10000
    });
    
    const responseTime = Date.now() - startTime;
    
    if (response.status === 200 && response.data) {
      console.log(`✅ Gemini API is WORKING! (${responseTime}ms)`);
      return { working: true, responseTime, provider: 'gemini' };
    } else {
      console.log(`❌ Gemini returned status: ${response.status}`);
      return { working: false, error: `Status ${response.status}` };
    }
  } catch (error) {
    if (error.response?.status === 403) {
      console.log('❌ Gemini API key is invalid or expired');
      console.log('   Please check your GEMINI_API_KEY');
    } else if (error.response?.status === 429) {
      console.log('❌ Gemini rate limit exceeded');
    } else if (error.code === 'ECONNABORTED') {
      console.log('❌ Gemini connection timeout');
    } else {
      console.log(`❌ Gemini error: ${error.message}`);
    }
    return { working: false, error: error.message };
  }
}

// ============================================
// TEST DEEPSEEK API
// ============================================
export async function testDeepSeek() {
  console.log('\n🔍 TESTING DEEPSEEK API\n');
  console.log('='.repeat(60));
  
  if (!DEEPSEEK_KEY) {
    console.log('⚠️  DeepSeek API key not configured in .env file');
    console.log('   Add: DEEPSEEK_API_KEY=your_key_here');
    return { working: false, error: 'No API key' };
  }
  
  console.log(`📡 API Key: ${DEEPSEEK_KEY.substring(0, 15)}...`);
  
  try {
    const startTime = Date.now();
    const response = await axios({
      method: 'post',
      url: 'https://api.deepseek.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_KEY}`
      },
      data: {
        model: 'deepseek-chat',
        messages: [
          { role: 'user', content: 'Respond with JSON: {"status": "ok"}' }
        ],
        max_tokens: 50,
        temperature: 0.1
      },
      timeout: 10000
    });
    
    const responseTime = Date.now() - startTime;
    
    if (response.status === 200 && response.data?.choices?.[0]?.message?.content) {
      console.log(`✅ DeepSeek API is WORKING! (${responseTime}ms)`);
      return { working: true, responseTime, provider: 'deepseek' };
    } else {
      console.log(`❌ DeepSeek returned unexpected response`);
      return { working: false, error: 'Invalid response' };
    }
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('❌ DeepSeek API key is invalid');
      console.log('   Please check your DEEPSEEK_API_KEY');
    } else if (error.response?.status === 429) {
      console.log('❌ DeepSeek rate limit exceeded');
    } else {
      console.log(`❌ DeepSeek error: ${error.message}`);
    }
    return { working: false, error: error.message };
  }
}

// ============================================
// TEST HUGGING FACE MODELS
// ============================================
export async function testHuggingFaceModels() {
  console.log('\n🔍 TESTING HUGGING FACE MODELS\n');
  console.log('='.repeat(60));
  
  if (!HF_TOKEN) {
    console.log('⚠️  Hugging Face API key not configured in .env file');
    console.log('   Add: HUGGING_FACE_API_KEY=your_key_here');
    return [];
  }
  
  if (!HF_TOKEN || !HF_TOKEN.startsWith('hf_')) {
    console.log('⚠️  Hugging Face token appears to be a placeholder or invalid');
    console.log('   Please get a valid token from: https://huggingface.co/settings/tokens');
  }
  
  console.log(`📡 API Key: ${HF_TOKEN.substring(0, 15)}...`);
  console.log(`📡 Testing ${HUGGING_FACE_MODELS.length} models...\n`);
  
  const workingModels = [];
  const loadingModels = [];
  const failedModels = [];
  
  for (let i = 0; i < HUGGING_FACE_MODELS.length; i++) {
    const model = HUGGING_FACE_MODELS[i];
    console.log(`[${i + 1}/${HUGGING_FACE_MODELS.length}] Testing ${model.name} (${model.size})...`);
    
    try {
      const startTime = Date.now();
      const response = await axios({
        method: 'post',
        url: model.endpoint,
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        data: {
          inputs: TEST_PROMPT,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
            do_sample: true,
            return_full_text: false,
            wait_for_model: true  // Wait for model to load if needed
          }
        },
        timeout: 30000  // 30 second timeout for model loading
      });
      
      const responseTime = Date.now() - startTime;
      
      if (response.status === 200) {
        console.log(`   ✅ WORKING! (${responseTime}ms)`);
        workingModels.push({
          ...model,
          responseTime,
          status: 'working',
          testedAt: new Date().toISOString()
        });
      } else {
        console.log(`   ❌ Failed with status: ${response.status}`);
        failedModels.push({ ...model, status: 'failed', reason: `HTTP ${response.status}` });
      }
    } catch (error) {
      if (error.response?.status === 503) {
        // Model is loading - this is normal for free tier
        console.log(`   ⏳ Model is loading (503) - May work after warmup`);
        loadingModels.push({
          ...model,
          status: 'loading',
          message: 'Model needs to be loaded first (takes 1-2 minutes)'
        });
      } else if (error.response?.status === 401) {
        console.log(`   🔑 Authentication failed - Invalid token`);
        console.log(`   Please check your HUGGING_FACE_API_KEY`);
        break; // Stop testing if auth fails
      } else if (error.response?.status === 429) {
        console.log(`   ⚠️  Rate limited - Too many requests`);
        console.log(`   Waiting 5 seconds before continuing...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else if (error.code === 'ECONNABORTED') {
        console.log(`   ⏰ Timeout - Model might be slow or unavailable`);
        failedModels.push({ ...model, status: 'timeout', error: error.message });
      } else {
        console.log(`   ❌ Error: ${error.message}`);
        failedModels.push({ ...model, status: 'error', error: error.message });
      }
    }
    
    // Wait between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Print summary
  console.log('\n📊 HUGGING FACE TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Working models: ${workingModels.length}`);
  console.log(`⏳ Loading models: ${loadingModels.length}`);
  console.log(`❌ Failed models: ${failedModels.length}`);
  
  if (workingModels.length > 0) {
    console.log('\n✅ WORKING MODELS (Use these):');
    workingModels.forEach(m => {
      console.log(`   • ${m.name} (${m.size}) - ${m.responseTime}ms`);
    });
  }
  
  if (loadingModels.length > 0) {
    console.log('\n⏳ LOADING MODELS (May work after first call):');
    loadingModels.forEach(m => {
      console.log(`   • ${m.name} (${m.size}) - ${m.message}`);
    });
  }
  
  return workingModels;
}

// ============================================
// TEST ALL PROVIDERS
// ============================================
export async function testAllProviders() {
  console.log('\n🚀 STARTING AI PROVIDER TESTS\n');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(60));
  
  const results = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    providers: {
      gemini: null,
      deepseek: null,
      huggingface: []
    }
  };
  
  // Test Gemini
  const geminiResult = await testGemini();
  results.providers.gemini = geminiResult;
  
  // Test DeepSeek
  const deepseekResult = await testDeepSeek();
  results.providers.deepseek = deepseekResult;
  
  // Test Hugging Face
  const hfResults = await testHuggingFaceModels();
  results.providers.huggingface = hfResults;
  
  // Save results to file
  const resultsPath = path.join(__dirname, '../model-test-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n📁 Results saved to: ${resultsPath}`);
  
  // Final summary
  console.log('\n🎯 FINAL SUMMARY');
  console.log('='.repeat(60));
  console.log(`Gemini:     ${geminiResult.working ? '✅ WORKING' : '❌ NOT WORKING'}`);
  console.log(`DeepSeek:   ${deepseekResult.working ? '✅ WORKING' : '❌ NOT WORKING'}`);
  console.log(`Hugging Face: ${hfResults.length} working models found`);
  
  if (hfResults.length === 0 && !geminiResult.working && !deepseekResult.working) {
    console.log('\n⚠️  WARNING: No AI providers are working!');
    console.log('   The system will use fallback analysis only.');
    console.log('\n   To fix:');
    console.log('   1. Check your API keys in .env file');
    console.log('   2. For Hugging Face, get a free token from: https://huggingface.co/settings/tokens');
    console.log('   3. For Gemini, get a key from: https://makersuite.google.com/app/apikey');
    console.log('   4. For DeepSeek, get a key from: https://platform.deepseek.com/');
  } else if (hfResults.length > 0) {
    console.log('\n💡 Recommended Hugging Face models to use:');
    hfResults.slice(0, 3).forEach(m => {
      console.log(`   - ${m.name} (${m.size})`);
    });
  }
  
  return results;
}

// ============================================
// QUICK TEST (Single model)
// ============================================
export async function quickTest(modelName = 'microsoft/phi-2') {
  console.log(`\n🚀 Quick testing model: ${modelName}\n`);
  
  const model = HUGGING_FACE_MODELS.find(m => m.name === modelName);
  if (!model) {
    console.log(`❌ Model ${modelName} not found in test list`);
    return null;
  }
  
  if (!HF_TOKEN) {
    console.log('❌ HUGGING_FACE_API_KEY not set');
    return null;
  }
  
  try {
    const response = await axios({
      method: 'post',
      url: model.endpoint,
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {
        inputs: TEST_PROMPT,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
          wait_for_model: true
        }
      },
      timeout: 30000
    });
    
    if (response.status === 200) {
      console.log(`✅ ${modelName} is WORKING!`);
      console.log(`Response preview:`, JSON.stringify(response.data).substring(0, 200));
      return { working: true, model, response: response.data };
    }
  } catch (error) {
    console.log(`❌ ${modelName} failed: ${error.message}`);
    return { working: false, model, error: error.message };
  }
}

// ============================================
// RUN TESTS IF SCRIPT IS EXECUTED DIRECTLY
// ============================================
if (import.meta.url === `file://${process.argv[1]}`) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  
  if (args[0] === '--quick' && args[1]) {
    // Quick test for specific model
    quickTest(args[1]).catch(console.error);
  } else if (args[0] === '--gemini') {
    // Test only Gemini
    testGemini().catch(console.error);
  } else if (args[0] === '--deepseek') {
    // Test only DeepSeek
    testDeepSeek().catch(console.error);
  } else if (args[0] === '--hf') {
    // Test only Hugging Face
    testHuggingFaceModels().catch(console.error);
  } else {
    // Run all tests
    testAllProviders().catch(console.error);
  }
}

export default {
  testGemini,
  testDeepSeek,
  testHuggingFaceModels,
  testAllProviders,
  quickTest
};