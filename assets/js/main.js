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
    this.editar = 'editar'
    this.excluir = 'excluir'
  }
}

const fnLinhas = (nome, atividade, tipoAtividade, tempo) => {
  linhas.push(new Linha(nome, atividade, tipoAtividade, tempo))
  console.log(linhas)
}

function fnAddLinha() {
  const novaLinha = tbody.insertRow(-1)
  const novoNome = novaLinha.insertCell(0)
  const novaAtividade = novaLinha.insertCell(1)
  const novoTipoAtividade = novaLinha.insertCell(2)
  const novoTempo = novaLinha.insertCell(3)
  const novoEditar = novaLinha.insertCell(4)
  const novoExcluir = novaLinha.insertCell(5)
  const textoNome = document.createTextNode(linhas[linhas.length - 1].nome)
  const textoAtividade = document.createTextNode(
    linhas[linhas.length - 1].atividade
  )
  const textoTipoAtividade = document.createTextNode(
    linhas[linhas.length - 1].tipoAtividade
  )
  const textoTempo = document.createTextNode(linhas[linhas.length - 1].tempo)
  const textoEditar = document.createTextNode(linhas[linhas.length - 1].editar)
  const textoExcluir = document.createTextNode(
    linhas[linhas.length - 1].excluir
  )
  novoNome.appendChild(textoNome)
  novaAtividade.appendChild(textoAtividade)
  novoTipoAtividade.appendChild(textoTipoAtividade)
  novoTempo.appendChild(textoTempo)
  novoEditar.appendChild(textoEditar)
  novoExcluir.appendChild(textoExcluir)
}

btnTeste.addEventListener('click', e => {
  fnLinhas(
    inputer().nome,
    inputer().atividade,
    inputer().tipoAtividade,
    inputer().tempo
  )

  fnAddLinha()
})

btnTeste2.addEventListener('click', e => {})
