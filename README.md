TOTH SCHEDULE MODULE
===

INSTALL
---
- Get erlang, elixir and nodejs (asdf, nvm) 
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

#Finally run the server
$ PORT=4001 MIX_ENV=prod mix phoenix.server

#Run the application inside an interactive shell
$ PORT=4001 MIX_ENV=prod iex -S mix phoenix.server

#Daemonizes the process
$ MIX_ENV=prod PORT=4001 elixir --detached -S mix do compile, phoenix.server
```

TECHNOLOGIES
---
### BACKEND
- virtual machine: erlang vm
- language: elixir
- framework: phoenix
- server: cowboy

###FRONTEND
- language: javascript (es2015)
- views: react, material-ui
- stylesheet: sass
- utils: redux, babel [es2015, stage-* (*decorators), react], webpack, eslint, jscs, appcache, eslint-security, docblockr

###DATABASE
- backend: couchdb, *postgresql
- frontend: pouchdb

###TESTING
- bdd: cucumber, mocha, chai, webdriverio, selenium-driver
- CI/CD: strider

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
