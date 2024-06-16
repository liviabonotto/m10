## Preparação

Colocar o .env em `backendCLI/.env` como o exemplo:

```
SF_USERNAME=username
SF_PASSWORD=password
SF_SECURITY_TOKEN=token
SF_LOGIN_URL=url
SF_CLIENT_ID=client_id
SF_CLIENT_SECRET=client_secret
```

E seguir os passos a seguir:

`cd backendCLI/src`

`npm install`

Depois de intalar rodar o comando `node index.js`

## Rotas acessiveis pela WEB

http://localhost:3094/download: Baixa dados do salesforce GET

http://localhost:3094/compare: Baixa a diferença/comparação dos dados locais com os do salesforce GET

## Rotas acessiveis por postman

http://localhost:3094/insert: auto  explicativo POST

exemplo body: 

{
  "objectType": "Account",
  "data": {
    "Name": "New Account"
  }
}


http://localhost:3094/update: auto explicativo POST

exemplo body:
{
  "objectType": "Account",
  "data": {
    "Id": "0011i000003GkFxAAK",
    "Name": "Updated Account Name"
  }
}


http://localhost:3094/delete: auto explicativo POST

exemplo body:
{
  "objectType": "Account",
  "id": "0011i000003GkFxAAK"
}
