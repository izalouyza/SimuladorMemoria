// Variáveis de estado global do simulador
let pageSize, logicSize, physicalSize;
let bitsN, bitsM, totalPages, totalFrames;

// Inicialização padrão modificada para gerar dados aleatórios válidos
function init() {
  // Lista de potências de 2 viáveis para o simulador educacional
  const potenciasPSize = [4, 8, 16, 32];
  const potenciasLSize = [32, 64, 128, 256];
  const potenciasPhSize = [64, 128, 256, 512];

  // Escolhe tamanhos aleatórios iniciais
  const randPSize = potenciasPSize[Math.floor(Math.random() * potenciasPSize.length)];
  
  // Filtra memórias lógica e física para garantir que sejam maiores ou iguais ao tamanho da página
  const opcoesLSize = potenciasLSize.filter(v => v >= randPSize);
  const opcoesPhSize = potenciasPhSize.filter(v => v >= randPSize);
  
  const randLSize = opcoesLSize[Math.floor(Math.random() * opcoesLSize.length)];
  const randPhSize = opcoesPhSize[Math.floor(Math.random() * opcoesPhSize.length)];

  // Escolhe um endereço lógico aleatório dentro do limite da memória lógica gerada
  const randLogicalAddr = Math.floor(Math.random() * randLSize);

  // Aplica os valores gerados nos inputs correspondentes da tela
  document.getElementById("pageSize").value = randPSize;
  document.getElementById("logicSize").value = randLSize;
  document.getElementById("physicalSize").value = randPhSize;
  document.getElementById("logicalAddressInput").value = randLogicalAddr;

  atualizarConfiguracoes(true); // Flag para carregar dados aleatórios na tabela
}

function isPowerOfTwo(num) {
  return num > 0 && (num & (num - 1)) === 0;
}

function getLog2(num) {
  return Math.log2(num);
}

function atualizarConfiguracoes(isInitial = false) {
  const pSize = parseInt(document.getElementById("pageSize").value);
  const lSize = parseInt(document.getElementById("logicSize").value);
  const phSize = parseInt(document.getElementById("physicalSize").value);
  const errorDiv = document.getElementById("config-error");

  errorDiv.style.display = "none";
  errorDiv.innerText = "";

  // Validações obrigatórias baseadas em Hardware (Potências de 2)
  if (!isPowerOfTwo(pSize) || !isPowerOfTwo(lSize) || !isPowerOfTwo(phSize)) {
    errorDiv.innerText =
      "Erro: Todos os tamanhos configurados devem ser potências de 2 (Ex.: 4, 8, 16, 64, 128...).";
    errorDiv.style.display = "block";
    return;
  }

  if (pSize > lSize) {
    errorDiv.innerText =
      "Erro: O tamanho da página não pode ser maior que o tamanho da memória lógica.";
    errorDiv.style.display = "block";
    return;
  }

  // Atribuição das variáveis estruturais
  pageSize = pSize;
  logicSize = lSize;
  physicalSize = phSize;

  bitsN = getLog2(pageSize); // Bits do deslocamento d
  bitsM = getLog2(logicSize); // Bits totais do endereço lógico

  let bitsP = bitsM - bitsN; // Bits do número de página p
  totalPages = logicSize / pageSize;
  totalFrames = physicalSize / pageSize;

  // Atualiza visualização dos blocos de bits na tela
  document.getElementById("label-bits-p").innerText = bitsP;
  document.getElementById("label-bits-d").innerText = bitsN;

  // Renderiza a estrutura física da Tabela de Páginas
  const tbody = document.querySelector("#page-table tbody");
  tbody.innerHTML = "";

  // Geração de mapeamento inicial aleatório e sem repetição de quadros
  let defaultMapping = {};
  if (isInitial) {
    let disponiveis = [];
    for (let f = 0; f < totalFrames; f++) {
      disponiveis.push(f);
    }
    
    // Embaralha os quadros físicos disponíveis (Algoritmo Fisher-Yates)
    for (let i = disponiveis.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [disponiveis[i], disponiveis[j]] = [disponiveis[j], disponiveis[i]];
    }

    // Distribui os quadros embaralhados para as páginas existentes
    for (let p = 0; p < totalPages; p++) {
      // Deixa uma chance de 15% de vir em branco de propósito para demonstrar o Page Fault nativamente
      if (Math.random() > 0.15 && disponiveis.length > 0) {
        defaultMapping[p] = disponiveis.pop();
      }
    }
  }

  for (let i = 0; i < totalPages; i++) {
    let tr = document.createElement("tr");
    let valueMapped = defaultMapping[i] !== undefined ? defaultMapping[i] : "";

    tr.innerHTML = `
            <td class="highlight-p">${i}</td>
            <td>
                <input type="number" min="0" max="${totalFrames - 1}" 
                       class="input-frame" id="frame-input-${i}" 
                       value="${valueMapped}" placeholder="Ex.: 0-${totalFrames - 1}">
            </td>
        `;
    tbody.appendChild(tr);
  }

  // Reseta o bloco de logs/output
  document.getElementById("translation-output").innerHTML =
    '<p class="text-muted">Configuração atualizada com sucesso. Insira um endereço lógico para testar a tradução.</p>';
}

function traduzirEndereco() {
  const addrInput = parseInt(
    document.getElementById("logicalAddressInput").value,
  );
  const output = document.getElementById("translation-output");

  if (isNaN(addrInput) || addrInput < 0 || addrInput >= logicSize) {
    output.innerHTML = `<div class="alert-error" style="display:block;">Erro: O endereço lógico deve ser um número entre 0 e ${logicSize - 1} (dentro do espaço de endereçamento de ${logicSize} bytes).</div>`;
    return;
  }

  // 1. Divisão e Cálculo Matemático da paginação
  let p = Math.floor(addrInput / pageSize);
  let d = addrInput % pageSize;

  // 2. Manipulação binária textual para exibição pedagógica
  let bitsPCount = bitsM - bitsN;
  let binaryStr = addrInput.toString(2).padStart(bitsM, "0");

  let pBinStr = binaryStr.substring(0, bitsPCount);
  let dBinStr = binaryStr.substring(bitsPCount);

  // 3. Consulta ao mapeamento dinâmico feito pelo usuário na tabela
  const frameInputElement = document.getElementById(`frame-input-${p}`);
  let frameValueRaw = frameInputElement ? frameInputElement.value : "";
  let f = parseInt(frameValueRaw);

  // Inicialização da string de visualização passo a passo
  let htmlLog = `<h3>Resultado da Tradução Matemática e de Bits</h3><br>`;

  // Passo 1: Fatiamento Binário
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

  // Passo 2: Conversão dos termos calculados de volta à base decimal
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

  // Passo 3 e 4: Mapeamento e Tratamento de Falta de Página (Page Fault)
  if (frameValueRaw === "" || isNaN(f) || f < 0 || f >= totalFrames) {
    htmlLog += `
            <div class="step" style="border-left-color: #ef4444;">
                <div class="step-title" style="color: #ef4444;">Passo 3: Mapeamento da Tabela de Páginas (PAGE FAULT)</div>
                <div class="step-desc">
                    A página <span class="highlight-p">${p}</span> foi consultada na tabela, mas não possui um mapeamento válido para um quadro da memória física (Intervalo permitido: 0 a ${totalFrames - 1}).<br>
                    <strong style="color: #ef4444;">Resultado:</strong> Ocorreu uma Falta de Página (Page Fault). O Sistema Operacional precisará buscar a página na memória secundária.
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

  output.innerHTML = htmlLog;
}

// Vincula a inicialização automática do simulador ao carregamento do script
window.onload = init;