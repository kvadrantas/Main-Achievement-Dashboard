import { data } from "./data/data.js";

let progressBarAnimationDOM = document.querySelector('style');
let progressBarDOM = document.querySelector('.progress-bar');

// Renders all 4 progress bars per section and separate animations for each
function renderProgressBar(i) {
    setTimeout(() => {
        for (let j = 1; j <= 4; j++) {
            progressBarAnimationDOM.innerHTML += `
                .progress-bar${j} .circle .left .progress{
                    z-index:1;
                    animation: left${j} .4s linear both;
                    animation-delay:.4s;
                }
                @keyframes left${j}{
                    100%{
                    transform: rotate(${(data[i]['pb' + j] * 3.6) > 180 ? (data[i]['pb' + j] * 3.6 - 180) : 0}deg);    // Atitinka 50% desiniojo rutulio
                    }
                }
                .progress-bar${j} .circle .right .progress{
                animation: right${j} .4s linear both;
                }
                @keyframes right${j}{
                100%{
                    transform: rotate(${(data[i]['pb' + j] * 3.6) < 180 ? (data[i]['pb' + j] * 3.6) : 180}deg);    // Atitinka 50% kairiojo rutulio
                    }
                }
                `
                progressBarDOM.innerHTML += `
                    <div class="progress-bar${j}">
                        <div class="circular">
                        <div class="inner"></div>
                        <div class="number"></div>
                        <div class="circle">
                        <div class="bar left">
                            <div class="progress color${j}"></div>
                        </div>
                        <div class="bar right">
                            <div class="progress color${j}"></div>
                        </div>
                        </div>
                        </div>
                        <div class="label1">${data[i]['label' + j]}</div>
                        <div class="label2">Achievement: ${data[i]['pb' + j]}%</div>
                    </div>
                `
        }
    }, 50);

    setTimeout(() => {
        const obj = document.querySelectorAll(".number");
        obj.forEach((element, index) => {
            counter(element, 0, data[i]['pb' + (index + 1)], 800, data[i]['icon' + (index + 1)]);

        })
    }, 55);
}

// Clears progress bar section and animation content
function clearProgressBar() {
    progressBarAnimationDOM.innerHTML = '';
    progressBarDOM.innerHTML = '';
}

// Renders example images 
function renderExamples(i) {
    const examplesDOM = document.querySelector('.examples');
    examplesDOM.innerHTML = `
        <img src=${data[i].img1} alt="My work">
        <img src=${data[i].img2} alt="My work">
    `
    if (data[i].img3) examplesDOM.innerHTML += `<img src=${data[i].img3} alt="My work">`;
}

// Percentage counter
function counter(obj, start, end, duration, icon) {
    if (start <= end) {
        setTimeout(() => {
            obj.innerHTML = `${icon}<br>${start} %`;
            counter(obj, ++start, end, duration, icon);
        }, duration / end);
    }
}

// NAVIGATION BUTTONS LISTENER
// onclick renders all  content
const navigationDOM = document.querySelectorAll('.navigation li');
navigationDOM.forEach((element, index) => {
    element.addEventListener('click', () => {
        renderExamples(index);
        clearProgressBar();
        renderProgressBar(index);

    })
});