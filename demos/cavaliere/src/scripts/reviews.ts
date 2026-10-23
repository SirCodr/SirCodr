export {}

const carousel = document.querySelector<HTMLElement>('[data-review-carousel]')
const viewport = carousel?.querySelector<HTMLElement>('[data-review-viewport]')
const track = carousel?.querySelector<HTMLElement>('.reviews-track')
const cards = Array.from(track?.querySelectorAll<HTMLElement>('.review-card') ?? [])
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
let timer: ReturnType<typeof setTimeout> | undefined
let animation: Animation | undefined
let current = 0
let visible = false

if (carousel && viewport && track && cards.length > 1) {
  // The second set makes the last-to-first transition continuous. It has no
  // accessibility-tree entries or IDs; screen readers read the six originals.
  cards.forEach((card) => {
    const clone = card.cloneNode(true) as HTMLElement
    clone.classList.add('review-card--clone')
    clone.setAttribute('aria-hidden', 'true')
    clone.inert = true
    clone.removeAttribute('aria-labelledby')
    clone.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'))
    track.append(clone)
  })

  const offset = (index: number) => {
    const card = track.children[index] as HTMLElement
    return card.offsetLeft - cards[0].offsetLeft
  }
  const transform = (index: number) => `translate3d(${-offset(index)}px, 0, 0)`

  function schedule() {
    clearTimeout(timer)
    if (!visible || reducedMotion.matches || document.hidden) return
    // Start one card transition every two seconds (650ms transition + 1.35s hold).
    timer = setTimeout(advance, 1350)
  }

  function advance() {
    if (!track || !visible || reducedMotion.matches || document.hidden) return
    const next = current + 1
    animation = track.animate([
      { transform: transform(current) },
      { transform: transform(next) },
    ], { duration: 650, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' })
    animation.onfinish = () => {
      current = next === cards.length ? 0 : next
      track.style.transform = transform(current)
      animation?.cancel()
      animation = undefined
      schedule()
    }
  }

  function syncLayout() {
    clearTimeout(timer)
    animation?.cancel()
    animation = undefined
    if (!carousel || !track) return
    if (reducedMotion.matches) {
      carousel.removeAttribute('data-enhanced')
      track.style.removeProperty('transform')
      current = 0
    } else {
      carousel.setAttribute('data-enhanced', '')
      track.style.transform = transform(current)
    }
    schedule()
  }

  // No hover, focus, dragging, keyboard, or manual control changes this carousel.
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    schedule()
  }, { threshold: 0.15 }).observe(viewport)
  new ResizeObserver(syncLayout).observe(viewport)
  reducedMotion.addEventListener('change', syncLayout)
  document.addEventListener('visibilitychange', schedule)
  syncLayout()
}
