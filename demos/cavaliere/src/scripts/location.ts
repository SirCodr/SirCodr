export {}

const map = document.querySelector<HTMLElement>('[data-map-state]')
const frame = document.querySelector<HTMLIFrameElement>('#location-map-frame')
const message = document.querySelector<HTMLElement>('#location-map-message')
let loadTimeout: ReturnType<typeof setTimeout> | undefined

if (map && frame && message) {
  const ready = () => {
    clearTimeout(loadTimeout)
    map.dataset.mapState = 'ready'
    map.removeAttribute('aria-busy')
    map.querySelector<HTMLElement>('#location-map-status')!.hidden = true
  }

  frame.addEventListener('load', ready, { once: true })
  frame.addEventListener('error', () => {
    clearTimeout(loadTimeout)
    map.dataset.mapState = 'error'
    message.textContent = 'No se pudo cargar el mapa. La dirección aparece junto a este panel.'
  }, { once: true })

  const timeoutWhenVisible = new IntersectionObserver(([entry], observer) => {
    if (!entry.isIntersecting) return
    observer.disconnect()
    loadTimeout = setTimeout(() => {
      if (map.dataset.mapState === 'loading') {
        map.dataset.mapState = 'slow'
        message.textContent = 'El mapa está tardando en responder…'
      }
    }, 12000)
  }, { rootMargin: '250px' })
  timeoutWhenVisible.observe(map)
}
