// server/test-apis.js
import dotenv from 'dotenv';
dotenv.config();

async function testDeepSeek() {
  console.log('\n🔵 Testing DeepSeek API...');
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey || apiKey === 'your_deepseek_api_key_here') {
    console.log('❌ DeepSeek API key is missing or invalid');
    return false;
  }
  
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: 'Say "API works"' }],
        max_tokens: 10
      })
    });
    
    if (response.ok) {
      console.log('✅ DeepSeek API is working!');
      return true;
    } else {
      const error = await response.text();
      console.log(`❌ DeepSeek API error: ${response.status} - ${error}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ DeepSeek connection error: ${error.message}`);
    return false;
  }
}

async function testGemini() {
  console.log('\n🟢 Testing Gemini API...');
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.log('❌ Gemini API key is missing or invalid');
    return false;
  }
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    if (response.ok) {
      console.log('✅ Gemini API is working!');
      return true;
    } else {
      const error = await response.text();
      console.log(`❌ Gemini API error: ${response.status} - ${error}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Gemini connection error: ${error.message}`);
    return false;
  }
}

async function testHuggingFace() {
  console.log('\n🟣 Testing Hugging Face API...');
  const apiKey = process.env.HUGGING_FACE_API_KEY;
  
  if (!apiKey || apiKey === 'your_huggingface_api_key_here') {
    console.log('❌ Hugging Face API key is missing or invalid');
    return false;
  }
  
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
      method: 'HEAD',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    if (response.ok || response.status === 403) {
      console.log('✅ Hugging Face API key is valid!');
      return true;
    } else {
      console.log(`❌ Hugging Face API error: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Hugging Face connection error: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🔍 Testing AI API Keys...\n');
  console.log('Environment variables loaded:');
  console.log('- DEEPSEEK_API_KEY:', process.env.DEEPSEEK_API_KEY ? '✅ Set' : '❌ Missing');
  console.log('- GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Missing');
  console.log('- HUGGING_FACE_API_KEY:', process.env.HUGGING_FACE_API_KEY ? '✅ Set' : '❌ Missing');
  
  await testDeepSeek();
  await testGemini();
  await testHuggingFace();
}

runTests();