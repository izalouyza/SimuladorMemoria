// Variáveis de estado global do simulador
let pageSize, logicSize, physicalSize;
let bitsN, bitsM, totalPages, totalFrames;

/**
 * 1. Função executada ao carregar a página (F5) ou para resetar tudo para 2.
 * Inicializa os tamanhos em 2, 2, 2 e deixa a tabela pré-preenchida com 0.
 */
function init() {
  document.getElementById("pageSize").value = 2;
  document.getElementById("logicSize").value = 2;
  document.getElementById("physicalSize").value = 2;
  document.getElementById("logicalAddressInput").value = 0;

  // Atualiza as configurações passando false para NÃO randomizar os quadros físicos
  atualizarConfiguracoes(false);
}

/**
 * 2. Função do botão "Aplicar e Reiniciar".
 * Se os valores na tela já forem 2, 2, 2, ela limpa/reinicia tudo para o padrão. 
 * Se o usuário mudou os valores, ela aplica a mudança com a tabela vazia para preenchimento.
 */
function aplicarOuReiniciar() {
  const pSize = parseInt(document.getElementById("pageSize").value);
  const lSize = parseInt(document.getElementById("logicSize").value);
  const phSize = parseInt(document.getElementById("physicalSize").value);

  // Se já estiver tudo em 2, funciona como Reiniciar voltando para o padrão com 0
  if (pSize === 2 && lSize === 2 && phSize === 2) {
    init();
  } else {
    // Se mudou os valores, apenas aplica criando a tabela limpa (false)
    atualizarConfiguracoes(false);
  }
}

/**
 * 3. Função do botão "Randomizar Valores".
 * Sorteia os tamanhos do sistema E sorteia o mapeamento dos Quadros Físicos (f).
 */
function randomizarValores() {
  const potenciasPSize = [2, 4, 8, 16, 32];
  const potenciasLSize = [2, 4, 8, 16, 32, 64, 128, 256];
  const potenciasPhSize = [2, 4, 8, 16, 32, 64, 128, 256, 512];

  const randPSize = potenciasPSize[Math.floor(Math.random() * potenciasPSize.length)];
  const opcoesLSize = potenciasLSize.filter(v => v >= randPSize);
  const opcoesPhSize = potenciasPhSize.filter(v => v >= randPSize);
  
  const randLSize = opcoesLSize[Math.floor(Math.random() * opcoesLSize.length)];
  const randPhSize = opcoesPhSize[Math.floor(Math.random() * opcoesPhSize.length)];
  const randLogicalAddr = Math.floor(Math.random() * randLSize);

  document.getElementById("pageSize").value = randPSize;
  document.getElementById("logicSize").value = randLSize;
  document.getElementById("physicalSize").value = randPhSize;
  document.getElementById("logicalAddressInput").value = randLogicalAddr;

  // Passa true para preencher os Quadros Físicos (f) de forma aleatória também!
  atualizarConfiguracoes(true);
}

function isPowerOfTwo(num) {
  return num > 0 && (num & (num - 1)) === 0;
}

function getLog2(num) {
  return Math.log2(num);
}

function atualizarConfiguracoes(randomizarMapeamento = false) {
  const pSize = parseInt(document.getElementById("pageSize").value);
  const lSize = parseInt(document.getElementById("logicSize").value);
  const phSize = parseInt(document.getElementById("physicalSize").value);
  const errorDiv = document.getElementById("config-error");

  errorDiv.style.display = "none";
  errorDiv.innerText = "";

  if (!isPowerOfTwo(pSize) || !isPowerOfTwo(lSize) || !isPowerOfTwo(phSize)) {
    errorDiv.innerText = "Erro: Todos os tamanhos configurados devem ser potências de 2 (Ex.: 2, 4, 8, 16...).";
    errorDiv.style.display = "block";
    return;
  }

  if (pSize > lSize) {
    errorDiv.innerText = "Erro: O tamanho da página não pode ser maior que o tamanho da memória lógica.";
    errorDiv.style.display = "block";
    return;
  }

  pageSize = pSize;
  logicSize = lSize;
  physicalSize = phSize;

  bitsN = getLog2(pageSize);
  bitsM = getLog2(logicSize);

  let bitsP = bitsM - bitsN;
  totalPages = logicSize / pageSize;
  totalFrames = physicalSize / pageSize;

  document.getElementById("label-bits-p").innerText = bitsP;
  document.getElementById("label-bits-d").innerText = bitsN;

  const tbody = document.querySelector("#page-table tbody");
  tbody.innerHTML = "";

  let defaultMapping = {};
  
  // Se randomizarMapeamento for true, gera os quadros físicos de forma aleatória
  if (randomizarMapeamento) {
    let disponiveis = [];
    for (let f = 0; f < totalFrames; f++) { disponiveis.push(f); }
    for (let i = disponiveis.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [disponiveis[i], disponiveis[j]] = [disponiveis[j], disponiveis[i]];
    }
    for (let p = 0; p < totalPages; p++) {
      if (Math.random() > 0.15 && disponiveis.length > 0) {
        defaultMapping[p] = disponiveis.pop();
      }
    }
  } else if (pSize === 2 && lSize === 2 && phSize === 2) {
    // ATUALIZAÇÃO: Se for a inicialização padrão (2, 2, 2), pré-preenche a página 0 com o quadro 0
    defaultMapping[0] = 0;
  }
  
  for (let i = 0; i < totalPages; i++) {
    let tr = document.createElement("tr");
    tr.id = `page-row-${i}`;
    let valueMapped = defaultMapping[i] !== undefined ? defaultMapping[i] : "";

    tr.innerHTML = `
        <td class="highlight-p" style="font-weight: bold;">${i}</td>
        <td>
            <input type="number" min="0" max="${totalFrames - 1}" 
                   class="input-frame" id="frame-input-${i}" 
                   value="${valueMapped}" placeholder="Ex.: 0-${totalFrames - 1}">
        </td>
    `;
    
    tbody.appendChild(tr);
  }

  document.getElementById("translation-output").innerHTML =
    '<p class="text-muted">Configuração atualizada com sucesso. Insira um endereço lógico para testar a tradução.</p>';
}

function traduzirEndereco() {
  const addrInput = parseInt(document.getElementById("logicalAddressInput").value);
  const output = document.getElementById("translation-output");

  if (isNaN(addrInput) || addrInput < 0 || addrInput >= logicSize) {
    output.innerHTML = `<div class="alert-error" style="display:block;">Erro: O endereço lógico deve ser um número entre 0 e ${logicSize - 1} (dentro do espaço de endereçamento de ${logicSize} bytes).</div>`;
    return;
  }

  let p = Math.floor(addrInput / pageSize);
  let d = addrInput % pageSize;

  document.querySelectorAll("#page-table tbody tr").forEach(row => row.classList.remove("row-flash"));
  const targetRow = document.getElementById(`page-row-${p}`);
  if (targetRow) {
    targetRow.classList.add("row-flash");
    targetRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  let bitsPCount = bitsM - bitsN;
  let binaryStr = addrInput.toString(2).padStart(bitsM, "0");
  let pBinStr = binaryStr.substring(0, bitsPCount);
  let dBinStr = binaryStr.substring(bitsPCount);

  const frameInputElement = document.getElementById(`frame-input-${p}`);
  let frameValueRaw = frameInputElement ? frameInputElement.value : "";
  let f = parseInt(frameValueRaw);

  output.innerHTML = "";

  let isPageFault = (frameValueRaw === "" || isNaN(f) || f < 0 || f >= totalFrames);
  let templateId = isPageFault ? "tmpl-visual-erro" : "tmpl-visual-sucesso";
  
  const templateElement = document.getElementById(templateId);
  const cloneVisual = templateElement.content.cloneNode(true);

  cloneVisual.querySelectorAll('[data-field="addrInput"]').forEach(el => el.innerText = addrInput);
  cloneVisual.querySelectorAll('[data-field="p"]').forEach(el => el.innerText = p);
  cloneVisual.querySelectorAll('[data-field="d"]').forEach(el => el.innerText = d);
  
  if (!isPageFault) {
    let physicalAddress = f * pageSize + d;
    cloneVisual.querySelectorAll('[data-field="f"]').forEach(el => el.innerText = f);
    cloneVisual.querySelectorAll('[data-field="physicalAddress"]').forEach(el => el.innerText = physicalAddress);
  }

  output.appendChild(cloneVisual);

  // GERAÇÃO DOS LOGS MATEMÁTICOS COMPLETOS (INJETADOS ABAIXO DO GRÁFICO)
  let htmlLog = `<h3>Resultado da Tradução Matemática e de Bits</h3><br>`;

  htmlLog += `
        <div class="step">
            <div class="step-title">Passo 1: Conversão Binária e Divisão de Bits</div>
            <div class="step-desc">
                O endereço lógico decimal <strong>${addrInput}</strong> convertido para binário com representação de ${bitsM} bits (m = ${bitsM}):
                <div class="binary-display">
                    <span class="highlight-p">${pBinStr || "Ø"}</span><span class="highlight-d">${dBinStr}</span>
                </div>
                <br>Onde a parte em <span class="highlight-p">Azul representa a Página (p)</span> e a parte em <span class="highlight-d">Laranja o Deslocamento (d)</span>.
            </div>
        </div>
    `;

  htmlLog += `
        <div class="step">
            <div class="step-title">Passo 2: Identificação dos Componentes</div>
            <div class="step-desc">
                Convertendo as frações binárias de volta para decimal (ou aplicando divisão inteira):<br>
                * <strong>Número da Página (p):</strong> ${addrInput} / ${pageSize} = <span class="highlight-p">${p}</span> (em binário: ${pBinStr || "0"})<br>
                * <strong>Deslocamento (d):</strong> ${addrInput} % ${pageSize} = <span class="highlight-d">${d}</span> (em binário: ${dBinStr})
            </div>
        </div>
    `;

  if (isPageFault) {
    htmlLog += `
            <div class="step" style="border-left-color: #ef4444;">
                <div class="step-title" style="color: #ef4444;">Passo 3: Mapeamento da Tabela de Páginas (PAGE FAULT)</div>
                <div class="step-desc">
                    A página <span class="highlight-p">${p}</span> foi consultada na tabela, mas não possui um mapeamento válido para um quadro da memória física (Intervalo permitido: 0 a ${totalFrames - 1}).<br>
                    <strong style="color: #ef4444;">Resultado:</strong> Ocorreu uma Falta de Página (Page Fault). O O.S. precisará alocar este bloco.
                </div>
            </div>
        `;
  } else {
    let physicalAddress = f * pageSize + d;
    htmlLog += `
            <div class="step">
                <div class="step-title">Passo 3: Mapeamento na Tabela de Páginas</div>
                <div class="step-desc">
                    Buscando a página <span class="highlight-p">${p}</span> na tabela interativa, encontramos que ela está associada ao 
                    Quadro Físico (Frame) <span class="highlight-f">${f}</span>.
                </div>
            </div>
            
            <div class="step" style="border-left-color: var(--physical-color);">
                <div class="step-title">Passo 4: Cálculo do Endereço Físico Final</div>
                <div class="step-desc">
                    Aplicando a fórmula conceitual: <strong>Endereço Físico = (f * Tamanho da Página) + d</strong><br>
                    Endereço Físico = (<span class="highlight-f">${f}</span> * <strong>${pageSize}</strong>) + <span class="highlight-d">${d}</span><br>
                    Endereço Físico = <strong>${f * pageSize}</strong> + <span class="highlight-d">${d}</span> = <span class="highlight-f" style="font-size: 1.1rem;">${physicalAddress}</span>
                    <br><br>
                    <span class="step-title">Resumo do Mapeamento:</span> 
                    O endereço lógico <span class="highlight-p">${addrInput}</span> mapeia diretamente para o endereço físico <span class="highlight-f">${physicalAddress}</span> na memória real.
                </div>
            </div>
        `;
  }

  const divLog = document.createElement("div");
  divLog.innerHTML = htmlLog;
  output.appendChild(divLog);
}

// Inicializa com 2, 2, 2 e tabela preenchida com 0 ao carregar a página
window.onload = init;