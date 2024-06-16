# Catálogo de Serviços

## Índice
1. [Introdução](#introdução)
2. [Pré-requisitos para a utilização](#pré-requisitos-para-a-utilização)
   - [Acesso à Ferramenta Github](https://github.com/)
   - [Acesso à Plataforma Salesforce](https://www.salesforce.com/br/)
   - Acesso à plataforma GitGurus
3. [Passo a passo de instalação](#passo-a-passo-de-instalação)
   - Acesso ao Repositório GitGurus
   - Acesso ao Repositório Salesforce
   - Acesso à plataforma GitGurus
4. [Serviços](#serviços)
   - [Serviço de Autenticação Salesforce](https://api.authentication.mockservice.com/salesforceauth)
   - [Serviço de Download de Arquivo](https://api.metadatafiles.mockservice.com/archivedownloadservice)
   - [Serviço de Salvamento de Metadados](https://api.metadatafiles.mockservice.com/savemetadatagitservice)
   - [Serviço de Commits, Pull e Push](https://api.codebranching.mockservice.com/upcommitservice)
   - [Serviço de Alteração de Branch](https://api.codebranching.mockservice.com/changebranchservice)
   - [Serviço de Aprovação de Mudança de Branch](https://api.codebranching.mockservice.com/approvechangebranchservice)
   - [Serviço de Merge entre Branches](https://api.codebranching.mockservice.com/mergebranchesservice)
   - [Serviço de Resolução de Conflitos](https://api.codebranching.mockservice.com/solveconflictservice)
   - [Serviço de Deploy para o Salesforce](https://api.authentication.mockservice.com/salesforcedeploy)


## Introdução
Esse documento oferece um guia detalhado para a instalação, configuração e utilização dos serviços que facilitam a gestão e automação de projetos no Salesforce, utilizando a plataforma GitGurus. Aqui você encontrará todos os pré-requisitos necessários, além de um passo a passo para a instalação e um detalhamento dos serviços disponíveis que irão auxiliar no desenvolvimento e na manutenção dos seus projetos Salesforce.
_O catálogo foi criado nesse [documento.](https://docs.google.com/spreadsheets/d/1W6lSz_4MCrOeHWnuRxz7cRGzkLD3wWfW3w-GkIp3qXA/edit?usp=sharing)_



## Pré requisitos para a utilização :
 -   [Acesso à Ferramenta Github](https://github.com/): O GitHub é a chave fundamental para desvendar o código fonte e a documentação do GitGurus, ele contém o nosso codigo fonte e a documentação, por isso é imprescindível possuir acesso a essa plataforma.
 -   [Acesso à Plataforma Salesforce](https://www.salesforce.com/br/): Os serviços neste catálogo dependem da integração com a plataforma Salesforce. Portanto, é necessário ter acesso à organização do Salesforce e às credenciais adequadas para autenticação.
 -   Acesso à plataforma gitgurus: A plataforma GitGurus é utilizada para gerenciar, versionar e automatizar esteiras de CI/CD para fluxos de trabalho de projetos Salesforce. Portanto, é necessário ter acesso à ferramenta GitGurus e às permissões adequadas para configurar e executar os pipelines de CI/CD.

## Passo a passo de instalação:

1. **Acesso o Repositório GitGurus:**
    - Acesse o repositório GitGurus onde está hospedado o código fonte e a documentação da ferramenta GitGurus no GitHub.

2. **Acesso ao Repositório Salesforce:**
   - Acesse o repositório Salesforce onde serão hospedadas as implementações.
   - Certifique-se de ter permissões adequadas para fazer alterações neste repositório.

3. **Acesso a plataforma GitGurus:**
   - Acesse o repositório GitGurus onde está hospedado o código fonte da ferramenta GitGurus no GitHub.
   - Verifique se têm as permissões necessárias para fazer alterações neste repositório.
   - Faça login e coloque as suas credenciais do salesforce para conectar o gitgurus ao salesforce.

## Serviços

| Número | Nome do Serviço                        | Descrição                                                                                     | URL                                                                                                                  |
|--------|----------------------------------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| 1      | Serviço de Autenticação Salesforce     | Responsável por autenticar a plataforma na instância do Salesforce para obter acesso aos recursos necessários.     | [SalesForceAuth](https://api.authentication.mockservice.com/salesforceauth)                                         |
| 2      | Serviço de Download de Arquivo         | Este serviço acessa os recursos do Salesforce, identifica os arquivos que precisam ser atualizados e realiza o download dos metadados. | [ArchiveDownloadService](https://api.metadatafiles.mockservice.com/archivedownloadservice)                         |
| 3      | Serviço de Salvamento de Metadados     | Após o download dos arquivos, a plataforma precisa armazená-los em uma branch específica do repositório Git, onde as alterações serão registradas e controladas. | [SaveMetaDataGitService](https://api.metadatafiles.mockservice.com/savemetadatagitservice)                         |
| 4      | Serviço de Commits, Pull e Push        | Uma vez que os arquivos foram armazenados na branch do Git, a plataforma executa os comandos de commit para registrar as alterações, pull para atualizar o repositório local com as mudanças remotas e push para enviar as alterações para o repositório remoto. | [UpCommitService](https://api.codebranching.mockservice.com/upcommitservice)                                         |
| 5      | Serviço de Alteração de Branch         | Realiza a mudança do ambiente em que as alterações estão localizadas e aguarda aprovação, se necessário. | [ChangeBranchService](https://api.codebranching.mockservice.com/changebranchservice)                                 |
| 6      | Serviço de Aprovação de Mudança de Branch | Realiza a aprovação da mudança entre ambientes.                                                  | [ApproveChangeBranchService](https://api.codebranching.mockservice.com/approvechangebranchservice)                   |
| 7      | Serviço de Merge entre Branches        | Responsável por realizar o Merge entre duas Branches.                                             | [MergeBranchesService](https://api.codebranching.mockservice.com/mergebranchesservice)                               |
| 8      | Serviço de Resolução de Conflitos      | Durante o processo de pull ou push, podem ocorrer conflitos se as alterações locais entrarem em conflito com as alterações remotas. Esse serviço é responsável por identificar e fornecer ferramentas para que os desenvolvedores possam resolvê-los manualmente. | [SolveConflictService](https://api.codebranching.mockservice.com/solveconflictservice)                               |
| 9      | Serviço de Deploy para o Salesforce    | Após a resolução dos conflitos e a finalização das alterações no repositório Git, a plataforma realiza o deploy dos arquivos atualizados de volta para o Salesforce, atualizando assim a instância com a versão mais recente dos arquivos. | [SalesForceDeploy](https://api.authentication.mockservice.com/salesforcedeploy)                                   |

