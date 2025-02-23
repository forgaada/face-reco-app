import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {getGroqChatCompletion} from "../../../core/utils/apiRequest";
import {Button, Form, Input} from "reactstrap";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const loggedUser = useSelector((state) => state.user?.user);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        const newMessages = [...messages, {text: input, isUser: true}];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await getGroqChatCompletion(newMessages);
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
            <Form onSubmit={handleSendMessage}>
                <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    disabled={isLoading}
                />
                <Button className="main-red" type="submit" disabled={isLoading}>
                    Send
                </Button>
            </Form>
        </div>
    );
};

export default Chatbot;
