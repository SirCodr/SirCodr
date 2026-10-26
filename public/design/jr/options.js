const names = { archivo: 'Archivo', compacto: 'Compacto', escalonado: 'Escalonado' }
const options = [...document.querySelectorAll('[data-option]')]
for (const option of options) {
  option.addEventListener('click', () => {
    const selected = option.dataset.option
    if (!Object.hasOwn(names, selected)) return
    options.forEach(button => button.setAttribute('aria-pressed', String(button === option)))
    document.querySelectorAll('[data-current-mark]').forEach(image => {
      image.src = `/design/jr/${selected}.svg`
    })
    document.querySelector('#selection').textContent = `Vista previa: ${names[selected]}`
    const download = document.querySelector('#download')
    download.href = `/design/jr/${selected}.svg`
    download.download = `jr-${selected}.svg`
  })
}
