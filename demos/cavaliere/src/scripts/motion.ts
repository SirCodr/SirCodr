export {}

const root = document.documentElement
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const pole = document.querySelector<HTMLElement>('#barber-pole')
const poleAnchor = pole?.parentElement
let introAnimation: Animation | undefined
let introTimer: ReturnType<typeof setTimeout> | undefined

function finishIntro() {
  clearTimeout(introTimer)
  introAnimation?.cancel()
  if (pole && poleAnchor && pole.parentElement !== poleAnchor) {
    poleAnchor.prepend(pole)
    pole.classList.remove('pole-in-transit')
    pole.style.removeProperty('left')
    pole.style.removeProperty('top')
  }
  root.classList.remove('intro-active')
}

function playIntro() {
  finishIntro()
  if (reducedMotion.matches || !pole) return
  root.classList.add('intro-active')
  const rect = pole.getBoundingClientRect()
  const finalScale = rect.width / pole.offsetWidth
  const dx = window.innerWidth / 2 - rect.left - pole.offsetWidth * 0.75
  const dy = window.innerHeight / 2 - rect.top - pole.offsetHeight * 0.75
  // Temporarily leave the hero's stacking context; the same element returns after entry.
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

reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) finishIntro() })
window.addEventListener('resize', () => { if (root.classList.contains('intro-active')) finishIntro() })
if (root.classList.contains('intro-active') && !reducedMotion.matches) playIntro()

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
    if (window.location.hash !== url.hash) window.history.pushState(null, '', url.hash)
    destination.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' })
  })
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') closeMenu(true)
})
const desktopViewport = window.matchMedia('(min-width: 901px)')
desktopViewport.addEventListener('change', (event) => { if (event.matches) closeMenu() })

if ('IntersectionObserver' in window && !reducedMotion.matches) {
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
