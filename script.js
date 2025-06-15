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

//INICIANDO OS CALCULOS
let dia_do_pagamento = document.querySelector('#dia_do_pagamento')
let botao_calcular = document.querySelector('#botao_calcular')

let formatador = new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL'
})

botao_calcular.addEventListener('click', () => {

    let pagou_dia = new Date(dia_do_pagamento.value)
    pagou_dia.setHours(0, 0, 0, 0)

    //CABEÇALHO DA TABELA APARECE OU NÃO

    //SELECIONAR A TABELA E CRIAR THEAD E TBODY
    let tabela = document.querySelector("#tabela")
    
    let thead = document.createElement("thead")
    let tbody = document.createElement("tbody")



    if (tem_entrada.checked || tem_parcelamento.checked) {

        //CRIANDO AS CELULAS DO TITULO
        const colunas = [
            "PARCELAS",
            "DIAS DE ATRASO",
            "VALOR DAS PRESTAÇÕES",
            "VALOR DA MULTA",
            "VALOR DO JUROS",
            "JUROS + MULTA",
            "TOTAL DEVIDO"]

        //CRIAR A LINHA DO CABEÇALHO
            let linha_cabecalho = document.createElement("tr")
            colunas.forEach(valores_coluna => {
                let th = document.createElement("th")
                th.textContent = valores_coluna
                linha_cabecalho.appendChild(th)
            })

            thead.appendChild(linha_cabecalho)
            tabela.appendChild(thead)
    }

    //CALCULANDO A ENTRADA
    if (tem_entrada.checked) {
        let data_do_vencimento_entrada = document.querySelector("#vencimento_da_entrada")
        let vencimento_entrada = new Date(data_do_vencimento_entrada.value)
        vencimento_entrada.setHours(0, 0, 0, 0)

        let pegar_valor_da_entrada = document.querySelector("#valor_da_entrada").value
        let valor_da_entrada = parseFloat(pegar_valor_da_entrada.replace(',','.'))

        let dias_de_atraso_da_entrada_calculo = pagou_dia.getTime() - vencimento_entrada.getTime()
        let dias_de_atraso_da_entrada_resultado = (dias_de_atraso_da_entrada_calculo / (1000 * 60 * 60 * 24))

        let valor_da_multa_entrada = (1*valor_da_entrada/100)

        let valor_do_juros_entrada =  ((0.10*valor_da_entrada/100) * (dias_de_atraso_da_entrada_resultado))
        
        let juros_com_multa_entrada = (valor_da_multa_entrada + valor_do_juros_entrada)
        
        let total_devido_entrada = (valor_da_entrada + valor_da_multa_entrada + valor_do_juros_entrada)
    

        let colunas = [
            'ENTRADA',
            dias_de_atraso_da_entrada_resultado,
            valor_da_entrada,
            valor_da_multa_entrada,
            valor_do_juros_entrada,
            juros_com_multa_entrada,
            total_devido_entrada
        ]

        let linha_da_entrada = document.createElement("tr") 
        colunas.forEach((valor, indice) => {
            let celula = document.createElement("td")
            celula.textContent = indice >= 2 ? formatador.format(valor) : valor
            linha_da_entrada.appendChild(celula)
        })

        tbody.appendChild(linha_da_entrada)
        tabela.appendChild(tbody)

    }

    if (tem_parcelamento.checked) {
         let data_do_vencimento_parcelamento = document.querySelector('#vencimento_do_parcelamento')
         let parcelamento_venceu_dia = new Date (data_do_vencimento_parcelamento.value)
         parcelamento_venceu_dia.setHours(0, 0, 0, 0)

         let parcelas = document.querySelector("#quantidade_de_parcelas")
         let quantidade_de_parcelas = parseInt(parcelas.value)

        let valor_das_parcelas = document.querySelector("#valor_das_parcelas").value
        let pagou_parcelas = parseFloat(valor_das_parcelas.replace(',','.'))


        let resultado_do_parcelamento = document.querySelector("#seltab")
        for (let c = 1; c <= quantidade_de_parcelas; c++) {
            let item = document.createElement('option')
            let multa = (1*pagou_parcelas/100)
            item.text = `Parcela é ${valor_das_parcelas} e a multa é ${multa}`
            resultado_do_parcelamento.appendChild(item)
        }
    }

})
