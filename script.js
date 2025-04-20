class ChatInterface {
    constructor() {
        this.chatHistory = document.getElementById('chatHistory');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.modelSelector = document.getElementById('modelSelector');
        this.conversations = [];
        this.isAITyping = false;
        
        // Initialize AI model handler
        this.aiHandler = new AIModelHandler();

        this.initializeEventListeners();
        this.loadChatHistory();
        this.setupModelSelector();
        this.sendWelcomeMessage();
    }

    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.handleUserMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserMessage();
            }
        });

        this.modelSelector.addEventListener('change', (e) => {
            this.handleModelChange(e.target.value);
        });
    }

    setupModelSelector() {
        const availableModels = this.aiHandler.getAvailableModels();
        const currentModel = this.aiHandler.getCurrentModel();
        
        // Clear existing options
        this.modelSelector.innerHTML = '';
        
        // Add options for each available model
        availableModels.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model.charAt(0).toUpperCase() + model.slice(1);
            option.selected = model === currentModel;
            this.modelSelector.appendChild(option);
        });
    }

    handleModelChange(modelType) {
        try {
            this.aiHandler.setModel(modelType);
            this.displaySystemMessage(`Switched to ${modelType} model`);
        } catch (error) {
            this.displaySystemMessage(`Error switching model: ${error.message}`, true);
        }
    }

    loadChatHistory() {
        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            this.conversations = JSON.parse(savedHistory);
            this.conversations.forEach(msg => this.displayMessage(msg.text, msg.isUser, msg.timestamp));
        }
    }

    saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(this.conversations));
    }

    formatTimestamp(timestamp) {
        return new Date(timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit'
        });
    }

    displayMessage(text, isUser, timestamp = new Date().toISOString()) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-container ${isUser ? 'user-container' : 'ai-container'}`;

        const message = document.createElement('div');
        message.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = text;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = this.formatTimestamp(timestamp);

        message.appendChild(messageText);
        message.appendChild(messageTime);
        messageDiv.appendChild(message);
        this.chatHistory.appendChild(messageDiv);
        this.scrollToBottom();

        // Save to conversation history
        this.conversations.push({ text, isUser, timestamp });
        this.saveChatHistory();
    }

    displaySystemMessage(text, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-container system-container';

        const message = document.createElement('div');
        message.className = `message system-message ${isError ? 'error-message' : ''}`;
        message.textContent = text;

        messageDiv.appendChild(message);
        this.chatHistory.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        if (this.isAITyping) return;
        
        this.isAITyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message-container ai-container';
        typingDiv.id = 'typingIndicator';
        
        const typingContent = document.createElement('div');
        typingContent.className = 'message ai-message typing-indicator';
        typingContent.innerHTML = '<span></span><span></span><span></span>';
        
        typingDiv.appendChild(typingContent);
        this.chatHistory.appendChild(typingDiv);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isAITyping = false;
    }

    scrollToBottom() {
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }

    async handleUserMessage() {
        const message = this.userInput.value.trim();
        if (message === '') return;

        // Disable input while processing
        this.userInput.value = '';
        this.userInput.disabled = true;
        this.sendButton.disabled = true;
        this.modelSelector.disabled = true;

        try {
            // Display user message
            this.displayMessage(message, true);

            // Show typing indicator
            this.showTypingIndicator();

            // Get AI response
            const aiResponse = await this.aiHandler.getResponse(message);

            // Remove typing indicator and display AI response
            this.removeTypingIndicator();
            this.displayMessage(aiResponse, false);
        } catch (error) {
            this.removeTypingIndicator();
            this.displaySystemMessage(`Error: ${error.message}`, true);
            console.error('Error:', error);
        } finally {
            // Re-enable input
            this.userInput.disabled = false;
            this.sendButton.disabled = false;
            this.modelSelector.disabled = false;
            this.userInput.focus();
        }
    }

    sendWelcomeMessage() {
        setTimeout(() => {
            this.displayMessage(`Hello! 👋 I'm your AI assistant using the ${this.aiHandler.getCurrentModel()} model. How can I help you today?`, false);
        }, 500);
    }

    clearHistory() {
        this.conversations = [];
        localStorage.removeItem('chatHistory');
        while (this.chatHistory.firstChild) {
            this.chatHistory.removeChild(this.chatHistory.firstChild);
        }
        this.sendWelcomeMessage();
    }
}

// Initialize chat interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatInterface = new ChatInterface();
});