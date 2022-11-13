const cronometro = document.getElementById('contador')
const iniciar = document.getElementById('iniciar')
const inicia = document.getElementById('inicia')
const pausar = document.getElementById('pausar')
const finalizar = document.getElementById('finalizar')
const inputNome = document.getElementById('inputNome')
const inputAtividade = document.getElementById('inputAtividade')
const inputTipoAtividade = document.getElementById('inputTipoAtividade')
const tabela = document.getElementById('tabela')
const tbody = document.getElementById('tabelaCorpo')
const procurar = document.getElementById('procurar')
const btnTeste = document.getElementById('botaoTeste')
const btnTeste2 = document.getElementById('botaoTeste2')
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
  if (inputNome.value != '' && inputAtividade.value != '') {
    clearInterval(contador)
    fnContador()
    inputNome.setAttribute('disabled', '')
    inputAtividade.setAttribute('disabled', '')
    inputTipoAtividade.setAttribute('disabled', '')

    inicia.setAttribute('disabled', '')
  } else {
    alert('Preencha os campos necessários')
  }
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
  inicia.removeAttribute('disabled', '')
})

let linhas = []

const inputer = () => {
  return {
    nome: inputNome.value.toUpperCase().trim(),
    atividade: inputAtividade.value.toUpperCase().trim(),
    tipoAtividade: inputTipoAtividade.value.toUpperCase().trim(),
    tempo: cronometro.innerText,
    deletar: 'deletar',
    editar: 'editar'
  }
}

class Linha {
  constructor(nome, atividade, tipoAtividade, tempo, deletar, editar) {
    this.nome = nome
    this.atividade = atividade
    this.tipoAtividade = tipoAtividade
    this.tempo = tempo
    this.deletar = deletar
    this.editar = editar
  }
}

const fnLinhas = (nome, atividade, tipoAtividade, tempo, deletar, editar) => {
  linhas.push(new Linha(nome, atividade, tipoAtividade, tempo, deletar, editar))
}

function fnAddLinha() {
  const tr = tbody.insertRow(-1)
  let i = linhas.length - 1

  const tdNome = document.createTextNode(linhas[i].nome)
  const tdAtividade = document.createTextNode(linhas[i].atividade)
  const tdTipoAtividade = document.createTextNode(linhas[i].tipoAtividade)
  const tdTempo = document.createTextNode(linhas[i].tempo)
  const tdDeletar = document.createTextNode(linhas[i].deletar)
  const tdEditar = document.createTextNode(linhas[i].editar)

  tr.insertCell(0).appendChild(tdNome)
  tr.insertCell(1).appendChild(tdAtividade)
  tr.insertCell(2).appendChild(tdTipoAtividade)
  tr.insertCell(3).appendChild(tdTempo)
  let td4 = tr.insertCell(4)
  let td5 = tr.insertCell(5)
  td4.appendChild(tdDeletar)
  td4.setAttribute('onclick', 'fnDeletarLinha(this)')
  td5.appendChild(tdEditar)
  td5.setAttribute('onclick', 'fnEditarLinha(this)')
}

finalizar.addEventListener('click', e => {
  fnLinhas(
    inputer().nome,
    inputer().atividade,
    inputer().tipoAtividade,
    inputer().tempo,
    inputer().deletar,
    inputer().editar
  )

  fnAddLinha()
  cronometro.innerHTML = '00:00:00'

  inputNome.removeAttribute('disabled', '')
  inputAtividade.removeAttribute('disabled', '')
  inputTipoAtividade.removeAttribute('disabled', '')

  // inputNome.value = ''
  // inputAtividade.value = ''
  // inputTipoAtividade.value = ''
})

btnTeste.addEventListener('click', e => {
  fnLimparFiltro()
})

btnTeste2.addEventListener('click', e => {
  fnProcurar()
})

const tr = tabela.getElementsByTagName('tr')

const fnProcurar = () => {
  const filtro = procurar.value.toUpperCase().trim()

  var td, i

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[1]
    if (td) {
      if (td.innerHTML.toUpperCase().trim() == filtro) {
        tr[i].style.display = ''
      } else {
        tr[i].style.display = 'none'
      }
    }
  }
}

const fnLimparFiltro = () => {
  var td, i

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[1]
    if (td) {
      tr[i].style.display = ''
    }
  }
}

const tuplas = tabela.rows

const fnOrdenaTabela = coluna => {
  var trocando, direcao, i, deveTrocar, tupla1, tupla2
  let trocador = 0
  trocando = true
  direcao = 'asc'
  while (trocando) {
    trocando = false
    for (i = 1; i < tuplas.length - 1; i++) {
      deveTrocar = false

      tupla1 = tuplas[i].getElementsByTagName('td')[coluna]
      tupla2 = tuplas[i + 1].getElementsByTagName('td')[coluna]

      if (direcao == 'asc') {
        if (tupla1.innerHTML > tupla2.innerHTML) {
          deveTrocar = true
          break
        }
      } else if (direcao == 'desc') {
        if (tupla1.innerHTML < tupla2.innerHTML) {
          deveTrocar = true
          break
        }
      }
    }
    if (deveTrocar) {
      tuplas[i].parentNode.insertBefore(tuplas[i + 1], tuplas[i])
      trocando = true
      trocador++
    } else {
      if (trocador == 0 && direcao == 'asc') {
        direcao = 'desc'
        trocando = true
      }
    }
  }
}

const fnDeletarLinha = estaLinha => {
  tabela.deleteRow(estaLinha.parentNode.rowIndex)
}

const fnEditarLinha = estaLinha => {
  const col = tuplas[estaLinha.parentNode.rowIndex].getElementsByTagName('td')
  col[2].innerText = 'alterado'
}
