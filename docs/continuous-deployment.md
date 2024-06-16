# Continuous Deployment Report

## Metodologia de deployment

Foi optado por usar a metodologia de deploy tradicional, conhecida também como **deploy direto**. Esse método se baseia basicamente no versionamento de alterações em um ambiente de desenvolvimento e, depois da conclusão e validação de uma mudança, é feita a publicação para um ambiente de produção.

### Prós e contras

É possível destacar algumas vantagens na utilização desse método. A principal delas é a facilidade de entendimento e implementação que esse processo proporciona, ainda mais em equipes e projetos menores como nesse projeto. Além disso, é possível ter total controle sobre quando e como as mudanças são feitas, permitindo uma melhor gestão do processo. Por esses motivos, a abordagem dessa metodologia foi considerada a mais ideal para o contexto do projeto desenvolvido. Vale ressaltar também que nesse caso não há necessidade de manter múltiplos ambientes de produção, reduzindo os custos de infraestrutura.

Mesmo com esses pontos, essa abordagem acaba apresentando um risco maior de integração, já que as mudanças são implementadas direto no ambiente de produção e não há um fallback imediato. Caso não sejam implantados testes abrangentes de maneira adequada nos ambientes de teste e desenvolvimento, podem haver problemas de implementação na produção. Vale ressaltar também que dependendo de como a implementação é feita pode haver downtime durante o processo, impactando os usuários.

### Funcionamento

No caso do processo automatizado desenvolvido no projeto, sempre que uma alteração é adicionada na main do repositório salesforce, é executada automaticamente uma pipeline de autenticação e deploy na org de produção salesforce previamente configurada.

No repositório `2024-1B-T03-ES10-G03-SF`, acessando o caminho `.github/workflows/`, encontra-se o arquivo de configuração `deploy-prod.yml` do GitHub Actions que especifica o fluxo de trabalho de deployment para Salesforce.

```
name: Deploy Salesforce Prod

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: SFDX Auth
        env:
          SFDX_JWT_KEY: ${{ secrets.SFDX_JWT_KEY }}
          SFDX_CLIENT_ID: ${{ secrets.SFDX_CLIENT_ID }}
        run: |
          npm install @salesforce/cli -g
          echo "${SFDX_JWT_KEY}" > server.key
          sfdx force:auth:jwt:grant --client-id "${SFDX_CLIENT_ID}" --jwt-key-file server.key --username felipesaadi@inteli.sandbox --set-default-dev-hub
          sfdx force:org:display --json -u felipesaadi@inteli.sandbox > sfdx-auth.json
          rm server.key

      - name: Build, Test & Deploy
        uses: gfarb/sfdx-deploy@v1
        env:
          TARGET_USERNAME: felipesaadi@inteli.sandbox
          SOURCE_PATH: force-app
          DESTRUCTIVE_CHANGES: destructive-changes
          TEST_LEVEL: RunLocalTests
          WAIT: 200
```

A ativação do fluxo acontece quando ocorre um Push na Main. A partir disso, é feita a autenticação JWT que se utiliza das variáveis de ambiente configuradas no repositório e na org Salesforce.

## Tecnologias utilizadas
Para a implementação do Continuous Deployment (CD) da nossa aplicação, utilizamos o GitHub Actions juntamente com a github-actions-salesforce-deploy para gerenciar e automatizar o processo de implantação na Salesforce. A seguir, detalhamos cada uma das tecnologias utilizadas e como elas se encaixam no ecossistema do projeto.

1. GitHub Actions
Descrição:
GitHub Actions é uma plataforma de integração contínua e entrega contínua (CI/CD) que permite automatizar o ciclo de vida de desenvolvimento de software diretamente no repositório GitHub. Com GitHub Actions, podemos criar fluxos de trabalho personalizados para compilar, testar, e implantar nosso código sempre que ocorre uma mudança no repositório.

Como se Encaixa no Projeto:
GitHub Actions nos permite definir uma série de tarefas que são executadas automaticamente quando determinadas condições são atendidas (por exemplo, um commit na branch develop ou a abertura de um pull request). Isso garante que nosso código seja continuamente integrado e implantado sem a necessidade de intervenção manual, reduzindo o tempo de entrega e minimizando erros.

2. github-actions-salesforce-deploy
Descrição:
A ação github-actions-salesforce-deploy é uma ferramenta específica para automatizar o processo de implantação em Salesforce usando GitHub Actions. Ela facilita a conexão com a Salesforce, a configuração dos metadados, e a execução dos testes necessários para garantir que a implantação seja bem-sucedida.

**Como se Encaixa no Projeto:**
Esta ação permite que nossos fluxos de trabalho no GitHub Actions façam deploy diretamente na instância Salesforce, garantindo que os versionamentos sejam refletida na plataforma Salesforce de produção automaticamente. Isso é crucial para manter a consistência e a confiabilidade do nosso ambiente Salesforce, além de permitir uma rápida iteração e entrega de novas funcionalidades.

**Integração das Tecnologias**
A combinação do GitHub Actions com github-actions-salesforce-deploy forma um pipeline robusto para o nosso CD:

Automatização Completa: A cada push na branch main, o pipeline é acionado automaticamente.

Autenticação e Verificação: Autenticação com Salesforce e execução de testes no github garantem que apenas o código válido seja implantado.

Implantação Automática: A ação de deploy realiza a implantação diretamente na instância Salesforce, garantindo que as mudanças sejam refletidas imediatamente.

## Pipeline de deploy em execução
![image](https://github.com/Inteli-College/2024-1B-T03-ES10-G03/assets/54749257/24fc1104-c6d7-484a-bb9f-71580471ee03)

