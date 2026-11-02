// Progressive enhancement: native controls remain available without JavaScript.
const players = Array.from(document.querySelectorAll<HTMLElement>('[data-film-player]'))

for (const player of players) {
  const video = player.querySelector<HTMLVideoElement>('[data-film]')
  const button = player.querySelector<HTMLButtonElement>('[data-film-play]')
  const error = player.querySelector<HTMLElement>('[data-film-error]')
  if (!video || !button) continue

  button.hidden = false
  video.controls = false

  button.addEventListener('click', () => {
    button.hidden = true
    video.controls = true
    video.focus()
    void video.play().catch(() => {
      // A rejected play request still leaves the native controls usable.
      if (!video.error) return
      if (error) error.hidden = false
    })
  })

  video.addEventListener('play', () => {
    button.hidden = true
    video.controls = true
    for (const other of players) {
      const otherVideo = other.querySelector<HTMLVideoElement>('[data-film]')
      if (otherVideo && otherVideo !== video) otherVideo.pause()
    }
  })
  video.addEventListener('error', () => {
    button.hidden = true
    if (error) error.hidden = false
  })
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    for (const player of players) player.querySelector<HTMLVideoElement>('[data-film]')?.pause()
  }
})
