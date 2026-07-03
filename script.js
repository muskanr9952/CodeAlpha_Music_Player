const songs = [
{
title: "Dreams",
artist: "Artist One",
src: "music/song1.mp3",
cover: "images/cover1.jpg"
},
{
title: "Night Drive",
artist: "Artist Two",
src: "music/song2.mp3",
cover: "images/cover2.jpg"
},
{
title: "Memories",
artist: "Artist Three",
src: "music/song3.mp3",
cover: "images/cover3.jpg"
}
];

const audio = document.getElementById("audio");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const volumeControl = document.getElementById("volume");

const playlist = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

loadSong(songIndex);

function loadSong(index){

audio.src = songs[index].src;

title.textContent = songs[index].title;

artist.textContent = songs[index].artist;

cover.src = songs[index].cover;

updatePlaylist();

}

function playSong(){

audio.play();

isPlaying = true;

playBtn.innerHTML =
'<i class="fa-solid fa-pause"></i>';

cover.classList.add("play");

}

function pauseSong(){

audio.pause();

isPlaying = false;

playBtn.innerHTML =
'<i class="fa-solid fa-play"></i>';

cover.classList.remove("play");

}

playBtn.addEventListener("click",()=>{

if(isPlaying){

pauseSong();

}
else{

playSong();

}

});

function nextSong(){

songIndex++;

if(songIndex >= songs.length){

songIndex = 0;

}

loadSong(songIndex);

playSong();

}

function prevSong(){

songIndex--;

if(songIndex < 0){

songIndex = songs.length - 1;

}

loadSong(songIndex);

playSong();

}

nextBtn.addEventListener("click",nextSong);

prevBtn.addEventListener("click",prevSong);

audio.addEventListener("timeupdate",(e)=>{

const {duration,currentTime}=e.srcElement;

if(!duration) return;

const progressPercent=(currentTime/duration)*100;

progress.style.width=`${progressPercent}%`;

let currentMin=Math.floor(currentTime/60);

let currentSec=Math.floor(currentTime%60);

if(currentSec<10){

currentSec=`0${currentSec}`;

}

currentTimeEl.textContent=
`${currentMin}:${currentSec}`;

});

audio.addEventListener("loadedmetadata",()=>{

let durationMin=Math.floor(audio.duration/60);

let durationSec=Math.floor(audio.duration%60);

if(durationSec<10){

durationSec=`0${durationSec}`;

}

durationEl.textContent=
`${durationMin}:${durationSec}`;

});

progressContainer.addEventListener("click",(e)=>{

const width=progressContainer.clientWidth;

const clickX=e.offsetX;

const duration=audio.duration;

audio.currentTime=(clickX/width)*duration;

});

volumeControl.addEventListener("input",()=>{

audio.volume=volumeControl.value;

});

audio.addEventListener("ended",()=>{

nextSong();

});

function updatePlaylist(){

playlist.innerHTML="";

songs.forEach((song,index)=>{

const li=document.createElement("li");

li.innerHTML=
`<strong>${song.title}</strong><br>
<small>${song.artist}</small>`;

if(index===songIndex){

li.classList.add("active-song");

}

li.addEventListener("click",()=>{

songIndex=index;

loadSong(songIndex);

playSong();

});

playlist.appendChild(li);

});

}