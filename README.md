# Simulador de Paginação de Memória Virtual

Projeto desenvolvido para a disciplina de **Sistemas Operacionais** com o objetivo de demonstrar, de forma visual e interativa, o funcionamento do **gerenciamento de memória por paginação**.

O simulador permite configurar os parâmetros da memória, criar o mapeamento entre páginas e quadros, realizar traduções de endereços lógicos para físicos e acompanhar todo o processo por meio de representações visuais que facilitam a compreensão dos conceitos estudados em sala de aula.

![Linguagem](https://img.shields.io/badge/Linguagem-JavaScript-yellow)
![Último commit](https://img.shields.io/github/last-commit/izalouyza/SimuladorMemoria)

---

# Sumário

* [Autores](#autores)
* [Sobre o Projeto](#sobre-o-projeto)
* [Funcionalidades](#funcionalidades)
* [Como Funciona](#como-funciona)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Arquitetura do Sistema](#arquitetura-do-sistema)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Como Executar](#como-executar-o-projeto)
* [Finalidade Acadêmica](#finalidade-acadêmica)

---

# Autores

**Discentes:**

* [Izadora Louyza Silva Figueiredo](https://github.com/izalouyza)
* [Lívian Maria Lucena Gomes Pinheiro](https://github.com/livianlucena)
* [Maria Vitória Fernandes Rocha](https://github.com/tivitoriarocha)
* [Victor Hugo de Oliveira](https://github.com/Victor350br)

---

# Sobre o Projeto

A paginação é uma técnica de gerenciamento de memória que permite dividir a memória lógica de um processo em blocos de tamanho fixo chamados **páginas**, que são armazenados em **quadros (frames)** da memória física.

Este simulador foi desenvolvido para auxiliar estudantes na visualização desse processo, permitindo observar como os endereços são traduzidos, como ocorre o mapeamento entre páginas e quadros e como o sistema reage quando uma página não está carregada na memória física.

A aplicação busca transformar conceitos teóricos em uma experiência prática e intuitiva.

---

# Funcionalidades

## Configuração da Memória

Permite definir:

* Tamanho da página;
* Tamanho da memória lógica;
* Tamanho da memória física.

## Arquitetura de Endereçamento

O sistema calcula automaticamente:

* Quantidade de bits para identificação da página;
* Quantidade de bits para deslocamento (*offset*);
* Quantidade de páginas lógicas;
* Quantidade de quadros físicos.

## Tabela de Páginas

* Mapeamento manual entre páginas e quadros;
* Edição dinâmica dos quadros;
* Simulação de entradas inválidas ou ausentes.

## Tradução de Endereços

O usuário pode informar um endereço lógico e acompanhar:

* Separação entre página e deslocamento;
* Consulta à tabela de páginas;
* Identificação do quadro físico;
* Geração do endereço físico correspondente.

## Simulação de Page Fault

Caso uma página não possua um quadro associado, o sistema exibe visualmente a ocorrência de um **Page Fault**, simulando uma exceção de ausência de página na memória física.

## Fluxo Visual da Tradução

A tradução é apresentada em etapas:

```text
Endereço Lógico
       ↓
 Página + Offset
       ↓
Tabela de Páginas
       ↓
 Quadro + Offset
       ↓
Endereço Físico
```

## Geração de Cenários

O simulador permite:

* Aplicar novas configurações;
* Reiniciar a memória;
* Gerar valores aleatórios para testes rápidos.

## Tema Claro e Escuro

A interface possui suporte à alternância entre tema claro e escuro, proporcionando melhor experiência de uso.

---

# Como Funciona

O funcionamento do simulador segue o mesmo princípio utilizado pelos sistemas operacionais modernos:

1. O endereço lógico é dividido em número da página e deslocamento.
2. A tabela de páginas é consultada.
3. O quadro físico correspondente é localizado.
4. O deslocamento é preservado.
5. O endereço físico é gerado.
6. Caso não exista um quadro associado, ocorre um **Page Fault**.

---

# Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript

---

# Arquitetura do Sistema

## Interface

Responsável pela interação com o usuário e exibição dos resultados.

* `index.html`
* `ajuda.html`
* `style.css`

## Lógica da Aplicação

Responsável pelos cálculos e simulações.

* `app.js`

---

# Estrutura do Projeto

```text
SimuladorMemoria/
│
├── src/
│   ├── ajuda.html
│   ├── app.js
│   ├── index.html
│   └── style.css
│
├── .gitignore
└── README.md
```

---

# Como Executar o Projeto

## Pré-requisitos

* Navegador Web atualizado; ou
* Visual Studio Code com a extensão Live Server.

## Clonar o repositório

```bash
git clone https://github.com/izalouyza/SimuladorMemoria.git
```

## Acessar a pasta

```bash
cd SimuladorMemoria
```

## Executar

Abra o arquivo:

```text
src/index.html
```

ou utilize a extensão **Live Server** do Visual Studio Code.

---

# Finalidade Acadêmica

Este projeto possui caráter educacional e foi desenvolvido como atividade da disciplina de **Sistemas Operacionais**, servindo como ferramenta de apoio para o estudo de gerenciamento de memória, paginação, tradução de endereços e funcionamento básico da MMU.
