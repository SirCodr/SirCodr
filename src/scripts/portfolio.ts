interface PreviewState {
  video: HTMLVideoElement
  button: HTMLButtonElement | null
  visible: boolean
  manuallyPaused: boolean
  failed: boolean
}

function initPortfolio() {
  const element = document.querySelector<HTMLElement>('[data-portfolio]')
  if (!element) return
  const root = element

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection
  const saveData = connection?.saveData === true
  const orbitArt = root.querySelector<HTMLElement>('.hero-art')
  const orbitObjects = orbitArt
    ? [
        orbitArt.querySelector<HTMLElement>('.orb'),
        orbitArt.querySelector<HTMLElement>('.bracket'),
      ].filter((object): object is HTMLElement => object !== null)
    : []
  const orbitInlineStyles = orbitObjects.map((object) =>
    object.getAttribute('style'),
  )
  let orbitVisible = false
  let orbitFrame = 0
  let orbitStarted = 0
  const orbitCycles = [38_000, 34_000]
  const orbitStartingAngles = [0, 0.4]
  const compactViewport = window.matchMedia('(max-width: 760px)')

  function restoreOrbit() {
    orbitArt?.classList.remove('orbiting')
    orbitObjects.forEach((object, index) => {
      const style = orbitInlineStyles[index]
      if (style === null) object.removeAttribute('style')
      else object.setAttribute('style', style)
    })
  }

  function stopOrbit() {
    if (orbitFrame) window.cancelAnimationFrame(orbitFrame)
    orbitFrame = 0
    restoreOrbit()
  }

  function syncOrbit() {
    const shouldOrbit =
      orbitArt &&
      orbitObjects.length === 2 &&
      orbitVisible &&
      !motionPaused() &&
      !document.hidden
    if (!shouldOrbit) {
      stopOrbit()
      return
    }
    if (!orbitFrame) {
      orbitArt.classList.add('orbiting')
      orbitStarted = performance.now()
      orbitFrame = window.requestAnimationFrame(animateOrbit)
    }
  }

  function animateOrbit(now: number) {
    orbitFrame = 0
    if (!orbitArt || !orbitVisible || motionPaused() || document.hidden) {
      syncOrbit()
      return
    }

    const width = orbitArt.clientWidth
    const height = orbitArt.clientHeight
    const compact = compactViewport.matches
    const xRadius = compact ? 0.34 : 0.44
    const yRadius = compact ? 0.36 : 0.42

    orbitObjects.forEach((object, index) => {
      const angle =
        ((now - orbitStarted) / orbitCycles[index]) * Math.PI * 2 +
        orbitStartingAngles[index]
      const depth = Math.sin(angle)
      const centerX = width * (0.51 + xRadius * Math.cos(angle))
      const centerY = height * (0.51 + yRadius * depth)
      const scale = 0.8 + ((depth + 1) / 2) * 0.18
      const rotation = index === 1 ? 12 + depth * 12 : 0

      object.style.zIndex = depth < -0.08 ? '1' : '4'
      object.style.transform = `translate3d(${centerX - object.offsetWidth / 2}px, ${centerY - object.offsetHeight / 2}px, 0) rotate(${rotation}deg) scale(${scale})`
    })

    orbitFrame = window.requestAnimationFrame(animateOrbit)
  }

  const previews: PreviewState[] = Array.from(
    root.querySelectorAll<HTMLVideoElement>('[data-preview-src]'),
  ).map((video) => ({
    video,
    button:
      video
        .closest('[data-project-preview]')
        ?.querySelector<HTMLButtonElement>('[data-video-toggle]') ?? null,
    visible: false,
    manuallyPaused: false,
    failed: false,
  }))

  const motionPaused = () => saveData || reducedMotion.matches

  function syncPreviewButton(state: PreviewState) {
    if (!state.button) return
    const { video, button } = state
    button.disabled = motionPaused()
    button.setAttribute('aria-pressed', String(video.paused))
    button.setAttribute(
      'aria-label',
      (video.paused ? button.dataset.playLabel : button.dataset.pauseLabel) ??
        '',
    )
    const icon = button.querySelector('span')
    if (icon) icon.textContent = video.paused ? '▷' : 'Ⅱ'
  }

  function failPreview(state: PreviewState) {
    state.failed = true
    state.video.pause()
    state.video.removeAttribute('src')
    state.video.load()
    if (state.button) state.button.hidden = true
  }

  function playPreview(state: PreviewState) {
    if (state.failed) return
    const { video } = state
    // Source assignment is delayed too: preload="none" alone is only a browser hint.
    if (!video.hasAttribute('src')) {
      if (!video.canPlayType('video/mp4')) return
      video.src = video.dataset.previewSrc ?? ''
    }
    void video.play().catch((error: unknown) => {
      if (state.failed) return
      // Leaving the viewport can abort a pending play; it is not a media failure.
      if (error instanceof DOMException && error.name === 'AbortError') return
      if (video.error) failPreview(state)
      else if (state.button) {
        state.button.hidden = false
        syncPreviewButton(state)
      }
    })
  }

  function updatePreviews() {
    for (const state of previews) {
      if (
        motionPaused() ||
        document.hidden ||
        !state.visible ||
        state.manuallyPaused
      )
        state.video.pause()
      else playPreview(state)
      syncPreviewButton(state)
    }
  }

  function updateMotion() {
    const paused = motionPaused()
    root.classList.toggle('paused', paused)
    if (paused) {
      root.style.setProperty('--look-x', '0px')
      root.style.setProperty('--look-y', '0px')
    }
    syncOrbit()
    updatePreviews()
  }

  for (const state of previews) {
    state.video.addEventListener('loadeddata', () => {
      if (state.button && !state.failed) state.button.hidden = false
      syncPreviewButton(state)
    })
    state.video.addEventListener('play', () => syncPreviewButton(state))
    state.video.addEventListener('pause', () => syncPreviewButton(state))
    state.video.addEventListener('error', () => {
      if (!state.failed) failPreview(state)
    })
    state.button?.addEventListener('click', () => {
      state.manuallyPaused = !state.video.paused
      updatePreviews()
    })
  }

  if ('IntersectionObserver' in window) {
    const byVideo = new Map(previews.map((state) => [state.video, state]))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const state = byVideo.get(entry.target as HTMLVideoElement)
          if (state) state.visible = entry.isIntersecting
        }
        updatePreviews()
      },
      { threshold: 0.12 },
    )
    previews.forEach((state) => observer.observe(state.video))
  } else {
    previews.forEach((state) => {
      state.visible = true
    })
  }

  reducedMotion.addEventListener('change', updateMotion)
  document.addEventListener('visibilitychange', () => {
    syncOrbit()
    updatePreviews()
  })

  if (orbitArt) {
    if ('IntersectionObserver' in window) {
      const orbitObserver = new IntersectionObserver(
        ([entry]) => {
          orbitVisible = entry.isIntersecting
          syncOrbit()
        },
        { threshold: 0.01 },
      )
      orbitObserver.observe(orbitArt)
    } else {
      orbitVisible = true
    }
    window.addEventListener('resize', syncOrbit)
  }

  let pointerFrame = 0
  let lookX = 0
  let lookY = 0
  root.addEventListener(
    'pointermove',
    (event) => {
      if (motionPaused() || !precisePointer.matches) return
      lookX = (event.clientX / window.innerWidth - 0.5) * 8
      lookY = (event.clientY / window.innerHeight - 0.5) * 6
      if (pointerFrame) return
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0
        if (motionPaused()) return
        root.style.setProperty('--look-x', `${lookX}px`)
        root.style.setProperty('--look-y', `${lookY}px`)
      })
    },
    { passive: true },
  )

  updateMotion()
}

initPortfolio()
