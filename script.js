// Lấy phần tử thanh tìm kiếm và biểu tượng kính lúp
const searchIcon = document.getElementById("search-icon");
const searchBar = document.getElementById("search-bar");

// Thêm sự kiện click vào biểu tượng kính lúp để mở thanh tìm kiếm
searchIcon.addEventListener("click", () => {
    searchBar.classList.toggle("open");
});

// Lấy các phần tử bài hát và nút điều khiển trình phát nhạc
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
    const trackTitle = playlist[index].
