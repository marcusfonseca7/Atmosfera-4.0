import Groq from "https://esm.sh/groq-sdk";

export async function getResponseFromGroq(messages, MODEL, GROQ_API_KEY) {
    const groq = new Groq({
        apiKey: GROQ_API_KEY,
        dangerouslyAllowBrowser: true
    });

    const res = await groq.chat.completions.create({
        model: MODEL,
        messages: messages
    });

    return res.choices[0].message.content;
}