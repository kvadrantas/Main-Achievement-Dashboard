
let progressBarAnimationDOM = document.querySelector('style');
function renderProgressBar() {
    setTimeout(() => {
        progressBarAnimationDOM.innerHTML = `
        @keyframes left{
            100%{
              transform: rotate(180deg);    // Atitinka 50% desiniojo rutulio
            }
          }
        
          @keyframes right{
            100%{
              transform: rotate(180deg);    // Atitinka 50% kairiojo rutulio
            }
          }
        `
    }, 50);
}

function clearProgressBar () {
    progressBarAnimationDOM.innerHTML = '';
}

// NAVIGATION BUTTONS LISTENER
const navigationDOM = document.querySelectorAll('.navigation li');
navigationDOM.forEach((element, index) => {
    element.addEventListener('click', () => {
        let html = `
        
        `
        clearProgressBar()
        renderProgressBar();
    })
});

