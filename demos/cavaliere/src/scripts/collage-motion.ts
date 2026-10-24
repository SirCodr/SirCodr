export {}

const pieces = Array.from(document.querySelectorAll<HTMLElement>('[data-float]'))
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
let pending = false

function positionPieces() {
  pending = false
  for (const piece of pieces) {
    const rect = piece.parentElement!.getBoundingClientRect()
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
  window.addEventListener('scroll', requestPosition, { passive: true })
  window.addEventListener('resize', requestPosition)
  reduce.addEventListener('change', requestPosition)
  requestPosition()
}
