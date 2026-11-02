const img_header = document.getElementById("img_header");
const sidebar = document.getElementById("sidebar");
const dashboard_btn = document.getElementById("dashboard_btn");
const simulation_btn = document.getElementById("simulation_btn");
const about_btn = document.getElementById("about_btn");
const chatbot_btn = document.getElementById("chatbot_btn");

img_header.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
});

dashboard_btn.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
});

simulation_btn.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
});

about_btn.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
});

chatbot_btn.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
  bot_sidebar.classList.remove("closed");
});
