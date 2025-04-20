class AIModelHandler {
    constructor(modelType = config.defaultModel) {
        this.modelType = modelType;
    }

    async getResponse(userMessage) {
        switch (this.modelType) {
            case 'ollama':
                return await this.getOllamaResponse(userMessage);
            case 'api':
                return await this.getAPIResponse(userMessage);
            case 'local':
            default:
                return this.getLocalResponse(userMessage);
        }
    }

    async getOllamaResponse(userMessage) {
        try {
            const response = await fetch(config.ollama.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: config.ollama.model,
                    prompt: userMessage,
                    temperature: config.ollama.temperature,
                    max_tokens: config.ollama.maxTokens
                })
            });

            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.status}`);
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Ollama API Error:', error);
            throw new Error('Failed to get response from Ollama');
        }
    }

    async getAPIResponse(userMessage) {
        try {
            if (!config.api.apiKey) {
                throw new Error('API key not configured');
            }

            const response = await fetch(config.api.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.api.apiKey}`
                },
                body: JSON.stringify({
                    model: config.api.model,
                    messages: [{
                        role: 'user',
                        content: userMessage
                    }],
                    temperature: config.api.temperature,
                    max_tokens: config.api.maxTokens
                })
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Failed to get response from API');
        }
    }

    getLocalResponse(userMessage) {
        const messageLower = userMessage.toLowerCase();
        
        // Check each response type for matching patterns
        for (const [type, data] of Object.entries(config.localResponses)) {
            if (data.patterns && data.patterns.some(pattern => messageLower.includes(pattern))) {
                return data.responses[Math.floor(Math.random() * data.responses.length)];
            }
        }

        // Return default response if no patterns match
        const defaultResponses = config.localResponses.default.responses;
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    setModel(modelType) {
        if (!['local', 'ollama', 'api'].includes(modelType)) {
            throw new Error('Invalid model type');
        }
        this.modelType = modelType;
    }

    getAvailableModels() {
        return ['local', 'ollama', 'api'];
    }

    getCurrentModel() {
        return this.modelType;
    }
}