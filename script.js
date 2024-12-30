// Lấy các phần tử HTML
const playlist = document.querySelectorAll("#playlist li");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");

// Tạo đối tượng audio
let currentTrackIndex = 0;
const audio = new Audio();

// Hàm tải bài hát
function loadTrack(index) {
    currentTrackIndex = index;
    const trackSrc = playlist[index].getAttribute("data-src");
    audio.src = trackSrc;
    audio.play();
    playPauseBtn.textContent = "⏸️";
}

// Điều khiển nút Play/Pause
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸️";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶️";
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
