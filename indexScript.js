// ==== Force scroll to top on reload ====
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// ==== Main Script ====
window.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("customCursor");

  if (cursor) {
    cursor.style.opacity = "1"; // <- NEW: Force visible just in case
    cursor.style.display = "block"; // <- NEW: Force block display
  }

  document.addEventListener("mousemove", e => {
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  });
});
