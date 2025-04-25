//EXIBIR OU NÃO A ENTRADA

const tem_entrada = document.querySelector('#tem_entrada')
const nao_tem_entrada = document.querySelector('#nao_tem_entrada')

const entrada = document.querySelector('#entrada')

//EVENTO DA ENTRADA
tem_entrada.addEventListener('change', () => {
    if (tem_entrada.checked) {
        entrada.style.display = 'block'
    }
})

nao_tem_entrada.addEventListener('change', () => {
    if (nao_tem_entrada.checked) {
        entrada.style.display = 'none'
    }
})

//EXIBIR OU NÃO O PARCELAMENTO
const tem_parcelamento = document.querySelector('#tem_parcelamento')
const nao_tem_parcelamento = document.querySelector('#nao_tem_parcelamento')

const parcelamento = document.querySelector('#parcelamento')

//EVENTO DO PARCELAMENTO
tem_parcelamento.addEventListener('change', () => {
    if (tem_parcelamento.checked) {
        parcelamento.style.display = 'block'
    }
})

nao_tem_parcelamento.addEventListener('change', () => {
    if (nao_tem_parcelamento.checked) {
        parcelamento.style.display = 'none'
    }
})



function tela_inicial() {
    
}

