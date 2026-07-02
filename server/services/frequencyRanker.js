// ============================================
// FREQUENCY RANKER
// Word usage ranking for better suggestions
// ============================================

class FrequencyRanker {
  constructor() {
    this.frequencyMap = new Map();
    this.rankMap = new Map();
  }
  
  // ============================================
  // Initialize with frequency data
  // ============================================
  init(frequencyData) {
    for (const [word, freq] of Object.entries(frequencyData)) {
      this.frequencyMap.set(word, freq);
    }
    this.buildRanks();
  }
  
  // ============================================
  // Build ranking tiers
  // ============================================
  buildRanks() {
    const sorted = Array.from(this.frequencyMap.entries())
      .sort((a, b) => b[1] - a[1]);
    
    const total = sorted.length;
    const tiers = {
      top1: Math.floor(total * 0.01),
      top5: Math.floor(total * 0.05),
      top10: Math.floor(total * 0.10),
      top25: Math.floor(total * 0.25),
      top50: Math.floor(total * 0.50)
    };
    
    for (let i = 0; i < sorted.length; i++) {
      const [word, freq] = sorted[i];
      let rank = 'very_low';
      
      if (i < tiers.top1) rank = 'legendary';
      else if (i < tiers.top5) rank = 'very_high';
      else if (i < tiers.top10) rank = 'high';
      else if (i < tiers.top25) rank = 'medium';
      else if (i < tiers.top50) rank = 'low';
      else rank = 'very_low';
      
      this.rankMap.set(word, { rank, frequency: freq, position: i + 1 });
    }
  }
  
  // ============================================
  // Get rank for word
  // ============================================
  getRank(word) {
    return this.rankMap.get(word) || { rank: 'unknown', frequency: 0, position: -1 };
  }
  
  // ============================================
  // Compare two suggestions by frequency
  // ============================================
  compareByFrequency(suggestions) {
    return suggestions.sort((a, b) => {
      const rankA = this.getRank(a.word);
      const rankB = this.getRank(b.word);
      return rankB.frequency - rankA.frequency;
    });
  }
  
  // ============================================
  // Get top N suggestions
  // ============================================
  getTopSuggestions(suggestions, n = 3) {
    const ranked = this.compareByFrequency(suggestions);
    return ranked.slice(0, n);
  }
  
  // ============================================
  // Update frequency (user feedback)
  // ============================================
  updateFrequency(word, increment = 1) {
    const current = this.frequencyMap.get(word) || 0;
    this.frequencyMap.set(word, current + increment);
    this.buildRanks(); // Rebuild ranks
  }
}

export default new FrequencyRanker();