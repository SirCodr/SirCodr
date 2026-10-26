export {}

const pieces = Array.from(document.querySelectorAll<HTMLElement>('[data-float]'))
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
let pending = false
const activePieces = new Set<HTMLElement>()

function positionPieces() {
  pending = false
  const positions = [...activePieces].map((piece) => ({ piece, rect: piece.parentElement!.getBoundingClientRect() }))
  for (const { piece, rect } of positions) {
    const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - rect.top - rect.height / 2) / window.innerHeight))
    const amount = reduce.matches ? 0 : Number(piece.dataset.float ?? 10) * progress
    piece.style.setProperty('--drift', `${amount}px`)
    piece.style.setProperty('--turn', `${amount * .08}deg`)
  }
}
function requestPosition() {
  if (!pending) { pending = true; requestAnimationFrame(positionPieces) }
}
if (pieces.length) {
  if ('IntersectionObserver' in window) {
    const proximity = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const piece = entry.target as HTMLElement
        if (entry.isIntersecting) activePieces.add(piece)
        else {
          activePieces.delete(piece)
          piece.style.setProperty('--drift', '0px')
          piece.style.setProperty('--turn', '0deg')
        }
      })
      requestPosition()
    }, { rootMargin: '100% 0px' })
    pieces.forEach((piece) => proximity.observe(piece))
  } else {
    pieces.forEach((piece) => activePieces.add(piece))
  }
  window.addEventListener('scroll', requestPosition, { passive: true })
  window.addEventListener('resize', requestPosition)
  reduce.addEventListener('change', requestPosition)
  requestPosition()
}
