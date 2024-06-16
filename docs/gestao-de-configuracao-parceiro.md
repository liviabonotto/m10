# Políticas de Gestão de Configuração Salesforce

Tais diretrizes servem para garantir a qualidade e a integridade do código do projeto no repositório do parceiro, e aderir a essas políticas é essencial para o sucesso do desenvolvimento colaborativo.

Esse documento é uma extensão das políticas estabelecidas na [gestão de configuração](https://github.com/Inteli-College/2024-1B-T03-ES10-G03/docs/gestao-de-configuracao.md), dando enfoque para a forma como a nossa ferramenta se comportará em relação às políticas.

# Índice
- [Padronização do Projeto](#1-padronização-do-projeto)
- [Fluxo de Trabalho na Ferramenta](#2-fluxo-de-trabalho-na-ferramenta)
- [Padrões para Tagging](#3-padrões-para-tagging)

#  1. Padronização do Projeto

Nossa ferramenta será responsável por gerenciar todo o fluxo de trabalho do projeto Salesforce, de acordo com as políticas. Seu modo de operação segue dois caminhos:

Para Projetos Novos:
- Cria todo o fluxo de trabalho necessário para as implementações Salesforce, padronizando o repositório com a definição das branches `main` e `develop`

Para Projetos Existentes:
- Verifica se as estruturas de Branches estão de acordo com as políticas, notificando caso não atenda.
- Atualiza a Interface com os pacotes já criados, de acordo com a etapa que cada um se encontra no projeto.

Implementada a configuração padrão, a ferramenta já está pronta para o controle de versionamento do projeto Salesforce, permitindo o gerenciamento de todas as implementações feitas na plataforma pela própria interface.

# 2. Fluxo de Trabalho na Ferramenta

Padrão de controle de versão e implementação de novas funcionalidades Salesforce, controlado via Interface.

## Criação de novos pacotes

1. Identifica as mudanças Salesforce que e não estão contidas no repositório
2. Seleciona o conjunto de mudanças que farão parte de um pacote
3. Define o tipo de implementação como nova Feature e define um título referente a implementação
4. Branch é criada a partir da `develop`
5. Realiza ajustes se desejado
6. Aplica as mudanças na branch
7. Cria o Pull Request para a `release`
8. Executa os scripts de CI na `release`
9. Resolve conflitos caso seja necessário
10. Após aprovado o Pull Request atualiza a `main` e a `develop`

## Ajustes em Produção

1. Implementa os ajustes necessários na plataforma Salesforce
2. Seleciona o conjunto de mudanças que farão parte da correção
3. Define o tipo de implementação como nova Hotfix e define um título referente a implementação
4. Branch é criada a partir da `develop`
5. Realiza ajustes se desejado
6. Cria o Pull Request para a `release`
7. Executa os scripts de CI na `release`
8. Resolve conflitos caso seja necessário
9. Após aprovado o Pull Request atualiza a `main` e a `develop`

# 3. Padrões para Tagging

1. `feat:x` - nova implementação de pacotes
2. `fix:x` - manutenção/correção de pacotes
3. `test:x` - manutenção/alteração nos testes
4. `style:x` - alterações referentes a formatações de código
5. `refactor:x` - refatoração

# Conclusão

Com as políticas bem definidas na ferramenta, garantimos a padronização e o bom uso das políticas de forma automatizada no repositório Salesforce. Sendo fortemente desencorajado a realização de implementações diretas no repositório.
