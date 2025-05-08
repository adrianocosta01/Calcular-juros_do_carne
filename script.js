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



botao_calcular.addEventListener('click', () => {

    let data_do_pagamento = new Date(dia_do_pagamento.value)

    if (tem_entrada.checked) {
        let data_do_vencimento_entrada = document.querySelector('#vencimento_da_entrada')
        let valor_da_entrada = document.querySelector('#valor_da_entrada')  
        //teste

        
        let p1 = window.document.querySelector('#teste')

        p1.innerHTML = `Data do Vencimento da Entrada: ${data_do_pagamento}}`
        
    }

})
