# Políticas de Gestão de Configuração

Tais diretrizes servem para garantir a qualidade e a integridade do código em nosso repositório, e aderir a essas políticas é essencial para o sucesso do desenvolvimento colaborativo.

# Índice
- [Estrutura de Branches](#1-estrutura-de-branches)
- [Fluxo de Trabalho de Repositório](#2-fluxo-de-trabalho-de-repositório)
- [Padrões para Nomes de Branches](#3-padrões-para-nomes-de-branches)
- [Padrões para Tagging de Commits](#4-padrões-para-tagging-de-commits)
- [Políticas de Push](#5-políticas-de-push)
- [Revisão de Código por Pares](#6-revisão-de-código-por-pares)
- [Validação de Integridade de Código Fonte](#7-validação-de-integridade-de-código-fonte)
- [Boas Práticas](#8-boas-práticas)

#  1. Estrutura de Branches

- **Main Branch**: continua sendo a linha de vida principal do projeto, representando o código em produção. Atualizações nesta branch devem vir apenas da branch `release`.

- **Develop Branch**: a branch `develop` é uma ramificação do código-fonte que permite aos desenvolvedores trabalharem em novos recursos ou correções de bugs sem interferir no código principal, facilitando a colaboração e a revisão antes da integração.

- **Release Branch**: a branch `release` é usada para preparar lançamentos. Ela é criada a partir da `develop` quando esta está estável e pronta para ser lançada. Ajustes finais, como correções de bugs e documentação de última hora, são feitos aqui.

- **Feature Branches**: a estratégia para recursos permanece a mesma. Crie branches a partir da `develop` para novos recursos ou correções, usando a convenção `features/nome-do-recurso`.

Para uma explicação mais completa veja o nosso [GitFlow](https://github.com/Inteli-College/2024-1B-T03-ES10-G03/blob/docs/Gitflow/docs/Gitflow.md).


# 2. Fluxo de Trabalho de Repositório

1. **Desenvolvimento de Recursos**: inicie um novo recurso criando uma branch a partir da `develop`.

```bash
git flow feature start NOME_DA_FEATURE
```
2. **Testes iniciais**: desenvolva e teste o recurso em sua branch de recurso. Faça commits pequenos e significativos.

3. **Pull Request para Develop**: quando o recurso está pronto e testado, crie um Pull Request para a `develop`.

4. **Testes em Release**: crie uma branch `release` e teste as implementações em nível de homologação. 

5. **Preparação para o Lançamento**: uma vez que a release está estável e pronta para produção. Faça ajustes finais e prepare a documentação do lançamento.

6. **Merge para Main e Tagging**: após a conclusão dos ajustes na `release`, faça o merge para a `main` e na `develop`. 

### Exemplo de fluxo
1. Clone o repositório: `git clone url_do_repositorio`
2. Crie uma nova branch para a funcionalidade: `git flow feature start NOME_DA_FEATURE`
3. Após as alterações, faça push para a branch criada: `git push origin nome_da_branch`
4. Abra um pull request para revisão antes de mesclar ao branch principal.

# 3. Padrões para nomes de Branches

- `feature/x` - Novas funcionalidades e features
- `hotfix/x` - Consertos pequenos
- `docs/x` - Documentação do projeto

# 4. Padrões para tagging de Commits

1. `feat:x` - nova Funcionalidade
2. `fix:x` - manutenção/Correção
3. `docs:x` - documentação do projeto
4. `test:x` - testes
5. `style:x` - alterações referentes a formatações de código
6. `refactor:x` - refatoração

Além disso, o repositório a seguir será utilizado como referência para a criação de commits: https://github.com/josercf/padroes-de-commits 

# 5. Políticas de Push
1. **Nunca faça push diretamente para a branch principal.**
2. Certifique-se de que todas as modificações passam por uma revisão de código antes de fazer push.

# 6. Revisão de Código por Pares
Cada pull request deve ser revisado por pelo menos um outro desenvolvedor. A revisão deve focar em:

- Qualidade do código
- Conformidade com as diretrizes de desenvolvimento
- Possíveis conflitos de código
- Testes adequados

## Critérios para Aprovação de PR

- Nenhum erro de compilação
- Passar todos os testes
- Aprovação de pelo menos um revisor

# 7. Validação de Integridade de Código Fonte

Porcentagem do Sonarqube
Resultados Cypher

## Configuração de SonarQube

- Instale e configure o SonarQube
- Execute a análise: `sonar-scanner`

# 8. Boas Práticas

- Garantir que `release` e `main` estejam sempre prontas para deploy e bem testadas.
- Utilizar Pull Requests para revisão de código e integração de mudanças.
- Manter convenções de nomenclatura claras e consistentes para branches e tags.
- Documentar mudanças e novos recursos de forma clara.
- Implementar automação para testes e CI para manter a qualidade do código.

# Conclusão
Ao seguir estas diretrizes garantimos a qualidade e a integridade do código em nosso repositório. A aderência a estas políticas é essencial para o sucesso do desenvolvimento colaborativo.
