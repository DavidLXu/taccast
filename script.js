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
