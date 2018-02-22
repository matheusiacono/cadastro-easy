![Logo of the project](./logo.png)

# cadastro-easy

> Desafio Proposto

Cadastro simples de usuários em Javascript sem utilizar frameworks.

Minha intenção foi criar uma biblioteca que utiliza a sintaxe do `jsx` para criar interfaces.

## Instalação

Todas as dependências de desenvolvimento foram adicionadas utilizando o `npm` e podem ser instaladas com o comando:

```shell
npm install
```

Serão instalados todos os pacotes listados no campo `devDependencies` do arquivo `package.json`.

## Desenvolvimento

### Criado com

Javascript :heart:

O projeto utiliza `webpack` para automatizar o build, `babel` para utilizar as features mais novas do `JS` e `SASS` para extender o `CSS`.

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

Já os testes E2E utilizam o `TestCafe` e o chrome para rodar, para utilizar outros browsers consulte [este endereço](http://devexpress.github.io/testcafe/documentation/using-testcafe/common-concepts/browsers/browser-support.html) que lista os browsers suportados e altere o alias no script `e2e` do arquivo `package.json`. O comando para executar os testes E2E são:

```shell
npm run e2e
```

## Style guide

O projeto utiliza o style guide do airbnb para javascript com a sintaxe do `jsx` liberada. A ferramenta usada para o linting é o `eslint` e pode ser executada com o seguinte comando:

```shell
npm run lint
```

## API

A aplicação realiza um `GET` no endereço da [API pedida](https://private-21e8de-rafaellucio.apiary-mock.com/users).

## Persistência de dados

A persistência dos dados é feita no browser utilizando `IndexedDB`.

## Licença

O projeto utiliza a licença MIT descrita no arquivo `LICENSE`.
