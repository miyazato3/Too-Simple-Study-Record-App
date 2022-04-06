document.getElementById("start-button").addEventListener("click", () => timeStart());
document.getElementById("stop-button").addEventListener("click", () => timeStop());
document.getElementById("clear-button").addEventListener("click", () => timeClear());

let timeId;
let oldTime;
let newTime = 0;
let inheritingTime = 0;

const drawingTime = (time) => {
    const timeArea = document.getElementById("time-area");
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = time - ((hours * 3600) + (minutes * 60));

    timeArea.textContent = `${('00' + hours).slice(-2)}:${('00' + minutes).slice(-2)}:${('00' + seconds).slice(-2)}`;
}

const timeStart = () => {
    oldTime = Date.now();
    timeId = setInterval(() => {
        newTime = Math.floor((inheritingTime * 1000 + Date.now() - oldTime) / 1000);
        drawingTime(newTime);
    }, 1000);
}

const timeStop = () => {
    inheritingTime = newTime;
    clearInterval(timeId);
}

const timeClear = () => {
    inheritingTime = 0;
    drawingTime(0);
}