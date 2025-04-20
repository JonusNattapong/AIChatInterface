# AI Chat Interface

A versatile chat interface that supports multiple AI models including local predefined responses, Ollama integration, and external API connectivity.

## Features

- 🤖 Multiple AI Model Support:
  - Local model with predefined responses
  - Ollama integration for local AI models
  - External API support (e.g., OpenAI)
- 💬 Rich Chat Interface:
  - Real-time model switching
  - Persistent chat history
  - Typing indicators
  - Message timestamps
  - System messages and error handling
- ⚡ User Experience:
  - Clean, modern UI
  - Mobile-responsive design
  - Multi-line message support
  - Chat history clearing
  - Smooth animations
  - Keyboard shortcuts

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-chat-interface.git
cd ai-chat-interface
```

2. Open `index.html` in a web browser to start using the local model immediately.

## Configuration

### Local Model
- Works out of the box
- Uses predefined responses from `config.js`
- No additional setup required

### Ollama Integration
1. Install Ollama on your system from [Ollama's website](https://ollama.ai)
2. Start the Ollama server (should be running on `localhost:11434`)
3. Configure Ollama settings in `config.js`:
```javascript
ollama: {
    endpoint: 'http://localhost:11434/api/generate',
    model: 'llama2',  // or your preferred model
    temperature: 0.7,
    maxTokens: 500
}
```

### External API (e.g., OpenAI)
1. Get your API key from the provider
2. Add your API key in `config.js`:
```javascript
api: {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 500,
    apiKey: 'your-api-key-here'
}
```

## Usage

1. Open `index.html` in a web browser
2. Select your preferred AI model from the dropdown:
   - **Local**: Uses predefined responses (default)
   - **Ollama**: Connects to local Ollama server
   - **API**: Uses configured external API
3. Start chatting!

### Keyboard Shortcuts
- `Enter`: Send message
- `Shift + Enter`: New line in message
- `Ctrl/Cmd + L`: Clear chat history

## Project Structure

```
ai-chat-interface/
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
├── script.js       # Chat interface logic
├── ai-models.js    # AI model handlers
├── config.js       # Configuration for AI models
└── README.md       # Documentation
```

## Customization

### Adding New Response Patterns
Edit `config.js` to add new patterns and responses for the local model:

```javascript
localResponses: {
    greeting: {
        patterns: ["hello", "hi", "hey"],
        responses: ["Hello! How can I help?"]
    },
    // Add your custom patterns here
}
```

### Styling
Modify `style.css` to customize the appearance. The interface uses CSS variables for easy theme customization.

## Troubleshooting

### Ollama Connection Issues
- Ensure Ollama is installed and running
- Check if the Ollama server is accessible at `localhost:11434`
- Verify the model specified in `config.js` is available in your Ollama installation

### API Integration Issues
- Verify your API key is correctly set in `config.js`
- Check if the API endpoint is accessible
- Ensure your API subscription is active

## License

MIT License - Feel free to use, modify, and distribute this code.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## Support

If you encounter any issues or have questions:
1. Check the troubleshooting section
2. Open an issue on GitHub
3. Reach out to the maintainers

---

Made with ❤️ for the AI community