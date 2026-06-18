# Simulador de Memória Paginada

Repositório contendo o projeto desenvolvido para a disciplina de **Sistemas Operacionais**, com foco na simulação do gerenciamento de memória utilizando **paginação**.

O sistema tem como objetivo demonstrar, de forma visual e interativa, o funcionamento da **tradução de endereços lógicos para físicos**, do **mapeamento entre páginas e quadros** e da **tabela de páginas**, facilitando o aprendizado dos conceitos fundamentais de gerenciamento de memória.

![Linguagem](https://img.shields.io/badge/Linguagem-JavaScript-yellow)
![Último commit](https://img.shields.io/github/last-commit/izalouyza/SimuladorMemoria)

---

# Sumário

* [Autores](#autores)
* [Propósito do Projeto](#propósito-do-projeto)
* [Funcionalidades Principais](#funcionalidades-principais)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Arquitetura do Sistema](#arquitetura-do-sistema)
* [Estrutura de Pastas](#estrutura-de-pastas)
* [Como Executar o Projeto](#como-executar-o-projeto)

---

# Autores

**Discentes:**<br> <a href="https://github.com/izalouyza">Izadora Louyza Silva Figueiredo</a><br> <a href="https://github.com/livianlucena">Lívian Maria Lucena Gomes Pinheiro</a><br> <a href="https://github.com/tivitoriarocha">Maria Vitória Fernandes Rocha</a><br> <a href="https://github.com/Victor350br">Victor Hugo de Oliveira</a>

---

# Propósito do Projeto

O projeto tem como finalidade simular o funcionamento da memória paginada, permitindo:

* Compreender a divisão da memória lógica em páginas.
* Visualizar o mapeamento entre páginas e quadros da memória física.
* Entender o processo de tradução de endereços lógicos para endereços físicos.
* Analisar a quantidade de bits utilizados para representar páginas e deslocamentos (*offset*).

O foco principal é fornecer uma ferramenta **didática, visual e interativa**, auxiliando no aprendizado dos conceitos de **Gerenciamento de Memória** em Sistemas Operacionais.

---

# Funcionalidades Principais

| Funcionalidade                   | Descrição                                                                  |
| -------------------------------- | -------------------------------------------------------------------------- |
| Configuração da Memória          | Permite definir o tamanho da memória lógica, memória física e das páginas. |
| Cálculo dos Bits                 | Calcula automaticamente os bits necessários para página e deslocamento.    |
| Tabela de Páginas                | Exibe o mapeamento entre páginas e quadros da memória física.              |
| Tradução de Endereços            | Converte endereços lógicos em endereços físicos.                           |
| Identificação de Página e Offset | Exibe a página correspondente e seu deslocamento.                          |
| Simulação Didática               | Facilita a visualização do funcionamento da memória paginada.              |

---

# Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript

---

# Arquitetura do Sistema

O sistema foi organizado de forma simples, separando a interface da lógica da aplicação.

* **Interface (`index.html` + `style.css`):**
  Responsável pela interação com o usuário e pela apresentação das informações da simulação.

* **Lógica (`app.js`):**
  Responsável pelos cálculos de paginação, geração da tabela de páginas e tradução dos endereços.

* **Documentação (`teste.md`):**
  Arquivo utilizado para documentação e testes durante o desenvolvimento.

---

# Estrutura de Pastas

```text
projeto/
├── src/
│   ├── app.js
│   ├── index.html
│   ├── style.css
│   └── teste.md
├── .gitignore
└── README.md
```

---

# Como Executar o Projeto

## Pré-requisitos

* Navegador Web atualizado.

## 1. Clone o repositório

```bash
git clone https://github.com/izalouyza/SimuladorMemoria
```

## 2. Acesse a pasta do projeto

```bash
cd SimuladorMemoria
```

## 3. Abra a pasta `src`

Abra o arquivo `index.html` diretamente no navegador ou utilize uma extensão como **Live Server** no Visual Studio Code.

Caso utilize o Live Server, basta clicar com o botão direito em `src/index.html` e selecionar **Open with Live Server**.

O simulador será iniciado automaticamente no navegador.
