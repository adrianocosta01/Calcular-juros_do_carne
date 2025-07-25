//BOTÃO CONTINUAR PARA IR PARA A PARTE 2
let botao_continuar_para_inserir_dados = document.querySelector('#botao_ir_para_inserir_dados')

//SELECIONANDO OS CAMPOS PARA PEGAR OS DADOS

//CAMPOS DA ENTRADA
const tem_entrada = document.querySelector('#tem_entrada')
const nao_tem_entrada = document.querySelector('#nao_tem_entrada')
const entrada = document.querySelector('#entrada')

//CAMPOS DO PARCELAMENTO
const tem_parcelamento = document.querySelector('#tem_parcelamento')
const nao_tem_parcelamento = document.querySelector('#nao_tem_parcelamento')
const parcelamento = document.querySelector('#parcelamento')

botao_continuar_para_inserir_dados.addEventListener('click', () => {

    //TIRA A PARTE 1 E COLOCAR A PARTE 2
    if (tem_entrada.checked || tem_parcelamento.checked) {

        let campo_da_pergunta = document.querySelector('#pergunta')
        campo_da_pergunta.style.display = 'none'

        botao_continuar_para_inserir_dados.style.display = 'none'

        let botao_calcular = document.querySelector('#calcular')
        botao_calcular.style.display = 'block'

        let dia_do_pagamento = document.querySelector('.data_do_pagamento')
        dia_do_pagamento.style.display = 'block'
    }

    //EXIBIR OU NÃO A ENTRADA
    if (tem_entrada.checked) {
        entrada.style.display = 'block'
    }
    if (nao_tem_entrada.checked) {
        entrada.style.display = 'none'
    }

    //EXIBIR OU NÃO O PARCELAMENTO
    if (tem_parcelamento.checked) {
        parcelamento.style.display = 'block'
    }
    if (nao_tem_parcelamento.checked) {
        parcelamento.style.display = 'none'
    }

})


botao_calcular.addEventListener('click', () => {

//INICIANDO OS CALCULOS
let dia_do_pagamento = document.querySelector('#dia_do_pagamento')
//let botao_calcular = document.querySelector('#botao_calcular')
let vencimento_mesmo_dia = document.querySelector('#escolher_vencimento_mesmo_dia')
let vencimento_dias_corridos = document.querySelector('#escolher_vencimento_dias_corridos')
let parcela_inicial = document.querySelector('#parcela_inicial')
let parcela_inicial_valor = parseInt(parcela_inicial.value)

let pagou_dia = new Date(dia_do_pagamento.value)
pagou_dia.setHours(0, 0, 0, 0)

let formatador = new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL'
})

    if(tem_entrada.checked || tem_parcelamento.checked ) {
        //CABEÇALHO DA TABELA APARECE OU NÃO

        //SELECIONAR A TABELA LIMPA OS CAMPOS E CRIA O THEAD E TBODY

        let tabela = document.querySelector("#tabela")
        tabela.innerHTML = ""

        let thead = document.createElement("thead")
        let tbody = document.createElement("tbody")
        let tfoot = document.createElement("tfoot")

        //CRIANDO AS CELULAS DO TITULO
        const colunas = [
            "PARCELAS",
            "VENCIMENTOS",
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

                if (valores_coluna === "PARCELAS") {
                    th.classList.add("borda_superior_esquerda")
                } else if (valores_coluna === "TOTAL DEVIDO") {
                    th.classList.add("borda_superior_direita")
                }

                const colunas_com_bordas = [
                    "VENCIMENTOS",
                    "DIAS DE ATRASO",
                    "VALOR DAS PRESTAÇÕES",
                    "VALOR DA MULTA",
                    "VALOR DO JUROS",
                    "JUROS + MULTA",]

                if (colunas_com_bordas.includes(valores_coluna)) {
                    th.classList.add("borda_superior_cima")
                }

                linha_cabecalho.appendChild(th)
            })

            thead.appendChild(linha_cabecalho)
            tabela.appendChild(thead)

        let dias_de_atraso_total = 0
        let valor_das_prestacoes_total = 0
        let valor_da_multa_total = 0
        let valor_do_juros_total = 0
        let juros_com_multa_total = 0
        let total_devido = 0

        //CALCULANDO A ENTRADA
        if (tem_entrada.checked) {

            let data_do_vencimento_entrada = document.querySelector("#vencimento_da_entrada").value
            let vencimento_entrada = new Date(data_do_vencimento_entrada)
            vencimento_entrada.setHours(0, 0, 0, 0)

            let pegar_valor_da_entrada = document.querySelector("#valor_da_entrada").value
            let valor_da_entrada = parseFloat(pegar_valor_da_entrada.replace(',','.'))

            let [ano,mes,dia] = data_do_vencimento_entrada.split('-')
            let data_da_entrada_formatada = `${dia}/${mes}/${ano}`

            let dias_de_atraso_da_entrada_calculo = pagou_dia.getTime() - vencimento_entrada.getTime()
            let dias_de_atraso_da_entrada_resultado = (dias_de_atraso_da_entrada_calculo / (1000 * 60 * 60 * 24))

            let valor_da_multa_entrada = (1*valor_da_entrada/100)

            let valor_do_juros_entrada =  ((0.10*valor_da_entrada/100) * (dias_de_atraso_da_entrada_resultado))
            
            let juros_com_multa_entrada = (valor_da_multa_entrada + valor_do_juros_entrada)
            
            let total_devido_entrada = (valor_da_entrada + valor_da_multa_entrada + valor_do_juros_entrada)
            

            let colunas = [
                'ENTRADA',
                data_da_entrada_formatada,
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
                celula.textContent = indice >= 3 ? formatador.format(valor) : valor
                linha_da_entrada.appendChild(celula)
            })

            tbody.appendChild(linha_da_entrada)
            tabela.appendChild(tbody)

            dias_de_atraso_total += dias_de_atraso_da_entrada_resultado
            valor_das_prestacoes_total += valor_da_entrada
            valor_da_multa_total += valor_da_multa_entrada
            valor_do_juros_total += valor_do_juros_entrada
            juros_com_multa_total += juros_com_multa_entrada
            total_devido += total_devido_entrada

        }

        //CALCULANDO O PARCELAMENTO
        if (vencimento_mesmo_dia.checked) {

            let data_do_vencimento_parcelamento = document.querySelector('#vencimento_do_parcelamento').value
            let parcelamento_venceu_dia = new Date (data_do_vencimento_parcelamento)
            parcelamento_venceu_dia.setHours(0, 0, 0, 0)

            let parcelas = document.querySelector("#quantidade_de_parcelas")
            let quantidade_de_parcelas = parseInt(parcelas.value)

            let valor_das_parcelas = document.querySelector("#valor_das_parcelas").value
            let pagou_parcelas = parseFloat(valor_das_parcelas.replace(',','.'))

            //DADOS PARA CALCULAR OS VENCIMENTOS NO FOR
            let [ano_inicial,mes_inicial,dia_inicial] = data_do_vencimento_parcelamento.split('-').map(Number)
            let mes = mes_inicial - 1

            for(let repeticoes = 0; repeticoes < quantidade_de_parcelas; repeticoes++) {

                let linha_do_parcelamento = document.createElement("tr")
                
                //COLUNA DE PARCELAS
                let parcelas_celula = document.createElement("td")
                parcelas_celula.textContent = `${repeticoes + parcela_inicial_valor}° PARCELA `
                linha_do_parcelamento.appendChild(parcelas_celula)

                //COLUNA DE VENCIMENTOS
                let vencimentos_celula = document.createElement('td')
                
                let ultimo_dia_do_mes_atual = new Date(ano_inicial,mes +1, 0).getDate()
                let dia = dia_inicial <= ultimo_dia_do_mes_atual ? dia_inicial : ultimo_dia_do_mes_atual

                let data = new Date(ano_inicial,mes,dia)
                let data_formatada = data.toLocaleDateString('pt-BR')
                vencimentos_celula.textContent = (data_formatada)

                linha_do_parcelamento.appendChild(vencimentos_celula)
                let vencimento_atual_do_parcelamento = data

                mes++

                if (mes > 11) {
                    mes = 0
                    ano_inicial++
                }

                //COLUNA DIAS DE ATRASO
                let dias_de_atraso_do_parcelamento_celula = document.createElement("td")
                let dias_de_atraso_do_parcelamento = ((pagou_dia.getTime() - vencimento_atual_do_parcelamento.getTime()) / (1000 * 60 * 60 * 24))
                dias_de_atraso_do_parcelamento_celula.textContent = (dias_de_atraso_do_parcelamento)
                linha_do_parcelamento.appendChild(dias_de_atraso_do_parcelamento_celula)
                //SOMANDO O TOTAL DA COLUNA
                dias_de_atraso_total += dias_de_atraso_do_parcelamento


                //COLUNA VALOR DAS PRESTAÇÕES
                let valor_das_parcelas_celula = document.createElement("td")
                valor_das_parcelas_celula.textContent = (formatador.format(pagou_parcelas))
                linha_do_parcelamento.appendChild(valor_das_parcelas_celula)
                //SOMANDO O TOTAL DA COLUNA
                valor_das_prestacoes_total += pagou_parcelas


                //COLUNA VALOR DA MULTA
                let valor_da_multa_celula = document.createElement("td")
                let valor_da_multa = (1 * pagou_parcelas / 100)
                valor_da_multa_celula.textContent = (formatador.format(valor_da_multa))
                linha_do_parcelamento.appendChild(valor_da_multa_celula)
                //SOMANDO O TOTAL DA COLUNA
                valor_da_multa_total += valor_da_multa

                //COLUNA VALOR DO JUROS
                let valor_do_juros_celula = document.createElement("td")
                let valor_do_juros = ((0.10 * pagou_parcelas / 100) * (dias_de_atraso_do_parcelamento))
                valor_do_juros_celula.textContent = (formatador.format(valor_do_juros))
                linha_do_parcelamento.appendChild(valor_do_juros_celula)
                //SOMANDO O TOTAL DA COLUNA
                valor_do_juros_total += valor_do_juros

                //COLUNA JUROS + MULTA
                let juros_com_multa = document.createElement('td')
                juros_com_multa.textContent = (formatador.format(valor_da_multa + valor_do_juros))
                linha_do_parcelamento.appendChild(juros_com_multa)
                //SOMANDO O TOTAL DA COLUNA
                juros_com_multa_total += valor_da_multa + valor_do_juros

                //COLUNA TOTAL DEVIDO
                let total_devido_celula = document.createElement('td')
                total_devido_celula.textContent = (formatador.format(pagou_parcelas + valor_da_multa + valor_do_juros))
                linha_do_parcelamento.appendChild(total_devido_celula)
                //SOMANDO O TOTAL DA COLUNA
                total_devido += pagou_parcelas + valor_da_multa + valor_do_juros

                tbody.appendChild(linha_do_parcelamento)
                tabela.appendChild(tbody)


            }
                //LINHA DO TOTAL
                let linha_do_total = document.createElement('tr')

                let total = document.createElement('td')
                total.colSpan = 2
                total.textContent = 'TOTAL'
                linha_do_total.appendChild(total)

                let total_dias = document.createElement('td')
                total_dias.textContent = (dias_de_atraso_total)
                linha_do_total.appendChild(total_dias)

                let prestacoes_total = document.createElement('td')
                prestacoes_total.textContent = (formatador.format(valor_das_prestacoes_total))
                linha_do_total.appendChild(prestacoes_total)

                let multa_total = document.createElement('td')
                multa_total.textContent = (formatador.format(valor_da_multa_total))
                linha_do_total.appendChild(multa_total)

                let juros_total = document.createElement('td')
                juros_total.textContent = (formatador.format(valor_do_juros_total))
                linha_do_total.appendChild(juros_total)

                let juros_multa_total = document.createElement('td')
                juros_multa_total.textContent = (formatador.format(juros_com_multa_total))
                linha_do_total.appendChild(juros_multa_total)

                let valor_devido_total = document.createElement('td')
                valor_devido_total.textContent = (formatador.format(total_devido))
                linha_do_total.appendChild(valor_devido_total)

                tfoot.appendChild(linha_do_total)
                tabela.appendChild(tfoot)

        } if(vencimento_dias_corridos.checked) {

            let data_do_vencimento_parcelamento = document.querySelector('#vencimento_do_parcelamento').value
            let parcelamento_venceu_dia = new Date (data_do_vencimento_parcelamento)
            parcelamento_venceu_dia.setHours(0, 0, 0, 0)

            let parcelas = document.querySelector("#quantidade_de_parcelas")
            let quantidade_de_parcelas = parseInt(parcelas.value)

            let valor_das_parcelas = document.querySelector("#valor_das_parcelas").value
            let pagou_parcelas = parseFloat(valor_das_parcelas.replace(',','.'))

            //DADOS PARA CALCULAR OS VENCIMENTOS NO FOR
            let [ano_inicial,mes_inicial,dia_inicial] = data_do_vencimento_parcelamento.split('-').map(Number)
            
            let mes = mes_inicial - 1

            for(let repeticoes = 0; repeticoes < quantidade_de_parcelas; repeticoes++) {

                let linha_do_parcelamento = document.createElement("tr")
                
                //COLUNA DE PARCELAS
                let parcelas_celula = document.createElement("td")
                parcelas_celula.textContent = `${repeticoes + parcela_inicial_valor}° PARCELA `
                linha_do_parcelamento.appendChild(parcelas_celula)

                //COLUNA DE VENCIMENTOS
                let vencimentos_celula = document.createElement('td')
                
                let vencimento_inicial_completo = new Date(ano_inicial,mes,dia_inicial)

                let ultimo_dia_do_mes_atual = new Date(ano_inicial,mes +1, 0).getDate()

                let vencimento_atual_do_parcelamento = 0

                if(dia_inicial <= ultimo_dia_do_mes_atual) {

                    let data = new Date(ano_inicial,mes,dia_inicial)
                    let data_formatada = data.toLocaleDateString('pt-BR')

                    vencimentos_celula.textContent = (data_formatada)
                    linha_do_parcelamento.appendChild(vencimentos_celula)

                    vencimento_atual_do_parcelamento = data

                    mes++
                    
                } else {
                    let data_formatada = vencimento_inicial_completo.toLocaleDateString('pt-BR')

                    vencimentos_celula.textContent = (data_formatada)
                    linha_do_parcelamento.appendChild(vencimentos_celula)

                    vencimento_atual_do_parcelamento = vencimento_inicial_completo

                    mes++
                }

                if (mes > 11) {
                    mes = 0
                    ano_inicial++
                }

                //COLUNA DIAS DE ATRASO
                let dias_de_atraso_do_parcelamento_celula = document.createElement("td")
                let dias_de_atraso_do_parcelamento = ((pagou_dia.getTime() - vencimento_atual_do_parcelamento.getTime()) / (1000 * 60 * 60 * 24))
                dias_de_atraso_do_parcelamento_celula.textContent = (dias_de_atraso_do_parcelamento)
                linha_do_parcelamento.appendChild(dias_de_atraso_do_parcelamento_celula)
                //SOMANDO O TOTAL DA COLUNA
                dias_de_atraso_total += dias_de_atraso_do_parcelamento


                //COLUNA VALOR DAS PRESTAÇÕES
                let valor_das_parcelas_celula = document.createElement("td")
                valor_das_parcelas_celula.textContent = (formatador.format(pagou_parcelas))
                linha_do_parcelamento.appendChild(valor_das_parcelas_celula)
                //SOMANDO O TOTAL DA COLUNA
                valor_das_prestacoes_total += pagou_parcelas


                //COLUNA VALOR DA MULTA
                let valor_da_multa_celula = document.createElement("td")
                let valor_da_multa = (1 * pagou_parcelas / 100)
                valor_da_multa_celula.textContent = (formatador.format(valor_da_multa))
                linha_do_parcelamento.appendChild(valor_da_multa_celula)
                //SOMANDO O TOTAL DA COLUNA
                valor_da_multa_total += valor_da_multa

                //COLUNA VALOR DO JUROS
                let valor_do_juros_celula = document.createElement("td")
                let valor_do_juros = ((0.10 * pagou_parcelas / 100) * (dias_de_atraso_do_parcelamento))
                valor_do_juros_celula.textContent = (formatador.format(valor_do_juros))
                linha_do_parcelamento.appendChild(valor_do_juros_celula)
                //SOMANDO O TOTAL DA COLUNA
                valor_do_juros_total += valor_do_juros

                //COLUNA JUROS + MULTA
                let juros_com_multa = document.createElement('td')
                juros_com_multa.textContent = (formatador.format(valor_da_multa + valor_do_juros))
                linha_do_parcelamento.appendChild(juros_com_multa)
                //SOMANDO O TOTAL DA COLUNA
                juros_com_multa_total += valor_da_multa + valor_do_juros

                //COLUNA TOTAL DEVIDO
                let total_devido_celula = document.createElement('td')
                total_devido_celula.textContent = (formatador.format(pagou_parcelas + valor_da_multa + valor_do_juros))
                linha_do_parcelamento.appendChild(total_devido_celula)
                //SOMANDO O TOTAL DA COLUNA
                total_devido += pagou_parcelas + valor_da_multa + valor_do_juros

                tbody.appendChild(linha_do_parcelamento)
                tabela.appendChild(tbody)


            }
                //LINHA DO TOTAL
                let linha_do_total = document.createElement('tr')

                let total = document.createElement('td')
                total.colSpan = 2
                total.textContent = 'TOTAL'
                total.classList.add("borda_inferior_esquerda")
                linha_do_total.appendChild(total)

                let total_dias = document.createElement('td')
                total_dias.textContent = (dias_de_atraso_total)
                total_dias.classList.add("borda_inferior_baixo")
                linha_do_total.appendChild(total_dias)

                let prestacoes_total = document.createElement('td')
                prestacoes_total.textContent = (formatador.format(valor_das_prestacoes_total))
                prestacoes_total.classList.add("borda_inferior_baixo")
                linha_do_total.appendChild(prestacoes_total)

                let multa_total = document.createElement('td')
                multa_total.textContent = (formatador.format(valor_da_multa_total))
                multa_total.classList.add("borda_inferior_baixo")
                linha_do_total.appendChild(multa_total)

                let juros_total = document.createElement('td')
                juros_total.textContent = (formatador.format(valor_do_juros_total))
                juros_total.classList.add("borda_inferior_baixo")
                linha_do_total.appendChild(juros_total)

                let juros_multa_total = document.createElement('td')
                juros_multa_total.textContent = (formatador.format(juros_com_multa_total))
                juros_multa_total.classList.add("borda_inferior_baixo")
                linha_do_total.appendChild(juros_multa_total)

                let valor_devido_total = document.createElement('td')
                valor_devido_total.textContent = (formatador.format(total_devido))
                valor_devido_total.classList.add("borda_inferior_direita")
                linha_do_total.appendChild(valor_devido_total)

                tfoot.appendChild(linha_do_total)
                tabela.appendChild(tfoot)

        }
    }

})