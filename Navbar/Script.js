const _btnMenu = document.querySelector(".bo-navbar-btn");
const _navCollapse = document.querySelector(".bo-navbar-collapse");

_btnMenu.addEventListener("click", () => {
    _navCollapse.classList.toggle("show");
});