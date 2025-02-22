import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {getGroqChatCompletion} from "../../../core/utils/apiRequest";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const loggedUser = useSelector((state) => state.user?.user);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        setMessages(prevMessages => [...prevMessages, {text: input, isUser: true}]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await getGroqChatCompletion(input);
            setMessages(prevMessages => [...prevMessages, {text: response, isUser: false}]);
        } catch (error) {
            console.error("Error in handleSendMessage:", error);
            setMessages(prevMessages => [...prevMessages, {text: "Sorry, an error occurred.", isUser: false}]);
        } finally {
            setIsLoading(false);
        }
    };

    if (Object.keys(loggedUser).length === 0) {
        return (
            <div className="chatbot-login-alert">
                <h2>Please log in to use the chatbot</h2>
                <p>You need to be logged in to access the chatbot feature.</p>
            </div>
        );
    }

    return (
        <div className="chatbot">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.isUser ? 'user-message' : 'bot-message'}>
                        {msg.text}
                    </div>
                ))}
                {isLoading && <div className="bot-message">Thinking...</div>}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>Send</button>
            </form>
        </div>
    );
};

export default Chatbot;
