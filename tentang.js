document.addEventListener('scroll', function() {
    const box = document.querySelector('.box');
    const boxPosition = box.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (boxPosition < windowHeight && boxPosition > 0) {
        box.classList.add('visible');
    } else {
        box.classList.remove('visible');
    }
});