TOTH SCHEDULE MODULE
===

INSTALL
---
- Get `Erlang`, `Elixir` and `NodeJS` (`asdf`, `nvm`)
- Get it:
```
$ git clone git@github.com:DigitalDev-Toth/schedule.git
$ cd schedule
```
- Dependencies:
```
$ mix deps.get
$ npm install
```

HOW TO USE IT
---
- Development:
```
$ npm run dev
```
- Production:
```
$ MODE_ENV=prod mix phoenix.server
```
- Deployment:
```
# Create and configure config/prod.secret.exs
# Generate a new secret: mix phoenix.gen.secret

# Initial setup
$ mix deps.get --only prod
$ MIX_ENV=prod mix compile

# Compile assets
$ npm run deploy
$ MIX_ENV=prod mix phoenix.digest

# Finally run the server
$ PORT=4001 MIX_ENV=prod mix phoenix.server

# Run the application inside an interactive shell
$ PORT=4001 MIX_ENV=prod iex -S mix phoenix.server

# Daemonizes the process
$ MIX_ENV=prod PORT=4001 elixir --detached -S mix do compile, phoenix.server
```

TECHNOLOGIES
---
### BACKEND
- Virtual Machine: `Erlang VM`
- Language: `Elixir`
- Framework: `Phoenix`
- Server: `Cowboy`

###FRONTEND
- Environment: `NodeJS`
- Language: `JavaScript (ES2015)`
- Views: `ReactJS`, `Material-UI`
- StyleSheet: `SASS`
- Utils: `Redux`, `Babel [ES2015, Stage-* (*Decorators), ReactJS]`, `Webpack`, `ESlint`, `JSCS`, `Appcache`, `Docblockr`

###DATABASE
- Backend: `CouchDB`, `*PostgreSQL`
- Frontend: PouchDB

###TESTING
- BDD: `Cucumber`, `Mocha`, `Chai`, `WebdriverIO`, `Selenium-Driver`
- CI/CD: `Strider`

GUIDES
---
###ELIXIR + PHOENIX FRAMEWORK
- [Elixir documentation](http://elixir-lang.org/docs.html)
- [Phoenix documentation](http://www.phoenixframework.org/docs/overview)
- [Phoenix + Webpack](http://matthewlehner.net/using-webpack-with-phoenix-and-elixir/)
- [Phoenix + React + Redux](http://10consulting.com/2015/11/18/phoenix-react-redux-example/)
- [asdf](https://github.com/HashNuke/asdf)

###REACT + REDUX
- [React documentation](https://facebook.github.io/react/docs/getting-started.html)
- [Redux documentation](http://redux.js.org/docs/basics/)
- [React + Redux: Todo example](https://github.com/reactjs/redux/tree/master/examples/todomvc)
- [nvm](https://github.com/creationix/nvm)
