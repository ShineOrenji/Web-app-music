// Ambil elemen DOM yang diperlukan
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.querySelector('.progress-bar-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const songTitle = document.querySelector('.song-title');
const songArtist = document.querySelector('.song-artist');
const albumArt = document.querySelector('.album-art');

// Status pemutaran
let isPlaying = false;

// Fungsi untuk memutar atau menjeda lagu
function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Fungsi untuk memutar lagu
function playSong() {
    isPlaying = true;
    audioPlayer.play();
    playBtn.innerHTML = '⏸';
    albumArt.parentElement.classList.add('playing');
}

// Fungsi untuk menjeda lagu
function pauseSong() {
    isPlaying = false;
    audioPlayer.pause();
    playBtn.innerHTML = '▶';
    albumArt.parentElement.classList.remove('playing');
}

// Fungsi untuk memperbarui progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    
    // Perbarui lebar progress bar
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    // Perbarui waktu
    currentTimeEl.textContent = formatTime(currentTime);
}

// Fungsi untuk mengatur progress lagu berdasarkan klik pada progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    
    audioPlayer.currentTime = (clickX / width) * duration;
}

// Fungsi untuk mengatur volume
function setVolume() {
    audioPlayer.volume = volumeSlider.value / 100;
    
    // Perbarui ikon volume berdasarkan level
    const volumeIcon = document.querySelector('.volume-icon');
    if (volumeSlider.value == 0) {
        volumeIcon.textContent = '🔇';
    } else if (volumeSlider.value < 30) {
        volumeIcon.textContent = '🔈';
    } else if (volumeSlider.value < 70) {
        volumeIcon.textContent = '🔉';
    } else {
        volumeIcon.textContent = '🔊';
    }
}

// Fungsi untuk memformat waktu (detik ke menit:detik)
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Fungsi untuk mengupdate info lagu (jika diperlukan)
function updateSongInfo() {
    // Di sini Anda bisa mengupdate judul dan artis lagu
    // Misalnya dari metadata audio jika tersedia
    songTitle.textContent = "Lagu Favorit Saya";
    songArtist.textContent = "Nama Artis";
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => {
    // Fungsi untuk lagu sebelumnya (jika ada playlist)
    // Untuk satu lagu, kita reset ke awal
    audioPlayer.currentTime = 0;
    if (isPlaying) {
        playSong();
    }
});
nextBtn.addEventListener('click', () => {
    // Fungsi untuk lagu berikutnya (jika ada playlist)
    // Untuk satu lagu, kita reset ke awal
    audioPlayer.currentTime = 0;
    if (isPlaying) {
        playSong();
    }
});
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', () => {
    // Ketika lagu selesai, reset ke awal
    pauseSong();
    audioPlayer.currentTime = 0;
    progressBar.style.width = '0%';
    currentTimeEl.textContent = '0:00';
});
audioPlayer.addEventListener('loadedmetadata', () => {
    // Set durasi lagu ketika metadata dimuat
    durationEl.textContent = formatTime(audioPlayer.duration);
});
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', setVolume);

// Inisialisasi
function init() {
    updateSongInfo();
    setVolume(); // Set volume awal
}

// Jalankan inisialisasi saat halaman dimuat
window.addEventListener('load', init);