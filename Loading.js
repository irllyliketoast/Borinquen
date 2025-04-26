	// ==== Custom Cursor Tracking ====
	document.addEventListener("mousemove", e => {
	  // Get the custom cursor element
	  const cursor = document.getElementById("customCursor");

	  // Move the cursor to follow the actual mouse position
	  cursor.style.left = `${e.clientX}px`;
	  cursor.style.top = `${e.clientY}px`;
	});

	// ==== Intro Animation Logic ====
	window.addEventListener("load", () => {
	  // Get references to the canvas and context for drawing
	  const canvas = document.getElementById("squiggle-canvas");
	  const ctx = canvas.getContext("2d");

	  // Get the interactive circle and intro screen container
	  const circle = document.getElementById("enterCircle");
	  const intro = document.getElementById("intro");

	  // Set the canvas size to match the window
	  canvas.width = window.innerWidth;
	  canvas.height = window.innerHeight;

	  // Get the center of the screen
	  const centerX = canvas.width / 2;
	  const centerY = canvas.height / 2;

	  // Create a wavy horizontal path using sine wave logic
	  const path = [];
	  for (let i = 0; i <= 200; i++) {
		const x = centerX - 100 + i; // Starts 100px left of center
		const y = centerY + Math.sin(i * 0.15) * 20; // Sine wave height
		path.push({ x, y }); // Store each point in the path
	  }

	  let progress = 0;       // Tracks drawing progress
	  let animationFrame;     // Stores animation frame reference

	  // Function to animate the squiggle being drawn
	  function draw() {
		// Clear previous frame
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Begin drawing new path
		ctx.beginPath();
		ctx.moveTo(path[0].x, path[0].y);

		// Draw the line up to the current progress
		for (let i = 1; i < progress; i++) {
		  ctx.lineTo(path[i].x, path[i].y);
		}

		// Set the stroke style
		ctx.strokeStyle = "#5f8133"; // Olive green
		ctx.lineWidth = 4;
		ctx.stroke();

		// Continue animation if not done yet
		if (progress < path.length) {
		  progress += 3; // Draw 3 more points per frame
		  animationFrame = requestAnimationFrame(draw); // Keep animating
		} else {
		  // Once done, wait briefly then animate the circle
		  setTimeout(() => {
			// Start circle sizing animation
			circle.classList.remove("hidden");
			circle.classList.add("show-size");

			// After the size anim, fade in the text + fade out the canvas
			setTimeout(() => {
			  circle.classList.add("show-text");
			  canvas.style.transition = "opacity 0.5s ease";
			  canvas.style.opacity = "0"; // Fade out canvas
			}, 1000); // Wait 1s after sizing starts
		  }, 500); // Wait 0.5s after draw finishes
		}
	  }

	  // Start the squiggle drawing
	  draw();


	  // ==== Click Event: Transition to Main Site ====
	  circle.addEventListener("click", () => {
		// Animate circle expanding to full screen
		circle.classList.add("expand-full");

		// Immediately hide the canvas
		canvas.style.display = "none";

		// Fade out the entire intro screen
		setTimeout(() => {
		  intro.style.opacity = "0"; // Fade out

		  // Then completely remove it from layout
		  setTimeout(() => {
			window.location.href = "index.html";
		  }, 1000); // Wait for fade-out transition to complete
		}, 1000); // Wait for circle expansion to complete
	  });
	});