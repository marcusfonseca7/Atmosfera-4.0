//Verifica se é MOBILE e manda pro index.html
function isMobileUserAgent() {
  const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

if (isMobileUserAgent()) {
  window.location.href = "../../index.html";
}

const intro_title = document.getElementById("intro_title");
const intro_fav = document.getElementById("intro_fav");

function showFav(){
    intro_fav.classList.add("show");
}
function showTitle() {
    intro_title.classList.add("show");
}
function goToIndex(){
    window.location.href = "../../index.html";
}

setTimeout(showFav, 1000);
setTimeout(showTitle, 2000);
setTimeout(goToIndex, 3000);