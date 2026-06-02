// client/src/components/ai/AIAnalysisPanel.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Loader2, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import aiAPI from '../../api/aiAPI';

const AIAnalysisPanel = ({ poemSlug, poemContent, onAnalysisComplete }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const handleAnalyze = async () => {
    setLoading(true);
    try {
      let response;
      if (poemSlug) {
        response = await aiAPI.analyzePoemBySlug(poemSlug);
      } else {
        response = await aiAPI.analyzePoem({ poemText: poemContent, language: 'urdu' });
      }
      
      if (response.success) {
        setAnalysis(response.data.analysis);
        if (onAnalysisComplete) onAnalysisComplete(response.data.analysis);
        toast.success(`Analysis by ${response.data.provider}`);
      }
    } catch (error) {
      toast.error('Failed to analyze poem');
    } finally {
      setLoading(false);
    }
  };
  
  const copyAnalysis = () => {
    if (!analysis) return;
    const text = `
Poem Analysis:
Themes: ${analysis.themes?.join(', ')}
Tone: ${analysis.tone}
Sentiment: ${analysis.sentiment}
Meaning: ${analysis.meaning}
Literary Devices: ${analysis.literaryDevices?.join(', ')}
    `.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Analysis copied!');
    setTimeout(() => setCopied(false), 2000);
  };
  
  if (!analysis && !loading) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAnalyze}
        className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <Brain className="h-5 w-5" />
          <span className="font-medium">AI Literary Analysis</span>
          <Sparkles className="h-4 w-4 text-yellow-300" />
        </div>
        <span className="text-sm opacity-80 group-hover:opacity-100">Analyze →</span>
      </motion.button>
    );
  }
  
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-3" />
        <p className="text-gray-600">AI is analyzing this poem...</p>
        <p className="text-xs text-gray-400 mt-1">Using multi-AI system for best results</p>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-white"
        >
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <span className="font-semibold">AI Literary Analysis</span>
            <Sparkles className="h-4 w-4 text-yellow-300" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); copyAnalysis(); }}
              className="p-1 hover:bg-white/20 rounded transition"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
        </button>
      </div>
      
      {expanded && (
        <div className="p-5 space-y-4">
          {/* Themes */}
          {analysis?.themes?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Themes</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.themes.map((theme, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Tone & Sentiment */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Tone</h4>
              <p className="text-gray-800 capitalize">{analysis?.tone || 'Unknown'}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Sentiment</h4>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  analysis?.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                  analysis?.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {analysis?.sentiment || 'Neutral'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Emotions */}
          {analysis?.emotions?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Emotions Detected</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.emotions.map((emotion, i) => (
                  <span key={i} className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
                    {emotion}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Meaning */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Meaning & Interpretation</h4>
            <p className="text-gray-600 leading-relaxed">{analysis?.meaning}</p>
          </div>
          
          {/* Literary Devices */}
          {analysis?.literaryDevices?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Literary Devices</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.literaryDevices.map((device, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                    {device}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Rhyme Scheme & Difficulty */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            {analysis?.rhymeScheme && (
              <div>
                <h4 className="text-xs text-gray-500">Rhyme Scheme</h4>
                <p className="text-sm text-gray-700">{analysis.rhymeScheme}</p>
              </div>
            )}
            {analysis?.difficulty && (
              <div>
                <h4 className="text-xs text-gray-500">Difficulty</h4>
                <p className="text-sm text-gray-700 capitalize">{analysis.difficulty}</p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
            AI Analysis • {analysis?.modelUsed || 'Multi-AI System'}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AIAnalysisPanel;