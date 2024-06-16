
# Continuous Integration Report

## Script `pre-commit`

Esse script realiza ações automáticas de teste antes dos commits serem realizados. Primeiro, ele verifica se o Sonarqube está rodando corretamente, aguarda 5 segundos para ter certeza de que está iniciado completamente e depois roda as análises. Depois, ele navega até o diretório do frontend, inicia a aplicação com `npm run dev` em segundo plano, e verifica se a aplicação foi iniciada corretamente.

### Passos da implementação
1. **Instalação do Node.js**
   - Certificar de que o Node.js está instalado, pois o script usa `npm`.

2. **Instalação do Husky**
   - Instalação do Husky:
     ```bash
     npm install husky --save-dev
     ```

3. **Configuração do Husky**
   - Adicionar o seguinte ao `package.json`:
     ```json
        "scripts": {
            "prepare": "cd .. && husky src/.husky"
        }
     ```
   - Script `pre-commit` na pasta `.husky/` no diretório raiz do projeto.
4. **Instalação Sonarqube**
   - Seguir o tutorial especificado [aqui](https://developer.okta.com/blog/2021/09/08/sonar-qube-dotnet). 

<br>

## Script `commit-msg`

Esse script usa `commitlint` para validar mensagens de commit conforme a configuração especificada.

### Passos da implementação
1. **Instalação do commitlint**
   ```bash
   npm install @commitlint/config-conventional @commitlint/cli --save-dev
   ```

2. **Criação de um arquivo de configuração `commitlint.config.js`**
   - Este arquivo deve ser colocado na raiz do projeto contendo a especificação das regras de commit.

3. **Configuração do Husky**
   - Script `commit-msg` na pasta `.husky/` no diretório raiz do projeto.


## Aplicando

Primeiro, navegue até a pasta `src` na raiz do projeto e baixe as dependências:
```
npm i
```

Após as modificações serem feitas, basta rodar os seguintes comandos para realizar um commit usando o Husky como ferramenta de apoio: 

```
git add . 
```

```
git commit -m "mensagem-do-commit"
```

![image](https://github.com/Inteli-College/2024-1B-T03-ES10-G03/assets/54749257/dc1d060f-7f4e-4de4-9488-eca2e00521d4)

Após, basta aguardar o feedback do commitlint e realizar as alterações necessárias, se for o caso, ou seguir para o push. 

```
git push 
```
