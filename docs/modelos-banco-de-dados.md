## Visão Geral
Esta documentação detalha os modelos conceitual, lógico e físico de um banco de dados desenhado para gerenciar organizações, projetos, ambientes, usuários e papéis, facilitando a gestão de projetos e ambientes dentro de organizações, além do manejo de papéis e permissões dos usuários.

## Modelo Conceitual
<img width="582" alt="Screenshot 2024-05-10 at 21 00 20" src="https://github.com/Inteli-College/2024-1B-T03-ES10-G03/assets/99350292/740b0b8f-52ff-4d13-968a-2ee0aafb0277">

### Descrição
O modelo conceitual apresenta a estrutura de alto nível do sistema, definindo as principais entidades e suas relações.

#### Entidades e Relacionamentos
- **Organização**: Representa uma entidade corporativa ou organizacional.
- **Projeto**: Um conjunto de atividades com objetivos comuns dentro de uma organização.
- **Ambiente**: Diferentes configurações onde os projetos são executados, como desenvolvimento, teste e produção.
- **Usuário**: Indivíduos que utilizam o sistema.
- **Papel**: Define as permissões e responsabilidades atribuídas aos usuários dentro do sistema.

## Modelo Lógico
![Screenshot 2024-05-10 at 21 01 11](https://github.com/Inteli-College/2024-1B-T03-ES10-G03/assets/99350292/a7dd8386-2746-4020-97a2-1dbc19c792de)
### Estrutura
Detalhamento das tabelas e relações que compõem o banco de dados, aptas para implementação em um sistema de gerenciamento de banco de dados relacional.

#### Tabelas
- `organization`
- `project`
- `environment`
- `user`
- `role`
- `organization_project` (associação entre organizações e projetos)
- `project_environment` (associação entre projetos e ambientes)
- `user_permission` (associação de permissões de usuários)

## Modelo Físico
### Comandos SQL
Scripts SQL para a criação das tabelas conforme especificado no modelo lógico.

```sql
-- Criação da tabela Organization
CREATE TABLE organization (
    id INT PRIMARY KEY,
    name VARCHAR(60),
    logo VARCHAR(255)
);

-- Criação da tabela Project
CREATE TABLE project (
    id INT PRIMARY KEY,
    name VARCHAR(60)
);

-- Criação da tabela Environment
CREATE TABLE environment (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

-- Criação da tabela User
CREATE TABLE user (
    id INT PRIMARY KEY,
    name VARCHAR(45),
    email VARCHAR(45)
);

-- Criação da tabela Role
CREATE TABLE role (
    id INT PRIMARY KEY,
    name VARCHAR(45),
    description TEXT
);

-- Tabela de associação Organization Project
CREATE TABLE organization_project (
    id INT PRIMARY KEY,
    organization_id INT,
    project_id INT,
    FOREIGN KEY (organization_id) REFERENCES organization(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
);

-- Tabela de associação Project Environment
CREATE TABLE project_environment (
    id INT PRIMARY KEY,
    project_id INT,
    environment_id INT,
    FOREIGN KEY (project_id) REFERENCES project(id),
    FOREIGN KEY (environment_id) REFERENCES environment(id)
);

-- Tabela de associação User Permission
CREATE TABLE user_permission (
    id INT PRIMARY KEY,
    user_id INT,
    project_id INT,
    role_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (project_id) REFERENCES project(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);