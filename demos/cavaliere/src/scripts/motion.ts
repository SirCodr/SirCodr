export {}

declare global {
  interface Window { __cavaliereIntroFailsafe?: number }
}

const root = document.documentElement
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const pole = document.querySelector<HTMLElement>('#barber-pole')
const poleAnchor = pole?.parentElement
const heroArt = document.querySelector<HTMLElement>('.hero-art')
const gentleman = heroArt?.querySelector<HTMLImageElement>('.hero-gentleman')
let introAnimation: Animation | undefined
let introTimer: ReturnType<typeof setTimeout> | undefined

function finishIntro() {
  clearTimeout(introTimer)
  clearTimeout(window.__cavaliereIntroFailsafe)
  window.__cavaliereIntroFailsafe = undefined
  introAnimation?.cancel()
  introAnimation = undefined
  if (pole && poleAnchor && pole.parentElement !== poleAnchor) {
    poleAnchor.prepend(pole)
    pole.classList.remove('pole-in-transit')
    pole.style.removeProperty('left')
    pole.style.removeProperty('top')
  }
  root.classList.remove('intro-pending', 'intro-active', 'intro-mobile')
}

function waitForStyles(timeout = 1200) {
  return new Promise<boolean>((resolve) => {
    const deadline = performance.now() + timeout
    const check = () => {
      const curtain = document.querySelector('.intro-curtain')
      if (curtain && getComputedStyle(curtain).display === 'none') {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve(true)))
      } else if (performance.now() >= deadline) {
        resolve(false)
      } else {
        requestAnimationFrame(check)
      }
    }
    check()
  })
}

async function playIntro() {
  if (!root.classList.contains('intro-pending')) return
  const stylesReady = await waitForStyles()
  if (!root.classList.contains('intro-pending') || !stylesReady || reducedMotion.matches || window.location.hash || !pole || !poleAnchor) {
    finishIntro()
    return
  }

  if (window.matchMedia('(max-width: 1240px)').matches) {
    root.classList.remove('intro-pending')
    root.classList.add('intro-active', 'intro-mobile')
    introTimer = setTimeout(finishIntro, 850)
    return
  }

  if (typeof pole.animate !== 'function') {
    finishIntro()
    return
  }

  const rect = pole.getBoundingClientRect()
  const finalScale = rect.width / pole.offsetWidth
  if (!Number.isFinite(finalScale) || finalScale <= 0 || rect.height <= 0) {
    finishIntro()
    return
  }

  root.classList.remove('intro-pending')
  root.classList.add('intro-active')
  const dx = window.innerWidth / 2 - rect.left - pole.offsetWidth * 0.75
  const dy = window.innerHeight / 2 - rect.top - pole.offsetHeight * 0.75
  document.body.append(pole)
  pole.classList.add('pole-in-transit')
  pole.style.left = `${rect.left}px`
  pole.style.top = `${rect.top}px`
  introAnimation = pole.animate([
    { transform: `translate(${dx}px, ${dy}px) scale(1.5)`, offset: 0 },
    { transform: `translate(${dx}px, ${dy}px) scale(1.5)`, offset: 0.43 },
    { transform: `translate(0, 0) scale(${finalScale})`, offset: 1 },
  ], { duration: 1900, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' })
  introTimer = setTimeout(finishIntro, 2050)
}

gentleman?.addEventListener('error', () => {
  if (!heroArt) return
  heroArt.dataset.imageState = 'error'
  const fallback = heroArt.querySelector<HTMLElement>('.hero-art-fallback')
  if (fallback) fallback.hidden = false
})
if (gentleman?.complete && gentleman.naturalWidth === 0) {
  gentleman.dispatchEvent(new Event('error'))
}

reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) finishIntro() })
window.addEventListener('resize', () => {
  if (root.classList.contains('intro-active')) finishIntro()
})
if (root.classList.contains('intro-pending')) void playIntro()

const menuButton = document.querySelector<HTMLButtonElement>('#menu-toggle')
const mobileNav = document.querySelector<HTMLElement>('#mobile-nav')
function closeMenu(returnFocus = false) {
  if (!mobileNav || !menuButton) return
  mobileNav.hidden = true
  menuButton.setAttribute('aria-expanded', 'false')
  menuButton.setAttribute('aria-label', 'Abrir menú')
  if (returnFocus) menuButton.focus()
}
menuButton?.addEventListener('click', () => {
  if (!mobileNav) return
  const open = menuButton.getAttribute('aria-expanded') !== 'true'
  mobileNav.hidden = !open
  menuButton.setAttribute('aria-expanded', String(open))
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú')
})
mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  closeMenu()
  const destination = document.querySelector<HTMLElement>(link.hash)
  if (destination) { destination.tabIndex = -1; destination.focus({ preventScroll: true }) }
}))

document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const url = new URL(link.href, window.location.href)
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return
    const destination = document.getElementById(decodeURIComponent(url.hash.slice(1)))
    if (!destination) return
    event.preventDefault()
    finishIntro()
    if (window.location.hash !== url.hash) window.history.pushState(null, '', url.hash)
    destination.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' })
  })
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') closeMenu(true)
})
const desktopViewport = window.matchMedia('(min-width: 901px)')
desktopViewport.addEventListener('change', (event) => {
  if (event.matches) closeMenu()
  finishIntro()
})

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    })
  }, { threshold: 0.08 })
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
    element.classList.add('reveal-ready')
    observer.observe(element)
  })
}

const continuousDecorations = Array.from(document.querySelectorAll<HTMLElement>(
  '.hero-image img, .pole-stripes, .booking-glow',
))
const visibleDecorations = new Set<HTMLElement>()
function syncDecorationMotion() {
  continuousDecorations.forEach((element) => {
    element.style.animationPlayState = visibleDecorations.has(element) && !document.hidden && !reducedMotion.matches
      ? 'running'
      : 'paused'
  })
}
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const motionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target as HTMLElement
      if (entry.isIntersecting) visibleDecorations.add(element)
      else visibleDecorations.delete(element)
    })
    syncDecorationMotion()
  }, { rootMargin: '100px' })
  continuousDecorations.forEach((element) => motionObserver.observe(element))
  document.addEventListener('visibilitychange', syncDecorationMotion)
}
reducedMotion.addEventListener('change', syncDecorationMotion)
