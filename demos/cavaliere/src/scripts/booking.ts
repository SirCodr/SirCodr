export {}

const mount = document.querySelector<HTMLDivElement>('#booking-iframe-mount')
const placeholder = document.querySelector<HTMLDivElement>('#booking-placeholder')
const frameWrap = document.querySelector<HTMLDivElement>('#booking-frame')
const bookingStatus = document.querySelector<HTMLParagraphElement>('#booking-status')
const loadButton = document.querySelector<HTMLButtonElement>('#load-booking')
const retryButton = document.querySelector<HTMLButtonElement>('#retry-booking')
let loadTimeout: ReturnType<typeof setTimeout> | undefined
let bookingVisibilityObserver: IntersectionObserver | undefined

function trackBookingVisibility() {
  if (!frameWrap) return
  const bounds = frameWrap.getBoundingClientRect()
  document.body.classList.toggle('booking-visible', bounds.top < window.innerHeight && bounds.bottom > 0)

  if (!('IntersectionObserver' in window)) return
  bookingVisibilityObserver ??= new IntersectionObserver(([entry]) => {
    document.body.classList.toggle('booking-visible', entry.isIntersecting)
  })
  bookingVisibilityObserver.observe(frameWrap)
}

function loadBooking() {
  if (!mount || !placeholder || !frameWrap || !bookingStatus) return
  clearTimeout(loadTimeout)
  placeholder.hidden = true
  frameWrap.hidden = false
  trackBookingVisibility()
  frameWrap.dataset.state = 'loading'
  frameWrap.setAttribute('aria-busy', 'true')
  bookingStatus.textContent = 'Cargando los servicios y horarios de reserva…'

  const iframe = document.createElement('iframe')
  iframe.title = 'Agenda de reservas de Cavaliere Unicentro en Bookitit'
  iframe.src = 'https://app.bookitit.com/es/hosteds/widgetdefault/2143a0cf603e0cb02bc1869a46641a244#services'
  iframe.referrerPolicy = 'strict-origin-when-cross-origin'
  iframe.addEventListener('load', () => {
    clearTimeout(loadTimeout)
    frameWrap.dataset.state = 'ready'
    frameWrap.removeAttribute('aria-busy')
    // Cross-origin load does not prove that the provider's application is ready.
    bookingStatus.textContent = 'La agenda respondió. Elige tu servicio; si no aparecen los horarios, usa «Abrir agenda».'
  }, { once: true })
  iframe.addEventListener('error', () => {
    clearTimeout(loadTimeout)
    frameWrap.dataset.state = 'error'
    bookingStatus.textContent = 'No se pudo cargar la agenda. Puedes reintentar o abrirla aparte.'
  }, { once: true })
  mount.replaceChildren(iframe)
  loadTimeout = setTimeout(() => {
    if (frameWrap.dataset.state === 'loading') {
      frameWrap.dataset.state = 'slow'
      bookingStatus.textContent = 'La agenda está tardando en responder. Espera un momento o usa «Abrir agenda».'
    }
  }, 15000)
  bookingStatus.tabIndex = -1
  bookingStatus.focus({ preventScroll: true })
}

loadButton?.addEventListener('click', loadBooking)
retryButton?.addEventListener('click', loadBooking)
