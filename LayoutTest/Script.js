const _menuCollapse = document.querySelector(".bo-navbar-collapse");
const _menuBtn = document.querySelector(".bo-navbar-btn");

_menuBtn.addEventListener("click", () => {
    _menuCollapse.classList.toggle("show");
});