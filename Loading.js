// ==== Custom Cursor Tracking ====
document.addEventListener("mousemove", e => {
  // Grab the custom cursor element
  const cursor = document.getElementById("customCursor");

  if (cursor) {
    // Move the cursor to follow mouse position
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }
});

// ==== Intro Animation: Squiggle + Circle ====
window.addEventListener("load", () => {
  // === Grab important elements ===
  const canvas = document.getElementById("squiggle-canvas"); // Background squiggle canvas
  const ctx = canvas.getContext("2d");                       // 2D drawing context
  const circle = document.getElementById("enterCircle");     // Main clickable "Borinquén" circle
  const intro = document.getElementById("intro");            // Fullscreen intro overlay

  // === Set canvas size to full window ===
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // === Center of screen (to build squiggle around it) ===
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // === Build a sine wave path (wavy line) ===
  const path = [];
  for (let i = 0; i <= 200; i++) {
    const x = centerX - 100 + i;               // Start left of center, move right
    const y = centerY + Math.sin(i * 0.15) * 20; // Wavy up and down effect
    path.push({ x, y });
  }

  let progress = 0;       // How far along we are drawing
  let animationFrame;     // Used to control animation frames

  // === Draw function ===
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear old frame

    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);

    // Draw up to the current "progress" point
    for (let i = 1; i < progress; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }

    // Style the line
    ctx.strokeStyle = "#5f8133"; // Olive green
    ctx.lineWidth = 4;
    ctx.stroke();

    // Animate until we reach the end of the squiggle
    if (progress < path.length) {
      progress += 3; // Move forward 3 points per frame
      animationFrame = requestAnimationFrame(draw); // Keep animating
    } else {
      // Once complete, trigger the circle animation
      setTimeout(() => {
        // Grow the clickable circle
        circle.classList.remove("hidden");
        circle.classList.add("show-size");

        // After size grows, fade in text and fade out squiggle
        setTimeout(() => {
          circle.classList.add("show-text");
          canvas.style.transition = "opacity 0.5s ease";
          canvas.style.opacity = "0"; // Fade out canvas background
        }, 1000); // After 1s of grow
      }, 500); // 0.5s after squiggle finishes
    }
  }

  // Start the squiggle drawing when page fully loads
  draw();

  // ==== Click on the Circle: Expand and Enter ====
  circle.addEventListener("click", () => {
    // Expand the circle to cover the whole screen
    circle.classList.add("expand-full");

    // After expansion starts, fade out the entire body
    setTimeout(() => {
      document.body.classList.add("fade-out"); // Applies fadeOut keyframes
    }, 800); // Wait for expansion to start

    // Finally, after full fade, navigate to index.html
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1800); // Total delay so animations complete before redirect
  });
});
