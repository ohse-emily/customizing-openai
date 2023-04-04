import { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{ question: string, response: any }[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    };
    const res = await fetch('http://localhost:3001/', requestOptions);
    const data = await res.json();
    const newMessage = { question: message, response: data.message };
    setConversation([newMessage, ...conversation]);
    setMessage('');
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Enter a message:</label>
        <input
          id="message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
      <div className='container'>
        <div className='message-container'>
      {conversation.map((message, index) => (
        <div key={index} className="message">
          <div className="response">
            <b>블링이:</b> {message.response}
          </div>
          <div className="question">
            <b>You:</b> {message.question}
          </div>
        </div>
      ))}
      </div>
      </div>
    </div>
  );
}

export default App;
