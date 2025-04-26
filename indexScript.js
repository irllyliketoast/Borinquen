// Force scroll to top on reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// ==== Custom Cursor Tracking ====
document.addEventListener("mousemove", e => {
  const cursor = document.getElementById("customCursor");
  if (cursor) {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }
});
