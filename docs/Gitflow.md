![GitFlow-Ferramenta drawio](https://github.com/Inteli-College/2024-1B-T03-ES10-G03/assets/54749257/ac0de3d1-3477-40dc-adef-587e76f2da61)

### Tipos de Branches no Git Flow:

1. **Branch Main (Master)**:
   - Contém o histórico de lançamentos.
   - Tudo nesta branch está em nível de produção.
   - Cada commit nesta branch é uma nova tag de lançamento.

2. **Branch Develop**:
   - Branch principal para desenvolvimento.
   - Todas as funcionalidades são integradas a ela antes de serem lançadas.

3. **Branches Feature**:
   - Criadas a partir da branch `develop`.
   - São usadas para desenvolver novas funcionalidades de forma isolada.
   - Devem ser mescladas de volta para `develop` quando a funcionalidade estiver completa.

4. **Branches Release**:
   - Criadas a partir da `develop` quando esta atinge um ponto estável e está pronta para lançar uma nova versão.
   - Permitidas apenas correções de bugs, documentação e outros preparativos de lançamento.
   - Uma vez pronta, é mesclada em `main` e `develop`, e a branch `main` recebe uma tag de versão.

5. **Branches Hotfix**:
   - Criadas a partir da `main` se um problema urgente é identificado em produção.
   - Após a correção, é mesclada na `develop`, passando pelo processo de release a branch `main` recebe uma tag de lançamento para o hotfix.

### Fluxo de Trabalho Detalhado com Git Flow:

**Início de uma Feature**:
- Uma nova branch `feature` é criada a partir da `develop`.
- O nome da branch deve refletir a nova funcionalidade.

**Desenvolvimento de uma Feature**:
- O desenvolvimento da funcionalidade acontece na branch `feature`.
- Permite um trabalho paralelo e isolado de outras funcionalidades.
- As atualizações podem ser sincronizadas com a `develop` periodicamente.

**Finalização de uma Feature**:
- Após a conclusão, a branch `feature` é mesclada de volta para `develop`.
- A branch `feature` é então apagada para manter a organização.

**Preparação para Release**:
- Uma branch `release` é criada a partir da `develop` quando se decide por um lançamento.
- Novas funcionalidades são congeladas; a equipe foca em correções de bugs nesta branch.
- O nome da branch de release geralmente segue uma convenção que reflete a versão do lançamento.

**Lançamento**:
- Após a finalização da preparação, a `release` é mesclada em `main` e recebe uma tag com o número da versão.
- Também é mesclada de volta para `develop` para garantir que as correções de bugs estejam presentes nas futuras funcionalidades.
- A branch de `release` então é apagada após a mesclagem.

**Manutenção e Hotfixes**:
- Se problemas críticos são encontrados em `main`, uma branch `hotfix` é criada para a correção.
- Após a resolução do problema, a `hotfix` deve passar pelo processo de release, ao final mesclando-os na `main` e `develop`.
- `main` recebe uma nova tag, indicando uma subversão para o lançamento que está em produção.

Este fluxo assegura que a branch `main` mantenha um histórico de lançamentos limpo, enquanto `develop` serve como uma base para o desenvolvimento contínuo. A separação de funcionalidades em branches `feature` permite foco e isolamento durante o desenvolvimento. As branches `release` e `hotfix` garantem estabilidade e agilidade na manutenção de produção, respectivamente.
