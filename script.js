const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressConstainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'iday-hands',
    displayName: 'hands',
    artist: 'iday',
    duration: "4:34"
  },
  {
    name: 'iday-starrynight',
    displayName: 'starry night',
    artist: 'iday',
    duration: "2:56"
    },
    {
    name: 'iday-togetherforever',
    displayName: 'together forever',
    artist: 'iday',
    duration: "3:37"
    }
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();

}
 
// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
    
}

// Player or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    durationEl.textContent = song.duration;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
};

// Current Song
let songIndex = Math.floor(Math.random() * songs.length);

// Previous Song
function prevSong() {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex--;
    }
    loadSong(songs[songIndex]);
    playSong();
};

// Next Song
function nextSong() {
    if (songIndex >= 2) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    loadSong(songs[songIndex]);
    playSong();
};

// On Load - Select Random Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(event) {
    if (isPlaying) {
        const { duration, currentTime } = event.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration 
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressConstainer.addEventListener('click', setProgressBar);
