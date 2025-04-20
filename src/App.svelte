<script>
  // Chat state
  let messages = []
  let input = ""

  function sendMessage() {
    if (input.trim()) {
      messages = [...messages, { text: input, sender: 'user' }]
      input = ""
      // TODO: Add AI response logic
    }
  }
</script>

<main>
  <div class="chat-container">
    {#each messages as message}
      <div class="message {message.sender}">
        {message.text}
      </div>
    {/each}
  </div>

  <div class="input-area">
    <input bind:value={input} placeholder="Type your message..." />
    <button on:click={sendMessage}>Send</button>
  </div>
</main>

<style>
  .chat-container {
    height: 80vh;
    overflow-y: auto;
    padding: 1rem;
  }
  
  .message {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    max-width: 70%;
  }
  
  .user {
    background: #0078d4;
    color: white;
    margin-left: auto;
  }
  
  .input-area {
    display: flex;
    padding: 1rem;
    gap: 0.5rem;
  }
  
  input {
    flex-grow: 1;
    padding: 0.5rem 1rem;
  }
</style>
