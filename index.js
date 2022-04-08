document.getElementById("start-button").addEventListener("click", () => timeStart());
document.getElementById("stop-button").addEventListener("click", () => timeStop());
document.getElementById("clear-button").addEventListener("click", () => timeClear());
document.getElementById("record-button").addEventListener("click", () => timeRecord());

let timeId;
let oldTime;
let newTime = 0;
let inheritingTime = 0;
let accumulateStudyTime = 0;
let accumulateBreakTime = 0;
let accumulateMealTime = 0;

const calcTime = (time) => {
    let hours;
    let minutes;
    let seconds;

    hours = Math.floor(time / 3600);
    minutes = Math.floor((time - (hours * 3600)) / 60);
    seconds = time - ((hours * 3600) + (minutes * 60));

    return [hours, minutes, seconds];
}

const drawingTime = () => {
    const timeArea = document.getElementById("time-area");
    const [hours, minutes, seconds] = calcTime(newTime);

    timeArea.textContent = `${('00' + hours).slice(-2)}:${('00' + minutes).slice(-2)}:${('00' + seconds).slice(-2)}`;
}

const timeStart = () => {
    oldTime = Date.now();
    timeId = setInterval(() => {
        newTime = Math.floor((inheritingTime * 1000 + Date.now() - oldTime) / 1000);
        drawingTime();
    }, 1000);
}

const timeStop = () => {
    inheritingTime = newTime;
    clearInterval(timeId);
}

const timeClear = () => {
    inheritingTime = 0;
    newTime = 0;
    drawingTime();
}

const checkedSelect = () => {
    const element = document.getElementsByName("select");
    const len = element.length;
    let checkedSelect = "";

    for (let i = 0; i < len; i++){
        if (element.item(i).checked){
            checkedSelect = element.item(i).value;
        }
    }
    return checkedSelect;
}

const createRecordFormat = (timesArrayData) => {
    return `${('00' + timesArrayData[0]).slice(-2)}(h)${('00' + timesArrayData[1]).slice(-2)}(m)${('00' + timesArrayData[2]).slice(-2)}(s)`;
}

const timeRecord = () => {
    const checkedSelectValue = checkedSelect();
    let recordElement = document.getElementById(`${checkedSelectValue}-record`);

    switch (checkedSelectValue){
      case "study":
        accumulateStudyTime += newTime;
        recordElement.textContent = "勉強：" + createRecordFormat(calcTime(accumulateStudyTime));
        break;
      case "break":
        accumulateBreakTime += newTime;
        recordElement.textContent = "休憩：" + createRecordFormat(calcTime(accumulateBreakTime));
        break;
      case "meal":
        accumulateMealTime += newTime;
        recordElement.textContent = "ご飯：" + createRecordFormat(calcTime(accumulateMealTime));
        break;
      default:
        alert("必要な項目が選択されていません。勉強、休憩、ご飯のいずれかを選択してください");
        console.log("error");
    }
    timeStop();
    timeClear();
}