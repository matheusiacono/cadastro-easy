![Logo of the project](./logo.png)

# cadastro-easy

> Desafio Proposto

Cadastro de usuários em Javascript sem utilizar frameworks.

Minha intenção foi criar uma biblioteca que utiliza a sintaxe do `jsx` para criar interfaces. Além disso, a biblioteca utiliza nós virtuais para criar alterações no DOM, ela também mantém o estado da aplicação e permite sua alteração a partir de `actions` que quando retornam um estado provocam a verificação dos nós virtuais.

## Instalação

Todas as dependências de desenvolvimento foram adicionadas utilizando o `npm` e podem ser instaladas com o comando:

```shell
npm install
```

Serão instalados todos os pacotes listados no campo `devDependencies` do arquivo `package.json`.

## Desenvolvimento

### Criado com

Javascript :heart:

O projeto utiliza `webpack` para automatizar o build, `babel` para utilizar as features mais novas do `JS` e `SASS` para extender o `CSS`. O projeto foi desenvolvido executando no chrome e no firefox, não tive acesso ao edge nem ao safari durante o desenvolvimento.

### Pré-requisitos

node: LTS

npm: 5

### Preparando o desenvolvimento

Para rodar o projeto em sua máquina, execute os seguintes comandos:

```shell
git clone https://github.com/matheusiacono/cadastro-easy.git
cd cadastro-easy/
npm install
npm start
```

Após clonar o projeto e instalar as dependências, o comando `npm start` vai executar o `webpack-dev-server`.

### Building

Para realizar o build do projeto, execute o comando:

```shell
npm run build
```

O build vai utilizar o `webpack` para construir o projeto e o resultado estará na pasta `dist/`.

### Publicação

O conteúdo da pasta `dist/` após o build pode ser publicado em qualquer servidor web.

## Testes

Os testes unitários e de integração entre os módulos utilizam o `jest` e podem ser executados pelo comando:

```shell
npm test
```

## Style guide

O projeto utiliza o [style guide do airbnb](https://github.com/airbnb/javascript) para javascript com a sintaxe do `jsx` habilitada. A ferramenta usada para o linting é o `eslint` e pode ser executada com o seguinte comando:

```shell
npm run lint
```

## API

A aplicação realiza um `GET` no endereço da [API pedida](https://private-21e8de-rafaellucio.apiary-mock.com/users).

## Persistência de dados

A persistência dos dados é feita no browser utilizando `IndexedDB`.

## Licença

O projeto utiliza a licença MIT descrita no arquivo `LICENSE`.
