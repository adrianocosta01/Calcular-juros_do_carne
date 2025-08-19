window.addEventListener('DOMContentLoaded', () => {
  //Recuperar os dados armazenados no localStorage do arquivo script.js
  const dados_entrada = JSON.parse(localStorage.getItem('imprimir_comprovante_entrada'));
  const dados_parcelamento = JSON.parse(localStorage.getItem('imprimir_comprovantes_parcelamento'));
  const dados_comprovante_frente_fixos = JSON.parse(localStorage.getItem('dados_comprovante_frente'));

  const modelo = document.querySelector('.panfleto_frente');
  const container = document.querySelector('#comprovantes_container');

  modelo.style.display = 'none';

  console.log(dados_comprovante_frente_fixos)

  // Se tiver entrada, exibe uma única via
  if (dados_entrada && dados_entrada.length > 0) {
    const dados = { ...dados_comprovante_frente_fixos[0], ...dados_entrada[0]}
    const clone = modelo.cloneNode(true);
    preencherCampos(clone, dados);
    clone.style.display = 'flex';
    container.appendChild(clone);
  }

  // Se tiver parcelamentos, clona um modelo para cada
  if (dados_parcelamento && dados_parcelamento.length > 0) {
    dados_parcelamento.forEach((parcela) => {
      const dados = {...dados_comprovante_frente_fixos[0],...parcela}
      const clone = modelo.cloneNode(true);
      preencherCampos(clone, dados);
      clone.style.display = 'flex';
      container.appendChild(clone);
    });
  }

  // Função para preencher os campos do comprovante clonado
  function preencherCampos(clone, dados) {
    clone.querySelector('.campo_nome_da_empresa span').innerText = dados.empresa
    clone.querySelector('.campo_codigo_do_cliente').innerText = dados.codigo
    clone.querySelector('.campo_nome_do_cliente').innerText = dados.cliente
    clone.querySelector('.campo_numero_da_parcela').innerText = dados.numero_da_parcela;
    clone.querySelector('.campo_quantidade_de_parcelas').innerText = dados.quantidade_de_parcelas;
    clone.querySelector('.campo_vencimento').innerText = dados.vencimento;
    clone.querySelector('.campo_valor_da_parcela').innerText = dados.valor_da_parcela;
    clone.querySelector('.campo_juros_da_parcela').innerText = dados.valor_do_juros;
    clone.querySelector('.campo_dias_de_atraso').innerText = dados.dias_de_atraso;
  }

  //localStorage.clear();
});
