const config = {
    // Default model type: 'local', 'ollama', or 'api'
    defaultModel: 'local',

    // Ollama settings
    ollama: {
        endpoint: 'http://localhost:11434/api/generate',
        model: 'llama2',
        temperature: 0.7,
        maxTokens: 500
    },

    // External API settings (e.g., OpenAI)
    api: {
        endpoint: 'https://api.openai.com/v1/chat/completions',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 500,
        apiKey: '' // Add your API key here
    },

    // Local model responses
    localResponses: {
        greeting: {
            patterns: ["hello", "hi", "hey"],
            responses: ["Hello! How can I help you today?", "Hi there! What can I do for you?"]
        },
        farewell: {
            patterns: ["goodbye", "bye", "see you"],
            responses: ["Goodbye! Have a great day!", "See you later! Take care!"]
        },
        thanks: {
            patterns: ["thank", "thanks"],
            responses: ["You're welcome!", "Glad I could help!"]
        },
        default: {
            responses: [
                "I understand. Could you elaborate more?",
                "That's interesting. Can you tell me more?",
                "I'm processing what you've said. Could you provide more context?",
                "I'm here to help. Could you give me more details?",
                "I'm analyzing your message. Would you mind explaining further?"
            ]
        }
    }
};