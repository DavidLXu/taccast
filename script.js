const heroVideos = document.querySelectorAll(".hero-tile video");

heroVideos.forEach((video) => {
  const startAtPhase = () => {
    const phase = Number(video.dataset.phase || 0);

    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = Math.min(video.duration - 0.05, video.duration * phase);
    }

    video.play().catch(() => {
      // Muted inline videos normally autoplay; the browser may still defer playback.
    });
  };

  if (video.readyState >= 1) {
    startAtPhase();
  } else {
    video.addEventListener("loadedmetadata", startAtPhase, { once: true });
  }
});

const galleryToggles = document.querySelectorAll("[data-gallery-toggle]");

const syncGalleryVideos = (gallery) => {
  gallery.querySelectorAll("video").forEach((video) => {
    const isVisible = video.closest(".object-card")?.offsetParent !== null;

    if (isVisible) {
      video.play().catch(() => {
        // Muted inline videos normally autoplay; the browser may still defer playback.
      });
    } else {
      video.pause();
    }
  });
};

galleryToggles.forEach((button) => {
  const gallery = document.getElementById(button.dataset.galleryToggle);
  const label = button.querySelector("span");

  if (!gallery || !label) return;

  const updateGallery = (expanded) => {
    gallery.classList.toggle("is-collapsed", !expanded);
    button.setAttribute("aria-expanded", String(expanded));
    label.textContent = expanded ? button.dataset.closeLabel : button.dataset.openLabel;
    syncGalleryVideos(gallery);
  };

  updateGallery(false);
  button.addEventListener("click", () => {
    updateGallery(button.getAttribute("aria-expanded") !== "true");
  });
});

window.addEventListener("resize", () => {
  document.querySelectorAll(".object-grid").forEach(syncGalleryVideos);
});
