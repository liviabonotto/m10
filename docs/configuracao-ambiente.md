# Configuração do ambiente

[introdução]

## Diagrama de Infra

## Scripts de criação EC2

Para automatizar o processo de criação das EC2s do projeto, foi utilizado a ferramenta Terraform. Esta, é usada para criar, modificar e gerenciar infraestrutura como código de forma segura e eficiente. 

Para realizar isso de maneira efetiva, é preciso descrever a infraestrutura em arquivos de configuração. Dessa forma, o arquivo que apresenta as configurações principais é o *main.tf* (`src/infra/terraform`) e pode ser dividido em 3 partes.

**Primeira parte:**

Esse primeiro conjunto de script define que as configurações do próprio terraform, como os provedores necessários, que no caso será a AWS, juntamente com sua respectiva fonte e versão.

```bash
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}
```

**Segunda parte:**

Esse segundo conjunto configura o porvedor AWS com os detalhes necessários para autenticação e região. As variáveis representam as credenciais e localização que permitem realizar a conexão com a AWS. Estas, estão definidas no arquivo `variables.tf`, dentro da pasta terraform.

```bash
provider "aws" {
  region     = var.region
  access_key = var.access_key
  secret_key = var.secret_key
  token      = var.token  # Add this line
}
```

Terceira parte:

Na terceira e última parte, é definido o recurso que deseja ser criado, que no caso é uma instância EC2, especificando sua imagem e tipo. Além disso, é possível adicionar tags, que ajudam na organização e gerenciamento.

```bash
resource "aws_instance" "example" {
  ami           = "ami-04ff98ccbfa41c9ad"
  instance_type = "t2.micro"

  tags = {
    Name = "ExampleInstance"
  }
}
```

### Ansible

O Ansible é uma ferramenta de automação que auxilia no gerenciamento de configurações, implantações e orquestração de infraestrutura, e por isso está sendo usado para automatizar o processo de iniciar a criação de uma RC2 pelo Terraform.