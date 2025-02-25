import {groq} from "../../index";

export const getGroqChatCompletion = async (messages, model) => {
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "you are a helpful assistant.",
                },
                ...messages.map(msg => ({
                    role: msg.isUser ? "user" : "assistant",
                    content: msg.text
                }))
            ],
            model: model,
            temperature: 0.5,
            max_completion_tokens: 512,
            top_p: 1,
            stop: null,
            stream: false,
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error getting chat completion:", error);
        return "Sorry, I encountered an error while processing your request.";
    }
};
