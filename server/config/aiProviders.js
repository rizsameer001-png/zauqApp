// server/config/aiProviders.js
import dotenv from 'dotenv';
dotenv.config();

export const AI_PROVIDERS = {
  DEEPSEEK: {
    name: 'DeepSeek',
    priority: 1,
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    apiKey: process.env.DEEPSEEK_API_KEY,
    model: 'deepseek-chat',
    timeout: 10000,
    enabled: !!process.env.DEEPSEEK_API_KEY
  },
  GEMINI: {
    name: 'Google Gemini',
    priority: 2,
    apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    apiKey: process.env.GEMINI_API_KEY,
    model: 'gemini-pro',
    timeout: 15000,
    enabled: !!process.env.GEMINI_API_KEY
  },
  HUGGING_FACE: {
    name: 'Hugging Face',
    priority: 3,
    apiUrl: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
    apiKey: process.env.HUGGING_FACE_API_KEY,
    model: 'mistral-7b',
    timeout: 20000,
    enabled: !!process.env.HUGGING_FACE_API_KEY,
    isFree: true
  }
};

// Get available providers sorted by priority
export const getAvailableProviders = () => {
  return Object.values(AI_PROVIDERS)
    .filter(provider => provider.enabled)
    .sort((a, b) => a.priority - b.priority);
};