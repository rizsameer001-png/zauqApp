// server/test-orchestrator.js
import { analyzePoem, checkHealth } from './services/aiOrchestrator.js';
import dotenv from 'dotenv';

dotenv.config();

const testPoem = `دل تنگ ہو مدینے سے جب اٹھ چلا حسینؑ
تو رو رو کے یوں پکارا مرے دل کا چین حسینؑ

یا رسول خدا مجھے تم اجازت دو
میرا غم کھا رہا ہے مجھے تم ضرورت دو`;

const testPoemEnglish = `The sun sets golden in the west,
Bringing peace and gentle rest.
The birds return to their warm nest,
As nature puts her children to test.`;

async function runTest() {
  console.log('\n🚀 Testing AI Orchestrator\n');
  console.log('='.repeat(60));
  
  // Check health
  console.log('\n📊 Health Check:');
  const health = await checkHealth();
  console.log(JSON.stringify(health, null, 2));
  
  // Test with Urdu poem
  console.log('\n📝 Testing with Urdu poem...');
  console.log('='.repeat(60));
  const result1 = await analyzePoem(testPoem, 'Test Urdu Poem');
  
  console.log('\n📊 Result:');
  console.log(`Provider: ${result1.provider}`);
  console.log(`Model: ${result1.modelUsed || 'N/A'}`);
  console.log(`Success: ${result1.success}`);
  console.log(`Analysis:`, JSON.stringify(result1.analysis, null, 2));
  
  // Test with English poem
  console.log('\n📝 Testing with English poem...');
  console.log('='.repeat(60));
  const result2 = await analyzePoem(testPoemEnglish, 'Test English Poem');
  
  console.log('\n📊 Result:');
  console.log(`Provider: ${result2.provider}`);
  console.log(`Model: ${result2.modelUsed || 'N/A'}`);
  console.log(`Analysis:`, JSON.stringify(result2.analysis, null, 2));
}

runTest().catch(console.error);