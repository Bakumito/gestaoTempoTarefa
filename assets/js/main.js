const cronometro = document.getElementById('contador')
const iniciar = document.getElementById('iniciar')
const inicia = document.getElementById('inicia')
const pausar = document.getElementById('pausar')
const finalizar = document.getElementById('finalizar')
const inputUsuario = document.getElementById('inputUsuario')
const inputAtividade = document.getElementById('inputAtividade')
const inputTipoAtividade = document.getElementById('inputTipoAtividade')
const tabela = document.getElementById('tabela')
const tbody = document.getElementById('tabelaCorpo')
const procurar = document.getElementById('procurar')
const filtrar = document.getElementById('filtrar')
const secaoTabela = document.querySelector('.secao-tabela')
const limparFiltro = document.getElementById('limparFiltro')
const iconeProcurar = document.getElementById('iconeProcurar')

let segundos = 0
let contadorSegundos

const fnVisor = segundos => {
  const tempo = new Date(segundos * 1000)
  return tempo.toLocaleTimeString('pt-BR', {
    hour12: false,
    timeZone: 'UTC'
  })
}

const fnContador = () => {
  contadorSegundos = setInterval(() => {
    segundos++
    cronometro.innerHTML = fnVisor(segundos)
  }, 1000)
}

const fnInicia = () => {
  if (inputUsuario.value == '' || inputAtividade.value == '') {
    alert('é necessário preencher o usuário e a atividade.')
  } else {
    clearInterval(contadorSegundos)
    fnContador()
    inputUsuario.setAttribute('disabled', '')
    inputAtividade.setAttribute('disabled', '')
    inputTipoAtividade.setAttribute('disabled', '')
    inicia.setAttribute('disabled', '')
  }
}

iniciar.addEventListener('click', e => {
  fnInicia()
})

document.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    if (
      e.target.id === inputUsuario.id ||
      e.target.id === inputAtividade.id ||
      e.target.id === inputTipoAtividade.id
    ) {
      fnInicia()
    }
  }
})

pausar.addEventListener('click', e => {
  if (inputUsuario.value == '' && inputAtividade.value == '') {
    alert('é necessário preencher o usuário e a atividade.')
  } else {
    if (pausar.classList.contains('pausado')) {
      pausar.classList.remove('pausado')
      clearInterval(contadorSegundos)
      fnContador()
      pausar.firstElementChild.innerText = 'pausar'
    } else {
      clearInterval(contadorSegundos)
      pausar.classList.add('pausado')
      pausar.firstElementChild.innerText = 'retomar'
    }
  }
})

const fnInsereLinha = () => {
  fnLinhas(
    inputer().nome,
    inputer().atividade,
    inputer().tipoAtividade,
    inputer().tempo,
    inputer().editar,
    inputer().deletar
  )

  fnAddLinha()
  cronometro.innerHTML = '00:00:00'

  inputUsuario.removeAttribute('disabled', '')
  inputAtividade.removeAttribute('disabled', '')
  inputTipoAtividade.removeAttribute('disabled', '')

  inputUsuario.value = ''
  inputAtividade.value = ''
  inputTipoAtividade.value = ''
}

const fnFinaliza = () => {
  clearInterval(contadorSegundos)
  segundos = 0
  inicia.removeAttribute('disabled', '')
  let linhasRepetidas = 1
  if (inputUsuario.value == '' || inputAtividade.value == '') {
    alert('é necessário preencher o usuário e a atividade.')
    return
  } else {
    if (!tr[1]) {
      fnInsereLinha()
    } else {
      const filtroNome = inputUsuario.value.toUpperCase().trim()
      const filtroAtividade = inputAtividade.value.toUpperCase().trim()
      const filtroTipoAtividade = inputTipoAtividade.value.toUpperCase().trim()
      for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')
        if (
          td[0].innerHTML.toUpperCase().trim() != filtroNome ||
          td[1].innerHTML.toUpperCase().trim() != filtroAtividade ||
          td[2].innerHTML.toUpperCase().trim() != filtroTipoAtividade
        ) {
          linhasRepetidas++
        } else {
          let tempoTd = td[3].innerHTML.split(':')
          let tempoCronometro = cronometro.innerHTML.split(':')
          td[3].innerHTML = fnVisor(
            Number(tempoTd[0] * 360) +
              Number(tempoTd[1] * 60) +
              Number(tempoTd[2]) +
              Number(tempoCronometro[0] * 360) +
              Number(tempoCronometro[1] * 60) +
              Number(tempoCronometro[2])
          )
          cronometro.innerHTML = '00:00:00'
          inputUsuario.removeAttribute('disabled', '')
          inputAtividade.removeAttribute('disabled', '')
          inputTipoAtividade.removeAttribute('disabled', '')
        }
      }
      if (linhasRepetidas > 1 && tr.length == linhasRepetidas) fnInsereLinha()
    }
  }
}

finalizar.addEventListener('click', e => {
  fnFinaliza()
})

let linhas = []

const inputer = () => {
  return {
    nome: inputUsuario.value.toUpperCase().trim(),
    atividade: inputAtividade.value.toUpperCase().trim(),
    tipoAtividade: inputTipoAtividade.value.toUpperCase().trim(),
    tempo: cronometro.innerText,
    editar: '',
    deletar: ''
  }
}

class Linha {
  constructor(nome, atividade, tipoAtividade, tempo, editar, deletar) {
    this.nome = nome
    this.atividade = atividade
    this.tipoAtividade = tipoAtividade
    this.tempo = tempo
    this.editar = editar
    this.deletar = deletar
  }
}

const fnLinhas = (nome, atividade, tipoAtividade, tempo, editar, deletar) => {
  linhas.push(new Linha(nome, atividade, tipoAtividade, tempo, editar, deletar))
}

function fnAddLinha() {
  const tr = tbody.insertRow(-1)

  secaoTabela.style.display = ''

  let i = linhas.length - 1

  const tdNome = document.createTextNode(linhas[i].nome)
  const tdAtividade = document.createTextNode(linhas[i].atividade)
  const tdTipoAtividade = document.createTextNode(linhas[i].tipoAtividade)
  const tdTempo = document.createTextNode(linhas[i].tempo)
  const tdEditar = document.createTextNode(linhas[i].editar)
  const tdDeletar = document.createTextNode(linhas[i].deletar)

  tr.insertCell(0).appendChild(tdNome)
  tr.insertCell(1).appendChild(tdAtividade)
  tr.insertCell(2).appendChild(tdTipoAtividade)
  tr.insertCell(3).appendChild(tdTempo)
  let td4 = tr.insertCell(4)
  let td5 = tr.insertCell(5)
  td4.appendChild(tdEditar)
  td4.setAttribute('onclick', 'fnEditarLinha(this)')
  td4.setAttribute('class', 'icone-editar')
  td5.appendChild(tdDeletar)
  td5.setAttribute('onclick', 'fnDeletarLinha(this)')
  td5.setAttribute('class', 'icone-lixeira')
}

limparFiltro.addEventListener('click', e => {
  fnLimparFiltro()
})

procurar.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    fnProcurar()
  }
})

iconeProcurar.addEventListener('click', e => {
  fnProcurar()
})

const tr = tabela.getElementsByTagName('tr')

const fnProcurar = () => {
  const filtro = procurar.value.toUpperCase().trim()
  var td, i, colN

  for (i = 0; i < tr.length; i++) {
    if (filtrar.value == 'usuario') colN = 0
    if (filtrar.value == 'atividade') colN = 1
    if (filtrar.value == 'tipoAtividade') colN = 2
    td = tr[i].getElementsByTagName('td')[colN]
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

  if (!tuplas[1]) secaoTabela.style.display = 'none'
}

const fnEditarLinha = estaLinha => {
  const col = tuplas[estaLinha.parentNode.rowIndex].getElementsByTagName('td')
  const novoID = estaLinha.parentNode.rowIndex

  let temp = col[0].innerText
  let temp1 = col[1].innerText
  let temp2 = col[2].innerText

  col[0].innerHTML = `<input
  id="editarUsuario${novoID}"
  type="text"
  name="usuarioEditado"
  placeholder="${col[0].innerText}"
/>`

  col[1].innerHTML = `<input
  id="editarAtividade${novoID}"
  type="text"
  name="AtividadeEditado"
  placeholder="${col[1].innerText}"
/>`

  col[2].innerHTML = `<input
  id="editarTipoAtividade${novoID}"
  type="text"
  name="tipoAtividadeEditado"
  placeholder="${col[2].innerText}"
/>`

  document.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      if (document.getElementById('editarUsuario' + novoID).value == '') {
        col[0].innerText = temp
      } else {
        col[0].innerText = document
          .getElementById('editarUsuario' + novoID)
          .value.toUpperCase()
      }
      if (document.getElementById('editarAtividade' + novoID).value == '') {
        col[1].innerText = temp1
      } else {
        col[1].innerText = document
          .getElementById('editarAtividade' + novoID)
          .value.toUpperCase()
      }
      if (document.getElementById('editarTipoAtividade' + novoID).value == '') {
        col[2].innerText = temp2
      } else {
        col[2].innerText = document
          .getElementById('editarTipoAtividade' + novoID)
          .value.toUpperCase()
      }
      temp = col[0].innerText
      temp1 = col[1].innerText
      temp2 = col[2].innerText
    }
  })
}

if (!tuplas[1]) secaoTabela.style.display = 'none'
