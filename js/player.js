document.addEventListener("DOMContentLoaded", () => {
    let MAX = 400;

    function init() {

        media.addEventListener('click', push);
        play.addEventListener('click', push);
        mute.addEventListener('click', volumeOff);
        bar.addEventListener('click', clickBar);
        volRange.addEventListener('change', volume);
    }

    function volumeOff() {

        if (!media.muted) {
            media.muted = true;
            mute.value = "On";
        } else {
            media.muted = false;
            mute.value = "Off";
        }
        
    }

    function push() {

        if (!media.paused && !media.ended) {
            media.pause();
            play.value = "Play";
            clearInterval(loop);
        } else {
            media.play();
            play.value = "Pause";
            loop = setInterval(moveBar, 1000);
        }

    }

    function moveBar() {

        if (!media.ended) {
            let size = parseFloat(media.currentTime * MAX / media.duration);
            progress.style.width = `${size}px`;
        } else {
            clearInterval(loop);
            progress.style.width = '0';
            play.value = "Play";
        }

    }

    function clickBar(e) {
        
        if (!media.paused && !media.ended) {
            let mouseX = e.pageX - bar.offsetLeft;
            let newTime = mouseX * media.duration / MAX;
            media.currentTime = newTime;
            progress.style.width = `${mouseX}px`;
        }

    }

    function volume() {
        media.volume = volRange.value;
    }

    init();
});