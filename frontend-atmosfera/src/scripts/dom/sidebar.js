const img_header = document.getElementById("img_header");
const sidebar = document.getElementById("sidebar");

img_header.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
});
