const player = document.querySelector('.player')
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
// console.dir(video);
function togglePlay() {
    const method = video.paused ? "play" : "pause";
    console.log(method);
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    // console.dir(icon);
}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeControl() {
    video[this.name] = this.value;
}

function progerssMove() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
}

function scrub(e) {
    console.log(e.offsetX);
    console.log(progress.offsetWidth);
    console.log(video.duration);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('click',togglePlay);
toggle.addEventListener('click',togglePlay);    
skipButtons.forEach(button => button.addEventListener('click',skip));
// ranges.forEach(range => range.addEventListener('change', rangeControl));
ranges.forEach(range => range.addEventListener('mousemove', rangeControl));

let mousedown = false;
video.addEventListener('timeupdate', progerssMove);
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',e => mousedown && scrub(e));
progress.addEventListener('mousedown',()=> (mousedown = true));
progress.addEventListener('mouseup',()=> (mousedown = false))

