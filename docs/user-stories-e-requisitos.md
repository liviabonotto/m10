
# Documentação das User Stories e Requisitos do sistema

## Índice
- [Introdução](#introdução)
- [Requisitos Funcionais](#requisitos-funcionais)
- [Requisitos Não Funcionais](#requisitos-não-funcionais)
- [User Stories](#user-stories)

## Introdução

O documento fornece uma visão detalhada dos requisitos do sistema a ser desenvolvido. Abaixo, são categorizados e detalhados os requisitos funcionais, não funcionais e as user stories associadas ao projeto.
_Os Requisitos e as User Stories foram criados nesse [documento.](https://docs.google.com/spreadsheets/d/1W6lSz_4MCrOeHWnuRxz7cRGzkLD3wWfW3w-GkIp3qXA/edit?usp=sharing)_

## Requisitos funcionais

Os requisitos funcionais descrevem as funcionalidades específicas que o sistema deve oferecer:

| Código | Descrição do requisito                                                     | Prioridade  |
|--------|----------------------------------------------------------------|-------------|
| **RF01**   | O sistema deve permitir gerenciar o versionamento de um projeto. | Essencial |
| **RF02**   | O sistema deve permitir gerenciar pacotes Salesforce.          | Essencial   |
| **RF03**         | O sistema deve permitir gerenciar ambientes na plataforma.          | Desejável   |
| **RF04** | O sistema deve permitir gerenciar conflitos de versionamento.          | Importante  |
| **RF05** | O sistema deve automatizar processos de deploy.                | Essencial   |
| **RF06** | O sistema deve gerar logs das atividades.                | Desejável |
| **RF07** | O sistema deve gerenciar múltiplos projetos.| Desejável |
| **RF08** | O sistema deve gerar notificações durante o processo de CI/CD. | Importante |

<br>

## Requisitos não funcionais

Os requisitos não funcionais abordam critérios de desempenho, usabilidade e confiabilidade do sistema:

| Código | Descrição do requisito                                         | Prioridade  |
|--------|----------------------------------------------------------------|-------------|
| **RNF01**  | O sistema deve possuir uma baixa curva de aprendizado.         | Essencial   |
| **RNF02**  | O sistema deve ser uma aplicação desktop.                      | Essencial   |
| **RNF03**  | O sistema deve ter uma interface estilo Kanban.                | Importante  |
| **RNF04**  | O sistema deve garantir que as mudanças da ferramenta não impactem entre usuários. | Essencial  |
| **RNF05**  | O sistema deve garantir que as mudanças na ferramenta não impactem entre organizações. | Importante   |
| **RNF06**   | O sistema deve enviar notificações via slack.                | Importante   |


<br>

## User Stories

Abaixo estão detalhadas as User Stories associadas aos requisitos funcionais do projeto, incluindo critérios de aceitação e suas respectivas prioridades:


| **Código**                     | User Story                                                                               | Critério de Aceitação                                                                                                                                                                             | **Relação**         | Prioridade  |
|--------------------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|-------------|
| **US01**                       | Como usuário da plataforma, quero poder criar e modificar pacotes, para gerenciar modificações feitas na plataforma Salesforce | - A ferramenta deve exibir todos as modificações XML efetuadas na plataforma Salesforce<br>- A ferramenta deve permitir selecionar o conjunto de modificações para criar um pacote<br>- A ferramenta deve permitir alterar um pacote, adicionando novas modificações<br>- A ferramenta deve permitir criar/alterar o nome do pacote | **RF02**            | Essencial   |
| **US02**                       | Como usuário da plataforma, quero poder criar e gerenciar branches, para que possa realizar alterações sem precisar saber sobre Git | - A ferramenta puxa todas as alterações feitas no repositório (pull)<br>- A partir de um pacote é possível criar uma branch<br>- A partir de um pacote é possível commitar alterações na branch<br>- A partir de um pacote é possível criar um Pull Request<br>- A partir de um pacote é possível mergear com outra branch | **RF01 e RF02**     | Essencial   |
| **US03**                       | Como usuário da plataforma, quero poder visualizar conflitos nos arquivos, para ser capaz de identificar as mudanças que devem ser feitas | - Ao puxar todas as alterações é possível identificar os conflitos nos arquivos<br>- Ao realizar um Pull Request é possível identificar os conflitos nos arquivos                                                                                         | **RF04 e RF02**     | Importante  |
| **US04**                       | Como administrador do projeto, quero poder configurar os ambientes da plataforma, para ser capaz de adaptar o fluxo de trabalho de acordo com o projeto | - A ferramenta permite a criação de ambientes intermediários no fluxo de trabalho (Kanban). Ex: homologação<br>- A ferramenta permite selecionar scripts a serem executados nas etapas. Ex: Release (branch), Homologação (ambiente)                        | **RF03**            | Desejável   |
| **US05**                       | Como usuário, quero ser guiado por cada etapa do processo de deploy, para ser capaz de identificar o estado das implementações | - A ferramenta deve exibir em qual etapa está atualmente cada pacote<br>- A ferramenta deve exibir o status do pacote na etapa em que ele se encontra<br>- A ferramenta deve permitir a realização do deploy de um pacote<br>- A ferramenta deve restringir o usuário de transitar um pacote entre etapas de forma incorreta | **RF05**            | Essencial   |
| **US06**                       | Como administrador do projeto, quero poder visualizar os logs de atividades da ferramenta, para ser capaz de rastrear as informações geradas pela plataforma | - A ferramenta armazena as informações (usuário, ação, data/hora) em um sistema de log<br>- A ferramenta armazena as informações (pacote, etapa, status, data/hora) em um sistema de log                                                                     | **RF06**            | Desejável   |
| **US07**                       | Como usuário da plataforma, quero poder resolver conflitos nos arquivos, para ser capaz de preparar o pacote para produção | - A ferramenta deve ser capaz de resolver os conflitos de forma automatizada<br>- A ferramenta deve exibir sugestões de correção de conflitos nos arquivos                                                                                                | **RF01, RF02 e RF04** | Desejável   |
| **US08**                       | Como usuário, quero receber notificações do processo de ci/cd, para identificar o status de cada pacote | - A ferramenta deve notificar os usuários quando um pacote mudar de ambiente com erro<br>- A ferramenta deve notificar os usuários quando um pacote mudar de ambiente com sucesso<br>- A ferramenta deve notificar os usuários quando um pacote não passar em uma etapa de CI | **RF08, RF05 e RF02** | Importante  |


