
const container = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let timerId = null;

const onChangeColor = (e) => {
    if (e.target.nodeName !=="BUTTON") {
        return
    };

    if (startBtn.hasAttribute('disabled')) {
        startBtn.removeAttribute('disabled');
    }
    if (stopBtn.hasAttribute('disabled')) {
        stopBtn.removeAttribute('disabled');
    }
    
    if (e.target.hasAttribute('data-start')) {
        timerId = setInterval(() => {
            container.style.backgroundColor = getRandomHexColor();
        }, 1000);
        e.target.setAttribute('disabled', 'null');
    };

    if (e.target.hasAttribute('data-stop')) {
        clearInterval(timerId);
        e.target.setAttribute('disabled', 'null');
    }
}
container.addEventListener('click', onChangeColor);