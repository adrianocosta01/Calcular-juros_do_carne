//SELECIONANDO MODAIS
let modal_imprimir = document.querySelector("#modal_imprimir");
let modal_comprovantes = document.querySelector("#modal_comprovantes");
let modal_imprimir_comprovante_frente_verso = document.querySelector("#modal_imprimir_comprovante_frente_verso")

//SELECIONANDO BOTÕES
let btn_abrir_modal = document.querySelector('#botao_abrir_modal');
let btn_fechar_campo_modal_imprimir = document.querySelector(".btn_fechar_campo_modal_imprimir")
let btn_imprimir_tabela = document.querySelector("#btn_forma_de_impressao_tabela")
let btn_abrir_modal_comprovantes = document.querySelector('#btn_abrir_modal_comprovantes')
let btn_fechar_campo_modal_comprovantes = document.querySelector(".btn_fechar_campo_modal_comprovantes")

let btn_ir_para_imprimir_comprovante_frente_verso = document.querySelector("#btn_ir_para_imprimir_comprovante_frente_verso")
let btn_fechar_campo_modal_imprimir_comprovante_frente_verso = document.querySelector(".btn_fechar_campo_modal_imprimir_comprovante_frente_verso")

let btn_forma_de_impressao_comprovante_frente = document.querySelector("#btn_forma_de_impressao_comprovante_frente")

//FUNÇÕES ABRIR E FECHAR MODAL
function abrir_modal(modal) {
    modal.showModal()
}

function fechar_modal(modal) {
    modal.close()
}

//USANDO OS BOTÕES
btn_abrir_modal.addEventListener('click', () => abrir_modal(modal_imprimir))
btn_fechar_campo_modal_imprimir.addEventListener('click', () => fechar_modal(modal_imprimir))
btn_imprimir_tabela.addEventListener('click', () => window.print())
btn_abrir_modal_comprovantes.addEventListener('click', () => abrir_modal(modal_comprovantes))
btn_fechar_campo_modal_comprovantes.addEventListener('click', () => fechar_modal(modal_comprovantes))

btn_fechar_campo_modal_imprimir_comprovante_frente_verso.addEventListener('click', () => fechar_modal(modal_imprimir_comprovante_frente_verso))


let dados_comprovante_frente = []
let dados_comprovante_verso = []

btn_ir_para_imprimir_comprovante_frente_verso.addEventListener('click', () => {

    let nome_da_empresa = document.querySelector("#nome_da_empresa").value
    let codigo_do_cliente = document.querySelector("#codigo_do_cliente").value
    let nome_do_cliente = document.querySelector('#nome_do_cliente').value
    let forma_de_pagamento = document.querySelector("#forma_de_pagamento").value
    let quem_recebeu = document.querySelector("#quem_recebeu").value

    let frente = {
        empresa: nome_da_empresa,
        codigo: codigo_do_cliente,
        cliente: nome_do_cliente,
    }

    let verso = {
        pagamento: forma_de_pagamento,
        recebedor: quem_recebeu
    }

    dados_comprovante_frente.push(frente)
    dados_comprovante_verso.push(verso)

    localStorage.setItem('dados_comprovante_frente',JSON.stringify(dados_comprovante_frente))

    abrir_modal(modal_imprimir_comprovante_frente_verso

    )})




//Redirecionar para a página dos comprovantes
//window.location.href = 'comprovantes.html';

//depois usar os dados do verso que ja estão prontos

btn_forma_de_impressao_comprovante_frente.addEventListener('click', () => window.location.href = 'comprovantes.html')
