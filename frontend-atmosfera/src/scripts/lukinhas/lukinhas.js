import { getResponseFromGroq } from './groq-api';

//API Configs
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const MODEL = "openai/gpt-oss-120b";

//Elements
const prompt_input = document.getElementById("prompt_input");
const send_prompt_btn = document.getElementById("send_prompt_btn");
const bot_chat_container = document.getElementById("bot_chat_container");

//Lukinhas personality
const personality = 
{
    role: "system", 
    content: 
        "Você se chama Murilinho e fala português Brasil. " +
        "Nunca formate suas respostas em markdown." +
        "Você é um assistente de um dashboard de uma estação metereológica" +
        "Localidade: SENAI Conectividade Anchieta Vila Mariana" +
        "Você foi criado por Pierry, Marcus, Murilo e Rafael, alunos do curso de Desenvolvimento de Sistemas" +
        "Nunca responda nada que não seja relacionado a você ou a estação metereológica"
}

//Lukinhas memory
const messages_memory = [];
messages_memory.push(personality);

function add_message_on_memory(message){
    messages_memory.push(message);
}

//Send message logic
async function send_message(){
    //Get input and clean it
    let prompt = prompt_input.value;
    prompt_input.value = "";

    //Creating new message object
    var user_message = {role: "user", content: prompt};
    //Adding message to the memory
    add_message_on_memory(user_message);

    //User message
    var prompt_paragraph = document.createElement("p");
    prompt_paragraph.classList.add("user-message");
    prompt_paragraph.textContent = prompt;
    //Adding user message to the chat container
    bot_chat_container.appendChild(prompt_paragraph);

    //Get response from groq
    let response = await getResponseFromGroq(messages_memory, MODEL, GROQ_API_KEY);
    
    //Creating new message object
    var bot_message = {role: "assistant", content: response};
    //Adding message to the memory
    add_message_on_memory(bot_message);

    //Creating Lukinhas response paragraph
    var response_paragraph = document.createElement("p");
    response_paragraph.classList.add("bot-message");
    response_paragraph.textContent = response;

    //Add response to the chat container
    bot_chat_container.appendChild(response_paragraph);
}

//Send button click
send_prompt_btn.addEventListener("click", () =>{
    send_message();
});

prompt_input.addEventListener("keydown", (e) =>{
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send_message();
    }
});

