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

//Calculos
let dia_do_pagamento = document.querySelector('#dia_do_pagamento')
let botao_calcular = document.querySelector('#botao_calcular')

let formatador = new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL'
})

botao_calcular.addEventListener('click', () => {

    let pagou_dia = new Date(dia_do_pagamento.value)
    pagou_dia.setHours(0, 0, 0, 0)

    if (tem_entrada.checked) {
        let data_do_vencimento_entrada = document.querySelector('#vencimento_da_entrada')
        let venceu_dia = new Date(data_do_vencimento_entrada.value)
        venceu_dia.setHours(0, 0, 0, 0)

        let valor_da_entrada = document.querySelector('#valor_da_entrada').value
        let pagou_entrada = parseFloat(valor_da_entrada.replace(',','.'))

        let atraso_da_entrada = (pagou_dia.getTime() - venceu_dia.getTime()) / (1000 * 60 * 60 * 24)

        let multa_da_entrada = (1*pagou_entrada/100)
        let juros_da_entrada = ((0.1*pagou_entrada/100) * (atraso_da_entrada))

        let total_da_entrada = (multa_da_entrada+juros_da_entrada)
        let p1 = window.document.querySelector('#teste')

        p1.innerHTML = `Dias de vencimento: ${atraso_da_entrada} Dias <br> Multa ${formatador.format(multa_da_entrada)} <br>
        Juros ${formatador.format(juros_da_entrada)} <br>
        Total: ${formatador.format(total_da_entrada)}`
        
    }

})
