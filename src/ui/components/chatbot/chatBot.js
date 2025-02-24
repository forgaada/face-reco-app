import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getGroqChatCompletion } from '../../../core/utils/apiRequest';
import { Button, Form, Input, Tooltip } from 'reactstrap';
import _ from 'lodash';
import { faPaperPlane, faTrash, faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [clearTooltipOpen, setClearTooltipOpen] = useState(false);
    const [sendTooltipOpen, setSendTooltipOpen] = useState(false);
    const loggedUser = useSelector((state) => state.user?.user);

    const toggleClearTooltip = () => setClearTooltipOpen(!clearTooltipOpen);
    const toggleSendTooltip = () => setSendTooltipOpen(!sendTooltipOpen);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        const newMessages = [...messages, { text: input, isUser: true }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await getGroqChatCompletion(newMessages);
            setMessages(prevMessages => [...prevMessages, { text: response, isUser: false }]);
        } catch (error) {
            console.error('Error in handleSendMessage:', error);
            setMessages(prevMessages => [...prevMessages, { text: 'Sorry, an error occurred.', isUser: false }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearMessages = () => {
        setMessages([]);
    };

    const renderMessage = (text) => {
        const formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
        return { __html: formattedText };
    };

    if (_.isEmpty(loggedUser)) {
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
                {messages.length === 0 && !isLoading && (
                    <div className="empty-chat-message">
                        <FontAwesomeIcon icon={faComments} size="2x" className="empty-chat-icon" />
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={msg.isUser ? 'user-message' : 'bot-message'}>
                        <span dangerouslySetInnerHTML={renderMessage(msg.text)} />
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
                <Button id="sendButton" className="main-red" type="submit" disabled={isLoading}>
                    <FontAwesomeIcon icon={faPaperPlane} size='m' className='opacity-75' />
                </Button>
                <Button id="clearMessagesButton" className="main-red" type="button" onClick={handleClearMessages} disabled={isLoading}>
                    <FontAwesomeIcon icon={faTrash} size='m' className='opacity-75' />
                </Button>
                <Tooltip placement="top" isOpen={sendTooltipOpen} target="sendButton" toggle={toggleSendTooltip}>
                    Send
                </Tooltip>
                <Tooltip placement="top" isOpen={clearTooltipOpen} target="clearMessagesButton" toggle={toggleClearTooltip}>
                    This will delete all messages
                </Tooltip>
            </Form>
        </div>
    );
};

export default Chatbot;
