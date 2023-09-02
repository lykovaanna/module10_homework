const btn = document.querySelector('.btn');

let x = window.screen.width;
let y = window.screen.height;

btn.addEventListener('click', () => {
    alert(`Your screen have width is ${x} and height is ${y}`)
});