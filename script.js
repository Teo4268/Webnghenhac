// Lấy các phần tử HTML
const playlist = document.querySelectorAll("#playlist li");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const trackName = document.getElementById("track-name");

// Tạo đối tượng audio
let currentTrackIndex = 0;
const audio = new Audio();

// Hàm tải bài hát
function loadTrack(index) {
    currentTrackIndex = index;
    const trackSrc = playlist[index].getAttribute("data-src");
    const trackTitle = playlist[index].getAttribute("data-name");
    
    audio.src = trackSrc;
    trackName.textContent = trackTitle;
    audio.play();
    playPauseBtn.innerHTML = `<svg id="pause-icon" viewBox="0 0 24 24">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                              </svg>`;
}

// Điều khiển nút Play/Pause
playPauseBtn.addEventListener("click", () => {
    const playIcon = document.getElementById("play-icon");
    const pauseIcon = document.getElementById("pause-icon");

    if (audio.paused) {
        audio.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    } else {
        audio.pause();
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
    }
});

// Điều khiển bài trước
prevBtn.addEventListener("click", () => {
    const newIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(newIndex);
});

// Điều khiển bài tiếp theo
nextBtn.addEventListener("click", () => {
    const newIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(newIndex);
});

// Cập nhật tiến trình bài hát
audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress || 0;
});

// Tua khi kéo thanh tiến trình
progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Chọn bài từ danh sách
playlist.forEach((track, index) => {
    track.addEventListener("click", () => loadTrack(index));
});

// Tải bài hát đầu tiên khi trang tải
window.onload = () => {
    loadTrack(0);
};
