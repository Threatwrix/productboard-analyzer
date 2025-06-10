#!/usr/bin/env node

import { Command } from 'commander';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { DataFetcher } from './lib/data-fetcher.js';
import { HygieneAnalyzer } from './lib/hygiene-analyzer.js';
import { Reporter } from './lib/reporter.js';

dotenv.config();

const program = new Command();

program
  .name('productboard-analyzer')
  .description('Analyze ProductBoard data for hygiene metrics')
  .version('1.0.0');

program
  .command('analyze')
  .description('Run full hygiene analysis')
  .option('-t, --token <token>', 'ProductBoard API token')
  .option('-q, --quick', 'Show quick stats only')
  .option('--stale-days <days>', 'Days to consider items stale', '90')
  .option('--outdated-days <days>', 'Days to consider items outdated', '180')
  .option('--ancient-days <days>', 'Days to consider items ancient', '365')
  .action(async (options) => {
    try {
      const token = options.token || process.env.PRODUCTBOARD_API_TOKEN;
      
      if (!token) {
        console.error(chalk.red('❌ ProductBoard API token is required'));
        console.log(chalk.yellow('Set PRODUCTBOARD_API_TOKEN environment variable or use --token flag'));
        process.exit(1);
      }

      console.log(chalk.blue('🚀 Starting ProductBoard hygiene analysis...'));
      
      const fetcher = new DataFetcher(token);
      const analyzer = new HygieneAnalyzer();
      const reporter = new Reporter();

      // Update age thresholds if provided
      analyzer.ageThresholds = {
        stale: parseInt(options.staleDays),
        outdated: parseInt(options.outdatedDays),
        ancient: parseInt(options.ancientDays)
      };

      const data = await fetcher.fetchAllData();
      const analysis = analyzer.analyzeData(data);

      if (options.quick) {
        reporter.printQuickStats(analysis);
      } else {
        reporter.generateReport(analysis);
      }

    } catch (error) {
      console.error(chalk.red('❌ Error during analysis:'), error.message);
      process.exit(1);
    }
  });

program
  .command('features')
  .description('Analyze features only')
  .option('-t, --token <token>', 'ProductBoard API token')
  .action(async (options) => {
    try {
      const token = options.token || process.env.PRODUCTBOARD_API_TOKEN;
      
      if (!token) {
        console.error(chalk.red('❌ ProductBoard API token is required'));
        process.exit(1);
      }

      const fetcher = new DataFetcher(token);
      const analyzer = new HygieneAnalyzer();
      const reporter = new Reporter();

      console.log(chalk.blue('🔍 Fetching features data...'));
      const features = await fetcher.fetchFeatures();
      
      const analysis = analyzer.analyzeData({ features });
      reporter.generateReport(analysis);

    } catch (error) {
      console.error(chalk.red('❌ Error fetching features:'), error.message);
      process.exit(1);
    }
  });

program
  .command('notes')
  .description('Analyze notes/insights only')
  .option('-t, --token <token>', 'ProductBoard API token')
  .action(async (options) => {
    try {
      const token = options.token || process.env.PRODUCTBOARD_API_TOKEN;
      
      if (!token) {
        console.error(chalk.red('❌ ProductBoard API token is required'));
        process.exit(1);
      }

      const fetcher = new DataFetcher(token);
      const analyzer = new HygieneAnalyzer();
      const reporter = new Reporter();

      console.log(chalk.blue('📝 Fetching notes data...'));
      const notes = await fetcher.fetchNotes();
      
      const analysis = analyzer.analyzeData({ notes });
      reporter.generateReport(analysis);

    } catch (error) {
      console.error(chalk.red('❌ Error fetching notes:'), error.message);
      process.exit(1);
    }
  });

program
  .command('setup')
  .description('Help setup API token')
  .action(() => {
    console.log(chalk.cyan('🔧 ProductBoard API Setup'));
    console.log('');
    console.log('1. Log in to your ProductBoard workspace');
    console.log('2. Go to Workspace Settings > Integrations > Public APIs');
    console.log('3. Generate an Access Token (requires Pro plan or higher)');
    console.log('4. Copy the token and either:');
    console.log('   • Set environment variable: export PRODUCTBOARD_API_TOKEN=your_token');
    console.log('   • Create .env file with: PRODUCTBOARD_API_TOKEN=your_token');
    console.log('   • Use --token flag when running commands');
    console.log('');
    console.log(chalk.yellow('Example usage:'));
    console.log('  productboard-analyzer analyze --token your_token');
    console.log('  productboard-analyzer analyze --quick');
    console.log('  productboard-analyzer features');
  });

if (process.argv.length < 3) {
  program.help();
}

program.parse();