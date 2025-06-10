import chalk from 'chalk';
import Table from 'cli-table3';

export class Reporter {
  constructor() {
    this.colors = {
      fresh: chalk.green,
      stale: chalk.yellow,
      outdated: chalk.orange,
      ancient: chalk.red,
      title: chalk.bold.cyan,
      subtitle: chalk.bold.white,
      success: chalk.green,
      warning: chalk.yellow,
      error: chalk.red,
      info: chalk.blue
    };
  }

  async generateReport(analysis) {
    console.log('\n' + this.colors.title('📊 PRODUCTBOARD HYGIENE ANALYSIS REPORT'));
    console.log('=' .repeat(60));
    
    this.printSummary(analysis);
    this.printDetailedAnalysis(analysis);
    this.printRecommendations(analysis);
    await this.printHygieneScore(analysis);
  }

  printSummary(analysis) {
    const { summary } = analysis;
    
    console.log('\n' + this.colors.subtitle('📋 EXECUTIVE SUMMARY'));
    console.log('-'.repeat(30));
    
    const table = new Table({
      head: ['Metric', 'Count', 'Percentage'],
      colWidths: [20, 10, 15]
    });

    const total = summary.totalItems;
    if (total === 0) {
      console.log(this.colors.warning('No data available for analysis'));
      return;
    }

    table.push(
      ['Total Items', total, '100.0%'],
      [this.colors.success('Fresh (< 3 months)'), total - summary.staleItems - summary.outdatedItems - summary.ancientItems, `${(((total - summary.staleItems - summary.outdatedItems - summary.ancientItems) / total) * 100).toFixed(1)}%`],
      [this.colors.warning('Stale (3-6 months)'), summary.staleItems, `${((summary.staleItems / total) * 100).toFixed(1)}%`],
      [this.colors.orange('Outdated (6-12 months)'), summary.outdatedItems, `${((summary.outdatedItems / total) * 100).toFixed(1)}%`],
      [this.colors.error('Ancient (12+ months)'), summary.ancientItems, `${((summary.ancientItems / total) * 100).toFixed(1)}%`]
    );

    console.log(table.toString());
  }

  printDetailedAnalysis(analysis) {
    console.log('\n' + this.colors.subtitle('🔍 DETAILED BREAKDOWN BY TYPE'));
    console.log('-'.repeat(40));

    const table = new Table({
      head: ['Type', 'Total', 'Fresh', 'Stale', 'Outdated', 'Ancient', 'Oldest Item'],
      colWidths: [12, 8, 8, 8, 10, 8, 25]
    });

    for (const [type, data] of Object.entries(analysis.byType)) {
      if (data.total > 0) {
        table.push([
          type.toUpperCase(),
          data.total,
          this.colors.success(data.fresh),
          this.colors.warning(data.stale),
          this.colors.orange(data.outdated),
          this.colors.error(data.ancient),
          data.oldestItem ? `${data.oldestItem.name.substring(0, 22)}...` : 'N/A'
        ]);
      }
    }

    console.log(table.toString());
  }

  printRecommendations(analysis) {
    console.log('\n' + this.colors.subtitle('💡 RECOMMENDATIONS'));
    console.log('-'.repeat(25));

    if (analysis.recommendations.length === 0) {
      console.log(this.colors.info('No specific recommendations at this time.'));
      return;
    }

    analysis.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });
  }

  async printHygieneScore(analysis) {
    const hygieneAnalyzer = new (await import('./hygiene-analyzer.js')).HygieneAnalyzer();
    const score = hygieneAnalyzer.calculateHygieneScore(analysis);
    
    console.log('\n' + this.colors.subtitle('🎯 HYGIENE SCORE'));
    console.log('-'.repeat(20));
    
    let scoreColor;
    let scoreLabel;
    
    if (score >= 80) {
      scoreColor = this.colors.success;
      scoreLabel = 'EXCELLENT';
    } else if (score >= 60) {
      scoreColor = this.colors.warning;
      scoreLabel = 'GOOD';
    } else if (score >= 40) {
      scoreColor = this.colors.orange;
      scoreLabel = 'NEEDS IMPROVEMENT';
    } else {
      scoreColor = this.colors.error;
      scoreLabel = 'CRITICAL';
    }

    console.log(`Overall Score: ${scoreColor(score + '/100')} (${scoreColor(scoreLabel)})`);
    
    console.log('\nScore Breakdown:');
    console.log('• 80-100: Excellent hygiene, most items are fresh');
    console.log('• 60-79:  Good hygiene, minor cleanup needed');
    console.log('• 40-59:  Needs improvement, significant old items');
    console.log('• 0-39:   Critical, major cleanup required');
  }

  printQuickStats(analysis) {
    const { summary } = analysis;
    
    if (summary.totalItems === 0) {
      console.log(this.colors.warning('No data to display'));
      return;
    }

    console.log('\n' + this.colors.title('🚀 QUICK STATS'));
    console.log(`Total Items: ${this.colors.info(summary.totalItems)}`);
    console.log(`Items Needing Attention: ${this.colors.error(summary.staleItems + summary.outdatedItems + summary.ancientItems)}`);
    console.log(`Hygiene Issues: ${this.colors.warning(((summary.staleItems + summary.outdatedItems + summary.ancientItems) / summary.totalItems * 100).toFixed(1) + '%')}`);
  }
}