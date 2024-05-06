const _observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add("show");
        }
        /*else {
            entry.target.classList.remove("show");
        }*/
    });
});

const _fadeElements = document.querySelectorAll(".bo-panel");
if(_fadeElements.length > 0) {
    _fadeElements.forEach(Element => {
        _observer.observe(Element);
    });
}