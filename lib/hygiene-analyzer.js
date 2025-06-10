export class HygieneAnalyzer {
  constructor() {
    this.ageThresholds = {
      stale: 90,      // 3 months
      outdated: 180,  // 6 months
      ancient: 365    // 1 year
    };
  }

  analyzeData(data) {
    const analysis = {
      summary: {
        totalItems: 0,
        staleItems: 0,
        outdatedItems: 0,
        ancientItems: 0
      },
      byType: {},
      recommendations: []
    };

    const itemTypes = ['features', 'notes', 'objectives', 'initiatives', 'releases'];
    
    for (const type of itemTypes) {
      if (data[type] && Array.isArray(data[type])) {
        const typeAnalysis = this.analyzeItemType(data[type], type);
        analysis.byType[type] = typeAnalysis;
        
        analysis.summary.totalItems += typeAnalysis.total;
        analysis.summary.staleItems += typeAnalysis.stale;
        analysis.summary.outdatedItems += typeAnalysis.outdated;
        analysis.summary.ancientItems += typeAnalysis.ancient;
      }
    }

    analysis.recommendations = this.generateRecommendations(analysis);
    return analysis;
  }

  analyzeItemType(items, type) {
    const analysis = {
      total: items.length,
      fresh: 0,
      stale: 0,
      outdated: 0,
      ancient: 0,
      ageDistribution: {},
      oldestItem: null,
      newestItem: null
    };

    const now = new Date();
    
    for (const item of items) {
      const createdDate = this.parseDate(item.createdAt || item.created_at || item.dateCreated);
      const updatedDate = this.parseDate(item.updatedAt || item.updated_at || item.lastModified || item.dateModified);
      
      const relevantDate = updatedDate || createdDate;
      
      if (!relevantDate) {
        continue;
      }

      const ageInDays = Math.floor((now - relevantDate) / (1000 * 60 * 60 * 24));
      const ageCategory = this.categorizeAge(ageInDays);
      
      analysis[ageCategory]++;
      analysis.ageDistribution[ageInDays] = (analysis.ageDistribution[ageInDays] || 0) + 1;
      
      if (!analysis.oldestItem || relevantDate < this.parseDate(analysis.oldestItem.date)) {
        analysis.oldestItem = {
          id: item.id,
          name: item.name || item.title || item.subject || `${type} ${item.id}`,
          date: relevantDate.toISOString(),
          ageInDays
        };
      }
      
      if (!analysis.newestItem || relevantDate > this.parseDate(analysis.newestItem.date)) {
        analysis.newestItem = {
          id: item.id,
          name: item.name || item.title || item.subject || `${type} ${item.id}`,
          date: relevantDate.toISOString(),
          ageInDays
        };
      }
    }

    return analysis;
  }

  parseDate(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }

  categorizeAge(ageInDays) {
    if (ageInDays >= this.ageThresholds.ancient) return 'ancient';
    if (ageInDays >= this.ageThresholds.outdated) return 'outdated';
    if (ageInDays >= this.ageThresholds.stale) return 'stale';
    return 'fresh';
  }

  generateRecommendations(analysis) {
    const recommendations = [];
    const { summary, byType } = analysis;
    
    if (summary.totalItems === 0) {
      return ['No data available for analysis'];
    }

    const ancientPercentage = (summary.ancientItems / summary.totalItems) * 100;
    const outdatedPercentage = (summary.outdatedItems / summary.totalItems) * 100;
    const stalePercentage = (summary.staleItems / summary.totalItems) * 100;

    if (ancientPercentage > 20) {
      recommendations.push(`🚨 HIGH PRIORITY: ${ancientPercentage.toFixed(1)}% of items are over 1 year old - immediate review needed`);
    }

    if (outdatedPercentage > 30) {
      recommendations.push(`⚠️  MEDIUM PRIORITY: ${outdatedPercentage.toFixed(1)}% of items are 6+ months old - schedule review`);
    }

    if (stalePercentage > 40) {
      recommendations.push(`📋 LOW PRIORITY: ${stalePercentage.toFixed(1)}% of items are 3+ months old - consider updating`);
    }

    for (const [type, typeData] of Object.entries(byType)) {
      if (typeData.ancient > 0) {
        recommendations.push(`🔍 Review ${typeData.ancient} ancient ${type} (oldest: ${typeData.oldestItem?.name})`);
      }
    }

    if (recommendations.length === 0) {
      recommendations.push('✅ Good hygiene! Most items are relatively fresh');
    }

    return recommendations;
  }

  calculateHygieneScore(analysis) {
    const { summary } = analysis;
    
    if (summary.totalItems === 0) return 0;
    
    const freshWeight = 1.0;
    const staleWeight = 0.7;
    const outdatedWeight = 0.3;
    const ancientWeight = 0.1;
    
    const weightedScore = (
      (summary.totalItems - summary.staleItems - summary.outdatedItems - summary.ancientItems) * freshWeight +
      summary.staleItems * staleWeight +
      summary.outdatedItems * outdatedWeight +
      summary.ancientItems * ancientWeight
    ) / summary.totalItems;
    
    return Math.round(weightedScore * 100);
  }
}