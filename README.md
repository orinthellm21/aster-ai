# Aster AI - Revolutionizing Hedge Funds 

## The Premier DeFAI Platform on Binance Smart Chain

Aster AI is the premier DeFAI platform on BNB Chain, revolutionizing hedge fund strategies through smart, data-driven automation. We deliver the fastest and most accurate alpha detection, empowering users to track top wallets, manage risk, and trade seamlessly. From in-depth on/off-chain insights to instant AI Agent setup—no coding required. Aster AI turns complex decisions into effortless execution.

## Key Features

- **BSC Integration**: Seamlessly interact with Binance Smart Chain for secure and efficient trading operations
- **AI-Powered Analysis**: Utilizes OpenAI's language models to analyze market trends and generate trading insights
- **Twitter Integration**: Monitors relevant crypto influencers and news sources to incorporate social sentiment into trading decisions
- **Real-time Market Data**: Connects to multiple data sources to provide up-to-date market information
- **Customizable Strategies**: Tailor trading parameters to match your risk tolerance and investment goals
- **Responsive UI**: Modern React interface that works across desktop and mobile devices

## Technology Stack

- Frontend: React + TypeScript + Vite
- AI Integration: OpenAI API, Deepseek, ElizaOS, Grok API, Gemini
- Social Media Analysis: Twitter API, Lunarcrush 

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- MetaMask or another BSC-compatible wallet
- API keys for OpenAI and Twitter (for full functionality)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/aster.git
   cd aster
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your API keys
   ```
   VITE_OPENAI_API_KEY=your_openai_key
   VITE_TWITTER_API_KEY=your_twitter_key
   VITE_BSC_NODE_URL=your_bsc_node_url
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## Development

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## License

[MIT](LICENSE)

## Disclaimer

Cryptocurrency trading involves significant risk. Aster is a tool to assist with trading but does not guarantee profits. Always do your own research before making investment decisions.