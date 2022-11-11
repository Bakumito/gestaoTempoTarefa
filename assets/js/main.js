const cronometro = document.getElementById('contador')
const iniciar = document.getElementById('iniciar')
const pausar = document.getElementById('pausar')
const finalizar = document.getElementById('finalizar')
const btnTeste = document.getElementById('botaoTeste')
const btnTeste2 = document.getElementById('botaoTeste2')
const inputNome = document.getElementById('inputNome')
const inputAtividade = document.getElementById('inputAtividade')
const inputTipoAtividade = document.getElementById('inputTipoAtividade')
const tbody = document.getElementById('tabelaCorpo')
let segundos = 0
let contador

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

iniciar.addEventListener('click', e => {
  clearInterval(contador)
  fnContador()
  inputNome.setAttribute('disabled', '')
  inputAtividade.setAttribute('disabled', '')
  inputTipoAtividade.setAttribute('disabled', '')
})

pausar.addEventListener('click', e => {
  if (pausar.classList.contains('pausado')) {
    pausar.classList.remove('pausado')
    clearInterval(contador)
    fnContador()
  } else {
    clearInterval(contador)
    pausar.classList.add('pausado')
  }
})

finalizar.addEventListener('click', e => {
  clearInterval(contador)
  segundos = 0
})

let linhas = []

const inputer = () => {
  return {
    nome: inputNome.value,
    atividade: inputAtividade.value,
    tipoAtividade: inputTipoAtividade.value,
    tempo: cronometro.innerText
  }
}

class Linha {
  constructor(nome, atividade, tipoAtividade, tempo) {
    this.nome = nome
    this.atividade = atividade
    this.tipoAtividade = tipoAtividade
    this.tempo = tempo
  }
}

const fnLinhas = (nome, atividade, tipoAtividade, tempo) => {
  linhas.push(new Linha(nome, atividade, tipoAtividade, tempo))
}

function fnAddLinha() {
  const tr = tbody.insertRow(-1)
  let i = linhas.length - 1

  const tdNome = document.createTextNode(linhas[i].nome)
  const tdAtividade = document.createTextNode(linhas[i].atividade)
  const tdTipoAtividade = document.createTextNode(linhas[i].tipoAtividade)
  const tdTempo = document.createTextNode(linhas[i].tempo)

  tr.insertCell(0).appendChild(tdNome)
  tr.insertCell(1).appendChild(tdAtividade)
  tr.insertCell(2).appendChild(tdTipoAtividade)
  tr.insertCell(3).appendChild(tdTempo)
}

finalizar.addEventListener('click', e => {
  fnLinhas(
    inputer().nome,
    inputer().atividade,
    inputer().tipoAtividade,
    inputer().tempo
  )

  fnAddLinha()
  cronometro.innerHTML = '00:00:00'

  inputNome.removeAttribute('disabled', '')
  inputAtividade.removeAttribute('disabled', '')
  inputTipoAtividade.removeAttribute('disabled', '')

  inputNome.value = ''
  inputAtividade.value = ''
  inputTipoAtividade.value = ''
})

btnTeste2.addEventListener('click', e => {})
