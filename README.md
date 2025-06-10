# ProductBoard Hygiene Analyzer

> **A powerful console application for Chief Product Officers to analyze ProductBoard data and enforce strong hygiene practices.**

This tool addresses the common frustration CPOs have with ProductBoard's lackluster reporting by providing comprehensive metrics on data freshness, identifying outdated content, and generating actionable recommendations for maintaining clean, organized product management workspaces.

## 🎯 Why This Tool?

As a Chief Product Officer, you know that:
- **Stale features** clutter your product roadmap
- **Outdated insights** mislead strategic decisions  
- **Ancient objectives** create confusion in planning
- **Poor hygiene** reduces team productivity

This analyzer provides the metrics and visibility ProductBoard's native reporting lacks, helping you maintain a clean, actionable product management environment.

## ✨ Features

- **🔍 Comprehensive Analysis**: Analyzes features, notes, objectives, initiatives, releases, and more
- **📊 Age-based Classification**: Categorizes items as Fresh, Stale, Outdated, or Ancient
- **🎯 Hygiene Score**: Calculates an overall hygiene score (0-100) for your ProductBoard workspace
- **🎨 Beautiful Reporting**: Colored console output with professional tables and charts
- **🔧 Flexible Thresholds**: Customizable age thresholds for different hygiene categories
- **⚡ Multiple Analysis Modes**: Full analysis, quick stats, or specific item type analysis
- **🚀 Zero Configuration**: Works out of the box with just your API token
- **📈 Actionable Insights**: Concrete recommendations for improving data hygiene

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- ProductBoard Pro plan or higher (required for API access)
- ProductBoard API token

### Installation

```bash
# Clone the repository
git clone https://github.com/Threatwrix/productboard-analyzer.git
cd productboard-analyzer

# Install dependencies
npm install

# Run setup guide
node index.js setup
```

## ⚙️ Configuration

### Getting Your ProductBoard API Token

1. **Log in** to your ProductBoard workspace
2. **Navigate** to `Workspace Settings` → `Integrations` → `Public APIs`
3. **Click** "Generate Access Token" (requires Pro plan or higher)
4. **Copy** your token - it looks like `pb_1234567890abcdef`

### Setting Up Your Token

Choose your preferred method:

#### Option 1: Environment Variable (Recommended)
```bash
export PRODUCTBOARD_API_TOKEN=pb_your_actual_token_here
node index.js analyze
```

#### Option 2: .env File (For Development)
```bash
cp .env.example .env
# Edit .env file: PRODUCTBOARD_API_TOKEN=pb_your_actual_token_here
node index.js analyze
```

#### Option 3: Command Line Flag (For One-time Use)
```bash
node index.js analyze --token pb_your_actual_token_here
```

## 📊 Usage Examples

### Complete Hygiene Analysis
```bash
# Full analysis with detailed reporting
node index.js analyze

# Quick executive summary only  
node index.js analyze --quick

# Custom age thresholds for your organization
node index.js analyze --stale-days 60 --outdated-days 120 --ancient-days 300
```

### Targeted Analysis
```bash
# Focus on features only
node index.js features --token your_token

# Analyze customer insights/notes
node index.js notes --token your_token

# All commands support the --token flag
node index.js analyze --token your_token --quick
```

### Getting Help
```bash
# Show all available commands
node index.js --help

# Interactive setup guide
node index.js setup
```

### Real-World Usage Scenarios

**Daily Standup**: Get quick stats
```bash
node index.js analyze --quick
```

**Weekly Review**: Full analysis with recommendations  
```bash
node index.js analyze
```

**Feature Planning**: Focus on feature hygiene
```bash
node index.js features
```

**Quarterly Review**: Custom thresholds for deeper analysis
```bash
node index.js analyze --stale-days 45 --outdated-days 90 --ancient-days 180
```

## 📈 Understanding the Metrics

### Age Categories

| Category | Age Range | Color | Meaning |
|----------|-----------|-------|---------|
| **🟢 Fresh** | < 3 months | Green | Recently created/updated, active |  
| **🟡 Stale** | 3-6 months | Yellow | Getting old, may need attention |
| **🟠 Outdated** | 6-12 months | Orange | Likely obsolete, review required |
| **🔴 Ancient** | 12+ months | Red | Definitely outdated, immediate action needed |

### Hygiene Score Breakdown

The hygiene score (0-100) weighs your items based on freshness:

| Score Range | Grade | Status | Action Required |
|-------------|-------|--------|----------------|
| **80-100** | 🏆 Excellent | Most items are fresh | Maintain current practices |
| **60-79** | ✅ Good | Minor cleanup needed | Schedule quarterly review |  
| **40-59** | ⚠️ Needs Improvement | Significant old items | Monthly cleanup required |
| **0-39** | 🚨 Critical | Major hygiene issues | Immediate action required |

### Calculation Method
- Fresh items: 100% weight
- Stale items: 70% weight  
- Outdated items: 30% weight
- Ancient items: 10% weight

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

## 🛠️ API Coverage

This tool analyzes the following ProductBoard data types:

- **Features** - Your product features and enhancements
- **Notes** - Customer insights and feedback  
- **Objectives** - Strategic goals and outcomes
- **Initiatives** - Major projects and efforts
- **Releases** - Product releases and versions
- **Release Groups** - Collections of related releases
- **Components** - Product components and modules
- **Products** - Your product portfolio
- **Companies** - Customer organizations
- **Users** - Team members and stakeholders

## 🔧 Customization

### Custom Age Thresholds
```bash
# Conservative approach (shorter cycles)
node index.js analyze --stale-days 30 --outdated-days 90 --ancient-days 180

# Lenient approach (longer cycles)  
node index.js analyze --stale-days 120 --outdated-days 240 --ancient-days 480
```

### Environment Variables
```bash
# Set default thresholds
export PB_STALE_DAYS=60
export PB_OUTDATED_DAYS=120  
export PB_ANCIENT_DAYS=240
```

## 🤝 Contributing

This tool was designed for CPOs frustrated with ProductBoard's reporting limitations. Contributions welcome:

- **Bug reports**: Open an issue with detailed steps to reproduce
- **Feature requests**: Describe your use case and desired functionality  
- **Code contributions**: Fork, create a feature branch, and submit a PR
- **Documentation**: Help improve setup guides and examples

### Development Setup
```bash
git clone https://github.com/Threatwrix/productboard-analyzer.git
cd productboard-analyzer
npm install
npm run dev
```

## 📄 License

MIT License - feel free to use this in your organization and modify as needed.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/Threatwrix/productboard-analyzer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Threatwrix/productboard-analyzer/discussions)
- **ProductBoard API Docs**: [Developer Reference](https://developer.productboard.com/reference/introduction)

---

**Built by CPOs, for CPOs** - Because ProductBoard's native reporting just isn't enough. 📊