# Simulador de Memória Paginada

Projeto desenvolvido para a disciplina de **Sistemas Operacionais**, com o objetivo de simular o funcionamento do **gerenciamento de memória por paginação** de forma visual, didática e interativa.

A aplicação permite compreender como um sistema operacional organiza a memória principal, realiza o mapeamento entre páginas e quadros e traduz endereços lógicos em endereços físicos, facilitando o aprendizado de conceitos fundamentais da área.

![Linguagem](https://img.shields.io/badge/Linguagem-JavaScript-yellow)
![Último commit](https://img.shields.io/github/last-commit/izalouyza/SimuladorMemoria)

---

# Sumário

* [Autores](#-autores)
* [Sobre o Projeto](#-sobre-o-projeto)
* [Objetivos](#-objetivos)
* [Funcionalidades](#-funcionalidades)
* [Conceitos Abordados](#-conceitos-abordados)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Arquitetura do Sistema](#-arquitetura-do-sistema)
* [Estrutura do Projeto](#-estrutura-do-projeto)
* [Como Executar](#-como-executar-o-projeto)

---

# Autores

**Discentes:**<br> <a href="https://github.com/izalouyza">Izadora Louyza Silva Figueiredo</a><br> <a href="https://github.com/livianlucena">Lívian Maria Lucena Gomes Pinheiro</a><br> <a href="https://github.com/tivitoriarocha">Maria Vitória Fernandes Rocha</a><br> <a href="https://github.com/Victor350br">Victor Hugo de Oliveira</a>

---

# Sobre o Projeto

O gerenciamento de memória é uma das principais responsabilidades de um sistema operacional. Entre as técnicas utilizadas para otimizar a utilização da memória RAM está a **paginação**, que divide os processos em blocos de tamanho fixo chamados **páginas**, armazenados em **quadros** da memória física.

Este simulador foi desenvolvido para representar esse mecanismo de maneira intuitiva, permitindo ao usuário visualizar como ocorre a organização da memória e a tradução dos endereços durante a execução de um processo.

O sistema busca transformar conceitos teóricos em uma experiência prática, tornando o estudo de Sistemas Operacionais mais acessível.

---

# Objetivos

O simulador foi desenvolvido para permitir que o usuário:

* Compreenda o funcionamento da memória paginada;
* Visualize a divisão da memória lógica em páginas;
* Entenda a organização da memória física em quadros;
* Acompanhe o mapeamento entre páginas e quadros;
* Observe a tradução de endereços lógicos para endereços físicos;
* Analise os bits destinados ao número da página e ao deslocamento (*offset*);
* Aprenda os conceitos de gerenciamento de memória por meio de uma simulação visual.

---

# Funcionalidades

| Funcionalidade                   | Descrição                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| Configuração da memória          | Permite definir o tamanho da memória lógica, memória física e tamanho das páginas.               |
| Cálculo automático               | Calcula a quantidade de páginas, quadros e os bits necessários para representação dos endereços. |
| Tabela de páginas                | Exibe o mapeamento entre páginas e quadros da memória física.                                    |
| Tradução de endereços            | Realiza a conversão de endereços lógicos para físicos.                                           |
| Identificação da página e offset | Mostra a página correspondente ao endereço informado e seu deslocamento interno.                 |
| Visualização didática            | Apresenta todas as informações de forma gráfica e organizada para facilitar o aprendizado.       |

---

# Conceitos Abordados

Durante a utilização do simulador, são explorados diversos conceitos importantes de Sistemas Operacionais, como:

* Gerenciamento de memória;
* Memória lógica e memória física;
* Paginação;
* Quadros (*frames*);
* Tabela de páginas;
* Endereços lógicos;
* Endereços físicos;
* Tradução de endereços;
* Deslocamento (*offset*);
* Unidade de Gerenciamento de Memória (**MMU**).

---

# Tecnologias Utilizadas

O projeto foi desenvolvido utilizando tecnologias web simples, tornando sua execução rápida e acessível.

* HTML5
* CSS3
* JavaScript

---

# Arquitetura do Sistema

A aplicação segue uma arquitetura simples, separando interface e lógica de processamento.

### Interface

Responsável pela interação com o usuário, entrada de dados e exibição das informações da simulação.

* `index.html`
* `ajuda.html`
* `style.css`

### Lógica da Aplicação

Responsável pelos cálculos relacionados à paginação, geração da tabela de páginas e tradução de endereços.

* `app.js`

---

# 📁 Estrutura do Projeto

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

* Navegador web atualizado; ou
* Visual Studio Code com a extensão **Live Server**.

---

## 1. Clone o repositório

```bash
git clone https://github.com/izalouyza/SimuladorMemoria
```

---

## 2. Acesse a pasta do projeto

```bash
cd SimuladorMemoria
```

---

## 3. Execute a aplicação

Abra o arquivo **`src/index.html`** diretamente no navegador ou utilize o **Live Server** no Visual Studio Code.

Caso utilize o Live Server:

1. Abra a pasta do projeto no VS Code;
2. Navegue até `src/index.html`;
3. Clique com o botão direito sobre o arquivo;
4. Selecione **Open with Live Server**.

O simulador será iniciado automaticamente no navegador.

---

# Finalidade Acadêmica

Este projeto possui caráter exclusivamente educacional e foi desenvolvido como atividade da disciplina de **Sistemas Operacionais**, servindo como ferramenta de apoio ao estudo do gerenciamento de memória por paginação e da tradução de endereços em sistemas computacionais.
