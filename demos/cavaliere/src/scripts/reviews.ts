export {}

const section = document.querySelector<HTMLElement>('[data-voices]')
const quotes = Array.from(section?.querySelectorAll<HTMLElement>('[data-voice]') ?? [])
const controls = section?.querySelector<HTMLElement>('[data-voices-controls]')
const counter = section?.querySelector<HTMLElement>('[data-voice-page]')
const quoteRegion = section?.querySelector<HTMLElement>('#voices-quotes')
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')

if (section && controls && quotes.length > 1) {
  let current = 0
  let animation: Animation | undefined
  let outgoingAnimation: Animation | undefined
  let autoAdvance: ReturnType<typeof setInterval> | undefined

  controls.hidden = false

  const stopAutoAdvance = () => {
    if (autoAdvance) clearInterval(autoAdvance)
    autoAdvance = undefined
  }

  const startAutoAdvance = () => {
    stopAutoAdvance()
    if (document.hidden || section.matches(':hover') || section.contains(document.activeElement)) return
    autoAdvance = setInterval(() => show(1, false), 2000)
  }

  const show = (direction: number, announce: boolean) => {
    animation?.cancel()
    outgoingAnimation?.cancel()
    const previous = quotes[current]
    quotes.forEach((quote, index) => {
      if (index !== current) {
        quote.hidden = true
        quote.style.removeProperty('opacity')
        quote.style.removeProperty('transform')
      }
    })
    current = (current + direction + quotes.length) % quotes.length
    const next = quotes[current]
    next.hidden = false
    if (counter) counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(quotes.length).padStart(2, '0')}`
    quoteRegion?.setAttribute('aria-live', announce ? 'polite' : 'off')
    if (announce) window.setTimeout(() => quoteRegion?.setAttribute('aria-live', 'off'), 1200)

    if (motionPreference.matches) {
      previous.hidden = true
      return
    }

    outgoingAnimation = previous.animate([
      { opacity: 1 },
      { opacity: 0 },
    ], { duration: 620, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' })
    animation = next.animate([
      { opacity: 0 },
      { opacity: 1 },
    ], { delay: 520, duration: 430, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'both' })
    outgoingAnimation.onfinish = () => {
      previous.hidden = true
      previous.style.removeProperty('opacity')
      previous.style.removeProperty('transform')
    }
    animation.onfinish = () => {
      next.style.removeProperty('opacity')
      next.style.removeProperty('transform')
    }
  }

  section.querySelector('[data-voice-previous]')?.addEventListener('click', () => {
    show(-1, true)
    startAutoAdvance()
  })
  section.querySelector('[data-voice-next]')?.addEventListener('click', () => {
    show(1, true)
    startAutoAdvance()
  })

  section.addEventListener('pointerenter', stopAutoAdvance)
  section.addEventListener('pointerleave', startAutoAdvance)
  section.addEventListener('focusin', stopAutoAdvance)
  section.addEventListener('focusout', (event) => {
    if (!section.contains(event.relatedTarget as Node | null)) startAutoAdvance()
  })
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoAdvance()
    else startAutoAdvance()
  })
  motionPreference.addEventListener('change', () => animation?.cancel())

  startAutoAdvance()
}
