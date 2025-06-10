# ProductBoard Hygiene Analyzer

A console application for Chief Product Officers to analyze ProductBoard data and enforce strong hygiene practices. This tool provides detailed metrics on feature freshness, identifies outdated content, and generates actionable recommendations.

## Features

- **Comprehensive Analysis**: Analyzes features, notes, objectives, initiatives, releases, and more
- **Age-based Classification**: Categorizes items as Fresh, Stale, Outdated, or Ancient
- **Hygiene Score**: Calculates an overall hygiene score (0-100) for your ProductBoard workspace
- **Detailed Reporting**: Beautiful console reports with colored output and tables
- **Flexible Thresholds**: Customizable age thresholds for different hygiene categories
- **Multiple Analysis Modes**: Full analysis, quick stats, or specific item type analysis

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Setup

### API Token Setup

1. Log in to your ProductBoard workspace
2. Go to **Workspace Settings > Integrations > Public APIs**
3. Generate an Access Token (requires Pro plan or higher)
4. Set up your token using one of these methods:

**Option 1: Environment Variable**
```bash
export PRODUCTBOARD_API_TOKEN=your_token_here
```

**Option 2: .env File**
```bash
cp .env.example .env
# Edit .env file and add your token
```

**Option 3: Command Line Flag**
```bash
node index.js analyze --token your_token_here
```

## Usage

### Full Analysis
```bash
# Run complete hygiene analysis
node index.js analyze

# Quick stats only
node index.js analyze --quick

# Custom age thresholds
node index.js analyze --stale-days 60 --outdated-days 120 --ancient-days 300
```

### Specific Analysis
```bash
# Analyze features only
node index.js features

# Analyze notes/insights only
node index.js notes
```

### Help & Setup
```bash
# Show help
node index.js --help

# Setup guide
node index.js setup
```

## Age Categories

- **Fresh**: Less than 3 months old (default: < 90 days)
- **Stale**: 3-6 months old (default: 90-180 days)
- **Outdated**: 6-12 months old (default: 180-365 days)
- **Ancient**: Over 1 year old (default: 365+ days)

## Hygiene Score

The hygiene score (0-100) is calculated based on the age distribution of your items:

- **80-100**: Excellent hygiene, most items are fresh
- **60-79**: Good hygiene, minor cleanup needed
- **40-59**: Needs improvement, significant old items present
- **0-39**: Critical, major cleanup required

## Sample Output

```
📊 PRODUCTBOARD HYGIENE ANALYSIS REPORT
============================================================

📋 EXECUTIVE SUMMARY
------------------------------
┌──────────────────────┬────────┬─────────────┐
│ Metric               │ Count  │ Percentage  │
├──────────────────────┼────────┼─────────────┤
│ Total Items          │ 1,247  │ 100.0%      │
│ Fresh (< 3 months)   │ 823    │ 66.0%       │
│ Stale (3-6 months)   │ 187    │ 15.0%       │
│ Outdated (6-12 months) │ 142  │ 11.4%       │
│ Ancient (12+ months) │ 95     │ 7.6%        │
└──────────────────────┴────────┴─────────────┘

💡 RECOMMENDATIONS
-------------------------
1. 🔍 Review 95 ancient features (oldest: Legacy User Management)
2. ⚠️  MEDIUM PRIORITY: 18.4% of items are 6+ months old - schedule review
3. 📋 LOW PRIORITY: 33.0% of items are 3+ months old - consider updating

🎯 HYGIENE SCORE
--------------------
Overall Score: 71/100 (GOOD)
```

## Project Structure

```
productboard-analyzer/
├── index.js                    # Main CLI application
├── lib/
│   ├── productboard-client.js  # API client for ProductBoard
│   ├── data-fetcher.js         # Data fetching orchestration
│   ├── hygiene-analyzer.js     # Age analysis and metrics calculation
│   └── reporter.js             # Console reporting and formatting
├── package.json
├── .env.example
└── README.md
```

## Contributing

This tool was designed for Chief Product Officers to maintain high standards in ProductBoard hygiene. Feel free to customize the age thresholds, add new metrics, or enhance the reporting based on your team's needs.

## License

MIT