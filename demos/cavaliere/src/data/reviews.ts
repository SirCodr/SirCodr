export interface Review {
  id: string
  author: string
  rating: 5
  localGuide: boolean
  /** Review text transcribed from the screenshot supplied by the user. */
  transcript: string
  truncated?: boolean
}

export const googleReviewsUrl = 'https://www.google.com/maps/?cid=1326190842347595931&hl=es'

// Snapshot transcribed from the user's Google screenshot, not a live API response.
export const googleRating = { value: 4.7, count: 243, checkedOn: '2026-10-23' }

// Text transcribed from the review screenshots provided by the user.
export const reviews: Review[] = [
  {
    id: 'jorge-andres-moreno-velez', author: 'Jorge Andres Moreno Velez', rating: 5, localGuide: true,
    transcript: 'Barberia con clase y el costo beneficio es muy bueno. Un ambiente agradable y atención no se diga. Para niños también tienen servicio.',
  },
  {
    id: 'mario-castro', author: 'Mario Castro', rating: 5, localGuide: true,
    transcript: 'Excelente servicio el babero Daniel muy profesional, Diana una administradora ejemplar pendiente de todos los clientes, totalmente recomendada....',
  },
  {
    id: 'didier-gonzalez', author: 'Didier Gonzalez', rating: 5, localGuide: true,
    transcript: 'Excelente!!!! Dani es un máster, un servicio perfecto a un muy buen precio',
  },
  {
    id: 'felipe-ospina', author: 'felipe ospina', rating: 5, localGuide: false,
    transcript: 'Personal muy calificado, excelente servicio y muy buena la experiencia, se puede tomar una cerveza mientras ves un partido y disfrutas la atención !! Súper recomendada ...',
    truncated: true,
  },
  {
    id: 'gustavo', author: 'Gustavo', rating: 5, localGuide: true,
    transcript: 'Mi primera experiencia en la barbería fue bastante satisfactoria. Buena ubicación, excelente atención, muy fácil agendar las citas (en su instagram está el enlace para hacerlo) y un equipo de barberos muy profesionales que escuchan tu necesidad. Gran variedad de equipos. Sin duda volveré',
  },
  {
    id: 'camilo-bedoya', author: 'Camilo Bedoya', rating: 5, localGuide: true,
    transcript: 'Super recomendada, son muy profesionales, totalmente satisfecho con los resultados. Sería muy bueno si se ampliaran un poco más',
  },
]
