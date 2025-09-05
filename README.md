# AI Dashboard

A simple web application for managing AI agents with different occupational specializations.

## Setup

1. Copy the configuration template:
   ```bash
   cp config.template.js config.js
   ```

2. Edit `config.js` and add your OpenAI API key:
   ```javascript
   const CONFIG = {
     OPENAI_API_KEY: 'your-actual-openai-api-key-here'
   };
   ```

3. Open `index.html` in your web browser to start using the dashboard.

## Features

- Create and manage AI agents with different occupational specializations
- Custom instructions for each agent
- Persistent notes and chat history
- Direct integration with OpenAI GPT-4

## Security

- The `config.js` file contains sensitive API keys and is excluded from git
- Never commit your actual API keys to version control
- Use the `config.template.js` file as a reference for setup

## Files

- `index.html` - Main dashboard
- `agent.html` - Individual AI agent interface
- `app.js` - Dashboard functionality
- `styles.css` - Application styling
- `config.js` - Configuration with API keys (gitignored)
- `config.template.js` - Configuration template