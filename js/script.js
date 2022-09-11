let allMusic = [
  {
    name: "Harley Bird - Home",
    artist: "Jordan Schor",
    img: "music-1",
    src: "music-1",
  },
  {
    name: "Ikson Anywhere – Ikson",
    artist: "Audio Library",
    img: "music-2",
    src: "music-2",
  },
  {
    name: "Beauz & Jvna - Crazy",
    artist: "Beauz & Jvna",
    img: "music-3",
    src: "music-3",
  },
  {
    name: "Hardwind - Want Me",
    artist: "Mike Archangelo",
    img: "music-4",
    src: "music-4",
  },
  {
    name: "Jim - Sun Goes Down",
    artist: "Jim Yosef x Roy",
    img: "music-5",
    src: "music-5",
  },
  {
    name: "Lost Sky - Vision NCS",
    artist: "NCS Release",
    img: "music-6",
    src: "music-6",
  },
];

let music = document.querySelector("audio");
let playButton = document.querySelector("#play");
let musicTitle = document.querySelector(".music-title");
let musicArtist = document.querySelector(".music-artist");
let forwardButton = document.querySelector(".forward");
let backwardButton = document.querySelector(".backward");
let musicImage = document.querySelector("img");
let currentTime = document.querySelector(".current-time");
let totalTime = document.querySelector(".total-time");
let progressBar = document.querySelector(".progress-bar");
let progressDiv = document.querySelector(".progress-div");

let songIndex = Math.floor(Math.random() * allMusic.length);

// load the music
window.addEventListener("load", () => {
  music.src = `./songs/${allMusic[songIndex].src}.mp3`;
  musicTitle.innerText = `${allMusic[songIndex].name}`;
  musicArtist.innerText = `${allMusic[songIndex].artist}`;
  musicImage.src = `./images/${allMusic[songIndex].img}.jpg`;
});

// play/pause the music

const playMusic = () => {
  music.play();
  playButton.classList.replace("fa-play", "fa-pause");
  musicTitle.innerText = `${allMusic[songIndex].name}`;
  musicArtist.innerText = `${allMusic[songIndex].artist}`;
  musicImage.src = `./images/${allMusic[songIndex].img}.jpg`;
};

const pauseMusic = () => {
  music.pause();
  playButton.classList.replace("fa-pause", "fa-play");
};

playButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (music.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
});

// backward forward button

function nextSong() {
  songIndex++;
  songIndex = songIndex % allMusic.length;

  music.src = `./songs/${allMusic[songIndex].src}.mp3`;
  playMusic();
}

function previousSong() {
  songIndex--;
  songIndex = (songIndex + allMusic.length) % allMusic.length;
  console.log(allMusic[songIndex].src);
  music.src = `./songs/${allMusic[songIndex].src}.mp3`;
  playMusic();
}

music.addEventListener("ended", nextSong);
forwardButton.addEventListener("click", nextSong);
backwardButton.addEventListener("click", previousSong);

// current time
music.addEventListener("timeupdate", function () {
  var s = parseInt(music.currentTime % 60);
  var m = parseInt((music.currentTime / 60) % 60);
  progressBar.style.width = `${(music.currentTime / music.duration) * 100}%`;
  if (s < 10) {
    currentTime.innerHTML = `${m}:0${s}`;
  } else {
    currentTime.innerHTML = `${m}:${s}`;
  }
});

// Total time
music.addEventListener("loadedmetadata", function () {
  var totalLength = parseInt(music.duration);
  var s = parseInt(totalLength % 60);
  var m = parseInt((totalLength / 60) % 60);
  if (s < 10) {
    totalTime.innerHTML = `${m}:0${s}`;
  } else {
    totalTime.innerHTML = `${m}:${s}`;
  }
  // console.log(totalLength);
});

// progress bar

progressDiv.addEventListener("click", function (e) {
  var totalLength = parseInt(music.duration);
  let move_progress = (e.offsetX / e.srcElement.clientWidth) * totalLength;
  music.currentTime = move_progress;
});
