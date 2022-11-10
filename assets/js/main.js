const cronometro = document.getElementById('contador')
const iniciar = document.getElementById('iniciar')
const pausar = document.getElementById('pausar')
const finalizar = document.getElementById('finalizar')
let segundos = 0
let contador

iniciar.addEventListener('click', e => {
  clearInterval(contador)
  fnContador()
})

pausar.addEventListener('click', e => {
  clearInterval(contador)
})

finalizar.addEventListener('click', e => {
  clearInterval(contador)
  segundos = 0
})

const fnVisor = segundos => {
  const tempo = new Date(segundos * 1000)
  return tempo.toLocaleTimeString('pt-BR', {
    hour12: false,
    timeZone: 'UTC'
  })
}

const fnContador = () => {
  contador = setInterval(() => {
    segundos++
    cronometro.innerHTML = fnVisor(segundos)
  }, 1000)
}
