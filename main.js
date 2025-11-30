const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// Toggle sidebar
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active"); // SHOW/HIDE OVERLAY
});

// Close sidebar when clicking outside + on overlay
document.addEventListener("click", (e) => {
  const clickedOutsideSidebar = !sidebar.contains(e.target);
  const clickedMenuBtn = menuBtn.contains(e.target);
  const clickedOverlay = overlay.contains(e.target);

  if (clickedOverlay || (clickedOutsideSidebar && !clickedMenuBtn)) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }
});
