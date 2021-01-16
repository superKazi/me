import {debounce} from 'https://cdn.skypack.dev/pin/mini-debounce@v1.0.8-Zdrw8ioDWJBckPavi5e3/min/mini-debounce.js';

import Splitting from 'https://cdn.skypack.dev/pin/splitting@v1.0.6-Za2vDy3XuQ4lO2x5hbUG/min/splitting.js'

// client code
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener(
    'resize',
    debounce(() => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 300)
);

Splitting({
    target: [
        document.querySelector('#kazi'),
        document.querySelector('#job'),
    ],
});

const fancyLetters = {
    eArr: ['e', 'ĕ', 'ě', 'ë'],
    sArr: ['s', 'ş'],
    wArr: ['w', 'ŵ'],
    oArr: ['o', 'ŏ', 'ô'],
};

const rowFancyLetters = [
    ...document.querySelectorAll('.job .word .char'),
].filter((character) => {
    const {innerText} = character;
    return (
        innerText === 'e' ||
        innerText === 's' ||
        innerText === 'w' ||
        innerText === 'o'
    );
});

rowFancyLetters.forEach((letter) => {
    switch (letter.innerText) {
        case 'e':
            letter.innerHTML =
                fancyLetters.eArr[
                    Math.floor(Math.random() * fancyLetters.eArr.length)
                    ];
            break;
        case 's':
            letter.innerHTML =
                fancyLetters.sArr[
                    Math.floor(Math.random() * fancyLetters.sArr.length)
                    ];
            break;
        case 'w':
            letter.innerHTML =
                fancyLetters.wArr[
                    Math.floor(Math.random() * fancyLetters.wArr.length)
                    ];
            break;
        case 'o':
            letter.innerHTML =
                fancyLetters.oArr[
                    Math.floor(Math.random() * fancyLetters.oArr.length)
                    ];
            break;
        default:
            return;
    }
})

// polite console
console.log(
    '%c Thanks for checking out my site!',
    'font-family: Helvetica, sans-serif; text-transform: uppercase; font-weight: bold; letter-spacing: .12em; font-size: 3rem; color: black;'
);
