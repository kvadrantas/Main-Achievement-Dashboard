import { data } from "./data/data.js";

let progressBarAnimationDOM = document.querySelector('style');
let progressBarDOM = document.querySelector('.progress-bar');

// Renders all 4 progress bars per section and separate animations for each
function renderProgressBar(i, ind) {
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
                    transform: rotate(${(data[i]['content' + ind]['pb' + j] * 3.6) > 180 ? (data[i]['content' + ind]['pb' + j] * 3.6 - 180) : 0}deg);    // Atitinka 50% desiniojo rutulio
                    }
                }
                .progress-bar${j} .circle .right .progress{
                animation: right${j} .4s linear both;
                }
                @keyframes right${j}{
                100%{
                    transform: rotate(${(data[i]['content' + ind]['pb' + j] * 3.6) < 180 ? (data[i]['content' + ind]['pb' + j] * 3.6) : 180}deg);    // Atitinka 50% kairiojo rutulio
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
                        <div class="label2">Achievement: ${data[i]['content' + ind]['pb' + j]}%</div>
                    </div>
                `
        }
    }, 50);

    setTimeout(() => {
        const obj = document.querySelectorAll(".number");
        obj.forEach((element, index) => {
            counter(element, 0, data[i]['content' + ind]['pb' + (index + 1)], 800, data[i]['icon' + (index + 1)]);

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
    // Render images of work examples
    const examplesDOM = document.querySelector('.examples');
    if (data[i].img1 && data[i].img2 && data[i].img3) {
        examplesDOM.innerHTML = `
            <div class="examples-content" style="animation: examples .25s linear;">
                <img src=${data[i].img1} alt="My work">
                <img src=${data[i].img2} alt="My work" style="margin-left: 0;">
                <img src=${data[i].img3} alt="My work" style="margin-left: 0;">
            </div>
            `
    } else if (data[i].img1 && data[i].img2) {
        examplesDOM.innerHTML = `
            <div class="examples-content" style="animation: examples .25s linear;">
                <img src=${data[i].img1} alt="My work">
                <img src=${data[i].img2} alt="My work">
            </div>
        `
    } else {
        examplesDOM.innerHTML = `
            <div class="examples-content" style="animation: examples .25s linear;">
                <img src=${data[i].img1} alt="My work">
            </div>
        `
    }
    // ------------------------------------------

    // Adds event listeners on images, so then you click on each coresponding content with information appears
    document.querySelectorAll('.examples img').forEach((x, j) => x.addEventListener('click', () => {
        clearProgressBar();
        renderProgressBar(i, j);
        const descriptionDOM = document.querySelector('.example-description');
        let featuresHTML = '';
        const li = [];
        for (const feature of data[i][`content${j}`].features) {
            const firstPart = feature.slice(0, feature.search('-') + 1);
            const lastPart = feature.slice(feature.search('-') + 1);
            const color = lastPart === ' no' ? 'red' : 'green';
            li.push(`<li>${firstPart}<span style="color:${color}">${lastPart}</span></li>`);
            li.sort((a, b) => {
                return b.search('green') - a.search('green');
            })
            
            featuresHTML = li.join('\n');
        }

        descriptionDOM.innerHTML = `
            <div class="desc-left">
                <h1>${data[i][`content${j}`].h1}</h1>
                <h3>Features</h3>
                <ul>
                    ${featuresHTML}
                </ul>
                <div class="git">
                <a href="${data[i][`content${j}`].gitPreview}" target="_blank" title="Website preview"><i class="fas fa-globe"></i></a>
                <a href="${data[i][`content${j}`].gitRepository}" target="_blank" title="Github repository"><i class="fab fa-github"></i></a>
                </div>
            </div>

            <div class="desc-right">
                <h3>Description</h3>
                <p class="description">${data[i][`content${j}`].description}</p>
                <h3>How it works</h3>
                <p>${data[i][`content${j}`].p}</p>
            </div>

        `
    }));
    document.querySelector('.examples img').click();
    // ------------------------------------------

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
        // clearProgressBar();
        // renderProgressBar(index);
        

    })
});

renderExamples(0);
