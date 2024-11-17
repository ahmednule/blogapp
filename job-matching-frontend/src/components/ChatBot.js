import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: 'Hi there! How was your day?', sender: 'bot' },
  ]);
  const [userInput, setUserInput] = useState('');

  // Function to handle user's input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Function to handle sending messages
  const handleSendMessage = () => {
    if (!userInput.trim()) return; // Avoid sending empty messages

    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
    setUserInput('');

    setTimeout(() => {
      let botResponse = '';
      const lowerCaseInput = userInput.toLowerCase();

      // Basic responses based on user input
      if (lowerCaseInput.includes('good') || lowerCaseInput.includes('great')) {
        botResponse = "I'm glad to hear that! 😊 Anything else you'd like to chat about?";
      } else if (lowerCaseInput.includes('bad') || lowerCaseInput.includes('not great')) {
        botResponse = "I'm sorry to hear that. 😞 Is there anything I can do to help?";
      } else if (lowerCaseInput.includes('how are you') || lowerCaseInput.includes('your day')) {
        botResponse = "I'm just a bot, but thanks for asking! 😊 Anything else on your mind?";
      } else if (lowerCaseInput.includes('thank') || lowerCaseInput.includes('thanks')) {
        botResponse = "You're very welcome! I'm here to help anytime. 😊";
      } else if (lowerCaseInput.includes('bye')) {
        botResponse = "Goodbye! Have a wonderful day! 👋";
        setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
        setTimeout(onClose, 1500); // Close the chat after 1.5 seconds
        return;
      } else {
        botResponse = "That's interesting! Feel free to ask me anything.";
      }

      setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
    }, 1000); // Bot replies after 1 second
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <span>ChatBot</span>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatbot-message ${
              message.sender === 'bot' ? 'bot' : 'user'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your message here..."
          value={userInput}
          onChange={handleUserInput}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
