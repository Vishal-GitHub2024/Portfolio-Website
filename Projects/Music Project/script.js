let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let image = document.getElementsByClassName('currentSong')
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Safar", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "All Black", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Khaab", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Jaguar", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Ki Likha", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Bachalo", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Mitti De Tibbe", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Oye Hoye Hoye", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Hornn Blow", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Suicide", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
    { songName: "Dhokha", filePath: "songs/11.mp3", coverPath: "covers/11.jpg" },
    { songName: "Bachpan Ka Pyar", filePath: "songs/12.mp3", coverPath: "covers/12.jpg" },
    { songName: "Bad Boy X Bad Girl", filePath: "songs/13.mp3", coverPath: "covers/13.jpg" },
    { songName: "Chand Wala Mukhda Leke", filePath: "songs/14.mp3", coverPath: "covers/14.jpg" },
    { songName: "Dil Galti Kar Baitha Hai", filePath: "songs/15.mp3", coverPath: "covers/15.jpg" },
    { songName: "Genda Fool", filePath: "songs/16.mp3", coverPath: "covers/16.jpg" },
    { songName: "Kahani Suno 2.0", filePath: "songs/17.mp3", coverPath: "covers/17.jpg" },
    { songName: "Mast Nazron Se", filePath: "songs/18.mp3", coverPath: "covers/18.jpg" },
    { songName: "Nacho Nacho", filePath: "songs/19.mp3", coverPath: "covers/19.jpg" },
    { songName: "O Aasman Wale", filePath: "songs/20.mp3", coverPath: "covers/20.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})



// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
       
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        // If the song is currently playing, pause it
        if (audioElement.paused) {
            // Play the clicked song
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        } else {
            // Pause the song
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            
        }
    });
});
               
// Function to pause the song
function pauseSong(e) {
    e.target.classList.remove('fa-pause-circle');
    e.target.classList.add('fa-play-circle');
    audioElement.pause();
    gif.style.opacity = 0;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
}



document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 20) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    changeCurrentSongImage(songIndex); // Add this line to update the current song image
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    changeCurrentSongImage(songIndex); // Add this line to update the current song image
});

// Function to change the currentSong image
function changeCurrentSongImage(songId) {
    const imgSrc = `covers/${songId}.jpg`; // Assuming the cover images are named after song IDs
    document.querySelector('.currentSong img').src = imgSrc;
}


const volumeIcon = document.getElementById('vol_icon');
const volumeInput = document.getElementById('vol');

// Event listener for volume change
volumeInput.addEventListener('input', function() {
    const volumeLevel = volumeInput.value;
    // Update the volume icon based on volume level
    updateVolumeIcon(volumeLevel);
    // Set the volume of the audio element
    audioElement.volume = volumeLevel / 100;
});

// Function to update the volume icon based on volume level
function updateVolumeIcon(volumeLevel) {
    if (volumeLevel == 0) {
        volumeIcon.className = 'fa fa-volume-off';
    } else if (volumeLevel < 50) {
        volumeIcon.className = 'fa fa-volume-down';
    } else {
        volumeIcon.className = 'fa fa-volume-up';
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector('input[type="text"]');
    const songItems = document.querySelectorAll('.songItem');

    // Function to filter song items based on search input
    function filterSongs() {
        const searchTerm = searchInput.value.toLowerCase();
        songItems.forEach(function (item) {
            const songName = item.querySelector('.songName').textContent.toLowerCase();
            if (songName.includes(searchTerm)) {
                item.style.display = 'block'; // Show matching song item
            } else {
                item.style.display = 'none'; // Hide non-matching song item
            }
        });
    }

    // Event listener for input in the search field
    searchInput.addEventListener('input', filterSongs);
});

// update currentSong image

document.addEventListener("DOMContentLoaded", function () {
    // Assuming you have an audioElement defined elsewhere in your script
    const audioElement = document.createElement('audio');
    // Other audioElement setup...
    
    const currentSongImg = document.querySelector('.currentSong img');

    // Function to change the currentSong image
    function changeCurrentSongImage(songId) {
        const imgSrc = `covers/${songId}.jpg`; // Assuming the cover images are named after song IDs
        currentSongImg.src = imgSrc;
    }

    // Event listeners for playing songs
    const songItemPlays = document.querySelectorAll('.songItemPlay');

    songItemPlays.forEach(function (playButton) {
        playButton.addEventListener('click', function () {
            const songId = playButton.id;
            // Play the corresponding song...
            // Other play functionality...
            // Change the current song image
            changeCurrentSongImage(songId);
        });
    });
});

