const frame = document.querySelector('#portfolio-preview')
const buttons = Array.from(document.querySelectorAll('[data-mode]'))
const descriptions = {
  orbit: ['La bola y el código rodean el panel naranja, pasando por delante y por detrás. Se mueve solo.', 'Recorrido lento · profundidad · movimiento concentrado en el hero'],
  edges: ['Los dos objetos flotan por los bordes mientras recorres la página. Baja para verlos junto a los proyectos.', 'Movimiento automático · recorrido por los márgenes · presencia en toda la página'],
  scroll: ['Los objetos cambian de posición a medida que bajas y vuelven sobre su recorrido cuando subes.', 'Scroll normal · desplazamiento suave · flotación leve al detenerte'],
}
let mode = 'orbit'
let study = null

function selectMode(next) {
  if (!Object.hasOwn(descriptions, next)) return
  mode = next
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)))
  document.querySelector('[data-description]').textContent = descriptions[mode][0]
  document.querySelector('[data-hint]').textContent = descriptions[mode][1]
  study?.setMode(mode)
}

buttons.forEach(button => button.addEventListener('click', () => selectMode(button.dataset.mode)))

function createStudy() {
  const win = frame.contentWindow
  const doc = frame.contentDocument
  const art = doc.querySelector('.hero-art')
  const hero = doc.querySelector('.hero')
  const objects = [doc.querySelector('.hero-art>.orb'), doc.querySelector('.hero-art>.bracket')]
  if (!art || !hero || objects.some(object => !object)) return null

  const sheet = doc.createElement('link')
  sheet.rel = 'stylesheet'
  sheet.href = '/design/orbits/scene.css'
  doc.head.append(sheet)
  const layer = doc.createElement('div')
  layer.className = 'orbit-study-layer'
  layer.setAttribute('aria-hidden', 'true')
  doc.body.append(layer)
  const reduced = win.matchMedia('(prefers-reduced-motion: reduce)')
  const saveData = win.navigator.connection?.saveData === true
  const initial = objects.map(object => object.getAttribute('style'))
  let raf = 0
  let bounds
  let started = performance.now()
  let activeMode = mode
  let positions = []
  let lastRegion = ''
  let stopped = false

  function measure() {
    const rect = art.getBoundingClientRect()
    bounds = { left: rect.left, top: rect.top, width: art.offsetWidth, height: art.offsetHeight, heroBottom: hero.getBoundingClientRect().bottom }
  }

  function restore() {
    delete doc.body.dataset.orbitStudy
    objects.forEach((object, i) => {
      art.append(object)
      if (initial[i] === null) object.removeAttribute('style')
      else object.setAttribute('style', initial[i])
    })
  }

  function setMode(next) {
    activeMode = next
    started = performance.now()
    positions = []
    lastRegion = ''
    restore()
    if (!reduced.matches && !saveData) {
      doc.body.dataset.orbitStudy = next
      objects.forEach(object => (next === 'orbit' ? art : layer).append(object))
    }
    measure()
    wake()
  }

  function draw(now) {
    raf = 0
    if (stopped || reduced.matches || saveData || doc.hidden || document.hidden) return
    const { width, height, left, top, heroBottom } = bounds
    const visibleHero = top < win.innerHeight && top + height > 0
    if (activeMode === 'orbit' && !visibleHero) return
    const seconds = (now - started) / 1000
    const narrow = win.innerWidth <= 760
    const viewportWidth = doc.documentElement.clientWidth
    const region = activeMode === 'orbit' ? 'orbit' : heroBottom > win.innerHeight * .55 ? 'hero' : 'gutters'
    if (region !== lastRegion) {
      positions = []
      lastRegion = region
    }

    objects.forEach((object, index) => {
      const ow = object.offsetWidth
      const oh = object.offsetHeight
      const angle = seconds * Math.PI * 2 / (index ? 34 : 38) + (index ? .4 : 0)
      const depth = Math.sin(angle)
      let x, y, scale, rotation, opacity = 1

      if (activeMode === 'orbit') {
        x = width * (.51 + Math.cos(angle) * (narrow ? .43 : .51))
        y = height * (.51 + depth * (narrow ? .4 : .44))
        scale = .79 + (depth + 1) * .105
        rotation = index ? 12 + Math.sin(angle) * 12 : 0
        object.style.zIndex = depth < -.08 ? '1' : '4'
      } else if (heroBottom > win.innerHeight * .55) {
        // Keep the initial composition while the hero is visible.
        x = left + width * (index ? .94 : .07)
        y = top + height * (index ? .17 : .1) + Math.sin(seconds * .8 + index) * 10
        scale = 1
        rotation = index ? 12 : 0
        opacity = Math.min(1, Math.max(0, (heroBottom - win.innerHeight * .55) / 100))
      } else {
        // Use the outer gutters; the objects never cross the content columns.
        const progress = win.scrollY / Math.max(1, doc.documentElement.scrollHeight - win.innerHeight)
        const phase = activeMode === 'scroll' ? progress * Math.PI * 3 + index * Math.PI : seconds * .18 + index * Math.PI
        scale = narrow ? .48 : .63
        const inset = narrow ? 1 : 8
        x = (index ? inset : viewportWidth - inset) + Math.cos(phase) * (narrow ? 3 : 5)
        y = win.innerHeight * (.46 + Math.sin(phase) * .22) + Math.sin(seconds * .7 + index) * 5
        rotation = index ? Math.sin(phase) * 18 : 0
        opacity = .82 * Math.min(1, Math.max(0, (win.innerHeight * .55 - heroBottom) / 100))
      }

      // Smooth scroll changes without changing the browser's native scrolling.
      const target = { x, y, scale, rotation, opacity }
      const previous = positions[index] ?? target
      for (const key of Object.keys(target)) previous[key] += (target[key] - previous[key]) * .12
      positions[index] = previous
      object.style.transform = `translate3d(${previous.x - ow / 2}px,${previous.y - oh / 2}px,0) rotate(${previous.rotation}deg) scale(${previous.scale})`
      object.style.opacity = String(previous.opacity)
    })
    raf = win.requestAnimationFrame(draw)
  }

  function wake() {
    if (!raf && !stopped) raf = win.requestAnimationFrame(draw)
  }
  function update() { measure(); wake() }
  function motionChange() { setMode(activeMode) }
  function visibilityChange() { wake() }
  win.addEventListener('scroll', update, { passive: true })
  win.addEventListener('resize', update)
  doc.addEventListener('visibilitychange', visibilityChange)
  document.addEventListener('visibilitychange', visibilityChange)
  reduced.addEventListener('change', motionChange)
  setMode(mode)

  return {
    setMode,
    destroy() {
      stopped = true
      win.cancelAnimationFrame(raf)
      win.removeEventListener('scroll', update)
      win.removeEventListener('resize', update)
      doc.removeEventListener('visibilitychange', visibilityChange)
      document.removeEventListener('visibilitychange', visibilityChange)
      reduced.removeEventListener('change', motionChange)
      restore()
      layer.remove()
      sheet.remove()
    },
  }
}

frame.addEventListener('load', () => {
  study?.destroy()
  study = createStudy()
})
