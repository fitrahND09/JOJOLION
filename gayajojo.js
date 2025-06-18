
      // --- Logika untuk Stand dan Gelembung (TETAP SAMA) ---
      const heroSection = document.querySelector(".jojo-theme .hero-section"); // Sedikit penyesuaian selector
      const standVisual = document.querySelector(".jojo-theme .stand-visual"); // Sedikit penyesuaian selector

      heroSection.addEventListener("click", function (e) {
        const bubblesContainer = document.querySelector(".jojo-theme .bubbles"); // Sedikit penyesuaian selector
        const burstAmount = 7;
        for (let i = 0; i < burstAmount; i++) {
          const bubble = document.createElement("div");
          bubble.classList.add("bubble");
          const size = Math.random() * 60 + 20;
          bubble.style.width = `${size}px`;
          bubble.style.height = `${size}px`;
          bubble.style.left = `${e.clientX - size / 2}px`;
          bubble.style.top = `${e.clientY - size / 2}px`;
          const drift = (Math.random() - 0.5) * 200;
          const duration = Math.random() * 5 + 4;
          bubble.style.setProperty("--drift", `${drift}px`);
          bubble.style.animation = `floatFreely ${duration}s ease-in-out forwards`;
          bubble.addEventListener("animationend", function () {
            this.remove();
          });

          // Memasukkan gelembung ke dalam .bubbles
          if (bubblesContainer) bubblesContainer.appendChild(bubble);
        }
      });

      let clickCount = 0;
      let clickTimer = null;
      const SPAM_THRESHOLD = 10;
      const SPAM_WINDOW = 800;
      heroSection.addEventListener("click", function () {
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, SPAM_WINDOW);
        if (clickCount >= SPAM_THRESHOLD) {
          if (!standVisual.classList.contains("is-summoned")) {
            standVisual.classList.add("is-summoned");
            standVisual.addEventListener(
              "animationend",
              () => {
                standVisual.classList.remove("is-summoned");
              },
              { once: true }
            );
          }
          clickCount = 0;
        }
      });

      // --- LOGIKA BARU UNTUK PEMUTAR MUSIK ---
      const playerControl = document.getElementById("player-control");
      const audio = document.getElementById("song");
      const playerIconPath = document.getElementById("player-icon-path");
      const playIcon = "M8 5v14l11-7z";
      const pauseIcon = "M6 19h4V5H6v14zm8-14v14h4V5h-4z";
      let isPlaying = false;
      playerControl.addEventListener("click", () => {
        if (isPlaying) {
          audio.pause();
          playerIconPath.setAttribute("d", playIcon);
          playerControl.classList.remove("playing");
        } else {
          audio.play();
          playerIconPath.setAttribute("d", pauseIcon);
          playerControl.classList.add("playing");
        }
        isPlaying = !isPlaying;
      });
      audio.addEventListener("ended", () => {
        playerControl.classList.remove("playing");
        setTimeout(() => {
          playerControl.classList.add("playing");
        }, 10);
      });
