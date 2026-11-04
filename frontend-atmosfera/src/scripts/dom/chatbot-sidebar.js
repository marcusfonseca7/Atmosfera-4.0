const bot_sidebar = document.getElementById("bot_sidebar");
const chatbot_close_btn = document.getElementById("chatbot_close_btn");
const chatbot_open_btn = document.getElementById("chatbot_open_btn");
const body = document.body;

chatbot_close_btn.addEventListener("click", () => {
    bot_sidebar.classList.add("closed");
});

chatbot_open_btn.addEventListener("click", () => {
    bot_sidebar.classList.remove("closed");
});

body.addEventListener("click", (event) => {
    if (!bot_sidebar.contains(event.target) && !chatbot_open_btn.contains(event.target)) {
        bot_sidebar.classList.add("closed");
    }
});